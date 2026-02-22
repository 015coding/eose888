// components/RangeSelector.tsx

type Range = "30" | "7" | "1";

interface RangeSelectorProps {
  symbol: string;
  currentRange: Range;
  onChange: (symbol: string, range: Range) => void;
}

const RANGE_LABELS: Record<Range, string> = {
  "30": "30 Days",
  "7": "7 Days",
  "1": "1 Day",
};

export default function RangeSelector({ symbol, currentRange, onChange }: RangeSelectorProps) {
  return (
    <div style={{ marginTop: 10 }}>
      {(["30", "7", "1"] as Range[]).map(range => (
        <button
          key={range}
          onClick={() => onChange(symbol, range)}
          style={{
            marginRight: 10,
            padding: "6px 12px",
            background: currentRange === range ? "#00c853" : "#ccc",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          {RANGE_LABELS[range]}
        </button>
      ))}
    </div>
  );
}