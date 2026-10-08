export const wrap = "mx-auto w-full max-w-7xl px-4 sm:px-6";
export const card =
  "rounded-2xl border border-white/10 bg-zinc-900/60 shadow-lg shadow-black/20 transition hover:border-white/20";

export const usd = (n) =>
  n == null ? "—" : new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD",
    maximumFractionDigits: n < 1 ? 6 : 2,
  }).format(n);

export const compact = (n) =>
  n == null ? "—" : new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 2,
  }).format(n);