'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box, Card, CardContent, Typography, Chip, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  MenuItem, TextField, Alert, CircularProgress, IconButton, Divider
} from "@mui/material"
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import CloseIcon from '@mui/icons-material/Close'
import DepositWithdrawDialog from './DepositWithdrawDialog'

type BankAccount = {
  id: string
  userId: string
  country: string
  currency: string
  balance: number
  createdAt: string
}

type Props = { accounts: BankAccount[] }

const themeColor = {
  primary: '#10b981',
  primaryDark: '#059669',
  bgGradient: '#f8fafc',
  cardBg: '#ffffff',
  textMain: '#1e293b',
  textSecondary: '#64748b',
}

export default function AccountCards({ accounts }: Props) {
  const router = useRouter()

  // Transfer state
  const [open, setOpen] = useState(false)
  const [fromId, setFromId] = useState('')
  const [toId, setToId] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Deposit/Withdraw state
  const [dwOpen, setDwOpen] = useState(false)
  const [dwAccountId, setDwAccountId] = useState('')
  const [dwMode, setDwMode] = useState<'DEPOSIT' | 'WITHDRAW'>('DEPOSIT')

  const fromAccount = accounts.find(a => a.id === fromId)
  const maxAmount = fromAccount ? fromAccount.balance : 0

  const handleOpen = (sourceId: string) => {
    setFromId(sourceId)
    setToId('')
    setAmount('')
    setError('')
    setSuccess(false)
    setOpen(true)
  }

  const handleClose = () => {
    if (loading) return
    setOpen(false)
  }

  const handleOpenDW = (accountId: string, mode: 'DEPOSIT' | 'WITHDRAW') => {
    setDwAccountId(accountId)
    setDwMode(mode)
    setDwOpen(true)
  }

  const handleTransfer = async () => {
    setError('')
    const amountNum = parseFloat(amount)
    if (!toId) return setError('กรุณาเลือกบัญชีปลายทาง')
    if (!amount || isNaN(amountNum) || amountNum <= 0) return setError('กรุณาระบุจำนวนเงินที่ถูกต้อง')
    if (!/^\d+(\.\d+)?$/.test(amount)) return setError('กรุณาระบุจำนวนเงินที่ถูกต้อง')
    if (amountNum > maxAmount) return setError('ยอดเงินไม่เพียงพอ')

    setLoading(true)
    try {
      const res = await fetch('/api/bank-accounts/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fromAccountId: fromId, toAccountId: toId, amount: amountNum }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'โอนไม่สำเร็จ')

      setSuccess(true)
      router.refresh()
      setTimeout(() => setOpen(false), 1500)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }

  const dwAccount = accounts.find(a => a.id === dwAccountId)

return (
    <Box sx={{ 
      minHeight: 'auto', 
      py: 6, 
      px: { xs: 2, md: 4 },
      // The Glassmorphism Box
      background: 'rgba(255, 255, 255, 0.4)', // Semi-transparent white
      backdropFilter: 'blur(20px) saturate(180%)', // Frosted effect
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderRadius: '40px', // Extra rounded for modern look
      border: '1px solid rgba(255, 255, 255, 0.7)', // Light edge
      boxShadow: `
        0 10px 40px -10px rgba(0,0,0,0.05), 
        inset 0 0 20px rgba(255,255,255,0.5)
      `, // Outer soft shadow + inner glow
    }}>
      <Box sx={{ maxWidth: '1100px', mx: 'auto' }}>
        <Box 
          display="grid" 
          gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }} 
          gap={4}
        >
          {accounts.map((account) => (
            <Card key={account.id} sx={{
              borderRadius: 6,
              bgcolor: 'rgba(255, 255, 255, 0.9)', // High opacity white
              border: '1px solid rgba(255, 255, 255, 1)',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              '&:hover': {
                transform: 'translateY(-12px) scale(1.02)',
                boxShadow: '0 30px 60px -15px rgba(16, 185, 129, 0.15)',
                borderColor: themeColor.primary,
              }
            }}>
              <CardContent sx={{ p: 4 }}>
                <Box display="flex" justifyContent="space-between" mb={4}>
                  <Box sx={{ 
                    bgcolor: 'rgba(16, 185, 129, 0.1)', 
                    p: 1.5, 
                    borderRadius: 4,
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' 
                  }}>
                    <AccountBalanceWalletIcon sx={{ color: themeColor.primary }} />
                  </Box>
                  <Chip 
                    label={account.country} 
                    size="small"
                    sx={{ 
                      fontWeight: 800, 
                      borderRadius: 2, 
                      fontSize: '0.65rem', 
                      bgcolor: '#f1f5f9',
                      border: '1px solid #e2e8f0'
                    }} 
                  />
                </Box>

                <Typography variant="subtitle2" sx={{ color: themeColor.textSecondary, fontWeight: 600, mb: 0.5, textTransform: 'uppercase', fontSize: '0.7rem' }}>
                  Total Balance ({account.currency})
                </Typography>

                <Box display="flex" alignItems="baseline" gap={1}>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: themeColor.textMain, letterSpacing: '-1.5px' }}>
                    {account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: themeColor.textSecondary, fontWeight: 700 }}>
                    {account.currency}
                  </Typography>
                </Box>

                <Divider sx={{ my: 3, opacity: 0.3 }} />

                <Button
                  fullWidth variant="contained"
                  endIcon={<ArrowForwardIosIcon sx={{ fontSize: '10px !important' }} />}
                  onClick={() => handleOpen(account.id)}
                  disabled={accounts.length < 2}
                  sx={{
                    py: 1.8, borderRadius: 4, textTransform: 'none', fontWeight: 800,
                    bgcolor: themeColor.textMain, 
                    boxShadow: '0 10px 20px -5px rgba(30, 41, 59, 0.3)',
                    '&:hover': { 
                        bgcolor: '#000', 
                        boxShadow: '0 15px 25px -5px rgba(0,0,0,0.4)',
                        transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  ทำรายการโอนเงิน
                </Button>

                {account.currency === 'THB' && (
                  <Box display="flex" gap={1.5} mt={1.5}>
                    <Button
                      fullWidth variant="outlined"
                      startIcon={<ArrowDownwardIcon sx={{ fontSize: '14px !important' }} />}
                      onClick={() => handleOpenDW(account.id, 'DEPOSIT')}
                      sx={{
                        py: 1.5, borderRadius: 4, textTransform: 'none', fontWeight: 700,
                        borderColor: themeColor.primary, color: themeColor.primary,
                        '&:hover': { bgcolor: '#d1fae5', borderColor: themeColor.primaryDark },
                      }}
                    >
                      ฝาก
                    </Button>
                    <Button
                      fullWidth variant="outlined"
                      startIcon={<ArrowUpwardIcon sx={{ fontSize: '14px !important' }} />}
                      onClick={() => handleOpenDW(account.id, 'WITHDRAW')}
                      sx={{
                        py: 1.5, borderRadius: 4, textTransform: 'none', fontWeight: 700,
                        borderColor: '#ef4444', color: '#ef4444',
                        '&:hover': { bgcolor: '#fee2e2', borderColor: '#dc2626' },
                      }}
                    >
                      ถอน
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Transfer Dialog & Deposit Dialog remains the same */}
      {/* ... */}
    </Box>
  )
}