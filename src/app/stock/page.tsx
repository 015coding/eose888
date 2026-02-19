"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import Navbar from "@/components/Navbar";

interface StockData {
  time: string;
  price: number | string;
}

const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = d.toLocaleString("en", { month: "short" });
  const year = d.getFullYear().toString().slice(-2);
  return `${day} ${month} '${year}`;
};

const formatTime = (dateStr: string): string => {
  const d = new Date(dateStr);
  // Convert UTC to Bangkok (UTC+7)
  const bangkokHours = (d.getUTCHours() + 7) % 24;
  const bangkokMinutes = d.getUTCMinutes();
  return `${bangkokHours.toString().padStart(2, "0")}:${bangkokMinutes.toString().padStart(2, "0")}`;
};

// Returns true only for timestamps that fall exactly on a 3-hour mark (Bangkok time)
const isEvery3Hours = (dateStr: string): boolean => {
  const d = new Date(dateStr);
  const bangkokHours = (d.getUTCHours() + 7) % 24;
  const minutes = d.getUTCMinutes();
  return minutes === 0 && bangkokHours % 3 === 0;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "green", padding: 12, borderRadius: 8 }}>
        <p>{label}</p>
        <p>${Number(payload[0].value).toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export default function StockPage() {
  const [stocksMonthly, setStocksMonthly] = useState<Record<string, StockData[]>>({});
  const [stocksDaily, setStocksDaily] = useState<Record<string, StockData[]>>({});
  const [ranges, setRanges] = useState<Record<string, "30" | "7" | "1">>({});

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

  const allSymbols = Object.keys(stocksMonthly);

  return (
    <>
      <Navbar />
      <div style={{ background: "#ebebeb", minHeight: "100vh", padding: 20 }}>
        {allSymbols.map(symbol => {
          const currentRange = ranges[symbol] || "30";

          const rawData =
            currentRange === "1"
              ? stocksDaily[symbol] ?? []
              : stocksMonthly[symbol] ?? [];

          // For daily view, keep original time strings for tick filtering,
          // then format separately for display
          const formattedData = rawData.map(d => ({
            ...d,
            originalTime: d.time, // keep raw for tick filtering
            time: currentRange === "1" ? formatTime(d.time) : formatDate(d.time)
          }));

          const chartData =
            currentRange === "7"
              ? formattedData.slice(-7)
              : formattedData;

          // For daily view: only show ticks on 3-hour marks
          const dailyTicks = currentRange === "1"
            ? chartData
                .filter(d => isEvery3Hours(d.originalTime))
                .map(d => d.time)
            : undefined;

          const validPrices = chartData.map(d => Number(d.price)).filter(v => !isNaN(v));
          let domain: [number, number] | ["auto", "auto"] = ["auto", "auto"];
          if (validPrices.length > 0) {
            const min = Math.min(...validPrices);
            const max = Math.max(...validPrices);
            const padding = (max - min) * 0.2 || 10;
            domain = [min - padding, max + padding];
          }

          return (
            <div key={symbol} style={{ marginBottom: 40 }}>
              <h2 style={{
                color: "#1e2520",
                background: "#b3b3b3",
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: "14px",
                fontWeight: "800",
                display: "inline-block"
              }}>
                {symbol} Chart
              </h2>

              <div style={{
                width: "50%",
                height: 300,
                background: "#e0e0e0",
                border: "2px solid black"
              }}>
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="time"
                        ticks={currentRange === "1" ? dailyTicks : undefined}
                        interval={currentRange === "1" ? 0 : 4}
                        tickFormatter={
                          currentRange === "1"
                            ? (val: string) => val.slice(0, 2) + ":00" // strip minutes, show hour only
                            : undefined
                        }
                      />
                      <YAxis
                        domain={domain}
                        tickFormatter={v => Math.round(Number(v)).toLocaleString()}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        dataKey="price"
                        stroke="#00c853"
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p style={{ padding: 20, color: "#666" }}>Loading...</p>
                )}
              </div>

              <div style={{ marginTop: 10 }}>
                {(["30", "7", "1"] as const).map(range => (
                  <button
                    key={range}
                    onClick={() => setRanges(prev => ({ ...prev, [symbol]: range }))}
                    style={{
                      marginRight: 10,
                      padding: "6px 12px",
                      background: currentRange === range ? "#00c853" : "#ccc",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer"
                    }}
                  >
                    {range === "30" ? "30 Days" : range === "7" ? "7 Days" : "1 Day"}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}