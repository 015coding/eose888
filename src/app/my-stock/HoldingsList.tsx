"use client";

import { Box, Typography, Stack } from "@mui/material";
import { HoldingCard, Holding } from "./HoldingCard";

const themeColor = {
  primary: "#10b981",
  secondary: "#0f172a",
};

interface HoldingsListProps {
  holdings: Holding[];
  selectedSymbol: string;
  onSelect: (symbol: string) => void;
}

export default function HoldingsList({ holdings, selectedSymbol, onSelect }: HoldingsListProps) {
  return (
    <Box flex={1}>
      <Stack spacing={3}>
        {holdings.map((h) => (
          <Box
            key={h.stockId}
            onClick={() => onSelect(h.stockId)}
            sx={{
              cursor: "pointer", transition: "all 0.2s ease-in-out",
              transform: selectedSymbol === h.stockId ? "scale(1.01)" : "scale(1)",
              opacity: selectedSymbol === h.stockId ? 1 : 0.6,
              border: selectedSymbol === h.stockId ? `2px solid ${themeColor.primary}` : "2px solid transparent",
              borderRadius: 5,
              "&:hover": { opacity: 1 }
            }}
          >
            <HoldingCard {...h} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}