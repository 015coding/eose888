"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getPinnedStocks } from "@/app/action/getPinnedStocks";

interface PinnedContextType {
  pinnedSymbols: Set<string>;
  refresh: () => void;
}

const PinnedContext = createContext<PinnedContextType>({
  pinnedSymbols: new Set(),
  refresh: () => {},
});

export function PinnedStocksProvider({ children }: { children: React.ReactNode }) {
  const [pinnedSymbols, setPinnedSymbols] = useState<Set<string>>(new Set());

  const refresh = useCallback(async () => {
    try {
      const result = await getPinnedStocks();
      setPinnedSymbols(new Set(result.map(r => r.symbol)));
    } catch (e) {
      console.error("Failed to refresh pinned stocks:", e);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <PinnedContext.Provider value={{ pinnedSymbols, refresh }}>
      {children}
    </PinnedContext.Provider>
  );
}

export const usePinned = () => useContext(PinnedContext);