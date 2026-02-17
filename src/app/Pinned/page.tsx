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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "green", padding: 12, borderRadius: 8 }}>
        <p>{label}</p>
        <p>${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export default function StockPage() {
  const [stocks, setStocks] = useState({});

  useEffect(() => {
    const fetchData = () => {
      fetch("/api/stock")
        .then(r => r.json())
        .then(setStocks);
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: "grey", minHeight: "100vh", padding: 20 }}>

      {Object.entries(stocks).map(([symbol, data]) => {

        const validPrices = data
          .map(d => Number(d.price))
          .filter(v => !isNaN(v));

        let domain = ["auto", "auto"];

        if (validPrices.length > 0) {
          const min = Math.min(...validPrices);
          const max = Math.max(...validPrices);
          const padding = (max - min) * 0.2 || 10;

          domain = [min - padding, max + padding];
        }

        return (
          <div key={symbol} style={{ marginBottom: 40 }}>

            <h2 style={{ color: "#00e676" }}>
              {symbol} Chart
            </h2>

            <div style={{
              width: "100%",
              height: 400,
              background: "white",
              border: "2px solid black"
            }}>
              {data.length > 0 && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis
                      domain={domain}
                      tickFormatter={v => Math.round(v).toLocaleString()}
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

          </div>
        );
      })}

    </div>
  );
}
