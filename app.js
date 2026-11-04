const langStore = 'annsetu.language';
const themeStore = 'annsetu.theme';

function getPreferredTheme() {
  const saved = localStorage.getItem(themeStore);
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function updateThemeUI(theme) {
  const toggleBtn = $('theme-toggle');
  const themeLabel = $('theme-label');
  const isDark = theme === 'dark';

  if (toggleBtn) {
    toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    toggleBtn.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  if (themeLabel) {
    themeLabel.textContent = isDark ? 'Light' : 'Dark';
  }

  const metaTheme = $('meta-theme-color') || document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', isDark ? '#101712' : '#f5f7f2');
  }
}

function setTheme(theme, save = true) {
  document.documentElement.setAttribute('data-theme', theme);
  if (save) {
    try {
      localStorage.setItem(themeStore, theme);
    } catch (_) { }
  }
  updateThemeUI(theme);

  // If a chart is currently shown, re-render it so SVG inline colors or gradients adjust
  if (latestRecords && latestRecords.length && $('crop-search') && $('crop-search').value.trim()) {
    renderChart(latestRecords);
  }
}

function initTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
  setTheme(currentTheme, false);

  const toggleBtn = $('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = active === 'dark' ? 'light' : 'dark';
      setTheme(next, true);
    });
  }

  // Listen for system theme changes if user has not set a manual override
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem(themeStore)) {
        setTheme(e.matches ? 'dark' : 'light', false);
      }
    });
  }
}

// Comprehensive search mapper for common regional names & variants to AGMARKNET English commodities
const CROP_SEARCH_MAP = {
  // English synonyms & variants
  'potato': 'Potato', 'potatoes': 'Potato', 'alu': 'Potato', 'aloo': 'Potato',
  'tomato': 'Tomato', 'tomatoes': 'Tomato', 'tamatar': 'Tomato',
  'onion': 'Onion', 'onions': 'Onion', 'pyaz': 'Onion', 'pyaaz': 'Onion',
  'chilli': 'Green Chilli', 'chili': 'Green Chilli', 'mirchi': 'Green Chilli', 'green chilli': 'Green Chilli', 'green chili': 'Green Chilli', 'red chilli': 'Chili Red', 'red chili': 'Chili Red',
  'brinjal': 'Brinjal', 'eggplant': 'Brinjal', 'baingan': 'Brinjal', 'aubergine': 'Brinjal',
  'garlic': 'Garlic', 'lahsun': 'Garlic', 'lehsun': 'Garlic',
  'ginger': 'Ginger(Green)', 'adrak': 'Ginger(Green)',
  'cabbage': 'Cabbage', 'patta gobhi': 'Cabbage', 'band gobhi': 'Cabbage',
  'cauliflower': 'Cauliflower', 'phool gobhi': 'Cauliflower', 'gobhi': 'Cauliflower',
  'carrot': 'Carrot', 'gajar': 'Carrot',
  'cucumber': 'Cucumbar(Kheera)', 'cucumbar': 'Cucumbar(Kheera)', 'kheera': 'Cucumbar(Kheera)', 'kakdi': 'Cucumbar(Kheera)',
  'capsicum': 'Capsicum', 'bell pepper': 'Capsicum', 'shimla mirch': 'Capsicum',
  'spinach': 'Spinach', 'palak': 'Spinach',
  'peas': 'Green Peas', 'green peas': 'Green Peas', 'matar': 'Green Peas', 'peas wet': 'Peas Wet',
  'bhindi': 'Bhindi(Ladies Finger)', 'okra': 'Bhindi(Ladies Finger)', 'ladies finger': 'Bhindi(Ladies Finger)', 'lady finger': 'Bhindi(Ladies Finger)',
  'bottle gourd': 'Bottle gourd', 'lauki': 'Bottle gourd', 'doodhi': 'Bottle gourd', 'dudhi': 'Bottle gourd',
  'bitter gourd': 'Bitter gourd', 'karela': 'Bitter gourd',
  'pumpkin': 'Pumpkin', 'kaddu': 'Pumpkin',
  'radish': 'Raddish', 'raddish': 'Raddish', 'mooli': 'Raddish', 'moli': 'Raddish',
  'beetroot': 'Beetroot', 'chukandar': 'Beetroot',
  'coriander': 'Coriander(Leaves)', 'dhania': 'Coriander(Leaves)', 'dhaniya': 'Coriander(Leaves)', 'kothmir': 'Coriander(Leaves)',
  'methi': 'Methi(Leaves)', 'fenugreek': 'Methi(Leaves)',
  'mint': 'Mint(Pudina)', 'pudina': 'Mint(Pudina)',
  'drumstick': 'Drumstick', 'sahjan': 'Drumstick', 'moringa': 'Drumstick', 'saragvo': 'Drumstick',
  'sweet potato': 'Sweet Potato', 'shakarkand': 'Sweet Potato',
  'mushroom': 'Mushroom',
  'sweet corn': 'Sweet Corn ', 'corn': 'Sweet Corn ', 'makka': 'Sweet Corn ', 'bhutta': 'Sweet Corn ',
  'lemon': 'Lemon', 'lime': 'Lime', 'nimbu': 'Lemon',
  'ashgourd': 'Ashgourd', 'petha': 'Ashgourd',
  'ridge gourd': 'Ridgeguard(Tori)', 'ridgeguard': 'Ridgeguard(Tori)', 'tori': 'Ridgeguard(Tori)', 'turai': 'Ridgeguard(Tori)',
  'yam': 'Elephant Yam(Suran)/Amorphophallus', 'suran': 'Elephant Yam(Suran)/Amorphophallus', 'jimikand': 'Elephant Yam(Suran)/Amorphophallus',
  'kundru': 'Little gourd(Kundru)', 'tindora': 'Little gourd(Kundru)', 'tindoora': 'Little gourd(Kundru)',
  'cluster beans': 'Cluster beans', 'guar': 'Cluster beans', 'gawar': 'Cluster beans',
  'cowpea': 'Cowpea(Veg)', 'lobia': 'Cowpea(Veg)', 'chawli': 'Cowpea(Veg)',

  // Fruits
  'apple': 'Apple', 'seb': 'Apple',
  'banana': 'Banana', 'kela': 'Banana', 'green banana': 'Banana - Green',
  'mango': 'Mango(Raw-Ripe)', 'aam': 'Mango(Raw-Ripe)',
  'orange': 'Orange', 'santra': 'Orange', 'narangi': 'Orange',
  'mosambi': 'Mousambi(Sweet Lime)', 'sweet lime': 'Mousambi(Sweet Lime)', 'mousambi': 'Mousambi(Sweet Lime)',
  'grapes': 'Grapes', 'angoor': 'Grapes',
  'watermelon': 'Water Melon', 'water melon': 'Water Melon', 'tarbooj': 'Water Melon', 'tarbuj': 'Water Melon',
  'papaya': 'Papaya', 'papita': 'Papaya',
  'pineapple': 'Pineapple', 'ananas': 'Pineapple',
  'coconut': 'Coconut', 'nariyal': 'Coconut', 'tender coconut': 'Tender Coconut',
  'guava': 'Guava', 'amrood': 'Guava', 'amrud': 'Guava', 'peru': 'Guava',
  'pomegranate': 'Pomegranate', 'anar': 'Pomegranate',
  'chikoo': 'Chikoos(Sapota)', 'chiku': 'Chikoos(Sapota)', 'sapota': 'Chikoos(Sapota)',
  'muskmelon': 'Karbuja(Musk Melon)', 'musk melon': 'Karbuja(Musk Melon)', 'kharbuja': 'Karbuja(Musk Melon)',
  'custard apple': 'Custard Apple(Sharifa)', 'sitaphal': 'Custard Apple(Sharifa)', 'sharifa': 'Custard Apple(Sharifa)',
  'amla': 'Amla(Nelli Kai)',
  'kinnow': 'Kinnow',
  'strawberry': 'Strawberry',
  'pear': 'Pear', 'nashpati': 'Pear',
  'jackfruit': 'Jackfruit', 'kathal': 'Jackfruit',

  // Hindi
  'आलू': 'Potato', 'टमाटर': 'Tomato', 'प्याज': 'Onion', 'हरी मिर्च': 'Green Chilli', 'मिर्च': 'Green Chilli', 'बैंगन': 'Brinjal', 'लहसुन': 'Garlic', 'अदरक': 'Ginger(Green)', 'पत्तागोभी': 'Cabbage', 'फूलगोभी': 'Cauliflower', 'गाजर': 'Carrot', 'खीरा': 'Cucumbar(Kheera)', 'शिमला मिर्च': 'Capsicum', 'पालक': 'Spinach', 'मटर': 'Green Peas', 'भिंडी': 'Bhindi(Ladies Finger)', 'लौकी': 'Bottle gourd', 'करेला': 'Bitter gourd', 'कद्दू': 'Pumpkin', 'मूली': 'Raddish', 'चुकंदर': 'Beetroot', 'धनिया': 'Coriander(Leaves)', 'मेथी': 'Methi(Leaves)', 'पुदीना': 'Mint(Pudina)', 'सहजन': 'Drumstick', 'शकरकंद': 'Sweet Potato', 'मशरूम': 'Mushroom', 'नींबू': 'Lemon', 'तोरई': 'Ridgeguard(Tori)', 'सूरन': 'Elephant Yam(Suran)/Amorphophallus', 'कुंदरू': 'Little gourd(Kundru)', 'ग्वार': 'Cluster beans', 'सेब': 'Apple', 'केला': 'Banana', 'आम': 'Mango(Raw-Ripe)', 'संतरा': 'Orange', 'मौसमी': 'Mousambi(Sweet Lime)', 'अंगूर': 'Grapes', 'तरबूज': 'Water Melon', 'पपीता': 'Papaya', 'अनानास': 'Pineapple', 'नारियल': 'Coconut', 'अमरूद': 'Guava', 'अनार': 'Pomegranate', 'चीकू': 'Chikoos(Sapota)', 'खरबूजा': 'Karbuja(Musk Melon)', 'सीताफल': 'Custard Apple(Sharifa)', 'आंवला': 'Amla(Nelli Kai)', 'स्ट्रॉबेरी': 'Strawberry',

  // Gujarati
  'બટાટા': 'Potato', 'ટામેટા': 'Tomato', 'ડુંગળી': 'Onion', 'લીલા મરચા': 'Green Chilli', 'રીંગણ': 'Brinjal', 'લસણ': 'Garlic', 'આદુ': 'Ginger(Green)', 'કોબીજ': 'Cabbage', 'ફૂલકોબી': 'Cauliflower', 'ગાજર': 'Carrot', 'કાકડી': 'Cucumbar(Kheera)', 'સિમલા મરચા': 'Capsicum', 'પાલક': 'Spinach', 'વટાણા': 'Green Peas', 'ભીંડા': 'Bhindi(Ladies Finger)', 'દૂધી': 'Bottle gourd', 'કારેલા': 'Bitter gourd', 'કોળું': 'Pumpkin', 'મૂળા': 'Raddish', 'કોથમીર': 'Coriander(Leaves)', 'મેથી': 'Methi(Leaves)', 'ફુદીનો': 'Mint(Pudina)', 'સરગવો': 'Drumstick', 'શક્કરિયા': 'Sweet Potato', 'લીંબુ': 'Lemon', 'તુરીયા': 'Ridgeguard(Tori)', 'સૂરણ': 'Elephant Yam(Suran)/Amorphophallus', 'ટીંડોરા': 'Little gourd(Kundru)', 'ગુવાર': 'Cluster beans', 'સફરજન': 'Apple', 'કેળા': 'Banana', 'કેરી': 'Mango(Raw-Ripe)', 'નારંગી': 'Orange', 'મોસંબી': 'Mousambi(Sweet Lime)', 'દ્રાક્ષ': 'Grapes', 'તડબૂચ': 'Water Melon', 'પપૈયું': 'Papaya', 'અનાનસ': 'Pineapple', 'નાળિયેર': 'Coconut', 'જામફળ': 'Guava', 'દાડમ': 'Pomegranate', 'ચીકુ': 'Chikoos(Sapota)', 'ટેટી': 'Karbuja(Musk Melon)', 'સીતાફળ': 'Custard Apple(Sharifa)', 'આમળા': 'Amla(Nelli Kai)',

  // Marathi
  'बटाटा': 'Potato', 'टोमॅटो': 'Tomato', 'कांदा': 'Onion', 'हिरवी मिरची': 'Green Chilli', 'वांगी': 'Brinjal', 'लसूण': 'Garlic', 'आले': 'Ginger(Green)', 'कोबी': 'Cabbage', 'फ्लॉवर': 'Cauliflower', 'गाजर': 'Carrot', 'काकडी': 'Cucumbar(Kheera)', 'ढोबळी मिरची': 'Capsicum', 'पालक': 'Spinach', 'मटार': 'Green Peas', 'भेंडी': 'Bhindi(Ladies Finger)', 'दुधी': 'Bottle gourd', 'कारले': 'Bitter gourd', 'भोपळा': 'Pumpkin', 'मुळा': 'Raddish', 'कोथिंबीर': 'Coriander(Leaves)', 'मेथी': 'Methi(Leaves)', 'पुदिना': 'Mint(Pudina)', 'शेवगा': 'Drumstick', 'रताळे': 'Sweet Potato', 'लिंबू': 'Lemon', 'दोडका': 'Ridgeguard(Tori)', 'सफरचंद': 'Apple', 'केळी': 'Banana', 'आंबा': 'Mango(Raw-Ripe)', 'संत्रे': 'Orange', 'मोसंबी': 'Mousambi(Sweet Lime)', 'द्राक्षे': 'Grapes', 'कलिंगड': 'Water Melon', 'पपई': 'Papaya', 'अननस': 'Pineapple', 'नारळ': 'Coconut', 'पेरू': 'Guava', 'डाळिंब': 'Pomegranate', 'चिकू': 'Chikoos(Sapota)', 'सीताफळ': 'Custard Apple(Sharifa)', 'आवळा': 'Amla(Nelli Kai)',

  // Bengali, Punjabi, Tamil, Telugu, Kannada, Malayalam...
  'আলু': 'Potato', 'টমেটো': 'Tomato', 'পেঁয়াজ': 'Onion', 'কাঁচা মরিচ': 'Green Chilli', 'বেগুন': 'Brinjal', 'রসুন': 'Garlic', 'আদা': 'Ginger(Green)', 'বাঁধাকপি': 'Cabbage', 'ফুলকপি': 'Cauliflower', 'কলা': 'Banana', 'আম': 'Mango(Raw-Ripe)', 'আপেল': 'Apple', 'কমলা': 'Orange', 'আঙুর': 'Grapes', 'তরমুজ': 'Water Melon',
  'ਆਲੂ': 'Potato', 'ਟਮਾਟਰ': 'Tomato', 'ਪਿਆਜ਼': 'Onion', 'ਬੈਂਗਣ': 'Brinjal', 'ਲਸਣ': 'Garlic', 'ਅਦਰਕ': 'Ginger(Green)', 'ਬੰਦਗੋਭੀ': 'Cabbage', 'ਕੌਲੀਫਲਾਵਰ': 'Cauliflower', 'ਕੇਲਾ': 'Banana', 'ਅੰਬ': 'Mango(Raw-Ripe)', 'ਸੇਬ': 'Apple', 'ਸੰਤਰਾ': 'Orange', 'ਅੰਗੂਰ': 'Grapes', 'ਤਰਬੂਜ਼': 'Water Melon',
  'உருளைக்கிழங்கு': 'Potato', 'தக்காளி': 'Tomato', 'வெங்காயம்': 'Onion', 'பச்சை மிளகாய்': 'Green Chilli', 'கத்தரிக்காய்': 'Brinjal', 'பூண்டு': 'Garlic', 'இஞ்சி': 'Ginger(Green)', 'முட்டைக்கோஸ்': 'Cabbage', 'வாழைப்பழம்': 'Banana', 'மாம்பழம்': 'Mango(Raw-Ripe)', 'ஆப்பிள்': 'Apple', 'ஆரஞ்சு': 'Orange', 'திராட்சை': 'Grapes', 'தர்பூசணி': 'Water Melon',
  'బంగాళాదుంప': 'Potato', 'టమోటా': 'Tomato', 'ఉల్లిపాయ': 'Onion', 'పచ్చిమిర్చి': 'Green Chilli', 'వంకాయ': 'Brinjal', 'వెల్లుల్లి': 'Garlic', 'అల్లం': 'Ginger(Green)', 'క్యాబేజీ': 'Cabbage', 'అరటి': 'Banana', 'మామిడి': 'Mango(Raw-Ripe)', 'ఆపిల్': 'Apple', 'నారింజ': 'Orange', 'ద్రాక్ష': 'Grapes', 'పుచ్చకాయ': 'Water Melon',
  'ಆಲೂಗಡ್ಡೆ': 'Potato', 'ಟೊಮೆಟೊ': 'Tomato', 'ಈರುಳ್ಳಿ': 'Onion', 'ಬದನೆಕಾಯಿ': 'Brinjal', 'ಬೆಳ್ಳುಳ್ಳಿ': 'Garlic', 'ಶುಂಠಿ': 'Ginger(Green)', 'ಬಾಳೆಹಣ್ಣು': 'Banana', 'ಮಾವು': 'Mango(Raw-Ripe)', 'ಸೇಬು': 'Apple', 'ಕಿತ್ತಳೆ': 'Orange', 'ದ್ರಾಕ್ಷಿ': 'Grapes', 'ಕಲ್ಲಂಗಡಿ': 'Water Melon',
  'തക്കാളി': 'Tomato', 'സവാള': 'Onion', 'വാഴപ്പഴം': 'Banana', 'മാങ്ങ': 'Mango(Raw-Ripe)', 'ആപ്പിൾ': 'Apple', 'ഓറഞ്ച്': 'Orange', 'മുന്തിരി': 'Grapes', 'തണ്ണിമത്തൻ': 'Water Melon'
};

const COMMON_CROPS = [
  // Vegetables
  'Amaranthus', 'Ashgourd', 'Baby Corn', 'Beans', 'Beetroot',
  'Bhindi(Ladies Finger)', 'Bitter gourd', 'Bottle gourd', 'Brinjal',
  'Cabbage', 'Capsicum', 'Carrot', 'Cauliflower', 'Chili Red',
  'Chow Chow', 'Cluster beans', 'Colacasia', 'Coriander(Leaves)',
  'Cowpea(Veg)', 'Cucumbar(Kheera)', 'Drumstick',
  'Elephant Yam(Suran)/Amorphophallus', 'Garlic', 'Ginger(Green)',
  'Green Chilli', 'Green Peas', 'Indian Beans(Seam)', 'Knool Khol',
  'Lemon', 'Lime', 'Little gourd(Kundru)', 'Methi(Leaves)', 'Mint(Pudina)',
  'Mushroom', 'Onion', 'Onion Green', 'Peas Wet', 'Pointed Gourd(Parval)',
  'Potato', 'Pumpkin', 'Raddish', 'Ridgeguard(Tori)', 'Round gourd',
  'Snakeguard', 'Spinach', 'Sponge gourd', 'Sweet Corn', 'Sweet Potato',
  'Tapioca', 'Tinda', 'Tomato', 'Turnip', 'Yam(Ratalu)',

  // Fruits
  'Amla(Nelli Kai)', 'Apple', 'Banana', 'Banana - Green',
  'Chikoos(Sapota)', 'Coconut', 'Custard Apple(Sharifa)',
  'Dragon Fruit', 'Fig(Anjeer)', 'Grapes', 'Guava', 'Jackfruit',
  'Karbuja(Musk Melon)', 'Kinnow', 'Kiwi Fruit', 'Litchi',
  'Mango(Raw-Ripe)', 'Mousambi(Sweet Lime)', 'Orange', 'Papaya',
  'Papaya(Raw)', 'Passion Fruit', 'Peach', 'Pear', 'Pineapple',
  'Plum', 'Pomegranate', 'Sapota', 'Strawberry', 'Sweet Lime',
  'Tamarind Fruit', 'Tender Coconut', 'Water Melon'
];

let allRecords = [];
let latestRecords = [];

const $ = (id) => document.getElementById(id);
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

async function resolveCommoditySearch(raw) {
  if (!raw) return '';
  const trimmed = raw.trim();
  const lower = trimmed.toLowerCase();
  if (CROP_SEARCH_MAP[lower] || CROP_SEARCH_MAP[trimmed]) {
    return CROP_SEARCH_MAP[lower] || CROP_SEARCH_MAP[trimmed];
  }
  if (/^[a-zA-Z\s\-()]+$/.test(trimmed)) return trimmed;

  // Google Translate fallback for any unmapped regional language term
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(trimmed)}`);
    const data = await res.json();
    const trans = data?.[0]?.[0]?.[0];
    if (trans && typeof trans === 'string') return trans.trim();
  } catch (_) { }

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

function updateLanguageLabel() {
  const sel = $('language');
  const label = $('lang-current');
  if (sel && label && sel.selectedIndex >= 0) {
    label.textContent = sel.options[sel.selectedIndex].text;
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

const GOV_RESOURCE_ID = '9ef84268-d588-465a-a308-a864a43d0070';
const DEFAULT_API_KEY = '579b464db66ec23bdd00000153a305cfec644f46529532df2fa82913';

async function getRecords(filters = {}) {
  const tryFetch = async (targetUrl) => {
    const res = await fetch(targetUrl, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(15000)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json().catch(() => ({}));
    if (data.status === 'error' || !Array.isArray(data.records)) {
      throw new Error(data.message || 'No records returned from data.gov.in');
    }
    return data.records.map(normalise);
  };

  const getDirectGovUrl = () => {
    const u = new URL(`https://api.data.gov.in/resource/${GOV_RESOURCE_ID}`);
    u.searchParams.set('api-key', DEFAULT_API_KEY);
    u.searchParams.set('format', 'json');
    u.searchParams.set('limit', '1000');
    for (const [field, value] of Object.entries(filters)) {
      if (value) {
        let v = value.trim();
        if (v.toLowerCase() === v) {
          v = v.replace(/\b[a-z]/g, c => c.toUpperCase());
        }
        u.searchParams.set(`filters[${field}]`, v);
      }
    }
    return u;
  };

  const getLocalProxyUrl = () => {
    const u = new URL('/api/prices', location.origin);
    for (const [field, value] of Object.entries(filters)) {
      if (value) u.searchParams.set(field.toLowerCase(), value);
    }
    return u;
  };

  // When deployed on Netlify, connect directly to official AGMARKNET data.gov.in (has CORS Access-Control-Allow-Origin: *).
  // This completely avoids the foreign cloud server block (NIC firewall returns ECONNREFUSED to AWS/Netlify IPs).
  const isLocalDev = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

  if (isLocalDev) {
    try {
      return await tryFetch(getLocalProxyUrl());
    } catch (_) {
      return await tryFetch(getDirectGovUrl());
    }
  } else {
    try {
      return await tryFetch(getDirectGovUrl());
    } catch (errDirect) {
      console.warn('[Ann Setu] Direct government API failed, trying proxy:', errDirect.message);
      return await tryFetch(getLocalProxyUrl());
    }
  }
}

function selectedRecords() {
  const rawCrop = $('crop-search').value.trim();
  const crop = rawCrop.toLowerCase();
  const state = $('state-filter').value.toLowerCase();
  const district = $('district-filter').value.toLowerCase();
  const mappedCrop = (CROP_SEARCH_MAP[crop] || CROP_SEARCH_MAP[rawCrop] || '').toLowerCase();

  return allRecords.filter(r => {
    const rCrop = r.commodity.toLowerCase();
    const matchCrop = !crop ||
      rCrop.includes(crop) ||
      (rawCrop && crop.includes(rCrop)) ||
      (mappedCrop && (rCrop.includes(mappedCrop) || mappedCrop.includes(rCrop))) ||
      rCrop.replace(/[^a-z0-9]/g, '').includes(crop.replace(/[^a-z0-9]/g, ''));
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

  const hasSpecificCrop = Boolean(rawSearch);

  $('empty-state').classList.toggle('hidden', records.length > 0);
  $('results').classList.toggle('hidden', records.length === 0);

  // Only show the Price Range card when a specific vegetable is selected/searched
  const histEl = $('history');
  if (histEl) {
    histEl.classList.toggle('hidden', !hasSpecificCrop || records.length === 0);
  }

  if (records.length) {
    const d = records.map(r => dateValue(r.date)).filter(Boolean).sort((a, b) => b - a)[0];
    $('data-freshness').textContent = d ? `Latest report: ${formatDate(d)}` : '';
    $('last-updated').textContent = `Data checked ${new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit' }).format(new Date())}`;
  }

  if (hasSpecificCrop) {
    renderChart(records);
  }
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

  const cropKey = (selectedCrop || 'all_commodities').toLowerCase().trim();
  const storageKey = 'annsetu_real_log_v1';
  let historyStore = {};
  try {
    historyStore = JSON.parse(localStorage.getItem(storageKey) || localStorage.getItem('vejbhav_real_log_v1') || '{}');
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
  if (!selectedCrop) return;

  const activeCropName = selectedCrop;
  const kickerLabel = `${activeCropName} · MODAL PRICE · ₹ / QUINTAL`;

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

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#849987' : '#8a9387';
  const strokeColor = isDark ? '#4ade80' : '#3d7549';
  const circleFill = isDark ? '#162018' : '#fff';
  const gradStopColor = isDark ? '#4ade80' : '#79a375';

  const tickIndices = points.length <= 4
    ? points.map((_, i) => i)
    : [0, Math.floor(points.length * 0.33), Math.floor(points.length * 0.66), points.length - 1];

  const tickLabels = tickIndices.map((idx, i) => {
    const p = xy[idx];
    const align = i === 0 ? 'start' : i === tickIndices.length - 1 ? 'end' : 'middle';
    return `<text x="${p.x.toFixed(1)}" y="${height - 2}" text-anchor="${align}" fill="${textColor}" font-size="11">${esc(formatDate(p.day))}</text>`;
  }).join('');

  $('chart-area').innerHTML = `
    <svg viewBox="0 0 ${width} ${height + 8}" preserveAspectRatio="none" role="img" aria-label="Daily median across matching markets">
      <defs>
        <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${gradStopColor}" stop-opacity="${isDark ? '.35' : '.25'}"/>
          <stop offset="1" stop-color="${gradStopColor}" stop-opacity="0.01"/>
        </linearGradient>
      </defs>
      <path d="${area}" fill="url(#priceFill)"/>
      <path d="${line}" fill="none" stroke="${strokeColor}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
      ${xy.map(p => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.5" fill="${circleFill}" stroke="${strokeColor}" stroke-width="2" vector-effect="non-scaling-stroke"><title>${esc(formatDate(p.day))}: ₹${formatPrice(p.val)}</title></circle>`).join('')}
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
  // Initialize Dark / Light Theme
  initTheme();

  // Setup Google Translate Language Selection
  const initialLang = localStorage.getItem(langStore) || localStorage.getItem('vejbhaav.language') || getGoogleCookieLang() || 'en';
  $('language').value = initialLang;
  updateLanguageLabel();

  $('language').addEventListener('change', e => {
    updateLanguageLabel();
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

  // Category tabs (All Produce / Vegetables / Fruits)
  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.category || 'all';

      document.querySelectorAll('.chip').forEach(chip => {
        const chipCat = chip.dataset.category || 'all';
        if (cat === 'all' || chipCat === 'all' || chipCat === cat) {
          chip.style.display = '';
        } else {
          chip.style.display = 'none';
        }
      });
    });
  });

  // Quick commodity chips
  document.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const cropVal = btn.dataset.crop || '';
      $('crop-search').value = cropVal;
      loadPrices();

      const hist = $('history');
      if (cropVal && hist) {
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
