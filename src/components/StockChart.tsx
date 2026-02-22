// components/StockChart.tsx
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import PinButton from "./PinButton";
import RangeSelector from "./RangeSelector";
import StockTooltip from "./StockTooltip";
import { formatDate, formatTime, isEvery3Hours } from "@/lib/stockUtils";

type Range = "30" | "7" | "1";

interface StockData {
  time: string;
  price: number | string;
}

interface StockChartProps {
  symbol: string;
  monthlyData: StockData[];
  dailyData: StockData[];
  range: Range;
  onRangeChange: (symbol: string, range: Range) => void;
}

export default function StockChart({
  symbol,
  monthlyData,
  dailyData,
  range,
  onRangeChange,
}: StockChartProps) {
  const rawData = range === "1" ? dailyData : monthlyData;

  const formattedData = rawData.map(d => ({
    ...d,
    originalTime: d.time,
    time: range === "1" ? formatTime(d.time) : formatDate(d.time),
  }));

  const chartData = range === "7" ? formattedData.slice(-7) : formattedData;

  const dailyTicks =
    range === "1"
      ? chartData.filter(d => isEvery3Hours(d.originalTime)).map(d => d.time)
      : undefined;

  const validPrices = chartData.map(d => Number(d.price)).filter(v => !isNaN(v));
  let domain: [number, number] | ["auto", "auto"] = ["auto", "auto"];
  if (validPrices.length > 0) {
    const min = Math.min(...validPrices);
    const max = Math.max(...validPrices);
    const padding = (max - min) * 0.2 || 10;
    domain = [min - padding, max + padding];
  }

  const latestPrice = validPrices.at(-1);
  const firstPrice = validPrices[0];
  const priceChange = latestPrice !== undefined && firstPrice !== undefined
    ? latestPrice - firstPrice
    : null;
  const pricePct = priceChange !== null && firstPrice
    ? (priceChange / firstPrice) * 100
    : null;
  const isPositive = priceChange !== null ? priceChange >= 0 : true;

  return (
    <div
      style={{
        marginBottom: 24,
        background: "#151c2c",
        borderRadius: 16,
        padding: 24,
        border: "1px solid #1e2d3d",
        width: "100%",
        //maxWidth: 1200,
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
        position: "relative",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <p style={{ margin: 0, color: "#6b7f94", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
            Price Chart
          </p>
          <h2 style={{ margin: 0, color: "#ffffff", fontSize: 20, fontWeight: 800, letterSpacing: "0.02em" }}>
            {symbol}
          </h2>
        </div>

        <div style={{ textAlign: "right" }}>
          {latestPrice !== undefined && (
            <p style={{ margin: 0, color: "#ffffff", fontSize: 22, fontWeight: 800 }}>
              ${latestPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          )}
          {priceChange !== null && pricePct !== null && (
            <p style={{ margin: "2px 0 0 0", fontSize: 13, fontWeight: 600, color: isPositive ? "#00c853" : "#ff4d4d" }}>
              {isPositive ? "▲" : "▼"} {isPositive ? "+" : ""}{priceChange.toFixed(2)} ({isPositive ? "+" : ""}{pricePct.toFixed(2)}%)
            </p>
          )}
        </div>
      </div>

      {/* Chart */}
      <div style={{ position: "relative", width: "100%", height: 260 }}>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id={`greenGrad-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00c853" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#00c853" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d3d" vertical={false} />
              <XAxis
                dataKey="time"
                ticks={range === "1" ? dailyTicks : undefined}
                interval={range === "1" ? 0 : 4}
                tickFormatter={range === "1" ? (val: string) => val.slice(0, 2) + ":00" : undefined}
                tick={{ fill: "#4a5d70", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={domain}
                tickFormatter={v => "$" + Math.round(Number(v)).toLocaleString()}
                tick={{ fill: "#4a5d70", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={80}
              />
              <Tooltip content={<StockTooltip />} cursor={{ stroke: "#00c853", strokeWidth: 1, strokeDasharray: "4 4" }} />
              <Line
                dataKey="price"
                stroke="#00c853"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5, fill: "#00c853", stroke: "#151c2c", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <p style={{ color: "#4a5d70", fontSize: 32, fontWeight: 800 }}>Market Closed</p>
          </div>
        )}

        <PinButton symbol={symbol} />
      </div>

      {/* Range selector */}
      <RangeSelector symbol={symbol} currentRange={range} onChange={onRangeChange} />
    </div>
  );
}