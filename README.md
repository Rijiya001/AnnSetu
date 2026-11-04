# Ann Setu

A mobile-first Indian vegetable & fruit mandi price viewer powered by official Government of India AGMARKNET daily price reports through the free `data.gov.in` API.

- **Zero setup for visitors:** No API key prompts or developer settings on the website.
- **100% authentic government data:** True modal, minimum, and maximum prices directly from AGMARKNET.
- **Multilingual:** Full support across 12 Indian languages powered by Google Translate, plus regional search mapping for all crops.
- **Netlify-ready:** Deploy with one click to Netlify via Netlify Serverless Functions.

---

## Deploy to Netlify

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Deploy Ann Setu to Netlify"
   git push origin main
   ```
2. Go to [app.netlify.com](https://app.netlify.com) and click **"Add new site"** -> **"Import an existing project"**.
3. Select GitHub and choose your **`AnnSetu`** repository.
4. Netlify will automatically detect `netlify.toml` with:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`
5. (Optional) In the **Environment Variables** section, you can add your own key:
   - **Key:** `DATA_GOV_IN_API_KEY`
   - **Value:** `your_data_gov_in_api_key`
   *(A working AGMARKNET government key is pre-configured as a fallback, so the project works immediately even without configuring environment variables!)*
6. Click **Deploy AnnSetu**.

That's it! Your site will be live on your Netlify URL and serve official prices worldwide without asking visitors for any API key.

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
- **Security:** The API key is kept on the server / Netlify serverless function and is never exposed to the client browser.
