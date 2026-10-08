# CoinX Market

A crypto market dashboard built with Next.js and Tailwind CSS. It shows live prices from the CoinGecko API, interactive price charts, coin search, and a favorites list saved in the browser.

**Live demo:** https://coinxmarket.vercel.app

## Overview

Following the crypto market usually means jumping between busy sites. CoinX Market focuses on the essentials: a clear market overview, a browsable list of top coins, a detail page per coin with price history, and quick access to the coins you care about. The project is also an exercise in structuring a Next.js App Router application with a clean separation between data fetching, server components and interactive client components.

## Features

- **Dashboard:** global market stats (market cap, 24h volume, BTC dominance, active coins), a 30-day Bitcoin chart and featured coins
- **Markets page:** responsive coin grid with 7-day sparklines and pagination
- **Coin details:** price, 24h change, market cap, rank, 24h high/low, volume and circulating supply
- **Price chart:** selectable ranges (1D, 7D, 30D, 90D, 1Y), drawn as a lightweight custom SVG chart
- **Search:** debounced search with live suggestions and keyboard support, usable on desktop and mobile
- **Favorites:** add or remove coins from any card or detail page, persisted in `localStorage`, with a dedicated empty state
- **Loading states:** skeleton loaders for the grid and details pages via `loading.js`
- **Error handling:** friendly error screens with a retry button, plus a custom 404 page
- **Accessibility:** semantic HTML, labelled controls, visible focus states

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js (App Router), React |
| Language | JavaScript |
| Styling | Tailwind CSS |
| Data | CoinGecko REST API |
| Persistence | `localStorage` |
| Deployment | Vercel |

## Project Structure

```text
src/
├── app/
│   ├── layout.js, page.js, globals.css
│   ├── loading.js, error.js, not-found.js
│   ├── api/crypto/route.js      # server-side proxy (search, chart, markets)
│   ├── coins/                   # list page + [id] details page
│   └── favorites/
├── components/
│   ├── layout/                  # Header, Footer
│   ├── crypto/                  # cards, grid, chart, search, favorites
│   └── ui/                      # Change, EmptyState, ErrorState, Skeletons
└── lib/
    ├── api.js                   # all CoinGecko requests
    └── utils.js                 # formatters and shared classes
```

## Getting Started

```bash
git clone https://github.com/zeynabrabiei/crypto-app.git
cd crypto-app
npm install
cp .env.example .env.local   # then add your CoinGecko API key
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # lint the project
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
COINGECKO_API_KEY=your_coingecko_demo_api_key
```

You can get a free demo key from the [CoinGecko developer dashboard](https://www.coingecko.com/en/developers/dashboard). The key is only read on the server and sent as a request header, so it is never exposed to the browser.

## Responsive Design

The layout is designed for mobile, tablet and desktop: the header switches to a compact navigation on small screens, the coin grid adapts from one to four columns, and the chart and detail stats reflow for narrow viewports.

## Performance & SEO

- Pages are Server Components and fetch their data on the server; only interactive parts (search, favorites, chart range selector) are Client Components
- CoinGecko responses are cached with time-based revalidation
- Per-page metadata, including dynamic titles and descriptions for each coin, and Open Graph tags
- No charting library: the price chart is a small SVG component

## Deployment

Deployed on Vercel: https://coinxmarket.vercel.app. Add `COINGECKO_API_KEY` in the project's environment variables before deploying.

## Author

**Zeynab Rabiei**, Front-End Developer

- GitHub: https://github.com/zeynabrabiei
- LinkedIn: https://www.linkedin.com/in/zeynabrabiei
- Email: zeynabrabiei92@gmail.com

Feedback and questions are welcome. Feel free to reach out by email or LinkedIn.

## Acknowledgements

Market data provided by [CoinGecko](https://www.coingecko.com/).