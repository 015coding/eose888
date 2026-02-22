"use client";

import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Divider, Stack, Card, CardContent, Chip, Button, CircularProgress 
} from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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

export default function WalletCard({ refreshKey }: { refreshKey?: number }) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/bank-accounts/accounts')
      .then(res => res.json())
      .then(data => setAccounts(data.filter((a: Account) => a.currency === 'USD')))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  if (loading) return (
    <Box display="flex" justifyContent="center" py={4}>
      <CircularProgress sx={{ color: themeColor.primary }} />
    </Box>
  );

  if (accounts.length === 0) return (
    <Typography sx={{ color: themeColor.textSecondary, textAlign: 'center', py: 4 }}>
      ไม่มีบัญชี USD
    </Typography>
  );

  return (
    <Stack spacing={3}>
      {accounts.map((account) => (
        <Card key={account.id} sx={{
          borderRadius: 6,
          border: '1px solid #eef2f6',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          bgcolor: '#fff',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.20)',
            borderColor: themeColor.primary,
          }
        }}>
          <CardContent sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" mb={3}>
              <Box sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', p: 1.5, borderRadius: 4 }}>
                <AccountBalanceWalletIcon sx={{ color: themeColor.primary }} />
              </Box>
              <Chip
                label={account.country}
                size="small"
                sx={{ fontWeight: 800, borderRadius: 2, fontSize: '0.65rem', bgcolor: '#f1f5f9' }}
              />
            </Box>

            <Typography variant="subtitle2" sx={{ color: themeColor.textSecondary, fontWeight: 600, mb: 0.5, textTransform: 'uppercase', fontSize: '0.7rem' }}>
              Total Balance ({account.currency})
            </Typography>

            <Box display="flex" alignItems="baseline" gap={1}>
              <Typography variant="h4" sx={{ fontWeight: 900, color: themeColor.secondary, letterSpacing: '-1px' }}>
                ${account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: themeColor.textSecondary, fontWeight: 700 }}>
                {account.currency}
              </Typography>
            </Box>

            <Divider sx={{ my: 2.5, opacity: 0.5 }} />

            <Button
              fullWidth
              variant="contained"
              endIcon={<ArrowForwardIosIcon sx={{ fontSize: '10px !important' }} />}
              onClick={() => alert(`จำลองการเปิด Dialog โอนเงินจากบัญชี ${account.country}`)}
              sx={{
                py: 1.5, borderRadius: 4, textTransform: 'none', fontWeight: 800,
                bgcolor: themeColor.secondary, boxShadow: 'none',
                '&:hover': { bgcolor: '#000', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' },
              }}
            >
              ทำรายการโอนเงิน
            </Button>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}