import { notFound } from "next/navigation";
import ChartPanel from "@/components/crypto/ChartPanel";
import FavoriteButton from "@/components/crypto/FavoriteButton";
import Change from "@/components/ui/Change";
import { getChart, getCoin } from "@/lib/api";
import { card, compact, usd, wrap } from "@/lib/utils";

async function load(id) {
  try {
    return await getCoin(id);
  } catch (e) {
    if (e.status === 404) notFound();
    throw e;
  }
}

export async function generateMetadata({ params }) {
  try {
    const coin = await getCoin((await params).id);
    return {
      title: `${coin.name} (${coin.symbol.toUpperCase()}) price`,
      description: `Live ${coin.name} price, market cap, volume and price charts.`,
    };
  } catch {
    return { title: "Coin details" };
  }
}

export default async function CoinPage({ params }) {
  const { id } = await params;
  const coin = await load(id);
  const m = coin.market_data;
  const chart = await getChart(id, 7);
  const stats = [
    ["Market cap", compact(m.market_cap.usd)],
    ["Market cap rank", `#${coin.market_cap_rank ?? "—"}`],
    ["24h trading volume", compact(m.total_volume.usd)],
    ["24h high", usd(m.high_24h.usd)],
    ["24h low", usd(m.low_24h.usd)],
    ["Circulating supply", m.circulating_supply ? m.circulating_supply.toLocaleString("en-US", { maximumFractionDigits: 0 }) : "—"],
  ];

  return (
    <div className={`${wrap} py-10`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={coin.image.large} alt={`${coin.name} logo`} width={64} height={64} className="h-14 w-14 rounded-full sm:h-16 sm:w-16" />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{coin.name}</h1>
            <p className="text-sm uppercase text-zinc-500">{coin.symbol}</p>
          </div>
        </div>
        <FavoriteButton id={coin.id} name={coin.name} className="h-11! w-11!" />
      </div>

      <div className="mt-6 flex flex-wrap items-baseline gap-3">
        <p className="text-4xl font-semibold tabular-nums tracking-tight sm:text-5xl">{usd(m.current_price.usd)}</p>
        <Change value={m.price_change_percentage_24h} className="text-lg" />
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {stats.map(([label, value]) => (
          <div key={label} className={`${card} p-4 sm:p-5`}>
            <dt className="text-xs text-zinc-500 sm:text-sm">{label}</dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums sm:text-xl">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6">
        <ChartPanel id={coin.id} name={coin.name} initial={chart.prices.map((p) => p[1])} />
      </div>
    </div>
  );
}