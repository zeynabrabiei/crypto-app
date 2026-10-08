import Link from "next/link";

export default function EmptyState({ title, text, href, cta }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-white/15 px-6 py-20 text-center">
      <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-white/5 text-2xl" aria-hidden>☆</div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-zinc-400">{text}</p>
      {href && (
        <Link href={href} className="mt-6 rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300">
          {cta}
        </Link>
      )}
    </div>
  );
}