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

interface CompareContextValue {
  compareIds: string[];
  ready: boolean;
  isCompared: (id: string) => boolean;
  toggleCompare: (id: string) => { ok: boolean; message?: string };
  removeCompare: (id: string) => void;
  clearCompare: () => void;
  count: number;
}

const CompareContext = createContext<CompareContextValue | null>(null);
const STORAGE_KEY = "aurelia-compare";
const MAX_COMPARE = 3;

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCompareIds(JSON.parse(raw) as string[]);
    } catch {
      setCompareIds([]);
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: string[]) => {
    setCompareIds(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const toggleCompare = useCallback(
    (id: string) => {
      if (compareIds.includes(id)) {
        persist(compareIds.filter((c) => c !== id));
        return { ok: true };
      }
      if (compareIds.length >= MAX_COMPARE) {
        return {
          ok: false,
          message: "You can compare up to 3 properties.",
        };
      }
      persist([...compareIds, id]);
      return { ok: true };
    },
    [compareIds, persist]
  );

  const removeCompare = useCallback(
    (id: string) => persist(compareIds.filter((c) => c !== id)),
    [compareIds, persist]
  );

  const clearCompare = useCallback(() => persist([]), [persist]);

  const isCompared = useCallback(
    (id: string) => compareIds.includes(id),
    [compareIds]
  );

  const value = useMemo(
    () => ({
      compareIds,
      ready,
      isCompared,
      toggleCompare,
      removeCompare,
      clearCompare,
      count: compareIds.length,
    }),
    [
      compareIds,
      ready,
      isCompared,
      toggleCompare,
      removeCompare,
      clearCompare,
    ]
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
