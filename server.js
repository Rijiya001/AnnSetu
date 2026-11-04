const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3000);
const DEFAULT_KEY = '579b464db66ec23bdd00000153a305cfec644f46529532df2fa82913';
let currentKey = (process.env.DATA_GOV_IN_API_KEY || DEFAULT_KEY).trim();
const RESOURCE = '9ef84268-d588-465a-a308-a864a43d0070';
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png'
};

async function route(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/api/prices') {
    res.setHeader('Cache-Control', 'no-store');
    const activeKey = currentKey;

    if (!activeKey) {
      res.writeHead(503, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({
        error: 'API key missing',
        message: 'DATA_GOV_IN_API_KEY is not configured on the server.'
      }));
    }

    const api = new URL(`https://api.data.gov.in/resource/${RESOURCE}`);
    api.searchParams.set('api-key', activeKey);
    api.searchParams.set('format', 'json');
    api.searchParams.set('limit', '1000');

    for (const field of ['commodity', 'state', 'district']) {
      let value = (url.searchParams.get(field) || '').trim();
      if (value) {
        // AGMARKNET data.gov.in filters are case-sensitive. Capitalize first letter of each word if lowercase.
        if (value.toLowerCase() === value) {
          value = value.replace(/\b[a-z]/g, c => c.toUpperCase());
        }
        api.searchParams.set(`filters[${field}]`, value);
      }
    }

    try {
      const activeFilters = ['commodity', 'state', 'district']
        .filter(f => api.searchParams.has(`filters[${f}]`))
        .map(f => `${f}=${api.searchParams.get(`filters[${f}]`)}`)
        .join(', ');
      console.log(`[API] Requesting official AGMARKNET data${activeFilters ? ` (${activeFilters})` : ''}...`);

      const upstream = await fetch(api, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(20000)
      });
      const body = await upstream.text();

      if (!upstream.ok) {
        console.warn(`[API] data.gov.in responded with status ${upstream.status}: ${body.slice(0, 180)}`);
      } else {
        try {
          const parsed = JSON.parse(body);
          console.log(`[API] Received ${parsed.records ? parsed.records.length : 0} records (total reported: ${parsed.total || 0}).`);
        } catch (_) {}
      }

      res.writeHead(upstream.status, {
        'Content-Type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
        'Cache-Control': 'no-store'
      });
      return res.end(body);
    } catch (error) {
      console.error(`[API] Upstream request failed:`, error.message);
      res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
      const causeCode = error?.cause?.code || error?.code || error?.name || 'unknown';
      return res.end(JSON.stringify({
        error: 'Upstream unavailable',
        message: `The official data.gov.in request failed (${causeCode}).`
      }));
    }
  }

  let file = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
  file = path.resolve(ROOT, `.${file}`);
  if (!file.startsWith(ROOT + path.sep) && file !== path.join(ROOT, 'index.html')) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(file, (err, content) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not found');
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(file)] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff'
    });
    res.end(content);
  });
}

function startServer(port, maxAttempts = 10) {
  const server = http.createServer((req, res) => {
    route(req, res).catch((err) => {
      console.error('Server error handling request:', err);
      if (!res.headersSent) res.writeHead(500);
      res.end('Server error');
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      if (maxAttempts > 0) {
        console.warn(`[Ann Setu] Port ${port} is in use. Trying port ${port + 1}...`);
        startServer(port + 1, maxAttempts - 1);
      } else {
        console.error(`\n[Ann Setu] Error: Ports ${PORT} through ${port} are all in use.`);
        console.error('To free port 3000 on Windows PowerShell:');
        console.error('  Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force');
        console.error('Or in Windows Command Prompt:');
        console.error('  netstat -ano | findstr :3000');
        console.error('  taskkill /PID <PID> /F\n');
        process.exit(1);
      }
    } else {
      console.error('[Ann Setu] Server error:', err);
      process.exit(1);
    }
  });

  server.listen(port, () => {
    console.log(`\n======================================================`);
    console.log(`  🌱 Ann Setu Mandi Prices Server is running!`);
    console.log(`  Local URL: http://localhost:${port}`);
    console.log(`  Source: Official AGMARKNET API (data.gov.in)`);
    console.log(`======================================================\n`);
  });
}

startServer(PORT);
