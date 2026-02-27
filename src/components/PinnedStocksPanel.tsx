// components/PinnedStocksPanel.tsx
"use client";

import { useState, useEffect } from "react";
import { usePinned } from "../../context/PinnedStocksContext";

interface PriceInfo {
  price: number;
  prev: number;
}

export default function PinnedStocksPanel() {
  const { pinnedSymbols } = usePinned();
  const [prices, setPrices] = useState<Record<string, PriceInfo>>({});

  useEffect(() => {
    fetch("/api/stockdaily")
      .then(r => r.json())
      .then(data => {
        const latest: Record<string, PriceInfo> = {};
        for (const [symbol, entries] of Object.entries(data) as any) {
          if (entries?.length >= 2) {
            latest[symbol] = {
              price: Number(entries.at(-1).price),
              prev: Number(entries.at(-2).price),
            };
          } else if (entries?.length === 1) {
            latest[symbol] = {
              price: Number(entries.at(-1).price),
              prev: Number(entries.at(-1).price),
            };
          }
        }
        setPrices(latest);
      });
  }, []);

  if (pinnedSymbols.size === 0) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        position: "absolute",
        top: "100%",
        right: 16,
        zIndex: 1000,
        paddingTop: 8,
      }}
    >
      {Array.from(pinnedSymbols).map(symbol => {
        const info = prices[symbol];
        const isUp = info ? info.price >= info.prev : null;
        const priceColor = isUp === null ? "#ffffff" : isUp ? "#00c853" : "#ff4d4d";

        return (
          <div
            key={symbol}
            style={{
              background: "#151c2c",
              border: "1px solid #1e2d3d",
              borderRadius: 8,
              padding: "8px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              minWidth: 160,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#00c853", fontSize: 10 }}>★</span>
              <span style={{ color: "#ffffff", fontWeight: 700, fontSize: 13 }}>
                {symbol}
              </span>
            </div>
            <span style={{ color: priceColor, fontSize: 14, fontWeight: 600 }}>
              {info !== undefined
                ? `$ ${info.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : "—"}
            </span>
          </div>
        );
      })}
    </div>
  );
}