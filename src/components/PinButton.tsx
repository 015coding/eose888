// components/PinButton.tsx
"use client";

import { useState,useEffect } from "react";
import { pinStock } from "@/app/action/pinStock";


interface PinButtonProps {
  symbol: string;
  isPinned: boolean;
  onPinChange: (symbol: string, isPinned: boolean) => void;
}


export default function PinButton({ symbol, isPinned, onPinChange }: PinButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePin = async () => {
    setLoading(true);
    try {
      const result = await pinStock(symbol);
      onPinChange(symbol, result.pinned);
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
      title={isPinned ? "Unpin stock" : "Pin stock"}
      style={{
        position: "absolute",
        top: 12,
        right: 12,
        width: 32,
        height: 32,
        background: isPinned ? "rgba(0, 200, 83, 0.15)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${isPinned ? "#00c853" : "#2a3a4a"}`,
        borderRadius: 6,
        cursor: loading ? "wait" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        transition: "all 0.2s",
        color: isPinned ? "#00c853" : "#6b7f94",
      }}
    >
      {loading ? "…" : isPinned ?
        <span style={{ color: "#00c853", textShadow: "0 0 8px rgba(0,200,83,0.6)", fontSize: 16, fontWeight: 800 }}>★</span> :
        <span style={{ color: "#6b7f94", fontSize: 16, fontWeight: 800 }}>☆</span>}
    </button>
  );
}