// components/PinButton.tsx
"use client";

import { useState } from "react";
import { pinStock } from "@/app/action/pinStock";

interface PinButtonProps {
  symbol: string;
}

export default function PinButton({ symbol }: PinButtonProps) {
  const [pinned, setPinned] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePin = async () => {
    setLoading(true);
    try {
      const result = await pinStock(symbol);
      setPinned(result.pinned);
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
        bottom: 8,
        right: 8,
        width: 36,
        height: 36,
        background: pinned ? "#00c853" : "#ccc",
        border: "2px solid #999",
        borderRadius: 6,
        cursor: loading ? "wait" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        transition: "background 0.2s",
      }}
    >
      {loading ? "…" : pinned ? "📌" : "📍"}
    </button>
  );
}