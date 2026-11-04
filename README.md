# VejBhav

A mobile-first mandi price viewer using the Government of India's AGMARKNET daily price dataset through the free data.gov.in API.

## Run

Open `index.html` in a modern browser, or serve this folder with any static file server. There are no build steps or paid services.

## Connect prices

1. Create a free account at [data.gov.in](https://www.data.gov.in/user/register) and generate an API key.
2. Open VejBhav, choose the settings icon, and paste the key.
3. Search for a commodity, then optionally filter by state and district.

The key is stored in browser local storage and sent directly to `api.data.gov.in`; this prototype has no server. Use a server-side proxy and private environment variable before deploying a shared public site so one shared key is not exposed to every visitor.

## Data notes

- The source is the official [AGMARKNET daily mandi prices dataset](https://www.data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi), resource `9ef84268-d588-465a-a308-a864a43d0070`.
- The feed is daily market reporting, not tick-by-tick real-time pricing. Arrival dates are shown as reported, and mandi updates can be delayed.
- Modal prices are shown in ₹ per quintal, as returned by the source.
- The chart groups available source records by arrival date and plots the median modal price. It does not estimate, extrapolate, or fill missing dates. Historical coverage depends on records returned by the API.
- The interface currently supports English, Hindi, and Marathi.
