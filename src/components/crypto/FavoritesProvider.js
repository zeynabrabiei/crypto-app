"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const Ctx = createContext({ ids: [], ready: false, toggle: () => {} });

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { setIds(JSON.parse(localStorage.getItem("favorites") || "[]")); } catch {}
    setReady(true);
  }, []);

  const toggle = useCallback((id) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try { localStorage.setItem("favorites", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  return <Ctx.Provider value={{ ids, ready, toggle }}>{children}</Ctx.Provider>;
}

export const useFavorites = () => useContext(Ctx);