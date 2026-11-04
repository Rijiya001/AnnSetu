const RESOURCE = '9ef84268-d588-465a-a308-a864a43d0070';
const DEFAULT_KEY = '579b464db66ec23bdd00000153a305cfec644f46529532df2fa82913';

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  const apiKey = (process.env.DATA_GOV_IN_API_KEY || DEFAULT_KEY).trim();
  if (!apiKey) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.statusCode = 500;
    return res.end(JSON.stringify({
      error: 'API key not configured',
      message: 'Please set DATA_GOV_IN_API_KEY in your Vercel Environment Variables.'
    }));
  }

  const url = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
  const searchParams = url.searchParams;

  const api = new URL(`https://api.data.gov.in/resource/${RESOURCE}`);
  api.searchParams.set('api-key', apiKey);
  api.searchParams.set('format', 'json');
  api.searchParams.set('limit', '1000');

  for (const field of ['commodity', 'state', 'district']) {
    let value = (searchParams.get(field) || (req.query && req.query[field]) || '').trim();
    if (value) {
      // AGMARKNET data.gov.in filters are case-sensitive. Title Case each word if lowercase.
      if (value.toLowerCase() === value) {
        value = value.replace(/\b[a-z]/g, c => c.toUpperCase());
      }
      api.searchParams.set(`filters[${field}]`, value);
    }
  }

  try {
    const upstream = await fetch(api, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(25000)
    });
    const body = await upstream.text();

    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    res.statusCode = upstream.status;
    return res.end(body);
  } catch (error) {
    const causeCode = error?.cause?.code || error?.code || error?.name || 'unknown';
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.statusCode = 502;
    return res.end(JSON.stringify({
      error: 'Upstream unavailable',
      message: `The official data.gov.in request failed (${causeCode}).`
    }));
  }
};

