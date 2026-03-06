// app/stocks/page.tsx
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import StockChart from "@/components/StockChart";

interface StockData {
  time: string;
  price: number | string;
}

type Range = "30" | "7" | "1";

export default function StockPage() {
  const [stocksMonthly, setStocksMonthly] = useState<Record<string, StockData[]>>({});
  const [stocksDaily, setStocksDaily] = useState<Record<string, StockData[]>>({});
  const [ranges, setRanges] = useState<Record<string, Range>>({});

  const fetchMonthly = async () => {
    const res = await fetch("/api/stockdb");
    const data = await res.json();
    setStocksMonthly(data);
    setRanges(prev => {
      const updated = { ...prev };
      Object.keys(data).forEach(symbol => {
        if (!updated[symbol]) updated[symbol] = "30";
      });
      return updated;
    });
  };

  const fetchDaily = async () => {
    const res = await fetch("/api/stockdaily");
    const data = await res.json();
    setStocksDaily(data);
  };

  useEffect(() => {
    fetchMonthly();
    fetchDaily();
    const interval = setInterval(() => {
      fetchMonthly();
      fetchDaily();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleRangeChange = (symbol: string, range: Range) => {
    setRanges(prev => ({ ...prev, [symbol]: range }));
  };

  return (
    <>
      <Navbar />
      <div style={{ background: "#ebebeb", minHeight: "100vh", padding: 20 }}>
        {Object.keys(stocksMonthly).map(symbol => (
          <StockChart
            key={symbol}
            symbol={symbol}
            monthlyData={stocksMonthly[symbol] ?? []}
            dailyData={stocksDaily[symbol] ?? []}
            range={ranges[symbol] ?? "30"}
            onRangeChange={handleRangeChange}
          />
        ))}
      </div>
    </>
  );
}