const langStore = 'vejbhaav.language';

const copy = {
  en: {
    navPrices: 'Market prices',
    navHistory: 'Price history',
    navAbout: 'About the data',
    language: 'Language',
    heroEyebrow: "INDIA'S MANDI PRICES · STRAIGHT FROM THE SOURCE",
    heroTitle: 'Know your market.<br /><em>Choose your moment.</em>',
    heroText: 'Compare today’s reported prices and see how they have moved. Clear information for better selling and fairer buying.',
    heroNote: 'Official market reports, with the date and source always in view.',
    sectionEyebrow: 'YOUR LOCAL MARKET, AT A GLANCE',
    sectionTitle: 'Today’s mandi prices',
    refresh: 'Refresh data',
    cropLabel: 'WHAT ARE YOU SELLING?',
    cropPlaceholder: 'Search a fruit or vegetable (e.g. Potato, Banana)',
    stateLabel: 'STATE',
    allStates: 'All states',
    districtLabel: 'DISTRICT',
    anyDistrict: 'Any district',
    searchButton: 'See prices',
    statusLoading: 'Loading official AGMARKNET prices…',
    statusConnected: 'Connected to official AGMARKNET reports',
    statusError: 'Could not load official data. Please refresh or try again later.',
    statusNoResults: 'No matching reports found in the available data.',
    emptyTitle: 'No market reports found',
    emptyText: 'No price reports found for this selection today. Try selecting another crop or choosing "All states".',
    resultsTitle: 'Market reports',
    unitNote: 'Prices shown per quintal (100 kg)',
    thMarket: 'MARKET',
    thDistrict: 'DISTRICT · STATE',
    thDate: 'ARRIVAL DATE',
    thMin: 'MIN',
    thModal: 'MODAL PRICE',
    thMax: 'MAX',
    sourceLabel: 'Source: AGMARKNET · Government of India',
    historyEyebrow: "PRICE RANGE & MARKET TREND",
    historyTitle: "Today's price range & trends",
    historyText: 'Official modal, minimum, and maximum prices for your selected crop.',
    range30: 'Official reports',
    chartLabel: 'MODAL PRICE · ₹ / QUINTAL',
    chartAwait: 'Waiting for market data',
    chartEmpty: 'Price history will appear here when real reports are available.',
    chartLegend: 'Daily median across matching markets',
    chartSource: 'Official AGMARKNET daily reports',
    trustTitle: 'Real reports. Clear source. Your call.',
    trustText: 'Prices come from AGMARKNET, published by India’s Ministry of Agriculture through the open data portal. Reports are daily, and may arrive with a delay.',
    sourceLink: 'View official source ↗',
    footerText: 'Made for clearer market decisions · Prices are indicative reports, not a guaranteed offer.',
    resultSingular: 'market report',
    resultPlural: 'market reports',
    dateUnknown: 'Date not reported',
    dateUpdated: 'Data checked',
    latest: 'Latest reported modal price',
    chartDays: 'report days shown',
    chartOneDay: 'report day shown',
    noCrop: 'All available crops',
    fresh: 'Most recent report',
    stale: 'Latest available report',
    noPrices: 'No price history in the available reports.',
    chartFilter: 'Showing matching reports in the available dataset.',
    loading: 'Loading…',
    errorNetwork: 'The official data service could not be reached. Please try again later.',
    districtAny: 'Any district',
    allVeg: 'All Vegetables'
  },
  hi: {
    navPrices: 'मंडी भाव',
    navHistory: 'भाव का इतिहास',
    navAbout: 'डेटा के बारे में',
    language: 'भाषा',
    heroEyebrow: 'भारत के मंडी भाव · सीधे आधिकारिक स्रोत से',
    heroTitle: 'बाज़ार को समझें।<br /><em>सही समय चुनें।</em>',
    heroText: 'आज के दर्ज भावों की तुलना करें और उनका उतार-चढ़ाव देखें। बेहतर बिक्री और उचित खरीद के लिए साफ़ जानकारी।',
    heroNote: 'आधिकारिक मंडी रिपोर्ट, तारीख़ और स्रोत के साथ।',
    sectionEyebrow: 'आपकी मंडी, एक नज़र में',
    sectionTitle: 'आज के मंडी भाव',
    refresh: 'भाव अपडेट करें',
    cropLabel: 'आप क्या बेच रहे हैं?',
    cropPlaceholder: 'फल या सब्ज़ी खोजें (जैसे आलू, केला, टमाटर)',
    stateLabel: 'राज्य',
    allStates: 'सभी राज्य',
    districtLabel: 'ज़िला',
    anyDistrict: 'कोई भी ज़िला',
    searchButton: 'भाव देखें',
    statusLoading: 'सरकारी मंडी रिपोर्ट लोड हो रही हैं…',
    statusConnected: 'AGMARKNET की आधिकारिक रिपोर्ट से जुड़ा',
    statusError: 'आधिकारिक डेटा लोड नहीं हो सका। कृपया बाद में प्रयास करें।',
    statusNoResults: 'उपलब्ध रिपोर्ट में इस खोज का भाव नहीं मिला।',
    emptyTitle: 'कोई मंडी रिपोर्ट नहीं मिली',
    emptyText: 'आज के लिए इस फ़सल या राज्य की कोई रिपोर्ट दर्ज नहीं है। कृपया कोई अन्य फ़सल या "सभी राज्य" चुनकर देखें।',
    resultsTitle: 'मंडी रिपोर्ट',
    unitNote: 'भाव प्रति क्विंटल (100 किलो)',
    thMarket: 'मंडी',
    thDistrict: 'ज़िला · राज्य',
    thDate: 'आवक की तारीख़',
    thMin: 'कम',
    thModal: 'औसत भाव',
    thMax: 'ज़्यादा',
    sourceLabel: 'स्रोत: AGMARKNET · भारत सरकार',
    historyEyebrow: 'आज का भाव दायरा और रुझान',
    historyTitle: 'आज का मंडी भाव दायरा',
    historyText: 'चुनी हुई फ़सल के लिए न्यूनतम, औसत और अधिकतम दर्ज सरकारी भाव देखें।',
    range30: 'आधिकारिक रिपोर्ट',
    chartLabel: 'औसत भाव · ₹ / क्विंटल',
    chartAwait: 'मंडी डेटा की प्रतीक्षा में',
    chartEmpty: 'असली रिपोर्ट उपलब्ध होने पर भाव का इतिहास यहाँ दिखेगा।',
    chartLegend: 'चुनी मंडियों का रोज़ का औसत भाव',
    chartSource: 'रोज़ की आधिकारिक AGMARKNET रिपोर्ट',
    trustTitle: 'असली रिपोर्ट। साफ़ स्रोत। फ़ैसला आपका।',
    trustText: 'भाव भारत सरकार के कृषि मंत्रालय द्वारा AGMARKNET से प्रकाशित किए जाते हैं। रिपोर्ट रोज़ आती हैं और उनमें देरी हो सकती है।',
    sourceLink: 'आधिकारिक स्रोत देखें ↗',
    footerText: 'बेहतर मंडी फ़ैसलों के लिए · ये दर्ज भाव हैं, बिक्री की गारंटी नहीं।',
    resultSingular: 'मंडी रिपोर्ट',
    resultPlural: 'मंडी रिपोर्ट',
    dateUnknown: 'तारीख़ उपलब्ध नहीं',
    dateUpdated: 'डेटा जाँचा',
    latest: 'सबसे नया दर्ज औसत भाव',
    chartDays: 'रिपोर्ट के दिन',
    chartOneDay: 'रिपोर्ट का दिन',
    noCrop: 'सभी उपलब्ध फ़सलें',
    fresh: 'सबसे नई रिपोर्ट',
    stale: 'नवीनतम उपलब्ध रिपोर्ट',
    noPrices: 'उपलब्ध रिपोर्ट में भाव का इतिहास नहीं है।',
    chartFilter: 'उपलब्ध रिपोर्ट में मिलते भाव दिख रहे हैं।',
    loading: 'लोड हो रहा है…',
    errorNetwork: 'सरकारी डेटा सेवा से संपर्क नहीं हो पाया। बाद में फिर प्रयास करें।',
    districtAny: 'कोई भी ज़िला',
    allVeg: 'सभी सब्जियां'
  },
  mr: {
    navPrices: 'बाजारभाव',
    navHistory: 'भावाचा इतिहास',
    navAbout: 'डेटाविषयी',
    language: 'भाषा',
    heroEyebrow: 'भारताचे बाजारभाव · थेट अधिकृत स्रोताकडून',
    heroTitle: 'बाजार समजून घ्या.<br /><em>योग्य वेळ निवडा.</em>',
    heroText: 'आजच्या नोंदवलेल्या भावांची तुलना करा आणि त्यातील बदल पाहा. योग्य विक्री आणि न्याय्य खरेदीसाठी स्पष्ट माहिती.',
    heroNote: 'तारीख आणि स्रोतासह अधिकृत बाजार अहवाल.',
    sectionEyebrow: 'तुमची बाजारपेठ, एका नजरेत',
    sectionTitle: 'आजचे बाजारभाव',
    refresh: 'भाव ताजे करा',
    cropLabel: 'तुम्ही काय विकत आहात?',
    cropPlaceholder: 'फळ किंवा भाजी शोधा (उदा. बटाटा, केळी, टोमॅटो)',
    stateLabel: 'राज्य',
    allStates: 'सर्व राज्ये',
    districtLabel: 'जिल्हा',
    anyDistrict: 'कोणताही जिल्हा',
    searchButton: 'भाव पहा',
    statusLoading: 'सरकारी बाजार अहवाल लोड होत आहेत…',
    statusConnected: 'AGMARKNET च्या अधिकृत अहवालाशी जोडले',
    statusError: 'अधिकृत डेटा लोड होऊ शकला नाही. कृपया नंतर पुन्हा प्रयत्न करा.',
    statusNoResults: 'उपलब्ध अहवालांत जुळणारे भाव सापडले नाहीत.',
    emptyTitle: 'कोणतेही बाजार अहवाल सापडले नाहीत',
    emptyText: 'आज या पिकासाठी किंवा राज्यासाठी कोणतेही अहवाल उपलब्ध नाहीत. कृपया दुसरे पीक किंवा "सर्व राज्ये" निवडून पहा.',
    resultsTitle: 'बाजार अहवाल',
    unitNote: 'भाव प्रति क्विंटल (१०० किलो)',
    thMarket: 'बाजार',
    thDistrict: 'जिल्हा · राज्य',
    thDate: 'आवक तारीख',
    thMin: 'किमान',
    thModal: 'मध्यम भाव',
    thMax: 'कमाल',
    sourceLabel: 'स्रोत: AGMARKNET · भारत सरकार',
    historyEyebrow: 'आजची भाव कक्षा आणि कल',
    historyTitle: 'आजची बाजारभाव कक्षा',
    historyText: 'निवडलेल्या पिकासाठी किमान, मध्यम आणि कमाल नोंदवलेले सरकारी भाव पहा.',
    range30: 'अधिकृत अहवाल',
    chartLabel: 'मध्यम भाव · ₹ / क्विंटल',
    chartAwait: 'बाजार डेटाची प्रतीक्षा',
    chartEmpty: 'खरे अहवाल उपलब्ध झाल्यावर भावांचा इतिहास येथे दिसेल.',
    chartLegend: 'निवडलेल्या बाजारांचा रोजचा मध्यम भाव',
    chartSource: 'अधिकृत रोजचे AGMARKNET अहवाल',
    trustTitle: 'खरे अहवाल. स्पष्ट स्रोत. निर्णय तुमचा.',
    trustText: 'भाव भारताच्या कृषी मंत्रालयाकडून AGMARKNET द्वारे खुले डेटा पोर्टलवर प्रकाशित होतात. अहवाल रोज येतात; विलंब होऊ शकतो.',
    sourceLink: 'अधिकृत स्रोत पहा ↗',
    footerText: 'चांगल्या बाजार निर्णयांसाठी · हे सूचक अहवाल आहेत, विक्रीची हमी नाही.',
    resultSingular: 'बाजार अहवाल',
    resultPlural: 'बाजार अहवाल',
    dateUnknown: 'तारीख नोंदलेली नाही',
    dateUpdated: 'डेटा तपासला',
    latest: 'नवीनतम नोंदवलेला मध्यम भाव',
    chartDays: 'अहवालांचे दिवस',
    chartOneDay: 'अहवालाचा दिवस',
    noCrop: 'सर्व उपलब्ध पिके',
    fresh: 'सर्वात नवीन अहवाल',
    stale: 'नवीनतम उपलब्ध अहवाल',
    noPrices: 'उपलब्ध अहवालांत भावांचा इतिहास नाही.',
    chartFilter: 'उपलब्ध अहवालांतील जुळणारे भाव दाखवत आहोत.',
    loading: 'लोड होत आहे…',
    errorNetwork: 'सरकारी डेटा सेवेशी संपर्क झाला नाही. कृपया नंतर पुन्हा प्रयत्न करा.',
    districtAny: 'कोणताही जिल्हा',
    allVeg: 'सर्व भाज्या'
  }
};

const CROP_TRANSLATIONS = {
  // Vegetables
  'Banana - Green': { hi: 'हरा केला (कच्चा केला)', mr: 'हिरवी केळी (कच्ची केळी)' },
  'Banana': { hi: 'केला', mr: 'केळी' },
  'Ashgourd': { hi: 'पेठा (सफेद कुम्हड़ा)', mr: 'कोहळा' },
  'Cowpea(Veg)': { hi: 'लोबिया (सब्जी)', mr: 'चवळी (भाजी)' },
  'Cowpea (Veg)': { hi: 'लोबिया (सब्जी)', mr: 'चवळी (भाजी)' },
  'Cowpea': { hi: 'लोबिया', mr: 'चवळी' },
  'Green Chilli': { hi: 'हरी मिर्च', mr: 'हिरवी मिरची' },
  'Green Chilly': { hi: 'हरी मिर्च', mr: 'हिरवी मिरची' },
  'Chilli': { hi: 'मिर्च', mr: 'मिरची' },
  'Chilli Red': { hi: 'लाल मिर्च', mr: 'लाल मिरची' },
  'Snakeguard': { hi: 'चिचिंडा (पड़वल)', mr: 'पडवळ' },
  'Snake Gourd': { hi: 'चिचिंडा (पड़वल)', mr: 'पडवळ' },
  'Potato': { hi: 'आलू', mr: 'बटाटा' },
  'Tomato': { hi: 'टमाटर', mr: 'टोमॅटो' },
  'Onion': { hi: 'प्याज', mr: 'कांदा' },
  'Brinjal': { hi: 'बैंगन', mr: 'वांगी' },
  'Garlic': { hi: 'लहसुन', mr: 'लसूण' },
  'Cabbage': { hi: 'पत्तागोभी', mr: 'कोबी' },
  'Cauliflower': { hi: 'फूलगोभी', mr: 'फ्लॉवर' },
  'Bottle gourd': { hi: 'लौकी', mr: 'दुधी भोपळा' },
  'Bitter gourd': { hi: 'करेला', mr: 'कारले' },
  'Ridgeguard(Tori)': { hi: 'तोरई', mr: 'दोडका' },
  'Ridge Gourd': { hi: 'तोरई', mr: 'दोडका' },
  'Sponge Gourd': { hi: 'घिया तोरी', mr: 'घोसवळे' },
  'Pointed gourd (Parval)': { hi: 'परवल', mr: 'परवळ' },
  'Cucumber(Kheera)': { hi: 'खीरा', mr: 'काकडी' },
  'Cucumber': { hi: 'खीरा', mr: 'काकडी' },
  'Bhindi(Ladies Finger)': { hi: 'भिंडी', mr: 'भेंडी' },
  'Ladies Finger': { hi: 'भिंडी', mr: 'भेंडी' },
  'Capsicum': { hi: 'शिमला मिर्च', mr: 'ढोबळी मिरची' },
  'Carrot': { hi: 'गाजर', mr: 'गाजर' },
  'Radish': { hi: 'मूली', mr: 'मुळा' },
  'Spinach': { hi: 'पालक', mr: 'पालक' },
  'Beetroot': { hi: 'चुकंदर', mr: 'बीट' },
  'Sweet Potato': { hi: 'शकरकंद', mr: 'रताळे' },
  'Pumpkin': { hi: 'कद्दू', mr: 'लाल भोपळा' },
  'Peas Wet': { hi: 'हरी मटर', mr: 'ओला मटार' },
  'Green Peas': { hi: 'हरी मटर', mr: 'हिरवे मटार' },
  'Peas(Dry)': { hi: 'सूखी मटर', mr: 'सुक्या मटार' },
  'Ginger(Green)': { hi: 'अदरक', mr: 'आले' },
  'Ginger': { hi: 'अदरक', mr: 'आले' },
  'Ginger(Dry)': { hi: 'सोंठ', mr: 'सुंठ' },
  'Coriander(Leaves)': { hi: 'धनिया पत्ता', mr: 'कोथिंबीर' },
  'Coriander': { hi: 'धनिया', mr: 'कोथिंबीर' },
  'Fenugreek(Leaves)': { hi: 'मेथी', mr: 'मेथी' },
  'Fenugreek': { hi: 'मेथी दाना', mr: 'मेथी' },
  'Mint(Pudina)': { hi: 'पुदीना', mr: 'पुदिना' },
  'Curry leaves': { hi: 'कढ़ी पत्ता', mr: 'कढीपत्ता' },
  'Drumstick': { hi: 'सहजन (मुनगा)', mr: 'शेवगा' },
  'Colocasia': { hi: 'अरबी', mr: 'अळू' },
  'Elephant Yam (Suran)': { hi: 'सूरन (जिमीकंद)', mr: 'सुरण' },
  'Mushroom': { hi: 'मशरूम', mr: 'मशरूम' },
  // Fruits
  'Apple': { hi: 'सेब', mr: 'सफरचंद' },
  'Mango': { hi: 'आम', mr: 'आंबा' },
  'Orange': { hi: 'संतरा', mr: 'संत्री' },
  'Papaya': { hi: 'पपीता', mr: 'पपई' },
  'Pomegranate': { hi: 'अनार', mr: 'डाळिंब' },
  'Water Melon': { hi: 'तरबूज', mr: 'कलिंगड' },
  'Lemon': { hi: 'नींबू', mr: 'लिंबू' },
  'Lime': { hi: 'नींबू', mr: 'लिंबू' },
  'Guava': { hi: 'अमरूद', mr: 'पेरू' },
  'Grapes': { hi: 'अंगूर', mr: 'द्राक्षे' },
  'Pineapple': { hi: 'अनानास', mr: 'अननस' },
  'Sapota': { hi: 'चीकू', mr: 'चिकू' },
  'Custard Apple': { hi: 'सीताफल (शरीफा)', mr: 'सीताफळ' },
  'Coconut': { hi: 'नारियल', mr: 'नारळ' },
  'Tender Coconut': { hi: 'डाभ (कच्चा नारियल)', mr: 'शहाळे' },
  // Crops & Grains
  'Wheat': { hi: 'गेहूं', mr: 'गहू' },
  'Rice': { hi: 'चावल', mr: 'तांदूळ' },
  'Paddy(Dhan)': { hi: 'धान', mr: 'भात (धान)' },
  'Maize': { hi: 'मक्का', mr: 'मका' },
  'Mustard': { hi: 'सरसों', mr: 'मोहरी' },
  'Soybean': { hi: 'सोयाबीन', mr: 'सोयाबीन' },
  'Cotton': { hi: 'कपास', mr: 'कापूस' },
  'Gram Raw(Chhana)': { hi: 'चना', mr: 'हरभरा' },
  'Bengal Gram(Gram)': { hi: 'चना', mr: 'हरभरा' },
  'Green Gram (Moong)': { hi: 'मूंग', mr: 'मूग' },
  'Black Gram (Urd Crop)': { hi: 'उड़द', mr: 'उडीद' },
  'Arhar (Tur/Red Gram)': { hi: 'अरहर (तुअर)', mr: 'तूर' },
  'Groundnut': { hi: 'मूंगफली', mr: 'भुईमूग / शेंगदाणा' },
  'Jowar(Sorghum)': { hi: 'ज्वार', mr: 'ज्वारी' },
  'Bajra(Pearl Millet)': { hi: 'बाजरा', mr: 'बाजरी' },
  'Ragi (Finger Millet)': { hi: 'रागी', mr: 'नाचणी' },
  'Turmeric': { hi: 'हल्दी', mr: 'हळद' },
  'Jaggery': { hi: 'गुड़', mr: 'गूळ' },
  'Sugar': { hi: 'चीनी', mr: 'साखर' }
};

const VARIETY_TRANSLATIONS = {
  'Other': { hi: 'अन्य', mr: 'इतर' },
  'Ashgourd': { hi: 'पेठा', mr: 'कोहळा' },
  'Green Chilly': { hi: 'हरी मिर्च', mr: 'हिरवी मिरची' },
  'Cowpea (Veg)': { hi: 'लोबिया (सब्जी)', mr: 'चवळी (भाजी)' },
  'Snakeguard': { hi: 'चिचिंडा', mr: 'पडवळ' },
  'Local': { hi: 'स्थानीय', mr: 'स्थानिक' },
  'Deshi': { hi: 'देसी', mr: 'देशी' },
  'Desi': { hi: 'देसी', mr: 'देशी' },
  'Hybrid': { hi: 'हाइब्रिड', mr: 'संकरित' },
  'Medium': { hi: 'मध्यम', mr: 'मध्यम' },
  'Small': { hi: 'छोटा', mr: 'लहान' },
  'Big': { hi: 'बड़ा', mr: 'मोठा' },
  'Green': { hi: 'हरा', mr: 'हिरवा' },
  'Red': { hi: 'लाल', mr: 'लाल' },
  'White': { hi: 'सफेद', mr: 'पांढरा' },
  'Yellow': { hi: 'पीला', mr: 'पिवळा' },
  'Common': { hi: 'सामान्य', mr: 'सामान्य' }
};

const STATE_TRANSLATIONS = {
  'Maharashtra': { hi: 'महाराष्ट्र', mr: 'महाराष्ट्र' },
  'Uttar Pradesh': { hi: 'उत्तर प्रदेश', mr: 'उत्तर प्रदेश' },
  'Madhya Pradesh': { hi: 'मध्य प्रदेश', mr: 'मध्य प्रदेश' },
  'Gujarat': { hi: 'गुजरात', mr: 'गुजरात' },
  'Rajasthan': { hi: 'राजस्थान', mr: 'राजस्थान' },
  'Punjab': { hi: 'पंजाब', mr: 'पंजाब' },
  'Haryana': { hi: 'हरियाणा', mr: 'हरियाणा' },
  'Karnataka': { hi: 'कर्नाटक', mr: 'कर्नाटक' },
  'Kerala': { hi: 'केरल', mr: 'केरळ' },
  'Keralam': { hi: 'केरल', mr: 'केरळ' },
  'Tamil Nadu': { hi: 'तमिलनाडु', mr: 'तामिळनाडू' },
  'Andhra Pradesh': { hi: 'आंध्र प्रदेश', mr: 'आंध्र प्रदेश' },
  'Telangana': { hi: 'तेलंगाना', mr: 'तेलंगणा' },
  'West Bengal': { hi: 'पश्चिम बंगाल', mr: 'पश्चिम बंगाल' },
  'Bihar': { hi: 'बिहार', mr: 'बिहार' },
  'Odisha': { hi: 'ओडिशा', mr: 'ओडिशा' },
  'Himachal Pradesh': { hi: 'हिमाचल प्रदेश', mr: 'हिमाचल प्रदेश' },
  'Uttarakhand': { hi: 'उत्तराखंड', mr: 'उत्तराखंड' },
  'Assam': { hi: 'असम', mr: 'आसाम' },
  'Chhattisgarh': { hi: 'छत्तीसगढ़', mr: 'छत्तीसगड' },
  'Jharkhand': { hi: 'झारखंड', mr: 'झारखंड' },
  'Goa': { hi: 'गोवा', mr: 'गोवा' },
  'Delhi': { hi: 'दिल्ली', mr: 'दिल्ली' },
  'Jammu and Kashmir': { hi: 'जम्मू और कश्मीर', mr: 'जम्मू आणि काश्मीर' }
};

const COMMON_CROPS = [
  'Potato', 'Tomato', 'Onion', 'Green Chilli', 'Brinjal', 'Cabbage',
  'Cauliflower', 'Carrot', 'Garlic', 'Ginger(Green)', 'Bottle gourd',
  'Bitter gourd', 'Cucumber(Kheera)', 'Bhindi(Ladies Finger)', 'Capsicum',
  'Banana - Green', 'Ashgourd', 'Cowpea(Veg)', 'Snakeguard',
  'Spinach', 'Pumpkin', 'Radish', 'Peas Wet', 'Apple', 'Banana', 'Mango',
  'Orange', 'Lemon', 'Pomegranate', 'Papaya', 'Water Melon'
];

let language = localStorage.getItem(langStore) || 'en';
let allRecords = [];
let latestRecords = [];

const $ = (id) => document.getElementById(id);
const tr = (key) => copy[language]?.[key] || copy.en[key] || key;
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

function trCrop(name) {
  if (!name || language === 'en') return name;
  const s = name.trim();
  if (CROP_TRANSLATIONS[s]?.[language]) return CROP_TRANSLATIONS[s][language];
  const sLow = s.toLowerCase();
  for (const [k, v] of Object.entries(CROP_TRANSLATIONS)) {
    if (k.toLowerCase() === sLow && v[language]) return v[language];
  }
  for (const [k, v] of Object.entries(CROP_TRANSLATIONS)) {
    if (sLow.includes(k.toLowerCase()) && v[language]) return v[language];
  }
  return name;
}

function trVariety(variety) {
  if (!variety || language === 'en') return variety;
  const s = variety.trim();
  if (VARIETY_TRANSLATIONS[s]?.[language]) return VARIETY_TRANSLATIONS[s][language];
  for (const [k, v] of Object.entries(VARIETY_TRANSLATIONS)) {
    if (k.toLowerCase() === s.toLowerCase() && v[language]) return v[language];
  }
  return variety;
}

function trState(state) {
  if (!state || language === 'en') return state;
  const s = state.trim();
  return STATE_TRANSLATIONS[s]?.[language] || state;
}

function resolveCommoditySearch(query) {
  const q = (query || '').trim();
  if (!q) return '';
  const qLow = q.toLowerCase();
  for (const [eng, trans] of Object.entries(CROP_TRANSLATIONS)) {
    if (eng.toLowerCase() === qLow) return eng;
    if (trans.hi && (trans.hi.toLowerCase().includes(qLow) || qLow.includes(trans.hi.toLowerCase()))) return eng;
    if (trans.mr && (trans.mr.toLowerCase().includes(qLow) || qLow.includes(trans.mr.toLowerCase()))) return eng;
  }
  return q;
}

function formatCrop(commodity, variety) {
  if (language === 'en') {
    return esc([commodity, variety].filter(Boolean).join(' · '));
  }
  const cTrans = trCrop(commodity);
  const vTrans = trVariety(variety);
  const vPart = (vTrans && vTrans !== cTrans && vTrans.toLowerCase() !== commodity.toLowerCase()) ? ` · ${esc(vTrans)}` : '';
  if (cTrans !== commodity) {
    return `${esc(cTrans)}${vPart} <span class="en-sub">(${esc(commodity)})</span>`;
  }
  return esc([commodity, variety].filter(Boolean).join(' · '));
}

function formatLocation(market, district, state) {
  if (language === 'en') {
    return esc([market, district, state].filter(Boolean).join(' · '));
  }
  const sTrans = trState(state);
  let mTrans = market;
  if (language === 'hi' && mTrans.includes('Market')) {
    mTrans = mTrans.replace(/\bMarket\b/i, 'मंडी');
  } else if (language === 'mr' && mTrans.includes('Market')) {
    mTrans = mTrans.replace(/\bMarket\b/i, 'बाजार');
  }
  return esc([mTrans, district, sTrans].filter(Boolean).join(' · '));
}

function applyLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const text = tr(el.dataset.i18n);
    if (el.tagName === 'INPUT') el.placeholder = text;
    else el.innerHTML = text;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => el.placeholder = tr(el.dataset.i18nPlaceholder));

  // Translate quick vegetable chips
  document.querySelectorAll('[data-i18n-crop]').forEach(chip => {
    const cropKey = chip.dataset.crop;
    if (!cropKey) {
      chip.textContent = tr('allVeg');
    } else {
      const parts = chip.textContent.trim().split(' ');
      const emoji = parts[0] || '';
      const localName = trCrop(cropKey);
      chip.textContent = `${emoji} ${localName}`;
    }
  });

  const toggleBtn = $('toggle-key');
  if (toggleBtn) {
    toggleBtn.textContent = tr($('api-key')?.type === 'password' ? 'show' : 'hide');
  }

  // Re-populate state and district dropdowns with translated state names
  if (allRecords.length) {
    populateFilters(allRecords);
    displayResults(selectedRecords());
  }
}

function formatPrice(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return '—';
  return new Intl.NumberFormat(language === 'en' ? 'en-IN' : language === 'hi' ? 'hi-IN' : 'mr-IN', { maximumFractionDigits: 0 }).format(n);
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
  return d ? new Intl.DateTimeFormat(language === 'en' ? 'en-IN' : language === 'hi' ? 'hi-IN' : 'mr-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(d) : tr('dateUnknown');
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
  const crop = resolveCommoditySearch(rawCrop).toLocaleLowerCase();
  const state = $('state-filter').value.toLocaleLowerCase();
  const district = $('district-filter').value.toLocaleLowerCase();

  return allRecords.filter(r => {
    const rCrop = r.commodity.toLocaleLowerCase();
    const matchCrop = !crop || rCrop.includes(crop) || (rawCrop && trCrop(r.commodity).toLocaleLowerCase().includes(rawCrop.toLowerCase()));
    const matchState = !state || r.state.toLocaleLowerCase() === state;
    const matchDistrict = !district || r.district.toLocaleLowerCase() === district;
    return matchCrop && matchState && matchDistrict;
  });
}

function updateSelect(select, items, placeholder) {
  const previous = select.value;
  // items can be string array or {value, label} array
  const opts = items.map(it => {
    const val = typeof it === 'string' ? it : it.value;
    const lab = typeof it === 'string' ? it : it.label;
    return `<option value="${esc(val)}">${esc(lab)}</option>`;
  }).join('');
  select.innerHTML = `<option value="">${esc(placeholder)}</option>` + opts;
  if (items.some(it => (typeof it === 'string' ? it : it.value) === previous)) {
    select.value = previous;
  }
}

function populateFilters(records) {
  const rawStates = [...new Set(records.map(r => r.state).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  const stateItems = rawStates.map(st => {
    const trans = trState(st);
    return {
      value: st,
      label: (trans && trans !== st && language !== 'en') ? `${trans} (${st})` : st
    };
  });
  updateSelect($('state-filter'), stateItems, tr('allStates'));

  const rawDistricts = [...new Set(records.filter(r => !$('state-filter').value || r.state === $('state-filter').value).map(r => r.district).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  updateSelect($('district-filter'), rawDistricts, tr('anyDistrict'));
  $('district-filter').disabled = !$('state-filter').value;

  const combinedCrops = [...new Set([...COMMON_CROPS, ...records.map(r => r.commodity).filter(Boolean)])].sort((a, b) => a.localeCompare(b));
  $('crops').innerHTML = combinedCrops.map(v => {
    const t = trCrop(v);
    const optLabel = (t && t !== v && language !== 'en') ? `${v} (${t})` : v;
    return `<option value="${esc(v)}">${esc(optLabel)}</option>`;
  }).join('');
}

function displayResults(records) {
  const tbody = $('price-rows');
  const mobile = $('mobile-cards');
  const rawSearch = $('crop-search').value.trim();
  const searchTitle = rawSearch ? (trCrop(rawSearch) || rawSearch) : tr('resultsTitle');

  $('results-title').textContent = searchTitle;
  $('result-count').textContent = `${records.length} ${records.length === 1 ? tr('resultSingular') : tr('resultPlural')}`;

  tbody.innerHTML = records.slice(0, 200).map(r => `
    <tr>
      <td>${formatCrop(r.commodity, r.variety)}</td>
      <td>${formatLocation(r.market, r.district, r.state)}</td>
      <td>${esc(formatDate(r.date))}</td>
      <td class="price">${esc(formatPriceDisplay(r.min))}</td>
      <td class="price modal-price">${esc(formatPriceDisplay(r.modal))}</td>
      <td class="price">${esc(formatPriceDisplay(r.max))}</td>
    </tr>
  `).join('');

  mobile.innerHTML = records.slice(0, 200).map(r => `
    <article class="price-card">
      <div class="price-card-top">
        <div class="price-card-name">${formatCrop(r.commodity, r.variety)}</div>
        <div class="price-card-date">${esc(formatDate(r.date))}</div>
      </div>
      <div class="price-card-location">${formatLocation(r.market, r.district, r.state)}</div>
      <div class="price-card-values">
        <div><span>${esc(tr('thMin'))}</span><strong>${esc(formatPriceDisplay(r.min))}</strong></div>
        <div class="value-modal"><span>${esc(tr('thModal'))}</span><strong>${esc(formatPriceDisplay(r.modal))}</strong></div>
        <div><span>${esc(tr('thMax'))}</span><strong>${esc(formatPriceDisplay(r.max))}</strong></div>
      </div>
    </article>
  `).join('');

  $('empty-state').classList.toggle('hidden', records.length > 0);
  $('results').classList.toggle('hidden', records.length === 0);
  const histEl = $('history');
  if (histEl) histEl.classList.toggle('hidden', records.length === 0);

  if (records.length) {
    const d = records.map(r => dateValue(r.date)).filter(Boolean).sort((a, b) => b - a)[0];
    $('data-freshness').textContent = d ? `${tr('fresh')}: ${formatDate(d)}` : '';
    $('last-updated').textContent = `${tr('dateUpdated')} ${new Intl.DateTimeFormat(language === 'en' ? 'en-IN' : language === 'hi' ? 'hi-IN' : 'mr-IN', { hour: 'numeric', minute: '2-digit' }).format(new Date())}`;
  }

  renderChart(records);
}

function getRealHistoryPoints(records, selectedCrop) {
  // 1. Group records from current API response by arrival date
  const byDay = new Map();
  for (const r of records) {
    const d = dateValue(r.date);
    const p = Number(r.modal);
    if (!d || !Number.isFinite(p) || p < 10) continue;
    const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (!byDay.has(k)) byDay.set(k, []);
    byDay.get(k).push(p);
  }

  // 2. Load accumulated real daily records from localStorage
  const cropKey = (selectedCrop || (records[0]?.commodity) || 'all_commodities').toLowerCase().trim();
  const storageKey = 'vejbhav_real_log_v1';
  let historyStore = {};
  try {
    historyStore = JSON.parse(localStorage.getItem(storageKey) || '{}');
  } catch (_) { }

  if (!historyStore[cropKey]) historyStore[cropKey] = {};

  // Store only 100% genuine daily medians from the API
  for (const [day, prices] of byDay.entries()) {
    const med = prices.sort((a, b) => a - b)[Math.floor(prices.length / 2)];
    historyStore[cropKey][day] = med;
  }

  try {
    localStorage.setItem(storageKey, JSON.stringify(historyStore));
  } catch (_) { }

  // Return all authentic records sorted by date
  return Object.entries(historyStore[cropKey])
    .map(([day, value]) => ({ day, value: Number(value) }))
    .filter(p => Number.isFinite(p.value) && p.value > 0)
    .sort((a, b) => a.day.localeCompare(b.day));
}

function renderChart(records) {
  const selectedCrop = $('crop-search').value.trim();
  const resolvedCrop = resolveCommoditySearch(selectedCrop);
  const activeCropName = resolvedCrop || (records.length ? records[0].commodity : '');
  const kickerLabel = activeCropName ? `${trCrop(activeCropName)} · ${tr('chartLabel')}` : tr('chartLabel');

  const kickerEl = $('chart-kicker');
  if (kickerEl) kickerEl.textContent = kickerLabel;

  if (!records.length) {
    $('chart-area').innerHTML = `<div class="chart-empty">${esc(tr('chartEmpty'))}</div>`;
    $('chart-latest').textContent = '—';
    $('chart-period').textContent = tr('chartAwait');
    return;
  }

  const points = getRealHistoryPoints(records, activeCropName);

  // If only 1 single arrival date is available, display Today's Authentic Price Spread
  if (points.length <= 1) {
    const single = points[0] || { day: records[0]?.date, value: Number(records[0]?.modal) };
    // Filter realistic commercial mandi rates (at least ₹10/quintal)
    // to discard clerk placeholder 0s, empty fields, or nominal fractions
    const validModals = records.map(r => Number(r.modal)).filter(p => Number.isFinite(p) && p >= 10);
    const validMins = records.map(r => Number(r.min)).filter(p => Number.isFinite(p) && p >= 10);
    const validMaxs = records.map(r => Number(r.max)).filter(p => Number.isFinite(p) && p >= 10);

    const modalVal = validModals.length ? validModals.sort((a, b) => a - b)[Math.floor(validModals.length / 2)] : (single.value || 0);
    const rawMin = validMins.length ? Math.min(...validMins) : modalVal;
    const rawMax = validMaxs.length ? Math.max(...validMaxs) : modalVal;

    // Ensure logical bounds: min <= modal <= max
    const minVal = Math.min(rawMin, modalVal || rawMin);
    const maxVal = Math.max(rawMax, modalVal || rawMax);

    $('chart-latest').textContent = modalVal ? `₹${formatPrice(modalVal)}` : '—';
    $('chart-period').textContent = `1 ${tr('chartOneDay')} (${formatDate(single.day)})`;

    const spreadPercent = maxVal > minVal ? Math.min(Math.max(((modalVal - minVal) / (maxVal - minVal)) * 100, 15), 85) : 50;

    $('chart-area').innerHTML = `
      <div class="single-day-spread">
        <div class="spread-header">
          <span class="spread-date">📅 ${esc(formatDate(single.day))} · ${esc(language === 'hi' ? 'आज का सरकारी भाव दायरा' : language === 'mr' ? 'आजची अधिकृत भाव कक्षा' : "Today's Mandi Price Range")}</span>
          <span class="spread-mandis">${records.length} ${records.length === 1 ? tr('resultSingular') : tr('resultPlural')}</span>
        </div>

        <div class="spread-stats-grid">
          <div class="spread-stat-card stat-min">
            <span class="stat-type">${esc(tr('thMin'))}</span>
            <strong class="stat-amt">₹${esc(formatPrice(minVal))}</strong>
            <span class="stat-sub">${language === 'hi' ? 'न्यूनतम रिपोर्ट' : language === 'mr' ? 'किमान अहवाल' : 'Lowest reported'}</span>
          </div>

          <div class="spread-stat-card stat-modal">
            <span class="stat-badge">${language === 'hi' ? 'मुख्य मंडी भाव' : language === 'mr' ? 'मुख्य बाजारभाव' : 'Benchmark Modal Rate'}</span>
            <span class="stat-type">${esc(tr('thModal'))}</span>
            <strong class="stat-amt modal-highlight">₹${esc(formatPrice(modalVal))}</strong>
            <span class="stat-sub">${language === 'hi' ? 'अधिकांश मंडियों का भाव' : language === 'mr' ? 'बहुतांश बाजारांतील भाव' : 'Most common rate'}</span>
          </div>

          <div class="spread-stat-card stat-max">
            <span class="stat-type">${esc(tr('thMax'))}</span>
            <strong class="stat-amt">₹${esc(formatPrice(maxVal))}</strong>
            <span class="stat-sub">${language === 'hi' ? 'अधिकतम रिपोर्ट' : language === 'mr' ? 'कमाल अहवाल' : 'Highest reported'}</span>
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
            <span>₹${esc(formatPrice(minVal))} (${esc(tr('thMin'))})</span>
            <span class="spread-modal-legend">● ${esc(tr('thModal'))}: ₹${esc(formatPrice(modalVal))}</span>
            <span>₹${esc(formatPrice(maxVal))} (${esc(tr('thMax'))})</span>
          </div>
        </div>

        <p class="spread-footer-note">
          ${language === 'hi'
        ? '✓ यह आधिकारिक AGMARKNET का 100% असली डेटा है। सरकारी मंडी रिपोर्ट रोज़ एक बार आती हैं; जैसे-जैसे अगले दिनों के असली भाव आएँगे, वे यहाँ तारीख-दर-तारीख जुड़ते जाएँगे।'
        : language === 'mr'
          ? '✓ हा AGMARKNET चा १००% खरा अधिकृत डेटा आहे. सरकारी बाजार अहवाल रोज एकदा प्रसिद्ध होतात; पुढील दिवसांचे खरे भाव येताच ते येथे नोंदवले जातील.'
          : '✓ 100% authentic AGMARKNET government report. Mandi reports are published once daily; historical trend lines connect real daily reports as they accumulate.'}
        </p>
      </div>
    `;
    return;
  }

  // If 2 or more genuine daily dates exist, plot the authentic trend line
  $('chart-latest').textContent = `₹${formatPrice(points.at(-1).value)}`;
  $('chart-period').textContent = `${points.length} ${tr('chartDays')}`;

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
    <svg viewBox="0 0 ${width} ${height + 8}" preserveAspectRatio="none" role="img" aria-label="${esc(tr('chartLegend'))}">
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
  setStatus('', tr('statusLoading'));
  $('refresh').disabled = true;
  try {
    const state = $('state-filter').value;
    const rawCrop = $('crop-search').value.trim();
    const resolvedCrop = resolveCommoditySearch(rawCrop);

    let records = await getRecords({
      ...(state ? { state } : {}),
      ...(resolvedCrop ? { commodity: resolvedCrop } : {})
    });

    if (!records.length && resolvedCrop) {
      // Fallback to broader state/national query if specific exact commodity filter returned 0
      records = await getRecords({ ...(state ? { state } : {}) });
    }

    allRecords = records.sort(compareArrivalDateNewest);
    populateFilters(allRecords);
    const chosen = selectedRecords();
    latestRecords = chosen;
    displayResults(chosen);
    setStatus('connected', chosen.length ? tr('statusConnected') : tr('statusNoResults'));
  } catch (e) {
    const msg = tr('statusError');
    setStatus('error', msg);
    $('empty-state').classList.remove('hidden');
    $('results').classList.add('hidden');
    const histEl = $('history');
    if (histEl) histEl.classList.add('hidden');
    $('chart-period').textContent = tr('chartAwait');
    $('chart-area').innerHTML = `<div class="chart-empty">${esc(tr('chartEmpty'))}</div>`;
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
  setStatus('connected', filtered.length ? tr('statusConnected') : tr('statusNoResults'));
}

document.addEventListener('DOMContentLoaded', () => {
  $('language').value = language;
  applyLanguage();

  $('language').addEventListener('change', e => {
    language = e.target.value;
    localStorage.setItem(langStore, language);
    applyLanguage();
    if (allRecords.length) {
      displayResults(selectedRecords());
    }
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
    const rawVal = $('crop-search').value.trim();
    const resolved = resolveCommoditySearch(rawVal).toLowerCase();
    document.querySelectorAll('.chip').forEach(c => {
      const cCrop = (c.dataset.crop || '').toLowerCase();
      c.classList.toggle('active', cCrop === resolved || (!rawVal && !cCrop));
    });
    if (allRecords.length) applyFilters();
  });

  // Quick vegetable chips
  document.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const cropVal = btn.dataset.crop || '';
      $('crop-search').value = cropVal ? (trCrop(cropVal) || cropVal) : '';
      loadPrices();

      // Smoothly ensure the Price Range Card is in clear view right under the chips
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
