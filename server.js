const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3000);
const KEY = process.env.DATA_GOV_IN_API_KEY || '';
const RESOURCE = '9ef84268-d588-465a-a308-a864a43d0070';
const MIME = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml'};

async function route(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname === '/api/prices') {
    res.setHeader('Cache-Control', 'no-store');
    if (!KEY) {
      res.writeHead(503, {'Content-Type':'application/json; charset=utf-8'});
      return res.end(JSON.stringify({error:'API key missing',message:'Add DATA_GOV_IN_API_KEY to .env and restart the server.'}));
    }
    const api = new URL(`https://api.data.gov.in/resource/${RESOURCE}`);
    api.searchParams.set('api-key', KEY);
    api.searchParams.set('format', 'json');
    api.searchParams.set('limit', '1000');
    for (const field of ['commodity','state','district']) {
      const value = (url.searchParams.get(field) || '').trim();
      if (value) api.searchParams.set(`filters[${field}]`, value);
    }
    try {
      const upstream = await fetch(api, {headers:{Accept:'application/json'}, signal:AbortSignal.timeout(20000)});
      const body = await upstream.text();
      res.writeHead(upstream.status, {'Content-Type':upstream.headers.get('content-type') || 'application/json; charset=utf-8','Cache-Control':'no-store'});
      return res.end(body);
    } catch (error) {
      res.writeHead(502, {'Content-Type':'application/json; charset=utf-8'});
      const causeCode = error?.cause?.code || error?.code || error?.name || 'unknown';
      return res.end(JSON.stringify({error:'Upstream unavailable',message:`The official data.gov.in request failed (${causeCode}).`}));
    }
  }

  let file = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
  file = path.resolve(ROOT, `.${file}`);
  if (!file.startsWith(ROOT + path.sep) && file !== path.join(ROOT, 'index.html')) {
    res.writeHead(403); return res.end('Forbidden');
  }
  fs.readFile(file, (err, content) => {
    if (err) {res.writeHead(404); return res.end('Not found');}
    res.writeHead(200, {'Content-Type':MIME[path.extname(file)] || 'application/octet-stream','X-Content-Type-Options':'nosniff'});
    res.end(content);
  });
}

http.createServer((req,res)=>{route(req,res).catch(()=>{if(!res.headersSent)res.writeHead(500);res.end('Server error');});})
  .listen(PORT, ()=>console.log(`VejBhav running at http://localhost:${PORT}`));
