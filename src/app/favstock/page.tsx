"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import StockChart from "@/components/StockChart";
import { usePinned } from "../../../context/PinnedStocksContext";
import { Box } from "@mui/material";

interface StockData {
  time: string;
  price: number | string;
}

type Range = "30" | "7" | "1";

const themeColor = { background: '#ebebeb' };

export default function PinnedStocksPage() {
  const { pinnedSymbols } = usePinned();
  const symbols = Array.from(pinnedSymbols);

  const [stocksMonthly, setStocksMonthly] = useState<Record<string, StockData[]>>({});
  const [stocksDaily, setStocksDaily] = useState<Record<string, StockData[]>>({});
  const [ranges, setRanges] = useState<Record<string, Range>>({});

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

  const handleRangeChange = (sym: string, range: Range) => {
    setRanges(prev => ({ ...prev, [sym]: range }));
  };

  return (
    <>
      <Navbar />
      <Box style={{ background: themeColor.background, minHeight: "100vh", padding: 20 }}>
        <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>

          {symbols.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "60vh",
              }}
            >
              <p style={{ color: "#4a5d70", fontSize: 16, fontWeight: 600 }}>
                No pinned stocks yet — pin a stock from the chart page to see it here.
              </p>
            </Box>
          ) : (
            symbols.map(symbol => (
              <StockChart
                key={symbol}
                symbol={symbol}
                monthlyData={stocksMonthly[symbol] ?? []}
                dailyData={stocksDaily[symbol] ?? []}
                range={ranges[symbol] ?? "30"}
                onRangeChange={handleRangeChange}
                isPinned={true}
                onPinChange={() => {}}
              />
            ))
          )}

        </Box>
      </Box>
    </>
  );
}