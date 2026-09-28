"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface FavoritesContextValue {
  favorites: string[];
  ready: boolean;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);
const STORAGE_KEY = "aurelia-favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw) as string[]);
    } catch {
      setFavorites([]);
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: string[]) => {
    setFavorites(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const toggleFavorite = useCallback(
    (id: string) => {
      persist(
        favorites.includes(id)
          ? favorites.filter((f) => f !== id)
          : [...favorites, id]
      );
    },
    [favorites, persist]
  );

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const value = useMemo(
    () => ({
      favorites,
      ready,
      isFavorite,
      toggleFavorite,
      count: favorites.length,
    }),
    [favorites, ready, isFavorite, toggleFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
