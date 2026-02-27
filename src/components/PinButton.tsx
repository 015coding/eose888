// components/PinButton.tsx
"use client";

import { useState, useEffect, type MouseEvent } from "react";
import { pinStock } from "@/app/action/pinStock";
import { getPinStatus } from "@/app/action/getPinStatus";
import { usePinned } from "../../context/PinnedStocksContext";

interface PinButtonProps {
  symbol: string;
}

export default function PinButton({ symbol }: PinButtonProps) {
  const [pinned, setPinned] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refresh } = usePinned();

  // Fetch pin status on mount
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const result = await getPinStatus(symbol);
        setPinned(result.pinned);
      } catch (e) {
        console.error("Failed to fetch pin status:", e);
      }
    };
    fetchStatus();
  }, [symbol]);

  const handlePin = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);
    try {
      const result = await pinStock(symbol);
      setPinned(result.pinned);
      refresh(); // ← notify navbar instantly
    } catch (e) {
      console.error("Failed to pin:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePin}
      disabled={loading}
      title={pinned ? "Unpin stock" : "Pin stock"}
      style={{
        position: "absolute",
        top: 12,
        right: 12,
        width: 32,
        height: 32,
        background: pinned ? "rgba(0, 200, 83, 0.15)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${pinned ? "#00c853" : "#2a3a4a"}`,
        borderRadius: 6,
        cursor: loading ? "wait" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        transition: "all 0.2s",
        color: pinned ? "#00c853" : "#6b7f94",
      }}
    >
      {loading ? "…" : pinned ? (
        <span style={{ color: "#00c853", textShadow: "0 0 8px rgba(0,200,83,0.6)", fontSize: 16, fontWeight: 600 }}>★</span>
      ) : (
        <span style={{ color: "#6b7f94", textShadow: "0 0 8px rgba(0,200,83,0.6)", fontSize: 16, fontWeight: 600 }}>☆</span>
      )}
    </button>
  );
}