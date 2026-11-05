# 🌾 Ann Setu — Mandi prices, made clear

> **Know your market. Choose your moment.**

A mobile-first web app that shows daily vegetable & fruit mandi prices across India, powered by official **AGMARKNET** data from the Government of India (`data.gov.in`).

🔗 **Live:** https://annsetu-gov.netlify.app/

## ✨ Features

- 📊 Official modal, minimum & maximum prices (₹ / quintal)
- 📈 Price range and daily median trend chart
- 🔍 Filter by state, district, category (Vegetables / Fruits) and 53 crops
- 🌐 12 languages: English, Hindi, Marathi, Gujarati, Bengali, Punjabi, Tamil, Telugu, Kannada, Malayalam, Urdu, Odia
- 🌙 Light / Dark mode
- 🔒 API key kept server-side — no key needed for visitors
- ⚡ Netlify-ready with Serverless Functions

## 🛠️ Tech Stack

HTML · CSS · Vanilla JavaScript · Node.js 20 · Netlify Functions

## 📁 Project Structure

```
AnnSetu/
├── netlify/functions/   # Serverless API
├── app.js               # Frontend logic
├── build.js             # Build script (outputs dist/)
├── server.js            # Local dev server
├── index.html
├── styles.css
├── netlify.toml
├── _redirects
└── package.json
```

## 🚀 Deploy to Netlify

1. Push this repo to GitHub.
2. On [Netlify](https://app.netlify.com): **Add new site → Import an existing project → AnnSetu**.
3. Netlify reads `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
4. Add environment variable `DATA_GOV_IN_API_KEY` (free key from data.gov.in).
5. Click **Deploy**.

## 💻 Local Development

```bash
# 1. Requires Node.js v20.6.0+
# 2. Create a .env file
DATA_GOV_IN_API_KEY=your_data_gov_in_api_key
PORT=3000

# 3. Run
npm start
```
Open http://localhost:3000

## 📡 Data Source

- **AGMARKNET**, Ministry of Agriculture & Farmers Welfare, via [data.gov.in](https://www.data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi)
- Resource ID: `9ef84268-d588-465a-a308-a864a43d0070`
- Prices are per quintal (100 kg), reported daily and may be delayed.

## ⚠️ Disclaimer

Prices are indicative reports, not a guaranteed offer.

## 👤 Author

Made by [Rijiya001](https://github.com/Rijiya001)