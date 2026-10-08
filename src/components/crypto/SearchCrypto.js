"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchCrypto() {
  const router = useRouter();
  const box = useRef(null);
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const term = q.trim();

  useEffect(() => {
    if (term.length < 2) { setResults([]); return; }
    const ac = new AbortController();
    const t = setTimeout(async () => {
      setBusy(true);
      try {
        const r = await fetch(`/api/crypto?type=search&q=${encodeURIComponent(term)}`, { signal: ac.signal });
        setResults(r.ok ? await r.json() : []);
      } catch {}
      setBusy(false);
    }, 300);
    return () => { clearTimeout(t); ac.abort(); };
  }, [term]);

  useEffect(() => {
    const h = (e) => { if (!box.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const go = (c) => { setOpen(false); setQ(""); router.push(`/coins/${c.id}`); };

  return (
    <div ref={box} className="relative" onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
      <input type="search" value={q} placeholder="Search coins…" aria-label="Search cryptocurrencies"
        onChange={(e) => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)}
        onKeyDown={(e) => e.key === "Enter" && results[0] && go(results[0])}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-400/50 focus:outline-none" />
      {open && term.length >= 2 && (
        <div className="absolute right-0 z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-2xl" aria-live="polite">
          {busy && !results.length ? <p className="p-4 text-sm text-zinc-400">Searching…</p>
            : !results.length ? <p className="p-4 text-sm text-zinc-400">No coins match &ldquo;{term}&rdquo;.</p>
            : <ul>
                {results.map((c) => (
                  <li key={c.id}>
                    <button onClick={() => go(c)} className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-white/5">
                      <img src={c.thumb} alt="" width={24} height={24} className="h-6 w-6 rounded-full" />
                      <span className="flex-1 truncate">{c.name}</span>
                      <span className="text-xs uppercase text-zinc-500">{c.symbol}</span>
                    </button>
                  </li>
                ))}
              </ul>}
        </div>
      )}
    </div>
  );
}