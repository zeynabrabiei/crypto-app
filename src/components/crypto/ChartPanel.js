"use client";
import { useState } from "react";
import PriceChart from "./PriceChart";
import { Bar } from "@/components/ui/Skeletons";

const RANGES = [["1", "1D"], ["7", "7D"], ["30", "30D"], ["90", "90D"], ["365", "1Y"]];

export default function ChartPanel({ id, name, initial }) {
  const [days, setDays] = useState("7");
  const [data, setData] = useState(initial);
  const [state, setState] = useState("idle");

  async function select(d) {
    setDays(d);
    setState("loading");
    try {
      const res = await fetch(`/api/crypto?type=chart&id=${id}&days=${d}`);
      if (!res.ok) throw new Error();
      setData(await res.json());
      setState("idle");
    } catch {
      setState("error");
    }
  }

  return (
    <section aria-label={`${name} price chart`} className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Price chart</h2>
        <div role="group" aria-label="Time range" className="flex rounded-xl bg-white/5 p-1">
          {RANGES.map(([d, l]) => (
            <button key={d} aria-pressed={days === d} onClick={() => select(d)}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition sm:text-sm ${days === d ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white"}`}>
              {l}
            </button>
          ))}
        </div>
      </div>
      {state === "loading" ? <Bar className="h-[22rem] w-full rounded-xl" />
        : state === "error" ? (
          <div className="grid h-[22rem] place-items-center text-center text-sm text-zinc-400">
            <div>
              <p>The chart couldn&apos;t be loaded right now.</p>
              <button onClick={() => select(days)} className="mt-3 rounded-lg bg-white/10 px-4 py-2 text-white hover:bg-white/15">Retry</button>
            </div>
          </div>
        ) : <PriceChart data={data} height={352} label={`${name} price`} />}
    </section>
  );
}