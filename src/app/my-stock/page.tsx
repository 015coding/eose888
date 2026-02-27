    "use client";

    import React, { useState, useEffect } from "react";
    import Navbar from "@/components/Navbar";
    import { Box, Typography, Stack, CircularProgress } from "@mui/material";
    import StockChart from "@/components/StockChart";
    import PortfolioStats from "./PortfolioStats";
    import HoldingsList from "./HoldingsList";
    import { Holding } from "./HoldingCard";

    type Range = "30" | "7" | "1";

    const themeColor = {
    secondary: "#0f172a",
    textSecondary: "#64748b",
    bg: "#f1f5f9",
    };

    export default function PortfolioPage() {
    const [holdings, setHoldings] = useState<Holding[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSymbol, setSelectedSymbol] = useState<string>("");
    const [stocksMonthly, setStocksMonthly] = useState<Record<string, { time: string; price: number | string }[]>>({});
    const [stocksDaily, setStocksDaily] = useState<Record<string, { time: string; price: number | string }[]>>({});
    const [ranges, setRanges] = useState<Record<string, Range>>({});

    useEffect(() => {
        Promise.all([
        fetch("/api/portfolio/holdings").then(r => r.json()),
        fetch("/api/stockdaily").then(r => r.json()),
        fetch("/api/stockdb").then(r => r.json()),
        ]).then(([holdingsData, dailyData, monthlyData]: [
        { stockId: string; quantity: number; avgCost: number }[],
        Record<string, { time: string; price: number }[]>,
        Record<string, { time: string; price: number }[]>,
        ]) => {
        const merged: Holding[] = holdingsData.map(h => ({
            ...h,
            currentPrice: Number(dailyData[h.stockId]?.at(-1)?.price ?? 0),
        }));
        setHoldings(merged);
        setStocksMonthly(monthlyData);
        setStocksDaily(dailyData);
        setRanges(prev => {
            const updated = { ...prev };
            holdingsData.forEach(h => { if (!updated[h.stockId]) updated[h.stockId] = "30"; });
            return updated;
        });
        if (merged.length > 0) setSelectedSymbol(merged[0].stockId);
        }).finally(() => setLoading(false));
    }, []);

    const totalCost = holdings.reduce((sum, h) => sum + h.quantity * h.avgCost, 0);
    const totalMarketValue = holdings.reduce((sum, h) => sum + h.quantity * h.currentPrice, 0);

    const handleRangeChange = (sym: string, range: Range) => {
        setRanges(prev => ({ ...prev, [sym]: range }));
    };

    if (loading) return (
        <>
        <Navbar />
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
            <CircularProgress sx={{ color: "#10b981" }} />
        </Box>
        </>
    );

return (
        <>
        <Navbar />
        <Box sx={{ bgcolor: themeColor.bg, minHeight: "100vh", p: { xs: 2, md: 4 } }}>
            <Box maxWidth="1400px" mx="auto">

            {/* --- หัวข้อหน้าเว็บ --- */}
            <Box mb={4}>
                <Typography variant="h4" fontWeight={900} color={themeColor.secondary}>My Portfolio</Typography>
                <Typography variant="body1" color={themeColor.textSecondary} mt={0.5}>
                Welcome back, here's your investment overview.
                </Typography>
            </Box>

            {/* --- สรุปพอร์ตโฟลิโอ --- */}
            <Box mb={4}>
                <PortfolioStats totalMarketValue={totalMarketValue} totalCost={totalCost} />
            </Box>

            {holdings.length === 0 ? (
                <Box textAlign="center" py={8}>
                <Typography color={themeColor.textSecondary} fontWeight={600}>ยังไม่มีหุ้นในพอร์ต</Typography>
                </Box>
            ) : (
                <Stack direction={{ xs: "column", lg: "row" }} spacing={4}>
                
                {/* --- ฝั่งซ้าย: คอนเทนเนอร์หลัก --- */}
                <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
                    
                    {/* หัวข้อ "Your Holdings" ตั้งอยู่นิ่งๆ */}
                    <Typography 
                        variant="h6" 
                        fontWeight={700} 
                        color={themeColor.secondary} 
                        mb={2}
                    >
                        Your Holdings
                    </Typography>

                    {/* กล่องรายชื่อหุ้น (Scroll ได้เฉพาะส่วนนี้) */}
                    <Box sx={{ 
                        maxHeight: { lg: "calc(100vh - 320px)" }, // ปรับลบเพิ่มนิดหน่อยเผื่อความสูงของหัวข้อด้านบน
                        overflowY: { lg: "auto" }, 
                        pr: { lg: 1.5 }, 
                        
                        // ตกแต่ง Scrollbar ให้ดูมินิมอล
                        "&::-webkit-scrollbar": { width: "6px" },
                        "&::-webkit-scrollbar-track": { background: "transparent" },
                        "&::-webkit-scrollbar-thumb": { 
                        background: "rgba(15, 23, 42, 0.1)", 
                        borderRadius: "10px" 
                        },
                        "&::-webkit-scrollbar-thumb:hover": { 
                        background: "rgba(15, 23, 42, 0.2)" 
                        },
                    }}>
                        <HoldingsList
                        holdings={holdings}
                        selectedSymbol={selectedSymbol}
                        onSelect={setSelectedSymbol}
                        />
                    </Box>
                </Box>

                {/* --- ฝั่งขวา: กราฟหุ้น (อยู่นิ่งๆ บนจอใหญ่, ขยายเต็มจอบนจอมือถือ) --- */}
                <Box sx={{
                    flex: 1,
                    minWidth: 0,
                    position: { lg: "sticky" },
                    top: { lg: "24px" },
                    // จอเล็กยืดเต็ม (stretch) จอใหญ่จัดชิดบน (flex-start) เพื่อให้ Sticky ทำงาน
                    alignSelf: { xs: "stretch", lg: "flex-start" }, 
                }}>
                    {/* Spacer (ดันกราฟลงมาให้เสมอกล่องซ้ายบนจอใหญ่ ซ่อนบนจอมือถือ) */}
                    <Typography 
                    variant="h6" 
                    mb={2} 
                    sx={{ 
                        visibility: "hidden", 
                        display: { xs: "none", lg: "block" } 
                    }}
                    >
                    Spacer
                    </Typography>

                    {selectedSymbol && (
                    <StockChart
                        symbol={selectedSymbol}
                        monthlyData={stocksMonthly[selectedSymbol] ?? []}
                        dailyData={stocksDaily[selectedSymbol] ?? []}
                        range={ranges[selectedSymbol] ?? "30"}
                        onRangeChange={handleRangeChange}
                    />
                    )}
                </Box>

                </Stack>
            )}
            </Box>
        </Box>
        </>
    );
}