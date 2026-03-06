"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  IconButton,
  Tooltip,
  Pagination
} from "@mui/material";

// ไอคอนตามประเภทของธุรกรรม
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import CancelIcon from '@mui/icons-material/Cancel';


// =========================
// Type ของข้อมูลธุรกรรม
// =========================
type Transaction = {
  id: string;
  stockId: string;
  type: 'BUY' | 'SELL' | 'PENDING' | 'CANCELLED';
  quantity: number;
  price: number;
  tradeDate: string;
  account: { country: string; currency: string } | null;
};


// =====================================
// กำหนด config ของแต่ละสถานะ transaction
// ใช้สำหรับกำหนด label, สี และ icon
// =====================================
const TYPE_CONFIG = {
  BUY:       { label: 'ซื้อ',        color: '#10b981', bg: '#d1fae5', icon: <TrendingUpIcon sx={{ fontSize: 16 }} /> },
  SELL:      { label: 'ขาย',         color: '#ef4444', bg: '#fee2e2', icon: <TrendingDownIcon sx={{ fontSize: 16 }} /> },
  PENDING:   { label: 'รอดำเนินการ', color: '#f59e0b', bg: '#fef3c7', icon: <AccessTimeIcon sx={{ fontSize: 16 }} /> },
  CANCELLED: { label: 'ยกเลิก',      color: '#94a3b8', bg: '#f1f5f9', icon: <DoNotDisturbIcon sx={{ fontSize: 16 }} /> },
};

// จำนวนรายการต่อหน้า
const PAGE_SIZE = 10;


// ======================================================
// Component หลัก
// ======================================================
export default function StockTransactionList({
  symbol,
  refreshKey
}: {
  symbol: string;
  refreshKey?: number;
}) {

  // -------------------------
  // State ต่าง ๆ
  // -------------------------

  // เก็บรายการธุรกรรมทั้งหมดที่ fetch มา
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // loading state สำหรับแสดง spinner
  const [loading, setLoading] = useState(true);

  // เก็บ id ของ order ที่กำลังถูก cancel
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // เก็บ id ของแถวที่กำลัง hover (ใช้สำหรับ animation ปุ่ม cancel)
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // page ปัจจุบันของ pagination
  const [page, setPage] = useState(1);


  // ======================================================
  // ฟังก์ชันดึงข้อมูลธุรกรรมจาก API
  // ======================================================
  const fetchTransactions = () => {

    // ถ้าไม่มี symbol → ไม่ต้อง fetch
    if (!symbol) return;

    setLoading(true);

    fetch(`/api/buying-stock/transactions?symbol=${symbol}`)
      .then(r => r.json())
      .then(data => setTransactions(data))
      .finally(() => setLoading(false));
  };


  // ======================================================
  // useEffect: เรียก fetch ทุกครั้งที่
  // - symbol เปลี่ยน
  // - refreshKey เปลี่ยน (ใช้ force refresh จากภายนอก)
  // ======================================================
  useEffect(() => {
    fetchTransactions();

    // reset หน้าเป็นหน้าแรกทุกครั้งที่หุ้นเปลี่ยน
    setPage(1);
  }, [symbol, refreshKey]);


  // ======================================================
  // ฟังก์ชันยกเลิก order
  // ======================================================
  const handleCancel = async (orderId: string) => {

    // แสดง loading เฉพาะ order ที่กำลัง cancel
    setCancellingId(orderId);

    try {
      const res = await fetch('/api/buying-stock/limit-order', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });

      // ถ้ายกเลิกสำเร็จ → reload รายการใหม่
      if (res.ok) fetchTransactions();

    } finally {
      setCancellingId(null);
    }
  };


  // ======================================================
  // Pagination logic (ฝั่ง client)
  // ======================================================

  // คำนวณจำนวนหน้าทั้งหมด
  const totalPages = Math.ceil(transactions.length / PAGE_SIZE);

  // ตัด array ตาม page ปัจจุบัน
  const paginated = transactions.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );


  // ======================================================
  // Loading State
  // ======================================================
  if (loading) return (
    <Box display="flex" justifyContent="center" py={4}>
      <CircularProgress sx={{ color: '#10b981' }} size={28} />
    </Box>
  );


  // ======================================================
  // Empty State
  // ======================================================
  if (transactions.length === 0) return (
    <Box sx={{ textAlign: 'center', py: 4, color: '#94a3b8' }}>
      <Typography variant="body2" fontWeight={600}>
        ไม่มีประวัติการเทรด {symbol}
      </Typography>
    </Box>
  );


  // ======================================================
  // Main Render
  // ======================================================
  return (
    <Card
      sx={{
        borderRadius: 6,
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        border: '1px solid #eef2f6'
      }}
    >
      <CardContent sx={{ p: 3 }}>

        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>
            ประวัติการเทรด {symbol}
          </Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            {transactions.length} รายการ
          </Typography>
        </Box>


        {/* Transaction List */}
        <Box display="flex" flexDirection="column" gap={1.5}>
          {paginated.map(tx => {

            // config ตามประเภท transaction
            const cfg = TYPE_CONFIG[tx.type];

            // คำนวณมูลค่ารวม
            const total = tx.quantity * tx.price;

            // ตรวจสอบว่ายกเลิกได้หรือไม่
            const isPending = tx.type === 'PENDING';

            // ตรวจสอบว่ากำลัง hover อยู่หรือไม่
            const isHovered = hoveredId === tx.id;

            return (
              <Box
                key={tx.id}

                // จัดการ hover state
                onMouseEnter={() => setHoveredId(tx.id)}
                onMouseLeave={() => setHoveredId(null)}

                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  borderRadius: 4,
                  bgcolor: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  position: 'relative',
                  transition: 'all 0.2s',

                  // เปลี่ยนสีถ้า pending และ hover
                  ...(isPending && isHovered && {
                    bgcolor: '#fff7ed',
                    border: '1px solid #fed7aa'
                  }),
                }}
              >

                {/* ด้านซ้าย: icon + รายละเอียด */}
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Box
                    sx={{
                      bgcolor: cfg.bg,
                      color: cfg.color,
                      p: 1,
                      borderRadius: 3,
                      display: 'flex'
                    }}
                  >
                    {cfg.icon}
                  </Box>

                  <Box>
                    {/* Status Chip */}
                    <Chip
                      label={cfg.label}
                      size="small"
                      sx={{
                        bgcolor: cfg.bg,
                        color: cfg.color,
                        fontWeight: 800,
                        fontSize: '0.65rem',
                        borderRadius: 2,
                        mb: 0.3
                      }}
                    />

                    {/* วันที่ทำรายการ */}
                    <Typography
                      variant="caption"
                      display="block"
                      sx={{ color: '#94a3b8' }}
                    >
                      {new Date(tx.tradeDate).toLocaleString('th-TH', {
                        dateStyle: 'short',
                        timeStyle: 'short'
                      })}
                    </Typography>

                    {/* ข้อมูลบัญชี */}
                    {tx.account && (
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{ color: '#64748b', fontWeight: 700 }}
                      >
                        {tx.account.country} · {tx.account.currency}
                      </Typography>
                    )}
                  </Box>
                </Box>


                {/* ด้านขวา: จำนวนหุ้น + ปุ่ม cancel */}
                <Box display="flex" alignItems="center" gap={1}>
                  <Box textAlign="right">
                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b' }}>
                      {tx.quantity.toLocaleString()} หุ้น
                    </Typography>

                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      @ ${tx.price.toLocaleString()} =
                      <strong> ${total.toLocaleString()}</strong>
                    </Typography>
                  </Box>

                  {/* ปุ่มยกเลิกจะแสดงเฉพาะ PENDING */}
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


        {/* Pagination */}
        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, v) => setPage(v)}
              size="small"
              sx={{
                '& .MuiPaginationItem-root': { fontWeight: 700 },
                '& .Mui-selected': {
                  bgcolor: '#10b981 !important',
                  color: '#fff'
                },
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}