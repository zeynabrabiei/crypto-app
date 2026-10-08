import Link from "next/link";
import CryptoGrid from "@/components/crypto/CryptoGrid";
import PriceChart from "@/components/crypto/PriceChart";
import Change from "@/components/ui/Change";
import { getChart, getGlobal, getMarkets } from "@/lib/api";
import { card, compact, usd, wrap } from "@/lib/utils";

export default async function HomePage() {
  const [coins, global, btc] = await Promise.all([
    getMarkets({ perPage: 8 }),
    getGlobal(),
    getChart("bitcoin", 30),
  ]);
  const g = global.data;
  const prices = btc.prices.map((p) => p[1]);
  const stats = [
    ["Global market cap", compact(g.total_market_cap.usd), g.market_cap_change_percentage_24h_usd],
    ["24h volume", compact(g.total_volume.usd)],
    ["BTC dominance", `${g.market_cap_percentage.btc.toFixed(1)}%`],
    ["Active coins", g.active_cryptocurrencies.toLocaleString("en-US")],
  ];

  return (
    <div className={`${wrap} py-10 sm:py-14`}>
      <section className="max-w-2xl">
        <p className="text-sm font-medium text-emerald-400">Live market overview</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Track the crypto market with clarity.</h1>
        <p className="mt-4 text-zinc-400">Real-time prices, market data and interactive charts for the coins you care about.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/coins" className="rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300">Explore markets</Link>
          <Link href="/favorites" className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-zinc-200 transition hover:bg-white/5">My favorites</Link>
        </div>
      </section>

      <section aria-label="Market statistics" className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(([label, value, change]) => (
          <div key={label} className={`${card} p-4 sm:p-5`}>
            <p className="text-xs text-zinc-500 sm:text-sm">{label}</p>
            <p className="mt-1 text-xl font-semibold tabular-nums sm:text-2xl">{value}</p>
            {change != null && <Change value={change} className="text-xs" />}
          </div>
        ))}
      </section>

      <section aria-label="Bitcoin 30 day chart" className={`${card} mt-6 p-4 sm:p-6`}>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-sm text-zinc-500">Bitcoin · 30 days</p>
            <p className="text-3xl font-semibold tabular-nums">{usd(prices[prices.length - 1])}</p>
          </div>
          <Link href="/coins/bitcoin" className="text-sm text-emerald-400 hover:underline">View details →</Link>
        </div>
        <PriceChart data={prices} height={300} label="Bitcoin 30 day price" />
      </section>

      <section className="mt-12" aria-labelledby="featured">
        <div className="mb-5 flex items-end justify-between">
          <h2 id="featured" className="text-2xl font-semibold tracking-tight">Featured coins</h2>
          <Link href="/coins" className="text-sm text-zinc-400 hover:text-white">See all</Link>
        </div>
        <CryptoGrid coins={coins} />
      </section>
    </div>
  );
}