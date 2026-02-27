// components/PinnedStocksPanel.tsx
"use client";

import { useState, useEffect } from "react";
import { getPinnedStocks } from "@/app/action/getPinnedStocks";

interface PinnedStock {
  symbol: string;
  price?: number;
}

export default function PinnedStocksPanel() {
  const [stocks, setStocks] = useState<PinnedStock[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await getPinnedStocks();
        setStocks(result);
      } catch (e) {
        console.error("Failed to fetch pinned stocks:", e);
      }
    };
    load();
  }, []);

  if (stocks.length === 0) return null;

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
      {stocks.map(stock => (
        <div
          key={stock.symbol}
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
              {stock.symbol}
            </span>
          </div>
          <span style={{ color: "#6b7f94", fontSize: 12 }}>
            {stock.price !== undefined
              ? `$${stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
              : "—"}
          </span>
        </div>
      ))}
    </div>
  );
}