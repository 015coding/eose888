"use client";

import { useEffect, useState } from "react";
import {
  Box, Typography, Card, CardContent, Chip, CircularProgress, IconButton, Tooltip
} from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import CancelIcon from '@mui/icons-material/Cancel';

type Transaction = {
  id: string;
  stockId: string;
  type: 'BUY' | 'SELL' | 'PENDING' | 'CANCELLED';
  quantity: number;
  price: number;
  tradeDate: string;
};

const TYPE_CONFIG = {
  BUY:       { label: 'ซื้อ',        color: '#10b981', bg: '#d1fae5', icon: <TrendingUpIcon sx={{ fontSize: 16 }} /> },
  SELL:      { label: 'ขาย',        color: '#ef4444', bg: '#fee2e2', icon: <TrendingDownIcon sx={{ fontSize: 16 }} /> },
  PENDING:   { label: 'รอดำเนินการ', color: '#f59e0b', bg: '#fef3c7', icon: <AccessTimeIcon sx={{ fontSize: 16 }} /> },
  CANCELLED: { label: 'ยกเลิก',     color: '#94a3b8', bg: '#f1f5f9', icon: <DoNotDisturbIcon sx={{ fontSize: 16 }} /> },
};

export default function StockTransactionList({ symbol, refreshKey }: { symbol: string; refreshKey?: number }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const fetchTransactions = () => {
    if (!symbol) return;
    setLoading(true);
    fetch(`/api/buying-stock/transactions?symbol=${symbol}`)
      .then(r => r.json())
      .then(data => setTransactions(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTransactions();
  }, [symbol, refreshKey]);

  const handleCancel = async (orderId: string) => {
    setCancellingId(orderId);
    try {
      const res = await fetch('/api/buying-stock/limit-order', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });
      if (res.ok) fetchTransactions();
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" py={4}>
      <CircularProgress sx={{ color: '#10b981' }} size={28} />
    </Box>
  );

  if (transactions.length === 0) return (
    <Box sx={{ textAlign: 'center', py: 4, color: '#94a3b8' }}>
      <Typography variant="body2" fontWeight={600}>ไม่มีประวัติการเทรด {symbol}</Typography>
    </Box>
  );

  return (
    <Card sx={{ borderRadius: 6, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eef2f6' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b', mb: 2 }}>
          ประวัติการเทรด {symbol}
        </Typography>

        <Box display="flex" flexDirection="column" gap={1.5}>
          {transactions.map(tx => {
            const cfg = TYPE_CONFIG[tx.type];
            const total = tx.quantity * tx.price;
            const isPending = tx.type === 'PENDING';
            const isHovered = hoveredId === tx.id;

            return (
              <Box
                key={tx.id}
                onMouseEnter={() => setHoveredId(tx.id)}
                onMouseLeave={() => setHoveredId(null)}
                sx={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  p: 2, borderRadius: 4, bgcolor: '#f8fafc', border: '1px solid #f1f5f9',
                  position: 'relative',
                  transition: 'all 0.2s',
                  ...(isPending && isHovered && {
                    bgcolor: '#fff7ed',
                    border: '1px solid #fed7aa',
                  }),
                }}
              >
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Box sx={{ bgcolor: cfg.bg, color: cfg.color, p: 1, borderRadius: 3, display: 'flex' }}>
                    {cfg.icon ?? <Box sx={{ width: 16, height: 16 }} />}
                  </Box>
                  <Box>
                    <Chip label={cfg.label} size="small" sx={{
                      bgcolor: cfg.bg, color: cfg.color,
                      fontWeight: 800, fontSize: '0.65rem', borderRadius: 2, mb: 0.3
                    }} />
                    <Typography variant="caption" display="block" sx={{ color: '#94a3b8' }}>
                      {new Date(tx.tradeDate).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' })}
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <Box textAlign="right">
                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b' }}>
                      {tx.quantity.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 8 })} หุ้น
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      @ ${tx.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })} = <strong>${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                    </Typography>
                  </Box>

                  {/* ปุ่ม cancel — โชว์เฉพาะ PENDING + hover */}
                  {isPending && (
                    <Tooltip title="ยกเลิก order" placement="left">
                      <IconButton
                        size="small"
                        onClick={() => handleCancel(tx.id)}
                        disabled={cancellingId === tx.id}
                        sx={{
                          color: '#ef4444',
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? 'scale(1)' : 'scale(0.7)',
                          transition: 'all 0.2s',
                          bgcolor: isHovered ? '#fee2e2' : 'transparent',
                          '&:hover': { bgcolor: '#fecaca' },
                          ml: 0.5,
                        }}
                      >
                        {cancellingId === tx.id
                          ? <CircularProgress size={16} color="inherit" />
                          : <CancelIcon fontSize="small" />
                        }
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}