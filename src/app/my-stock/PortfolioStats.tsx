"use client";

import { Box, Typography, Stack, Card, CardContent } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PieChartIcon from "@mui/icons-material/PieChart";

const themeColor = {
  primary: "#10b981",
  danger: "#ef4444",
  secondary: "#0f172a",
  textSecondary: "#64748b",
};

interface PortfolioStatsProps {
  totalMarketValue: number;
  totalCost: number;
}

export default function PortfolioStats({ totalMarketValue, totalCost }: PortfolioStatsProps) {
  const totalReturn = totalMarketValue - totalCost;
  const returnPercent = totalCost > 0 ? (totalReturn / totalCost) * 100 : 0;
  const isOverallProfit = totalReturn >= 0;

  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
      <Card sx={{ flex: 1, borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "none" }}>
        <CardContent sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ p: 2, bgcolor: "rgba(15, 23, 42, 0.05)", borderRadius: 3, display: "flex" }}>
            <AccountBalanceWalletIcon sx={{ color: themeColor.secondary }} />
          </Box>
          <Box>
            <Typography variant="caption" color={themeColor.textSecondary} fontWeight={700}>
              TOTAL MARKET VALUE
            </Typography>
            <Typography variant="h5" fontWeight={900} color={themeColor.secondary}>
              ${totalMarketValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ flex: 1, borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "none" }}>
        <CardContent sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ p: 2, bgcolor: isOverallProfit ? "#d1fae5" : "#fee2e2", borderRadius: 3, display: "flex" }}>
            <ShowChartIcon sx={{ color: isOverallProfit ? themeColor.primary : themeColor.danger }} />
          </Box>
          <Box>
            <Typography variant="caption" color={themeColor.textSecondary} fontWeight={700}>
              TOTAL RETURN
            </Typography>
            <Stack direction="row" alignItems="baseline" spacing={1}>
              <Typography variant="h5" fontWeight={900} color={isOverallProfit ? themeColor.primary : themeColor.danger}>
                {isOverallProfit ? "+" : "-"}${Math.abs(totalReturn).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </Typography>
              <Typography variant="subtitle2" fontWeight={800} color={isOverallProfit ? themeColor.primary : themeColor.danger}>
                ({isOverallProfit ? "+" : ""}{returnPercent.toFixed(2)}%)
              </Typography>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ flex: 1, borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "none" }}>
        <CardContent sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ p: 2, bgcolor: "rgba(100, 116, 139, 0.1)", borderRadius: 3, display: "flex" }}>
            <PieChartIcon sx={{ color: themeColor.textSecondary }} />
          </Box>
          <Box>
            <Typography variant="caption" color={themeColor.textSecondary} fontWeight={700}>
              TOTAL INVESTED
            </Typography>
            <Typography variant="h5" fontWeight={900} color={themeColor.secondary}>
              ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}