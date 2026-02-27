"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import StockChart from "@/components/StockChart";
import { usePinned } from "../../../context/PinnedStocksContext";
import { pinStock } from "@/app/action/pinStock";
import { Box } from "@mui/material";

interface StockData {
  time: string;
  price: number | string;
}

type Range = "30" | "7" | "1";

const themeColor = { background: '#ebebeb' };

export default function PinnedStocksPage() {
  const { pinnedSymbols, refresh } = usePinned();
  const symbols = Array.from(pinnedSymbols);

  const [stocksMonthly, setStocksMonthly] = useState<Record<string, StockData[]>>({});
  const [stocksDaily, setStocksDaily] = useState<Record<string, StockData[]>>({});
  const [ranges, setRanges] = useState<Record<string, Range>>({});
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [allSymbols, setAllSymbols] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/stockdb").then(r => r.json()),
      fetch("/api/stockdaily").then(r => r.json()),
    ]).then(([monthly, daily]) => {
      setStocksMonthly(monthly);
      setStocksDaily(daily);
      setAllSymbols(Object.keys(monthly));
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

  const handleSelect = async (sym: string) => {
    if (pinnedSymbols.has(sym)) return;
    await pinStock(sym);
    refresh();
    setQuery("");
    setShowDropdown(false);
  };

  const dropdownSymbols = allSymbols.filter(s =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  const visibleSymbols = query.trim() === ""
    ? symbols
    : symbols.filter(s => s.toLowerCase().includes(query.toLowerCase()));

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
              placeholder="Search to pin a stock..."
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

            {showDropdown && dropdownSymbols.length > 0 && (
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
                  maxHeight: 240,
                  overflowY: "auto",
                }}
              >
                {dropdownSymbols.map(s => {
                  const isPinned = pinnedSymbols.has(s);
                  return (
                    <div
                      key={s}
                      onMouseDown={() => handleSelect(s)}
                      style={{
                        padding: "8px 16px",
                        color: isPinned ? "#4a5d70" : "#fff",
                        fontWeight: 500,
                        fontSize: 14,
                        cursor: isPinned ? "default" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => {
                        if (!isPinned) e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                      }}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      {s}
                      {isPinned && (
                        <span style={{ color: "#00c853", fontSize: 10 }}>★ pinned</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {symbols.length === 0 ? (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", gap: 2 }}>
              {/* <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="120" height="120" rx="24" fill="#1e293b"/>
                <path d="M20 85 L35 65 L50 72 L65 45 L80 55 L100 30" stroke="#2a3a4a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 85 L35 65 L50 72 L65 45 L80 55 L100 30" stroke="#00c853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 4" opacity="0.4"/>
                <circle cx="60" cy="60" r="18" fill="#151c2c" stroke="#2a3a4a" strokeWidth="1.5"/>
                <path d="M54 60 L58 64 L66 56" stroke="#4a5d70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="84" cy="36" r="5" fill="#1e293b" stroke="#00c853" strokeWidth="1.5"/>
                <path d="M82 36 L84 38 L87 33" stroke="#00c853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
              </svg> */}
              <img
              src="/image/about/cat2.png"
              alt="No pinned stocks"
              style={{ width: 300, opacity: 0.7 }}
              />
              <p style={{ color: "#4a5d70", fontSize: 16, fontWeight: 600, margin: 0 }}>
                No pinned stocks yet
              </p>
              <p style={{ color: "#334155", fontSize: 13, margin: 0 }}>
                Search above to pin a stock and track it here.
              </p>
            </Box>
          ) : visibleSymbols.length === 0 ? (
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "40vh" }}>
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