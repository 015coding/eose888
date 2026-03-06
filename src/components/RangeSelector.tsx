// components/RangeSelector.tsx

type Range = "30" | "7" | "1";

interface RangeSelectorProps {
  symbol: string;
  currentRange: Range;
  onChange: (symbol: string, range: Range) => void;
}

const RANGE_LABELS: Record<Range, string> = {
  "30": "30D",
  "7": "7D",
  "1": "1D",
};

export default function RangeSelector({ symbol, currentRange, onChange }: RangeSelectorProps) {
  return (
    <div
      style={{
        display: "inline-flex",
        background: "rgba(255,255,255,0.05)",
        borderRadius: 8,
        padding: 3,
        gap: 2,
        marginTop: 14,
      }}
    >
      {(["1", "7", "30"] as Range[]).map(range => {
        const active = currentRange === range;
        return (
          <button
            key={range}
            onClick={() => onChange(symbol, range)}
            style={{
              padding: "5px 14px",
              background: active ? "#00c853" : "transparent",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              color: active ? "#0f1923" : "#6b7f94",
              fontWeight: active ? 700 : 500,
              fontSize: 12,
              letterSpacing: "0.05em",
              transition: "all 0.15s",
            }}
          >
            {RANGE_LABELS[range]}
          </button>
        );
      })}
    </div>
  );
}