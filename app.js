const langStore = 'vejbhaav.language';

// Fast search mapper for common regional names to AGMARKNET English commodities
const CROP_SEARCH_MAP = {
  // Hindi, Marathi, Gujarati, Punjabi, Bengali, Tamil, Telugu, Kannada, Malayalam
  'आलू': 'Potato', 'बटाटा': 'Potato', 'બટાટા': 'Potato', 'আলু': 'Potato', 'ਆਲੂ': 'Potato', 'உருளைக்கிழங்கு': 'Potato', 'బంగాళాదుంప': 'Potato', 'ಆಲೂಗಡ್ಡೆ': 'Potato',
  'टमाटर': 'Tomato', 'टोमॅटो': 'Tomato', 'ટામેટા': 'Tomato', 'টমেটো': 'Tomato', 'ਟਮਾਟਰ': 'Tomato', 'தக்காளி': 'Tomato', 'టమోటా': 'Tomato', 'ಟೊಮೆಟೊ': 'Tomato', 'തക്കാളി': 'Tomato',
  'प्याज': 'Onion', 'कांदा': 'Onion', 'ડુંગળી': 'Onion', 'পেঁয়াজ': 'Onion', 'ਪਿਆਜ਼': 'Onion', 'வெங்காயம்': 'Onion', 'ఉల్లిపాయ': 'Onion', 'ಈರುಳ್ಳಿ': 'Onion', 'സവാള': 'Onion',
  'मिर्च': 'Chilli', 'हरी मिर्च': 'Green Chilli', 'हिरवी मिरची': 'Green Chilli', 'લીલા મરચા': 'Green Chilli', 'কাঁচা মরিচ': 'Green Chilli', 'பச்சை மிளகாய்': 'Green Chilli', 'పచ్చిమిర్చి': 'Green Chilli',
  'बैंगन': 'Brinjal', 'वांगी': 'Brinjal', 'રીંગણ': 'Brinjal', 'বেগুন': 'Brinjal', 'ਬੈਂਗਣ': 'Brinjal', 'கத்தரிக்காய்': 'Brinjal', 'వంకాయ': 'Brinjal', 'ಬದನೆಕಾಯಿ': 'Brinjal',
  'लहसुन': 'Garlic', 'लसूण': 'Garlic', 'લસણ': 'Garlic', 'রসুন': 'Garlic', 'ਲਸਣ': 'Garlic', 'பூண்டு': 'Garlic', 'వెల్లుల్లి': 'Garlic', 'ಬೆಳ್ಳುಳ್ಳಿ': 'Garlic',
  'अदरक': 'Ginger', 'आले': 'Ginger', 'આદુ': 'Ginger', 'আদা': 'Ginger', 'ਅਦਰਕ': 'Ginger', 'இஞ்சி': 'Ginger', 'అల్లం': 'Ginger', 'ಶುಂಠಿ': 'Ginger',
  'पत्तागोभी': 'Cabbage', 'कोबी': 'Cabbage', 'કોબીજ': 'Cabbage', 'বাঁধাকপি': 'Cabbage', 'ਬੰਦਗੋਭੀ': 'Cabbage', 'முட்டைக்கோஸ்': 'Cabbage', 'క్యాబేజీ': 'Cabbage',
  'फूलगोभी': 'Cauliflower', 'फ्लॉवर': 'Cauliflower', 'ફૂલકોબી': 'Cauliflower', 'ফুলকপি': 'Cauliflower', 'ਕੌਲੀਫਲਾਵਰ': 'Cauliflower', 'காலிஃபிளவர்': 'Cauliflower',
  'केला': 'Banana', 'केळी': 'Banana', 'કેળા': 'Banana', 'কলা': 'Banana', 'ਕੇਲਾ': 'Banana', 'வாழைப்பழம்': 'Banana', 'అరటి': 'Banana', 'ಬಾಳೆಹಣ್ಣು': 'Banana'
};

const COMMON_CROPS = [
  'Apple', 'Banana', 'Bitter gourd', 'Bottle gourd', 'Brinjal', 'Cabbage',
  'Capsicum', 'Carrot', 'Cauliflower', 'Chilli Red', 'Coconut', 'Coriander(Leaves)',
  'Cucumber(Kheera)', 'Garlic', 'Ginger(Green)', 'Green Chilli', 'Lemon',
  'Mango', 'Mushroom', 'Onion', 'Orange', 'Papaya', 'Peas Wet',
  'Pineapple', 'Pomegranate', 'Potato', 'Pumpkin', 'Radish', 'Spinach',
  'Sweet Potato', 'Tomato', 'Water Melon'
];

let allRecords = [];
let latestRecords = [];

const $ = (id) => document.getElementById(id);
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

async function resolveCommoditySearch(raw) {
  if (!raw) return '';
  const trimmed = raw.trim();
  if (/^[a-zA-Z\s\-()]+$/.test(trimmed)) return trimmed;

  const lower = trimmed.toLowerCase();
  if (CROP_SEARCH_MAP[lower] || CROP_SEARCH_MAP[trimmed]) {
    return CROP_SEARCH_MAP[lower] || CROP_SEARCH_MAP[trimmed];
  }

  // Google Translate fallback for any unmapped regional language term
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(trimmed)}`);
    const data = await res.json();
    const trans = data?.[0]?.[0]?.[0];
    if (trans && typeof trans === 'string') return trans.trim();
  } catch (_) {}

  return trimmed;
}

function getGoogleCookieLang() {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([a-zA-Z\-]+)/);
  return match ? match[1] : null;
}

function setGoogleTranslateLanguage(lang) {
  localStorage.setItem(langStore, lang);

  // Set Google Translate cookie
  const cookieValue = `/en/${lang}`;
  document.cookie = `googtrans=${cookieValue}; path=/;`;
  if (window.location.hostname) {
    document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname};`;
    const parts = window.location.hostname.split('.');
    if (parts.length > 1) {
      document.cookie = `googtrans=${cookieValue}; path=/; domain=.${parts.slice(-2).join('.')};`;
    }
  }

  // If selecting English, clear the translation cookie
  if (lang === 'en') {
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    if (window.location.hostname) {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
    }
  }

  // Trigger Google Translate dropdown
  const teCombo = document.querySelector('.goog-te-combo');
  if (teCombo) {
    teCombo.value = lang;
    teCombo.dispatchEvent(new Event('change'));
  } else {
    // Reload so Google Translate picks up the cookie on page load
    window.location.reload();
  }
}

function formatPrice(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return '—';
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n);
}

function formatPriceDisplay(value) {
  const f = formatPrice(value);
  return f === '—' ? '—' : `₹${f}`;
}

function dateValue(raw) {
  const s = String(raw || '').trim();
  let m = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (m) return new Date(+m[3], +m[2] - 1, +m[1]);
  const d = new Date(s);
  return Number.isNaN(+d) ? null : d;
}

function formatDate(raw) {
  const d = (raw instanceof Date) ? raw : dateValue(raw);
  return d ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(d) : 'Date not reported';
}

function normalise(r) {
  return {
    state: r.state || '',
    district: r.district || '',
    market: r.market || '',
    commodity: r.commodity || '',
    variety: r.variety || '',
    grade: r.grade || '',
    date: r.arrival_date || '',
    min: r.min_price,
    max: r.max_price,
    modal: r.modal_price
  };
}

function compareArrivalDateNewest(a, b) {
  return (dateValue(b.date)?.getTime() || 0) - (dateValue(a.date)?.getTime() || 0);
}

function setStatus(kind, text) {
  $('status-text').textContent = text;
  $('status-dot').className = `status-dot ${kind || ''}`;
}

async function getRecords(filters = {}) {
  const url = new URL('/api/prices', location.origin);
  for (const [field, value] of Object.entries(filters)) {
    if (value) url.searchParams.set(field.toLowerCase(), value);
  }
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.status === 'error') {
    throw new Error(data.message || `HTTP ${res.status}`);
  }
  if (!Array.isArray(data.records)) throw new Error(data.message || 'No records returned from data.gov.in');
  return data.records.map(normalise);
}

function selectedRecords() {
  const rawCrop = $('crop-search').value.trim();
  const crop = rawCrop.toLowerCase();
  const state = $('state-filter').value.toLowerCase();
  const district = $('district-filter').value.toLowerCase();

  return allRecords.filter(r => {
    const rCrop = r.commodity.toLowerCase();
    const matchCrop = !crop || rCrop.includes(crop) || (rawCrop && crop.includes(rCrop));
    const matchState = !state || r.state.toLowerCase() === state;
    const matchDistrict = !district || r.district.toLowerCase() === district;
    return matchCrop && matchState && matchDistrict;
  });
}

function updateSelect(select, items, placeholder) {
  const previous = select.value;
  const opts = items.map(it => `<option value="${esc(it)}">${esc(it)}</option>`).join('');
  select.innerHTML = `<option value="">${esc(placeholder)}</option>` + opts;
  if (items.includes(previous)) {
    select.value = previous;
  }
}

function populateFilters(records) {
  const rawStates = [...new Set(records.map(r => r.state).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  updateSelect($('state-filter'), rawStates, 'All states');

  const rawDistricts = [...new Set(records.filter(r => !$('state-filter').value || r.state === $('state-filter').value).map(r => r.district).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  updateSelect($('district-filter'), rawDistricts, 'Any district');
  $('district-filter').disabled = !$('state-filter').value;

  const combinedCrops = [...new Set([...COMMON_CROPS, ...records.map(r => r.commodity).filter(Boolean)])].sort((a, b) => a.localeCompare(b));
  $('crops').innerHTML = combinedCrops.map(v => `<option value="${esc(v)}">${esc(v)}</option>`).join('');
}

function displayResults(records) {
  const tbody = $('price-rows');
  const mobile = $('mobile-cards');
  const rawSearch = $('crop-search').value.trim();
  const searchTitle = rawSearch || 'Market reports';

  $('results-title').textContent = searchTitle;
  $('result-count').textContent = `${records.length} ${records.length === 1 ? 'market report' : 'market reports'}`;

  tbody.innerHTML = records.slice(0, 200).map(r => `
    <tr>
      <td>${esc(r.commodity)} · ${esc(r.variety || 'Other')}</td>
      <td>${esc(r.market)} Market · ${esc(r.district)}, ${esc(r.state)}</td>
      <td>${esc(formatDate(r.date))}</td>
      <td class="price notranslate">${esc(formatPriceDisplay(r.min))}</td>
      <td class="price modal-price notranslate">${esc(formatPriceDisplay(r.modal))}</td>
      <td class="price notranslate">${esc(formatPriceDisplay(r.max))}</td>
    </tr>
  `).join('');

  mobile.innerHTML = records.slice(0, 200).map(r => `
    <article class="price-card">
      <div class="price-card-top">
        <div class="price-card-name">${esc(r.commodity)} · ${esc(r.variety || 'Other')}</div>
        <div class="price-card-date">${esc(formatDate(r.date))}</div>
      </div>
      <div class="price-card-location">${esc(r.market)} Market · ${esc(r.district)}, ${esc(r.state)}</div>
      <div class="price-card-values">
        <div><span>MIN</span><strong class="notranslate">${esc(formatPriceDisplay(r.min))}</strong></div>
        <div class="value-modal"><span>MODAL PRICE</span><strong class="notranslate">${esc(formatPriceDisplay(r.modal))}</strong></div>
        <div><span>MAX</span><strong class="notranslate">${esc(formatPriceDisplay(r.max))}</strong></div>
      </div>
    </article>
  `).join('');

  $('empty-state').classList.toggle('hidden', records.length > 0);
  $('results').classList.toggle('hidden', records.length === 0);
  const histEl = $('history');
  if (histEl) histEl.classList.toggle('hidden', records.length === 0);

  if (records.length) {
    const d = records.map(r => dateValue(r.date)).filter(Boolean).sort((a, b) => b - a)[0];
    $('data-freshness').textContent = d ? `Latest report: ${formatDate(d)}` : '';
    $('last-updated').textContent = `Data checked ${new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit' }).format(new Date())}`;
  }

  renderChart(records);
}

function getRealHistoryPoints(records, selectedCrop) {
  const byDay = new Map();
  for (const r of records) {
    const d = dateValue(r.date);
    const p = Number(r.modal);
    if (!d || !Number.isFinite(p) || p < 10) continue;
    const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (!byDay.has(k)) byDay.set(k, []);
    byDay.get(k).push(p);
  }

  const cropKey = (selectedCrop || (records[0]?.commodity) || 'all_commodities').toLowerCase().trim();
  const storageKey = 'vejbhav_real_log_v1';
  let historyStore = {};
  try {
    historyStore = JSON.parse(localStorage.getItem(storageKey) || '{}');
  } catch (_) { }

  if (!historyStore[cropKey]) historyStore[cropKey] = {};

  for (const [day, prices] of byDay.entries()) {
    const med = prices.sort((a, b) => a - b)[Math.floor(prices.length / 2)];
    historyStore[cropKey][day] = med;
  }

  try {
    localStorage.setItem(storageKey, JSON.stringify(historyStore));
  } catch (_) { }

  return Object.entries(historyStore[cropKey])
    .map(([day, value]) => ({ day, value: Number(value) }))
    .filter(p => Number.isFinite(p.value) && p.value >= 10)
    .sort((a, b) => a.day.localeCompare(b.day));
}

function renderChart(records) {
  const selectedCrop = $('crop-search').value.trim();
  const activeCropName = selectedCrop || (records.length ? records[0].commodity : '');
  const kickerLabel = activeCropName ? `${activeCropName} · MODAL PRICE · ₹ / QUINTAL` : 'MODAL PRICE · ₹ / QUINTAL';

  const kickerEl = $('chart-kicker');
  if (kickerEl) kickerEl.textContent = kickerLabel;

  if (!records.length) {
    $('chart-area').innerHTML = `<div class="chart-empty">Price history will appear here when real reports are available.</div>`;
    $('chart-latest').textContent = '—';
    $('chart-period').textContent = 'Waiting for market data';
    return;
  }

  const points = getRealHistoryPoints(records, activeCropName);

  if (points.length <= 1) {
    const single = points[0] || { day: records[0]?.date, value: Number(records[0]?.modal) };

    const validModals = records.map(r => Number(r.modal)).filter(p => Number.isFinite(p) && p >= 10);
    const validMins = records.map(r => Number(r.min)).filter(p => Number.isFinite(p) && p >= 10);
    const validMaxs = records.map(r => Number(r.max)).filter(p => Number.isFinite(p) && p >= 10);

    const modalVal = validModals.length ? validModals.sort((a, b) => a - b)[Math.floor(validModals.length / 2)] : (single.value || 0);
    const rawMin = validMins.length ? Math.min(...validMins) : modalVal;
    const rawMax = validMaxs.length ? Math.max(...validMaxs) : modalVal;

    const minVal = Math.min(rawMin, modalVal || rawMin);
    const maxVal = Math.max(rawMax, modalVal || rawMax);

    $('chart-latest').textContent = modalVal ? `₹${formatPrice(modalVal)}` : '—';
    $('chart-period').textContent = `1 report day shown (${formatDate(single.day)})`;

    const spreadPercent = maxVal > minVal ? Math.min(Math.max(((modalVal - minVal) / (maxVal - minVal)) * 100, 15), 85) : 50;

    $('chart-area').innerHTML = `
      <div class="single-day-spread">
        <div class="spread-header">
          <span class="spread-date">📅 ${esc(formatDate(single.day))} · Today's Mandi Price Range</span>
          <span class="spread-mandis">${records.length} ${records.length === 1 ? 'market report' : 'market reports'}</span>
        </div>

        <div class="spread-stats-grid">
          <div class="spread-stat-card stat-min">
            <span class="stat-type">MIN</span>
            <strong class="stat-amt notranslate">₹${esc(formatPrice(minVal))}</strong>
            <span class="stat-sub">Lowest reported</span>
          </div>

          <div class="spread-stat-card stat-modal">
            <span class="stat-badge">Benchmark Modal Rate</span>
            <span class="stat-type">MODAL PRICE</span>
            <strong class="stat-amt modal-highlight notranslate">₹${esc(formatPrice(modalVal))}</strong>
            <span class="stat-sub">Most common rate</span>
          </div>

          <div class="spread-stat-card stat-max">
            <span class="stat-type">MAX</span>
            <strong class="stat-amt notranslate">₹${esc(formatPrice(maxVal))}</strong>
            <span class="stat-sub">Highest reported</span>
          </div>
        </div>

        <div class="spread-bar-wrap">
          <div class="spread-bar-track">
            <div class="spread-bar-fill"></div>
            <div class="spread-modal-pin" style="left:${spreadPercent}%;">
              <span class="pin-marker"></span>
            </div>
          </div>
          <div class="spread-bar-ends">
            <span class="notranslate">₹${esc(formatPrice(minVal))} (MIN)</span>
            <span class="spread-modal-legend notranslate">● MODAL: ₹${esc(formatPrice(modalVal))}</span>
            <span class="notranslate">₹${esc(formatPrice(maxVal))} (MAX)</span>
          </div>
        </div>

        <p class="spread-footer-note">
          ✓ 100% authentic AGMARKNET government report. Mandi reports are published once daily; historical trend lines connect real daily reports as they accumulate.
        </p>
      </div>
    `;
    return;
  }

  // If 2 or more genuine daily dates exist, plot the authentic trend line
  $('chart-latest').textContent = `₹${formatPrice(points.at(-1).value)}`;
  $('chart-period').textContent = `${points.length} report days shown`;

  const width = 900;
  const height = 185;
  const padX = 18;
  const padY = 18;
  const vals = points.map(p => p.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const span = max - min || Math.max(max * 0.05, 1);

  const xy = points.map((p, i) => ({
    x: padX + i * (width - 2 * padX) / (points.length - 1),
    y: height - padY - ((p.value - min) / span) * (height - 2 * padY),
    day: p.day,
    val: p.value
  }));

  const line = xy.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const area = `${line} L${xy.at(-1).x},${height} L${xy[0].x},${height} Z`;

  const tickIndices = points.length <= 4
    ? points.map((_, i) => i)
    : [0, Math.floor(points.length * 0.33), Math.floor(points.length * 0.66), points.length - 1];

  const tickLabels = tickIndices.map((idx, i) => {
    const p = xy[idx];
    const align = i === 0 ? 'start' : i === tickIndices.length - 1 ? 'end' : 'middle';
    return `<text x="${p.x.toFixed(1)}" y="${height - 2}" text-anchor="${align}" fill="#8a9387" font-size="11">${esc(formatDate(p.day))}</text>`;
  }).join('');

  $('chart-area').innerHTML = `
    <svg viewBox="0 0 ${width} ${height + 8}" preserveAspectRatio="none" role="img" aria-label="Daily median across matching markets">
      <defs>
        <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#79a375" stop-opacity=".25"/>
          <stop offset="1" stop-color="#79a375" stop-opacity="0.01"/>
        </linearGradient>
      </defs>
      <path d="${area}" fill="url(#priceFill)"/>
      <path d="${line}" fill="none" stroke="#3d7549" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
      ${xy.map(p => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.5" fill="#fff" stroke="#3d7549" stroke-width="2" vector-effect="non-scaling-stroke"><title>${esc(formatDate(p.day))}: ₹${formatPrice(p.val)}</title></circle>`).join('')}
      ${tickLabels}
    </svg>
  `;
}

async function loadPrices({ force = false } = {}) {
  setStatus('', 'Loading official AGMARKNET prices…');
  $('refresh').disabled = true;
  try {
    const state = $('state-filter').value;
    const rawCrop = $('crop-search').value.trim();
    const resolvedCrop = await resolveCommoditySearch(rawCrop);

    let records = await getRecords({
      ...(state ? { state } : {}),
      ...(resolvedCrop ? { commodity: resolvedCrop } : {})
    });

    if (!records.length && resolvedCrop) {
      records = await getRecords({ ...(state ? { state } : {}) });
    }

    allRecords = records.sort(compareArrivalDateNewest);
    populateFilters(allRecords);
    const chosen = selectedRecords();
    latestRecords = chosen;
    displayResults(chosen);
    setStatus('connected', chosen.length ? 'Connected to official AGMARKNET reports' : 'No matching reports found in available data.');
  } catch (e) {
    setStatus('error', 'Could not load official data. Please refresh or try again later.');
    $('empty-state').classList.remove('hidden');
    $('results').classList.add('hidden');
    const histEl = $('history');
    if (histEl) histEl.classList.add('hidden');
    $('chart-period').textContent = 'Waiting for market data';
    $('chart-area').innerHTML = `<div class="chart-empty">Price history will appear here when real reports are available.</div>`;
  } finally {
    $('refresh').disabled = false;
  }
}

function applyFilters() {
  if (!allRecords.length) {
    loadPrices();
    return;
  }
  const filtered = selectedRecords();
  latestRecords = filtered;
  displayResults(filtered);
  setStatus('connected', filtered.length ? 'Connected to official AGMARKNET reports' : 'No matching reports found in available data.');
}

document.addEventListener('DOMContentLoaded', () => {
  // Setup Google Translate Language Selection
  const initialLang = localStorage.getItem(langStore) || getGoogleCookieLang() || 'en';
  $('language').value = initialLang;

  $('language').addEventListener('change', e => {
    setGoogleTranslateLanguage(e.target.value);
  });

  $('refresh').addEventListener('click', () => loadPrices({ force: true }));
  $('search-button').addEventListener('click', () => loadPrices());

  $('crop-search').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      loadPrices();
    }
  });

  // Instant local filtering while typing
  $('crop-search').addEventListener('input', () => {
    const rawVal = $('crop-search').value.trim().toLowerCase();
    document.querySelectorAll('.chip').forEach(c => {
      const cCrop = (c.dataset.crop || '').toLowerCase();
      c.classList.toggle('active', cCrop === rawVal || (!rawVal && !cCrop));
    });
    if (allRecords.length) applyFilters();
  });

  // Quick vegetable chips
  document.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const cropVal = btn.dataset.crop || '';
      $('crop-search').value = cropVal;
      loadPrices();

      const hist = $('history');
      if (hist) {
        const rect = hist.getBoundingClientRect();
        if (rect.top < 0 || rect.top > window.innerHeight * 0.7) {
          hist.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  });

  $('state-filter').addEventListener('change', () => {
    if (allRecords.length) loadPrices();
  });
  $('district-filter').addEventListener('change', applyFilters);

  loadPrices();
});
