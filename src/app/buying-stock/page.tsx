"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import TradePanel from "./TradePanel";
import WalletCard from "./WalletCard";
import HoldingCard from "./Holding-Card";
import StockChart from "@/components/StockChart";
import StockTransactionList from "./StockTransactionList";
import { Box, Grid, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

interface StockData {
  time: string;
  price: number | string;
}

type Range = "30" | "7" | "1";

const themeColor = { background: '#ebebeb' };

export default function StockPage() {
  const [stocksMonthly, setStocksMonthly] = useState<Record<string, StockData[]>>({});
  const [stocksDaily, setStocksDaily] = useState<Record<string, StockData[]>>({});
  const [range, setRange] = useState<Range>("30");
  const [symbol, setSymbol] = useState<string>("");
  const [pinnedSymbols, setPinnedSymbols] = useState<Set<string>>(new Set());

  useEffect(() => {
    Promise.all([
      fetch("/api/stockdb").then(r => r.json()),
      fetch("/api/stockdaily").then(r => r.json()),
    ]).then(([monthly, daily]) => {
      setStocksMonthly(monthly);
      setStocksDaily(daily);
      const firstSymbol = Object.keys(monthly)[0];
      if (firstSymbol) setSymbol(firstSymbol);
    });

    const stockInterval = setInterval(() => {
      Promise.all([
        fetch("/api/stockdb").then(r => r.json()),
        fetch("/api/stockdaily").then(r => r.json()),
      ]).then(([monthly, daily]) => {
        setStocksMonthly(monthly);
        setStocksDaily(daily);
      });
    }, 60000);

    return () => clearInterval(stockInterval);
  }, []);

  // Cron check limit orders ทุก 1 นาที
  useEffect(() => {
    const check = () => fetch('/api/buying-stock/check-orders');
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, []);

  const handlePinChange = (sym: string, isPinned: boolean) => {
    setPinnedSymbols(prev => {
      const next = new Set(prev);
      isPinned ? next.add(sym) : next.delete(sym);
      return next;
    });
  };

  const symbols = Object.keys(stocksMonthly);
  const currentPrice = Number(stocksDaily[symbol]?.at(-1)?.price ?? 0);

  return (
    <>
      <Navbar />
      <Box style={{ background: themeColor.background, minHeight: "100vh", padding: 20 }}>
        <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>

          {/* Dropdown เลือกหุ้น */}
          <FormControl size="small" sx={{ mb: 3, minWidth: 160, bgcolor: '#fff', borderRadius: 2 }}>
            <InputLabel>เลือกหุ้น</InputLabel>
            <Select
              value={symbol}
              label="เลือกหุ้น"
              onChange={e => setSymbol(e.target.value)}
            >
              {symbols.map(s => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Chart */}
          {symbol && (
            <StockChart
              symbol={symbol}
              monthlyData={stocksMonthly[symbol] ?? []}
              dailyData={stocksDaily[symbol] ?? []}
              range={range}
              onRangeChange={(_, r) => setRange(r)}
              isPinned={pinnedSymbols.has(symbol)}
              onPinChange={handlePinChange}
            />
          )}

          <Grid container spacing={3}>
            <Grid size={12}>
              <HoldingCard
                symbol={symbol}
                shares={120.45}
                avgCost={145.20}
                currentPrice={currentPrice}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
              <TradePanel symbol={symbol} currentPrice={currentPrice} />
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <WalletCard />
            </Grid>

            <Grid size={12}>
              <StockTransactionList symbol={symbol} />
            </Grid>
          </Grid>

        </Box>
      </Box>
    </>
  );
}