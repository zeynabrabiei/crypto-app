import Link from "next/link";
import CryptoGrid from "@/components/crypto/CryptoGrid";
import EmptyState from "@/components/ui/EmptyState";
import { getMarkets } from "@/lib/api";
import { wrap } from "@/lib/utils";

export const metadata = { title: "Markets", description: "Browse top cryptocurrencies by market cap." };

export default async function CoinsPage({ searchParams }) {
  const page = Math.max(1, parseInt((await searchParams).page, 10) || 1);
  const coins = await getMarkets({ page, perPage: 24 });
  const btn = "rounded-xl border border-white/10 px-4 py-2 text-sm transition hover:bg-white/5";

  return (
    <div className={`${wrap} py-10`}>
      <h1 className="text-3xl font-semibold tracking-tight">Markets</h1>
      <p className="mb-8 mt-2 text-zinc-400">Top cryptocurrencies by market cap. Use search above to find any coin.</p>
      {coins.length ? <CryptoGrid coins={coins} /> : <EmptyState title="No coins on this page" text="Head back to the first page." href="/coins" cta="Back to markets" />}
      <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-3">
        {page > 1 && <Link href={`/coins?page=${page - 1}`} className={btn}>← Previous</Link>}
        <span className="text-sm text-zinc-500">Page {page}</span>
        {coins.length === 24 && <Link href={`/coins?page=${page + 1}`} className={btn}>Next →</Link>}
      </nav>
    </div>
  );
}