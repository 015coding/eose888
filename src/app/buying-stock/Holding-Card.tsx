"use client";

import React from "react";
import { Card, Typography, Box, Chip } from "@mui/material";
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

interface HoldingCardProps {
  symbol: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
}

export default function HoldingCard({
  symbol,
  shares,
  avgCost,
  currentPrice,
}: HoldingCardProps) {
  const totalCost = shares * avgCost;
  const marketValue = shares * currentPrice;
  const totalReturn = marketValue - totalCost;
  const returnPercentage = totalCost > 0 ? (totalReturn / totalCost) * 100 : 0;
  const isProfit = totalReturn >= 0;

  if (shares <= 0) {
    return (
      <Card
        sx={{
          borderRadius: 4,
          border: `1px solid ${themeColor.border}`,
          boxShadow: "none",
          bgcolor: themeColor.surface,
        }}
      >
        <Box sx={{ p: 4, textAlign: "center" }}>
          <BusinessCenterIcon
            sx={{ color: themeColor.textSecondary, mb: 1, opacity: 0.5, fontSize: 40 }}
          />
          <Typography color={themeColor.textSecondary} fontWeight={600}>
            คุณยังไม่ได้ถือครองหุ้น {symbol}
          </Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        borderRadius: 4,
        border: `1px solid ${themeColor.border}`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        bgcolor: "#fff",
        overflow: "hidden",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
        },
      }}
    >
      {/* --- ส่วนบน: หัวข้อ และ มูลค่ารวม --- */}
      <Box
        sx={{
          p: { xs: 2.5, sm: 3 },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              bgcolor: themeColor.surface,
              p: 1.5,
              borderRadius: 3,
              display: "flex",
              border: `1px solid ${themeColor.border}`,
            }}
          >
            <BusinessCenterIcon sx={{ color: themeColor.secondary }} />
          </Box>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: themeColor.textSecondary, fontWeight: 700, letterSpacing: 1 }}
            >
              POSITION
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: themeColor.secondary }}>
              {symbol}
            </Typography>
          </Box>
        </Box>

        <Box textAlign={{ xs: "left", sm: "right" }} width={{ xs: "100%", sm: "auto" }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={0.5}>
            Market Value
          </Typography>
          <Typography variant="h4" fontWeight={900} color={themeColor.secondary} sx={{ lineHeight: 1 }}>
            ${marketValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            justifyContent={{ xs: "flex-start", sm: "flex-end" }}
            mt={1.5}
          >
            <Chip
              icon={isProfit ? <TrendingUpIcon /> : <TrendingDownIcon />}
              label={`${isProfit ? "+" : "-"}$${Math.abs(totalReturn).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} (${isProfit ? "+" : ""}${returnPercentage.toFixed(2)}%)`}
              size="small"
              sx={{
                fontWeight: 800,
                color: isProfit ? themeColor.primary : themeColor.danger,
                bgcolor: isProfit ? themeColor.primaryBg : themeColor.dangerBg,
                borderRadius: 2,
                px: 0.5,
                "& .MuiChip-icon": {
                  color: "inherit",
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* --- ส่วนล่าง: รายละเอียดสถิติ (กองไปทางซ้ายด้วย Flex) --- */}
      <Box
        sx={{
          bgcolor: themeColor.surface,
          p: { xs: 2.5, sm: 3 },
          borderTop: `1px solid ${themeColor.border}`,
        }}
      >
        <Box
          display="flex"
          flexWrap="wrap"
          columnGap={{ xs: 4, sm: 6, md: 8 }} // กำหนดระยะห่างแนวนอนระหว่างคอลัมน์
          rowGap={3} // กำหนดระยะห่างแนวตั้งเผื่อจอเล็กแล้วโดนปัดลงบรรทัดใหม่
        >
          <Box minWidth={{ xs: "40%", sm: "auto" }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">
              Shares Owned
            </Typography>
            <Typography variant="subtitle1" fontWeight={800} color={themeColor.secondary}>
              {shares.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 8 })}
            </Typography>
          </Box>

          <Box minWidth={{ xs: "40%", sm: "auto" }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">
              Average Cost
            </Typography>
            <Typography variant="subtitle1" fontWeight={800} color={themeColor.secondary}>
              ${avgCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>
          </Box>

          <Box minWidth={{ xs: "40%", sm: "auto" }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">
              Current Price
            </Typography>
            <Typography variant="subtitle1" fontWeight={800} color={themeColor.secondary}>
              ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>
          </Box>

          <Box minWidth={{ xs: "40%", sm: "auto" }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">
              Total Cost
            </Typography>
            <Typography variant="subtitle1" fontWeight={800} color={themeColor.secondary}>
              ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}