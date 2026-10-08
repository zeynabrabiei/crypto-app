"use client";
import { useFavorites } from "./FavoritesProvider";

export default function FavoriteButton({ id, name, className = "" }) {
  const { ids, toggle } = useFavorites();
  const active = ids.includes(id);
  return (
    <button type="button" onClick={() => toggle(id)} aria-pressed={active}
      aria-label={active ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
      className={`grid h-9 w-9 place-items-center rounded-full border transition ${active ? "border-amber-400/40 bg-amber-400/10 text-amber-300" : "border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white"} ${className}`}>
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden>
        <path strokeLinejoin="round" d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />
      </svg>
    </button>
  );
}