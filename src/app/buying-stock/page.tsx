"use client";

import React, { Suspense, useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import TradePanel from "./TradePanel";
import WalletCard from "./WalletCard";
import HoldingCard from "./Holding-Card";
import StockChart from "@/components/StockChart";
import StockTransactionList from "./StockTransactionList";
import { Box, Grid } from "@mui/material";
import { useSearchParams } from "next/navigation";

interface StockData {
  time: string;
  price: number | string;
}

type Range = "30" | "7" | "1";

const themeColor = { background: '#ebebeb' };

function StockPageContent() {
  const searchParams = useSearchParams();
  const [stocksMonthly, setStocksMonthly] = useState<Record<string, StockData[]>>({});
  const [stocksDaily, setStocksDaily] = useState<Record<string, StockData[]>>({});
  const [ranges, setRanges] = useState<Record<string, Range>>({});
  const [symbol, setSymbol] = useState<string>("");
  const [refreshTx, setRefreshTx] = useState(0);
  const [holding, setHolding] = useState<{ quantity: number; avgCost: number } | null>(null);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/stockdb").then(r => r.json()),
      fetch("/api/stockdaily").then(r => r.json()),
    ]).then(([monthly, daily]) => {
      setStocksMonthly(monthly);
      setStocksDaily(daily);
      setRanges(prev => {
        const updated = { ...prev };
        Object.keys(monthly).forEach(s => { if (!updated[s]) updated[s] = "30"; });
        return updated;
      });

      // ← อ่าน symbol จาก URL ก่อน ถ้าไม่มีค่อยใช้ตัวแรก
      const urlSymbol = searchParams.get("symbol");
      const first = urlSymbol && Object.keys(monthly).includes(urlSymbol)
        ? urlSymbol
        : Object.keys(monthly)[0];

      if (first) {
        setSymbol(first);
        setQuery(first);
      }
    });

    const interval = setInterval(() => {
      Promise.all([
        fetch("/api/stockdb").then(r => r.json()),
        fetch("/api/stockdaily").then(r => r.json()),
      ]).then(([monthly, daily]) => {
        setStocksMonthly(monthly);
        setStocksDaily(daily);
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!symbol) return;
    fetch(`/api/buying-stock/holding?symbol=${symbol}`)
      .then(r => r.json())
      .then(data => setHolding(data ?? { quantity: 0, avgCost: 0 }));
  }, [symbol, refreshTx]);

  useEffect(() => {
    const check = () => fetch('/api/buying-stock/check-orders');
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        setQuery(symbol);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [symbol]);

  const handleRangeChange = (sym: string, range: Range) => {
    setRanges(prev => ({ ...prev, [sym]: range }));
  };

  const handleSelect = (sym: string) => {
    setSymbol(sym);
    setQuery(sym);
    setShowDropdown(false);
  };

  const symbols = Object.keys(stocksMonthly);
  const filteredSymbols = symbols.filter(s =>
    s.toLowerCase().includes(query.toLowerCase())
  );
  const currentPrice = Number(stocksDaily[symbol]?.at(-1)?.price ?? 0);

  return (
    <>
      <Navbar />
      <Box style={{ background: themeColor.background, minHeight: "100vh", padding: 20 }}>
        <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>

          {/* Search bar */}
          <div ref={searchRef} style={{ position: "relative", marginBottom: 16, width: 260 }}>
            <input
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => {
                setQuery("");
                setShowDropdown(true);
              }}
              placeholder="Search stock..."
              style={{
                width: "100%",
                padding: "8px 16px",
                borderRadius: 8,
                border: "none",
                background: "#1e293b",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            {showDropdown && filteredSymbols.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 4px)",
                  left: 0,
                  width: "100%",
                  background: "#1e293b",
                  borderRadius: 8,
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                  zIndex: 1000,
                }}
              >
                {filteredSymbols.map(s => (
                  <div
                    key={s}
                    onMouseDown={() => handleSelect(s)}
                    style={{
                      padding: "8px 16px",
                      color: s === symbol ? "#00c853" : "#fff",
                      fontWeight: s === symbol ? 700 : 500,
                      fontSize: 14,
                      cursor: "pointer",
                      background: s === symbol ? "rgba(0,200,83,0.08)" : "transparent",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                    onMouseLeave={e => (e.currentTarget.style.background = s === symbol ? "rgba(0,200,83,0.08)" : "transparent")}
                  >
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>

          {symbol && (
            <StockChart
              symbol={symbol}
              monthlyData={stocksMonthly[symbol] ?? []}
              dailyData={stocksDaily[symbol] ?? []}
              range={ranges[symbol] ?? "30"}
              onRangeChange={handleRangeChange}
            />
          )}

          <Grid container spacing={3}>
            <Grid size={12}>
              <HoldingCard
                symbol={symbol}
                shares={holding?.quantity ?? 0}
                avgCost={holding?.avgCost ?? 0}
                currentPrice={currentPrice}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
              <TradePanel
                symbol={symbol}
                currentPrice={currentPrice}
                onTradeSuccess={() => setRefreshTx(v => v + 1)}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <WalletCard refreshKey={refreshTx} />
            </Grid>

            <Grid size={12}>
              <StockTransactionList symbol={symbol} refreshKey={refreshTx} />
            </Grid>
          </Grid>

        </Box>
      </Box>
    </>
  );
}

export default function StockPage() {
  return (
    <Suspense fallback={null}>
      <StockPageContent />
    </Suspense>
  );
}