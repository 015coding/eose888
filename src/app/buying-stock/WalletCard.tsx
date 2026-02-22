"use client";

import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Stack, Card, CardContent, Chip, CircularProgress 
} from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { THB_PER_USD } from "@/constants";

const themeColor = {
  primary: '#10b981',
  secondary: '#686a6e',
  textSecondary: '#64748b',
};

type Account = {
  id: string;
  country: string;
  currency: string;
  balance: number;
};

// --- สร้าง Component ย่อยเพื่อแยกสถานะการคลิกสลับเงินของการ์ดแต่ละใบ ---
function SingleWalletCard({ account }: { account: Account }) {
  const [showTHB, setShowTHB] = useState(false);

  // คำนวณยอดเงินและสัญลักษณ์ที่จะแสดง
  const displayBalance = showTHB ? account.balance * THB_PER_USD : account.balance;
  const currencySymbol = showTHB ? '฿' : '$';
  const currencyCode = showTHB ? 'THB' : account.currency;
  const prefix = showTHB ? '≈ ' : ''; // สัญลักษณ์ประมาณค่า

  return (
    <Card 
      onClick={() => setShowTHB(!showTHB)}
      sx={{
        borderRadius: 6,
        border: '1px solid #eef2f6',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer', // เปลี่ยนเมาส์เป็นรูปนิ้วชี้ให้รู้ว่าคลิกได้
        '&:hover': {
          transform: 'translateY(-8px)', // ให้ลอยขึ้นชัดเจน
          boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.20)', // เงาสีเขียวตอน Hover
          borderColor: themeColor.primary,
        }
      }}
    >
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', bgcolor: themeColor.primary }} />

      <CardContent sx={{ 
        p: { xs: 3, sm: 4 }, 
        '&:last-child': { pb: { xs: 4, sm: 5 } } 
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <Box sx={{ 
              bgcolor: 'rgba(16, 185, 129, 0.1)', 
              p: 1.5, 
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AccountBalanceWalletIcon sx={{ color: themeColor.primary }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeColor.secondary }}>
                USD Portfolio
              </Typography>
              <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: themeColor.primary, boxShadow: `0 0 8px ${themeColor.primary}` }} />
                <Typography variant="caption" sx={{ color: themeColor.primary, fontWeight: 700, fontSize: '0.65rem' }}>
                  ACTIVE
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Chip 
            label={account.country} 
            size="small"
            sx={{ 
              fontWeight: 800, 
              borderRadius: 2, 
              fontSize: '0.65rem', 
              bgcolor: themeColor.secondary, 
              color: '#fff',
              px: 0.5
            }} 
          />
        </Box>

        <Box sx={{ mt: 0 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" sx={{ 
              color: themeColor.textSecondary, 
              fontWeight: 700, 
              letterSpacing: 1.2, 
              textTransform: 'uppercase' 
            }}>
              Available Balance
            </Typography>
            
            {/* ไอคอนบอกใบ้ว่าสามารถสลับค่าเงินได้ */}
            <SwapHorizIcon sx={{ color: themeColor.textSecondary, opacity: 0.4, fontSize: 18 }} />
          </Box>

          <Box display="flex" alignItems="baseline" gap={1} mt={0.5}>
            <Typography variant="h3" sx={{ fontWeight: 900, color: themeColor.secondary, letterSpacing: '-1.5px' }}>
              {prefix}{currencySymbol}{displayBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: themeColor.primary, fontWeight: 800 }}>
              {currencyCode}
            </Typography>
          </Box>
        </Box>
        
      </CardContent>
    </Card>
  );
}

// --- Component หลัก ---
export default function WalletCard() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bank-accounts/accounts')
      .then(res => res.json())
      .then(data => setAccounts(data.filter((a: Account) => a.currency === 'USD')))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <Box display="flex" justifyContent="center" py={4}>
      <CircularProgress sx={{ color: themeColor.primary }} />
    </Box>
  );

  if (accounts.length === 0) return (
    <Typography sx={{ color: themeColor.textSecondary, textAlign: 'center', py: 4, fontWeight: 600 }}>
      ไม่มีบัญชี USD
    </Typography>
  );

  return (
    <Stack spacing={3}>
      {accounts.map((account) => (
        // เรียกใช้ Card ย่อยแทนเพื่อจัดการ State รายใบ
        <SingleWalletCard key={account.id} account={account} />
      ))}
    </Stack>
  );
}