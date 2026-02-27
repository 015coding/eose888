"use client";

import { Box, Typography, Stack, Card, Chip } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const themeColor = {
  primary: "#10b981",
  primaryBg: "#d1fae5",
  danger: "#ef4444",
  dangerBg: "#fee2e2",
  secondary: "#0f172a",
  textSecondary: "#64748b",
  surface: "#f8fafc",
  border: "#e2e8f0",
};

export type Holding = {
  stockId: string;
  quantity: number;
  avgCost: number;
  currentPrice: number;
};

export function HoldingCard({ stockId, quantity, avgCost, currentPrice }: Holding) {
  const totalCost = quantity * avgCost;
  const marketValue = quantity * currentPrice;
  const totalReturn = marketValue - totalCost;
  const returnPercentage = totalCost > 0 ? (totalReturn / totalCost) * 100 : 0;
  const isProfit = totalReturn >= 0;

  return (
    <Card sx={{
      borderRadius: 4, border: `1px solid ${themeColor.border}`,
      boxShadow: "0 4px 20px rgba(0,0,0,0.03)", bgcolor: "#fff", overflow: "hidden",
      transition: "transform 0.2s",
      "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 25px rgba(0,0,0,0.06)" },
    }}>
      <Box sx={{ p: { xs: 2.5, sm: 3 }, display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, gap: 2 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Box sx={{ bgcolor: themeColor.surface, p: 1.5, borderRadius: 3, display: "flex", border: `1px solid ${themeColor.border}` }}>
            <BusinessCenterIcon sx={{ color: themeColor.secondary }} />
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: themeColor.textSecondary, fontWeight: 700, letterSpacing: 1 }}>POSITION</Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: themeColor.secondary }}>{stockId}</Typography>
          </Box>
        </Box>
        <Box textAlign={{ xs: "left", sm: "right" }} width={{ xs: "100%", sm: "auto" }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={0.5}>Market Value</Typography>
          <Typography variant="h4" fontWeight={900} color={themeColor.secondary} sx={{ lineHeight: 1 }}>
            ${marketValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Typography>
          <Box display="flex" alignItems="center" justifyContent={{ xs: "flex-start", sm: "flex-end" }} mt={1.5}>
            <Chip
              icon={isProfit ? <TrendingUpIcon /> : <TrendingDownIcon />}
              label={`${isProfit ? "+" : "-"}$${Math.abs(totalReturn).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${isProfit ? "+" : ""}${returnPercentage.toFixed(2)}%)`}
              size="small"
              sx={{ fontWeight: 800, color: isProfit ? themeColor.primary : themeColor.danger, bgcolor: isProfit ? themeColor.primaryBg : themeColor.dangerBg, borderRadius: 2, px: 0.5, "& .MuiChip-icon": { color: "inherit" } }}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ bgcolor: themeColor.surface, p: { xs: 2.5, sm: 3 }, borderTop: `1px solid ${themeColor.border}` }}>
        <Box display="flex" flexWrap="wrap" columnGap={{ xs: 4, sm: 6, md: 8 }} rowGap={3}>
          <Box minWidth={{ xs: "40%", sm: "auto" }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">Shares</Typography>
            <Typography variant="subtitle1" fontWeight={800} color={themeColor.secondary}>
              {quantity.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 8 })}
            </Typography>
          </Box>
          <Box minWidth={{ xs: "40%", sm: "auto" }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">Avg Cost</Typography>
            <Typography variant="subtitle1" fontWeight={800} color={themeColor.secondary}>
              ${avgCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
            </Typography>
          </Box>
          <Box minWidth={{ xs: "40%", sm: "auto" }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">Current</Typography>
            <Typography variant="subtitle1" fontWeight={800} color={themeColor.secondary}>
              ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
            </Typography>
          </Box>
          <Box minWidth={{ xs: "40%", sm: "auto" }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">Total Cost</Typography>
            <Typography variant="subtitle1" fontWeight={800} color={themeColor.secondary}>
              ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}