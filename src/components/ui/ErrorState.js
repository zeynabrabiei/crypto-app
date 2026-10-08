"use client";
import Link from "next/link";
import { wrap } from "@/lib/utils";

export default function ErrorState({ reset, title = "We couldn't load this data" }) {
  return (
    <div className={`${wrap} grid min-h-[60vh] place-items-center py-16`}>
      <div role="alert" className="max-w-md rounded-2xl border border-white/10 bg-zinc-900/60 p-8 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-rose-500/10 text-2xl text-rose-400" aria-hidden>!</div>
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="mt-2 text-sm text-zinc-400">
          The market data service is taking a moment, or the connection dropped. Your favorites are safe. Please try again shortly.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => reset()} className="rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300">
            Try again
          </button>
          <Link href="/" className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-zinc-300 transition hover:bg-white/5">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}