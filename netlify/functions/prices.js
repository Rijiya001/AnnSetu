const RESOURCE = '9ef84268-d588-465a-a308-a864a43d0070';
const DEFAULT_KEY = '579b464db66ec23bdd00000153a305cfec644f46529532df2fa82913';

let fallbackRecords = [];
try {
  fallbackRecords = require('./fallback-data.js');
} catch (_) {
  try { fallbackRecords = require('../../fallback-data.js'); } catch (_) {}
}

exports.handler = async function (event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: ''
    };
  }

  const params = event.queryStringParameters || {};

  function filterFallback() {
    let list = fallbackRecords || [];
    if (params.commodity) {
      const c = params.commodity.toLowerCase().trim();
      list = list.filter(r => (r.commodity || '').toLowerCase().includes(c) || c.includes((r.commodity || '').toLowerCase()));
    }
    if (params.state) {
      const s = params.state.toLowerCase().trim();
      list = list.filter(r => (r.state || '').toLowerCase() === s);
    }
    if (params.district) {
      const d = params.district.toLowerCase().trim();
      list = list.filter(r => (r.district || '').toLowerCase() === d);
    }
    return list;
  }

  const apiKey = (process.env.DATA_GOV_IN_API_KEY || DEFAULT_KEY).trim().replace(/^["']|["']$/g, '');
  const api = new URL(`https://api.data.gov.in/resource/${RESOURCE}`);
  api.searchParams.set('api-key', apiKey);
  api.searchParams.set('format', 'json');
  api.searchParams.set('limit', '1000');

  for (const field of ['commodity', 'state', 'district']) {
    let value = (params[field] || params[field.toLowerCase()] || '').trim();
    if (value) {
      if (value.toLowerCase() === value) {
        value = value.replace(/\b[a-z]/g, c => c.toUpperCase());
      }
      api.searchParams.set(`filters[${field}]`, value);
    }
  }

  try {
    const upstream = await fetch(api, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(5000)
    });

    if (upstream.ok) {
      const body = await upstream.text();
      try {
        const parsed = JSON.parse(body);
        if (Array.isArray(parsed.records) && parsed.records.length > 0) {
          return {
            statusCode: 200,
            headers,
            body
          };
        }
      } catch (_) {}
    }
  } catch (_) {}

  // If data.gov.in is down (e.g. 502 Bad Gateway), closed, or times out:
  // Serve authentic latest reported AGMARKNET records gracefully with HTTP 200!
  const safeRecords = filterFallback();
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      status: 'ok',
      total: safeRecords.length,
      records: safeRecords,
      is_fallback: true
    })
  };
};
