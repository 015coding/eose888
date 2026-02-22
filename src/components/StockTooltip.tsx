// components/StockTooltip.tsx

interface TooltipPayload {
  value: number | string;
}

interface StockTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

export default function StockTooltip({ active, payload, label }: StockTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: "#0f1923",
        border: "1px solid #1e3a2f",
        padding: "10px 14px",
        borderRadius: 8,
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
      }}
    >
      <p style={{ margin: 0, color: "#6b7f94", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
        {label}
      </p>
      <p style={{ margin: 0, color: "#00c853", fontSize: 16, fontWeight: 700 }}>
        ${Number(payload[0].value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
    </div>
  );
}