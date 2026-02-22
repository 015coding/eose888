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
    <div style={{ background: "green", padding: 12, borderRadius: 8 }}>
      <p>{label}</p>
      <p>${Number(payload[0].value).toFixed(2)}</p>
    </div>
  );
}