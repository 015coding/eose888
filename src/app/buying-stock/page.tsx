"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import TradePanel from "./TradePanel";
import WalletCard from "./WalletCard";

import HoldingCard from "./Holding-Card";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer
} from "recharts";
import { Box, Grid } from "@mui/material";

// --- 1. Mock Data สำหรับกราฟหุ้น ---
const MOCK_CHART_DATA = [
  { time: "09:00", price: 150.20 },
  { time: "10:00", price: 152.45 },
  { time: "11:00", price: 151.10 },
  { time: "12:00", price: 153.80 },
  { time: "13:00", price: 155.20 },
  { time: "14:00", price: 154.90 },
  { time: "15:00", price: 157.30 },
  { time: "16:00", price: 156.50 },
];

const themeColor = {
  background: '#ebebeb',
};

// --- 2. Custom Tooltip สำหรับกราฟ ---
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "green", padding: 12, borderRadius: 8, color: "white" }}>
        <p style={{ margin: 0 }}>{label}</p>
        <p style={{ margin: 0 }}>${Number(payload[0].value).toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

// --- 3. ปุ่มปักหมุด (Pin Button) ---
const PinButton = () => {
  const [pinned, setPinned] = useState(false);
  return (
    <button
      onClick={() => setPinned(!pinned)}
      title={pinned ? "Unpin stock" : "Pin stock"}
      style={{
        position: "absolute", bottom: 8, right: 8,
        width: 36, height: 36,
        background: pinned ? "#00c853" : "#ccc",
        border: "2px solid #999", borderRadius: 6,
        cursor: "pointer", display: "flex",
        alignItems: "center", justifyContent: "center",
        fontSize: 18,
      }}
    >
      {pinned ? "📌" : "📍"}
    </button>
  );
};

// --- 4. Component หลัก (Stock Page) ---
export default function StockPage() {
  const [range, setRange] = useState("30");

  // ข้อมูลจำลอง (Mock Data) สำหรับหน้าหุ้น
  const symbol = "EOSE";
  
  // ข้อมูลจำลอง (Mock Data) สำหรับพอร์ตที่ถือครอง (Holding)
  const myShares = 120.45; // จำนวนหุ้นที่ถืออยู่
  const myAvgCost = 145.20; // ราคาต้นทุนเฉลี่ย
  const currentPrice = 156.50; // ราคาหุ้นปัจจุบัน (สมมติให้ตรงกับกราฟล่าสุด)

  return (
    <>
      <Navbar />
      <Box style={{ background: themeColor.background, minHeight: "100vh", padding: 20 }}>
        <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
          
          {/* --- ส่วนที่ 1: กราฟหุ้น (ดีไซน์ดั้งเดิม) --- */}
          <Box sx={{ mb: 6 }}>
            <h2 style={{
              color: "#1e2520", background: "#b3b3b3",
              padding: "8px 16px", borderRadius: 8,
              fontSize: "14px", fontWeight: "800",
              display: "inline-block", margin: "0 0 10px 0"
            }}>
              {symbol} Chart
            </h2>

            <div style={{
              position: "relative", width: "50%", minWidth: "300px",
              height: 300, background: "#e0e0e0", border: "2px solid black"
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={['auto', 'auto']} tickFormatter={v => Math.round(Number(v)).toLocaleString()} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="price" stroke="#00c853" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
              <PinButton />
            </div>

            <div style={{ marginTop: 10 }}>
              {(["30", "7", "1"] as const).map(r => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  style={{
                    marginRight: 10, padding: "6px 12px",
                    background: range === r ? "#00c853" : "#ccc",
                    border: "none", borderRadius: 6,
                    cursor: "pointer", color: range === r ? "white" : "black",
                    fontWeight: "bold"
                  }}
                >
                  {r === "30" ? "30 Days" : r === "7" ? "7 Days" : "1 Day"}
                </button>
              ))}
            </div>
          </Box>

          {/* --- ส่วนที่ 2: แผงข้อมูลและเครื่องมือเทรด --- */}
          <Grid container spacing={3}>
            
            {/* กล่องแสดงสถานะหุ้นที่ถือครอง (HoldingCard) ขยายเต็มความกว้าง */}
            <Grid size={12}>
              <HoldingCard 
                symbol={symbol} 
                shares={myShares} 
                avgCost={myAvgCost} 
                currentPrice={currentPrice} 
              />
            </Grid>

            {/* แผงควบคุมการซื้อขาย (TradePanel) */}
            <Grid size={{ xs: 12, md: 7 }}>
              <TradePanel symbol={symbol} currentPrice={currentPrice} />
            </Grid>

            {/* กล่องแสดงยอดเงินและพอร์ต USD (WalletCard) */}
            <Grid size={{ xs: 12, md: 5 }}>
              <WalletCard />
            </Grid>

          </Grid>
          
        </Box>
      </Box>
    </>
  );
}