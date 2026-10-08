"use client";
import { useEffect, useState } from "react";
import { useFavorites } from "./FavoritesProvider";
import CryptoGrid from "./CryptoGrid";
import EmptyState from "@/components/ui/EmptyState";
import { GridSkeleton } from "@/components/ui/Skeletons";

export default function FavoritesList() {
  const { ids, ready } = useFavorites();
  const [coins, setCoins] = useState(null);
  const [failed, setFailed] = useState(false);
  const key = ids.join(",");

  useEffect(() => {
    if (!ready || !key) return;
    let live = true;
    fetch(`/api/crypto?type=markets&ids=${encodeURIComponent(key)}`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((d) => live && setCoins(d))
      .catch(() => live && setFailed(true));
    return () => { live = false; };
  }, [ready, key]);

  if (!ready) return <GridSkeleton count={4} />;
  if (!ids.length)
    return <EmptyState title="No favorites yet" text="Tap the star on any coin to keep it here for quick access." href="/coins" cta="Explore markets" />;
  if (failed)
    return <EmptyState title="Couldn't load your coins" text="Market data is unavailable right now. Please refresh in a moment." />;
  if (!coins) return <GridSkeleton count={Math.min(ids.length, 8)} />;
  return <CryptoGrid coins={coins.filter((c) => ids.includes(c.id))} />;
}