import Link from "next/link";
import { wrap } from "@/lib/utils";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className={`${wrap} grid min-h-[70vh] place-items-center py-16 text-center`}>
      <div>
        <p className="bg-linear-to-b from-emerald-300 to-emerald-600/30 bg-clip-text text-8xl font-bold tracking-tighter text-transparent sm:text-9xl">404</p>
        <h1 className="mt-4 text-2xl font-semibold">This coin has left the market</h1>
        <p className="mx-auto mt-2 max-w-md text-zinc-400">The page you&apos;re looking for doesn&apos;t exist or the coin ID is invalid. Check the URL or find what you need from the dashboard.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-emerald-300">Back to dashboard</Link>
          <Link href="/coins" className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-zinc-300 hover:bg-white/5">Browse markets</Link>
        </div>
      </div>
    </div>
  );
}