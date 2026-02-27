"use client";

import React, { useState, useEffect, useRef } from "react";
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRangeChange = (sym: string, range: Range) => {
    setRanges(prev => ({ ...prev, [sym]: range }));
  };

  const filteredSymbols = symbols.filter(s =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  const visibleSymbols = query.trim() === "" ? symbols : filteredSymbols;

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
                placeholder="Filter pinned stocks..."
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
                      onMouseDown={() => {
                        setQuery(s);
                        setShowDropdown(false);
                      }}
                      style={{
                        padding: "8px 16px",
                        color: "#fff",
                        fontWeight: 500,
                        fontSize: 14,
                        cursor: "pointer",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <span style={{ color: "#00c853", marginRight: 6, fontSize: 10 }}>★</span>
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
         

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
          ) : visibleSymbols.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "40vh",
              }}
            >
              <p style={{ color: "#4a5d70", fontSize: 16, fontWeight: 600 }}>
                No pinned stocks match "{query}".
              </p>
            </Box>
          ) : (
            visibleSymbols.map(symbol => (
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