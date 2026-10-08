export default function Change({ value, className = "" }) {
  if (value == null) return <span className="text-zinc-500">—</span>;
  const up = value >= 0;
  return (
    <span className={`inline-flex items-center gap-1 font-medium tabular-nums ${up ? "text-emerald-400" : "text-rose-400"} ${className}`}>
      <span aria-hidden>{up ? "▲" : "▼"}</span>
      <span className="sr-only">{up ? "Up" : "Down"}</span>
      {Math.abs(value).toFixed(2)}%
    </span>
  );
}