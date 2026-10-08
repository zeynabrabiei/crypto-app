import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import PriceChart from "./PriceChart";
import Change from "@/components/ui/Change";
import { card, compact, usd } from "@/lib/utils";

export default function CryptoCard({ coin }) {
  return (
    <article className={`${card} group relative hover:-translate-y-0.5`}>
      <Link href={`/coins/${coin.id}`} className="block rounded-2xl p-5">
        <div className="flex items-center gap-3 pr-10">
          <img src={coin.image} alt={`${coin.name} logo`} width={40} height={40} loading="lazy" className="h-10 w-10 rounded-full" />
          <div className="min-w-0">
            <h3 className="truncate font-semibold">{coin.name}</h3>
            <p className="text-xs uppercase text-zinc-500">{coin.symbol}</p>
          </div>
        </div>
        <div className="mt-5 flex items-baseline justify-between gap-2">
          <p className="text-2xl font-semibold tabular-nums tracking-tight">{usd(coin.current_price)}</p>
          <Change value={coin.price_change_percentage_24h} className="text-sm" />
        </div>
        <div className="mt-3 opacity-90">
          <PriceChart data={coin.sparkline_in_7d?.price} height={44} compact label={`${coin.name} 7 day trend`} />
        </div>
        <dl className="mt-3 flex justify-between text-xs text-zinc-500">
          <div><dt className="inline">Mkt cap </dt><dd className="inline text-zinc-300">{compact(coin.market_cap)}</dd></div>
          <div><dt className="inline">Vol </dt><dd className="inline text-zinc-300">{compact(coin.total_volume)}</dd></div>
        </dl>
      </Link>
      <FavoriteButton id={coin.id} name={coin.name} className="absolute right-4 top-4" />
    </article>
  );
}