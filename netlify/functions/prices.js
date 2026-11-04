const RESOURCE = '9ef84268-d588-465a-a308-a864a43d0070';
const DEFAULT_KEY = '579b464db66ec23bdd00000153a305cfec644f46529532df2fa82913';

exports.handler = async function (event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: ''
    };
  }

  const apiKey = (process.env.DATA_GOV_IN_API_KEY || DEFAULT_KEY).trim();
  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'API key not configured',
        message: 'Please set DATA_GOV_IN_API_KEY in your Netlify Environment Variables.'
      })
    };
  }

  const params = event.queryStringParameters || {};
  const api = new URL(`https://api.data.gov.in/resource/${RESOURCE}`);
  api.searchParams.set('api-key', apiKey);
  api.searchParams.set('format', 'json');
  api.searchParams.set('limit', '1000');

  for (const field of ['commodity', 'state', 'district']) {
    let value = (params[field] || '').trim();
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

    return {
      statusCode: upstream.status,
      headers: {
        ...headers,
        'Content-Type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      },
      body
    };
  } catch (error) {
    const causeCode = error?.cause?.code || error?.code || error?.name || 'unknown';
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({
        error: 'Upstream unavailable',
        message: `The official data.gov.in request failed (${causeCode}).`
      })
    };
  }
};

