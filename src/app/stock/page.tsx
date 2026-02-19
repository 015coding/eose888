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
  const [stocks, setStocks] = useState<Record<string, StockData[]>>({});
  
  const [ranges, setRanges] = useState<Record<string, "30" | "7">>({});

  useEffect(() => {
    const fetchData = () => {
      fetch("/api/stockdb")
        .then(r => r.json())
        .then(data => {
          setStocks(data);

          const initialRanges: Record<string, "30" | "7"> = {};
          Object.keys(data).forEach(symbol => {
            initialRanges[symbol] = "30";
          });

          setRanges(initialRanges);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ background: "#ebebeb", minHeight: "100vh", padding: 20 }}>
        {Object.entries(stocks).map(([symbol, data]) => {

          const currentRange = ranges[symbol] || "30";

          const formattedData = data.map(d => ({
            ...d,
            time: formatDate(d.time)
          }));

          const chartData =
            currentRange === "7"
              ? formattedData.slice(-7)
              : formattedData;

          const validPrices = chartData
            .map(d => Number(d.price))
            .filter(v => !isNaN(v));

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
                {chartData.length > 0 && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="time" 
                        interval={currentRange === "7" ? 0 : 4} 
                      />
                      <YAxis
                        domain={domain}
                        tickFormatter={v =>
                          Math.round(Number(v)).toLocaleString()
                        }
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
                )}
              </div>

              {/* ⭐ ปุ่มแยกรายกราฟ */}
              <div style={{ marginTop: 10 }}>
                <button
                  onClick={() =>
                    setRanges(prev => ({ ...prev, [symbol]: "30" }))
                  }
                  style={{
                    marginRight: 10,
                    padding: "6px 12px",
                    background:
                      currentRange === "30" ? "#00c853" : "#ccc",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer"
                  }}
                >
                  30 Days
                </button>

                <button
                  onClick={() =>
                    setRanges(prev => ({ ...prev, [symbol]: "7" }))
                  }
                  style={{
                    padding: "6px 12px",
                    background:
                      currentRange === "7" ? "#00c853" : "#ccc",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer"
                  }}
                >
                  7 Days
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </>
  );
}
