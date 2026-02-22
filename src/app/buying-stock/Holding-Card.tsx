"use client";

import React from "react";
import { Card, CardContent, Typography, Box, Stack, Divider } from "@mui/material";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const themeColor = {
  primary: '#10b981', // เขียว (กำไร)
  danger: '#ef4444',  // แดง (ขาดทุน)
  secondary: '#1e293b',
  textSecondary: '#64748b',
};

interface HoldingCardProps {
  symbol: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
}

export default function HoldingCard({ symbol, shares, avgCost, currentPrice }: HoldingCardProps) {
  // คำนวณมูลค่ารวม และ กำไร/ขาดทุน
  const totalCost = shares * avgCost;
  const marketValue = shares * currentPrice;
  const totalReturn = marketValue - totalCost;
  const returnPercentage = (totalReturn / totalCost) * 100;

  const isProfit = totalReturn >= 0;

  // ถ้าไม่ได้ถือหุ้นตัวนี้เลย ให้แสดงหน้าว่างๆ
  if (shares <= 0) {
    return (
      <Card sx={{ borderRadius: 6, border: '1px solid #eef2f6', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary" fontWeight={600}>คุณยังไม่ได้ถือครองหุ้น {symbol}</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ 
      borderRadius: 6, 
      border: '1px solid #eef2f6', 
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
      bgcolor: '#fff',
      overflow: 'hidden'
    }}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={4} divider={<Divider orientation="vertical" flexItem />}>
          
          {/* ส่วนที่ 1: หัวข้อพอร์ต */}
          <Box display="flex" alignItems="center" gap={2} minWidth="200px">
            <Box sx={{ bgcolor: 'rgba(30, 41, 59, 0.05)', p: 1.5, borderRadius: 3, display: 'flex' }}>
              <BusinessCenterIcon sx={{ color: themeColor.secondary }} />
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: themeColor.textSecondary, fontWeight: 700, letterSpacing: 1 }}>
                YOUR POSITION
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, color: themeColor.secondary }}>
                {symbol}
              </Typography>
            </Box>
          </Box>

          {/* ส่วนที่ 2: ข้อมูลหุ้น (หุ้นที่มี, ทุนเฉลี่ย, ราคาปัจจุบัน) */}
          <Stack direction="row" spacing={4} flex={1} justifyContent="space-around" width="100%">
            <Box textAlign="center">
              <Typography variant="caption" color="text.secondary" fontWeight={600}>Shares Owned</Typography>
              <Typography variant="h6" fontWeight={800} color={themeColor.secondary}>
                {shares.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="caption" color="text.secondary" fontWeight={600}>Average Cost</Typography>
              <Typography variant="h6" fontWeight={800} color={themeColor.secondary}>
                ${avgCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="caption" color="text.secondary" fontWeight={600}>Current Price</Typography>
              <Typography variant="h6" fontWeight={800} color={themeColor.secondary}>
                ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </Typography>
            </Box>
          </Stack>

          {/* ส่วนที่ 3: กำไร / ขาดทุน */}
          <Box minWidth="150px" textAlign={{ xs: 'center', md: 'right' }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>Total Return</Typography>
            <Box display="flex" alignItems="center" justifyContent={{ xs: 'center', md: 'flex-end' }} gap={0.5}>
              {isProfit ? <TrendingUpIcon sx={{ color: themeColor.primary }} /> : <TrendingDownIcon sx={{ color: themeColor.danger }} />}
              <Typography variant="h5" fontWeight={900} sx={{ color: isProfit ? themeColor.primary : themeColor.danger }}>
                {isProfit ? '+' : '-'}${Math.abs(totalReturn).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </Typography>
            </Box>
            <Typography variant="subtitle2" fontWeight={800} sx={{ color: isProfit ? themeColor.primary : themeColor.danger }}>
              ({isProfit ? '+' : ''}{returnPercentage.toFixed(2)}%)
            </Typography>
          </Box>

        </Stack>
      </CardContent>
    </Card>
  );
}