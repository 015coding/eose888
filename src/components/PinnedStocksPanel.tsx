// components/PinnedStocksPanel.tsx
"use client";

import { useState, useEffect } from "react";
import { usePinned } from "../../context/PinnedStocksContext";

export default function PinnedStocksPanel() {
  const { pinnedSymbols } = usePinned();
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/stockdaily")
      .then(r => r.json())
      .then(data => {
        const latest: Record<string, number> = {};
        for (const [symbol, entries] of Object.entries(data) as any) {
          if (entries?.length) latest[symbol] = Number(entries.at(-1).price);
        }
        setPrices(latest);
      });
  }, []);

  if (pinnedSymbols.size === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, position: "absolute", top: "100%", right: 16, zIndex: 1000, paddingTop: 8 }}>
      {Array.from(pinnedSymbols).map(symbol => (
        <div key={symbol} style={{ background: "#151c2c", border: "1px solid #1e2d3d", borderRadius: 8, padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, minWidth: 160, boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "#00c853", fontSize: 10 }}>★</span>
            <span style={{ color: "#ffffff", fontWeight: 700, fontSize: 13 }}>{symbol}</span>
          </div>
          <span style={{ color: "#ffffff", fontSize: 16, fontWeight: 600 }}>
            {prices[symbol] !== undefined ? `$${prices[symbol].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—"}
          </span>
        </div>
      ))}
    </div>
  );
}