const BASE_URL = "https://api.coingecko.com/api/v3";

async function cg(path, params = {}, revalidate = 60) {
  const res = await fetch(`${BASE_URL}${path}?${new URLSearchParams(params)}`, {
    headers: { "x-cg-demo-api-key": process.env.COINGECKO_API_KEY ?? "" },
    next: { revalidate },
  });
  if (!res.ok) {
    const err = new Error(`CoinGecko ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export const getMarkets = ({ page = 1, perPage = 24, ids } = {}) =>
  cg("/coins/markets", {
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: perPage,
    page,
    sparkline: true,
    price_change_percentage: "24h",
    ...(ids ? { ids } : {}),
  });

export const getCoin = (id) =>
  cg(`/coins/${encodeURIComponent(id)}`, {
    localization: false, tickers: false, community_data: false, developer_data: false,
  }, 120);

export const getChart = (id, days) =>
  cg(`/coins/${encodeURIComponent(id)}/market_chart`, { vs_currency: "usd", days }, 300);

export const searchCoins = (query) => cg("/search", { query }, 60);
export const getGlobal = () => cg("/global", {}, 120);