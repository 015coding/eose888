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

  return (
    <div style={{ marginBottom: 40 }}>
      <h2
        style={{
          color: "#1e2520",
          background: "#b3b3b3",
          padding: "8px 16px",
          borderRadius: 8,
          fontSize: "14px",
          fontWeight: "800",
          display: "inline-block",
        }}
      >
        {symbol} Chart
      </h2>

      <div
        style={{
          position: "relative",
          width: "50%",
          height: 300,
          background: "#e0e0e0",
          border: "2px solid black",
        }}
      >
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                ticks={range === "1" ? dailyTicks : undefined}
                interval={range === "1" ? 0 : 4}
                tickFormatter={
                  range === "1" ? (val: string) => val.slice(0, 2) + ":00" : undefined
                }
              />
              <YAxis
                domain={domain}
                tickFormatter={v => Math.round(Number(v)).toLocaleString()}
              />
              <Tooltip content={<StockTooltip />} />
              <Line dataKey="price" stroke="#00c853" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p style={{ padding: 20, color: "#666" }}>Loading...</p>
        )}

        <PinButton symbol={symbol} />
      </div>

      <RangeSelector symbol={symbol} currentRange={range} onChange={onRangeChange} />
    </div>
  );
}