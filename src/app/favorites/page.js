import FavoritesList from "@/components/crypto/FavoritesList";
import { wrap } from "@/lib/utils";

export const metadata = { title: "Favorites", description: "Your saved cryptocurrencies." };

export default function FavoritesPage() {
  return (
    <div className={`${wrap} py-10`}>
      <h1 className="text-3xl font-semibold tracking-tight">Favorites</h1>
      <p className="mb-8 mt-2 text-zinc-400">Coins you&apos;ve saved, stored in this browser.</p>
      <FavoritesList />
    </div>
  );
}