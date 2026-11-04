# VejBhav

A mobile-first mandi price viewer using the Government of India's AGMARKNET daily price dataset through the free data.gov.in API. The Node server keeps the API key in `.env` and proxies requests so the key is never exposed to the browser.

## Run

Use Node.js 20.6 or newer. Start the app with `npm start`, then visit `http://localhost:3000`.

## Connect prices

1. Create a free account at [data.gov.in](https://www.data.gov.in/user/register) and generate an API key.
2. Put it in `.env` as `DATA_GOV_IN_API_KEY=your_key`.
3. Restart the server, then search for a commodity and optionally filter by state and district.

`.env` is excluded from version control. Never commit your key.

## Data notes

- The source is the official [AGMARKNET daily mandi prices dataset](https://www.data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi), resource `9ef84268-d588-465a-a308-a864a43d0070`.
- The feed is daily market reporting, not tick-by-tick real-time pricing. Arrival dates are shown as reported, and mandi updates can be delayed.
- Modal prices are shown in ₹ per quintal, as returned by the source.
- The API does not sort by `arrival_date` server-side because that field is indexed as text. Returned records are ordered by arrival date in the app instead.
- The chart groups available source records by arrival date and plots the median modal price. It does not estimate, extrapolate, or fill missing dates. Historical coverage depends on records returned by the API.
- The interface currently supports English, Hindi, and Marathi.
