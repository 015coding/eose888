"use client";

import { useEffect, useState } from "react";
import {
  Box, Typography, Card, CardContent, Chip, CircularProgress
} from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

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
  PENDING:   { label: 'รอดำเนินการ', color: '#f59e0b', bg: '#fef3c7', icon: null },
  CANCELLED: { label: 'ยกเลิก',     color: '#94a3b8', bg: '#f1f5f9', icon: null },
};

export default function StockTransactionList({ symbol, refreshKey }: { symbol: string; refreshKey?: number }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!symbol) return;
    setLoading(true);
    fetch(`/api/buying-stock/transactions?symbol=${symbol}`)
      .then(r => r.json())
      .then(data => setTransactions(data))
      .finally(() => setLoading(false));
  }, [symbol, refreshKey]);

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
            return (
              <Box key={tx.id} sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                p: 2, borderRadius: 4, bgcolor: '#f8fafc', border: '1px solid #f1f5f9',
              }}>
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

                <Box textAlign="right">
                  <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b' }}>
                    {tx.quantity.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 8 })} หุ้น
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    @ ${tx.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })} = <strong>${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}