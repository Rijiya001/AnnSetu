# Ann Setu

A mobile-first Indian vegetable & fruit mandi price viewer powered by official Government of India AGMARKNET daily price reports through the free `data.gov.in` API.

- **Zero setup for visitors:** No API key prompts or developer settings on the website.
- **100% authentic government data:** True modal, minimum, and maximum prices directly from AGMARKNET.
- **Multilingual:** Full support across 12 Indian languages powered by Google Translate, plus regional search mapping for all crops.
- **Vercel-ready:** Deploy with one click to Vercel via Serverless Functions.

---

## Deploy to Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your **Ann Setu** repository.
4. In the **Environment Variables** section, add:
   - **Key:** `DATA_GOV_IN_API_KEY`
   - **Value:** `your_data_gov_in_api_key`
5. Click **Deploy**.

That's it! Your site will be live on your Vercel URL (e.g., `https://ann-setu.vercel.app`) and serve official prices worldwide without asking visitors for any API key.

---

## Local Development

1. Ensure Node.js (v20.6.0+) is installed.
2. In `.env`, add your free API key:
   ```env
   DATA_GOV_IN_API_KEY=your_data_gov_in_api_key
   PORT=3000
   ```
3. Start the local server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Official Data Source

- **Source:** AGMARKNET published by the Ministry of Agriculture & Farmers Welfare via [data.gov.in](https://www.data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi) (Resource ID: `9ef84268-d588-465a-a308-a864a43d0070`).
- **Units:** All prices are official mandi rates reported per quintal (100 kg).
- **Security:** The API key is kept on the server / Vercel serverless function and is never exposed to the client browser.
