"use client";

import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Stack, Card, CardContent, Chip, CircularProgress 
} from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { THB_PER_USD } from "@/constants";

const themeColor = {
  primary: '#10b981',
  secondary: '#1e293b',
  textSecondary: '#64748b',
};

type Account = {
  id: string;
  country: string;
  currency: string;
  balance: number;
};

// --- Component ย่อยของการ์ดแต่ละใบ ---
function SingleWalletCard({ account }: { account: Account }) {
  const [showTHB, setShowTHB] = useState(false);

  const displayBalance = showTHB ? account.balance * THB_PER_USD : account.balance;
  const currencySymbol = showTHB ? '฿' : '$';
  const currencyCode = showTHB ? 'THB' : account.currency;
  const prefix = showTHB ? '≈ ' : '';

  // จำลองเลขบัญชี 4 ตัวท้าย จาก ID
  const accountLast4 = account.id.slice(-4).padStart(4, '8').toUpperCase();

  return (
    <Card 
      onClick={() => setShowTHB(!showTHB)}
      sx={{
        flex: 1, 
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 6,
        border: '1px solid #eef2f6',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)', 
          boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.20)', 
          borderColor: themeColor.primary,
        }
      }}
    >
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', bgcolor: themeColor.primary }} />

      <CardContent sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 2.5, sm: 3 }, 
        '&:last-child': { pb: { xs: 2.5, sm: 3 } } 
      }}>
        
        {/* --- ส่วนบน: หัวการ์ด --- */}
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box sx={{ 
              bgcolor: 'rgba(16, 185, 129, 0.1)', 
              p: 1.2, 
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AccountBalanceWalletIcon sx={{ color: themeColor.primary, fontSize: 24 }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeColor.secondary, fontSize: '0.85rem' }}>
                USD Portfolio
              </Typography>
              <Box display="flex" alignItems="center" gap={0.5} mt={0.2}>
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
              fontWeight: 800, borderRadius: 2, fontSize: '0.7rem', 
              bgcolor: themeColor.secondary, color: '#fff', px: 0.5, height: 24
            }} 
          />
        </Box>

        {/* --- ส่วนกลาง: ยอดเงิน (ใช้ my: 'auto' เพื่อดันให้กึ่งกลาง) --- */}
        <Box sx={{ my: 'auto', py: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
            <Typography variant="caption" sx={{ 
              color: themeColor.textSecondary, 
              fontWeight: 800, 
              letterSpacing: 1.2, 
              textTransform: 'uppercase' 
            }}>
              Available Balance
            </Typography>
            <SwapHorizIcon sx={{ color: themeColor.textSecondary, opacity: 0.4, fontSize: 20 }} />
          </Box>

          <Box display="flex" alignItems="baseline" gap={1}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 900, 
                color: themeColor.secondary, 
                letterSpacing: '-1.5px',
                fontSize: { xs: '1.8rem', sm: '2.2rem' },
                lineHeight: 1
              }}
            >
              {prefix}{currencySymbol}{displayBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>
            <Typography variant="h6" sx={{ color: themeColor.primary, fontWeight: 800 }}>
              {currencyCode}
            </Typography>
          </Box>
        </Box>

        {/* --- ส่วนล่าง: ข้อมูลบัญชี --- */}
        <Box>
          <Stack 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center" 
            sx={{ 
              bgcolor: 'rgba(241, 245, 249, 0.5)', 
              p: 1.5, 
              borderRadius: 3, 
              border: '1px dashed rgba(203, 213, 225, 0.8)' 
            }}
          >
            <Box>
              <Typography variant="caption" sx={{ color: themeColor.textSecondary, fontWeight: 700, display: 'block', mb: 0.2 }}>
                ACCOUNT NO.
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 800, color: themeColor.secondary, letterSpacing: 2 }}>
                •••• •••• {accountLast4}
              </Typography>
            </Box>
            <Box textAlign="right">
              <Typography variant="caption" sx={{ color: themeColor.textSecondary, fontWeight: 700, display: 'block', mb: 0.2 }}>
                STATUS
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 800, color: themeColor.primary, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <VerifiedUserIcon sx={{ fontSize: 14 }} /> SECURED
              </Typography>
            </Box>
          </Stack>
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
    <Box display="flex" justifyContent="center" py={4} sx={{ height: '100%', alignItems: 'center' }}>
      <CircularProgress sx={{ color: themeColor.primary }} />
    </Box>
  );

  if (accounts.length === 0) return (
    <Typography sx={{ color: themeColor.textSecondary, textAlign: 'center', py: 4, fontWeight: 600 }}>
      ไม่มีบัญชี USD
    </Typography>
  );

  return (
    <Stack spacing={2} sx={{ height: '100%' }}>
      {accounts.map((account) => (
        <SingleWalletCard key={account.id} account={account} />
      ))}
    </Stack>
  );
}