export default function PriceChart({ data, height = 280, compact = false, label = "Price chart" }) {
  if (!data?.length) return null;
  const W = 800, H = 300;
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const pts = data.map((v, i) => [(i / (data.length - 1 || 1)) * W, H * 0.08 + (1 - (v - min) / range) * H * 0.84]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join("");
  const up = data[data.length - 1] >= data[0];
  const color = up ? "#34d399" : "#fb7185";
  const gid = `g-${up ? "u" : "d"}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label={`${label}, trending ${up ? "up" : "down"}`} className="w-full" style={{ height }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.28" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {!compact && [0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="white" strokeOpacity="0.06" vectorEffect="non-scaling-stroke" />
      ))}
      <path d={`${line}L${W},${H}L0,${H}Z`} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke={color} strokeWidth={compact ? 2 : 2.5} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}