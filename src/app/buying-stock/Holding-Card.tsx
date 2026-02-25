"use client";

import React from "react";
import { Card, CardContent, Typography, Box, Stack, Divider } from "@mui/material";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const themeColor = {
  primary: '#10b981',
  danger: '#ef4444',
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
  const totalCost = shares * avgCost;
  const marketValue = shares * currentPrice;
  const totalReturn = marketValue - totalCost;
  const returnPercentage = totalCost > 0 ? (totalReturn / totalCost) * 100 : 0;
  const isProfit = totalReturn >= 0;

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

          <Stack direction="row" spacing={4} flex={1} justifyContent="space-around" width="100%">
            <Box textAlign="center">
              <Typography variant="caption" color="text.secondary" fontWeight={600}>Shares Owned</Typography>
              <Typography variant="h6" fontWeight={800} color={themeColor.secondary}>
                {shares.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 8 })}
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="caption" color="text.secondary" fontWeight={600}>Average Cost</Typography>
              <Typography variant="h6" fontWeight={800} color={themeColor.secondary}>
                ${avgCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="caption" color="text.secondary" fontWeight={600}>Current Price</Typography>
              <Typography variant="h6" fontWeight={800} color={themeColor.secondary}>
                ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="caption" color="text.secondary" fontWeight={600}>Market Value</Typography>
              <Typography variant="h6" fontWeight={800} color={themeColor.secondary}>
                ${marketValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="caption" color="text.secondary" fontWeight={600}>Total Cost</Typography>
              <Typography variant="h6" fontWeight={800} color={themeColor.secondary}>
                ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Typography>
            </Box>
          </Stack>

          <Box minWidth="150px" textAlign={{ xs: 'center', md: 'right' }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>Total Return</Typography>
            <Box display="flex" alignItems="center" justifyContent={{ xs: 'center', md: 'flex-end' }} gap={0.5}>
              {isProfit ? <TrendingUpIcon sx={{ color: themeColor.primary }} /> : <TrendingDownIcon sx={{ color: themeColor.danger }} />}
              <Typography variant="h5" fontWeight={900} sx={{ color: isProfit ? themeColor.primary : themeColor.danger }}>
                {isProfit ? '+' : '-'}${Math.abs(totalReturn).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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