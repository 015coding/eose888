"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import TradePanel from "./TradePanel";
import WalletCard from "./WalletCard";
import HoldingCard from "./Holding-Card";
import StockChart from "@/components/StockChart";
import StockTransactionList from "./StockTransactionList";
import { Box, Grid } from "@mui/material";

interface StockData {
  time: string;
  price: number | string;
}

type Range = "30" | "7" | "1";

const themeColor = { background: '#ebebeb' };

export default function StockPage() {
  const [stocksMonthly, setStocksMonthly] = useState<Record<string, StockData[]>>({});
  const [stocksDaily, setStocksDaily] = useState<Record<string, StockData[]>>({});
  const [ranges, setRanges] = useState<Record<string, Range>>({});
  const [symbol, setSymbol] = useState<string>("");
  const [refreshTx, setRefreshTx] = useState(0);
  const [holding, setHolding] = useState<{ quantity: number; avgCost: number } | null>(null);

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
      const first = Object.keys(monthly)[0];
      if (first) setSymbol(first);
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

  const handleRangeChange = (sym: string, range: Range) => {
    setRanges(prev => ({ ...prev, [sym]: range }));
  };

  const symbols = Object.keys(stocksMonthly);
  const currentPrice = Number(stocksDaily[symbol]?.at(-1)?.price ?? 0);

  return (
    <>
      <Navbar />
      <Box style={{ background: themeColor.background, minHeight: "100vh", padding: 20 }}>
        <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>

          <select
            value={symbol}
            onChange={e => setSymbol(e.target.value)}
            style={{
              marginBottom: 16,
              padding: "8px 16px",
              borderRadius: 8,
              border: "none",
              background: "#1e293b",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              outline: "none",
            }}
          >
            {symbols.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

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