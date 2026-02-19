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
import CloseIcon from '@mui/icons-material/Close'

type BankAccount = {
  id: string
  userId: string
  country: string
  currency: string
  balance: number
  createdAt: string
}

type Props = { accounts: BankAccount[] }

// ธีมสีสไตล์ EOSE/Fintech: เขียว Emerald + Slate Dark
const themeColor = {
  primary: '#10b981', // เขียวหุ้น
  primaryDark: '#059669',
  bgGradient: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  cardBg: '#ffffff',
  textMain: '#1e293b',
  textSecondary: '#64748b',
}

export default function AccountCards({ accounts }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [fromId, setFromId] = useState('')
  const [toId, setToId] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

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

  const handleTransfer = async () => {
    setError('')
    const amountNum = parseFloat(amount)
    if (!toId) return setError('กรุณาเลือกบัญชีปลายทาง')
    if (!amount || isNaN(amountNum) || amountNum <= 0) return setError('กรุณาระบุจำนวนเงินที่ถูกต้อง')
    if (amountNum > maxAmount) return setError('ยอดเงินไม่เพียงพอ')

    setLoading(true)
    try {
      const res = await fetch('/api/bank-accounts', {
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

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: themeColor.bgGradient,
      pt: 8, pb: 8, px: 2 
    }}>
      <Box sx={{ maxWidth: '1100px', mx: 'auto' }}>
        {/* Account Cards */}
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }} gap={3}>
          {accounts.map((account) => (
            <Card key={account.id} sx={{
              borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.7)',
              boxShadow: '0 15px 35px -5px rgba(0,0,0,0.05)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: `0 20px 40px -10px rgba(16, 185, 129, 0.25)`,
                borderColor: themeColor.primary,
              }
            }}>
              <CardContent sx={{ p: 4 }}>
                <Box display="flex" justifyContent="space-between" mb={4}>
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
                  <Typography variant="h3" sx={{ fontWeight: 800, color: themeColor.textMain, letterSpacing: '-1.5px' }}>
                    {account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: themeColor.textSecondary, fontWeight: 700 }}>
                    {account.currency}
                  </Typography>
                </Box>

                <Divider sx={{ my: 3, opacity: 0.5 }} />

                <Button
                  fullWidth
                  variant="contained"
                  endIcon={<ArrowForwardIosIcon sx={{ fontSize: '10px !important' }} />}
                  onClick={() => handleOpen(account.id)}
                  disabled={accounts.length < 2}
                  sx={{
                    py: 1.8,
                    borderRadius: 4,
                    textTransform: 'none',
                    fontWeight: 800,
                    bgcolor: themeColor.textMain,
                    boxShadow: 'none',
                    '&:hover': { bgcolor: '#000', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' },
                  }}
                >
                  ทำรายการโอนเงิน
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Transfer Dialog - Fixed Hydration Error */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        PaperProps={{ sx: { borderRadius: 8, width: '100%', maxWidth: 450, p: 1, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' } }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, pt: 3 }}>
          {/* แก้ไขบรรทัดนี้: เปลี่ยน h6 เป็น span เพื่อไม่ให้ซ้อน h2 ของ DialogTitle */}
          <Typography variant="h6" component="span" sx={{ fontWeight: 800, color: themeColor.textMain }}>
            โอนเงินระหว่างบัญชี
          </Typography>
          <IconButton onClick={handleClose} size="small" sx={{ bgcolor: '#f1f5f9' }}><CloseIcon sx={{ fontSize: 20 }} /></IconButton>
        </DialogTitle>

        <DialogContent sx={{ px: 3 }}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: themeColor.textSecondary, ml: 1, textTransform: 'uppercase' }}>
              ต้นทาง
            </Typography>
            <Box sx={{ 
              p: 2.5, mt: 0.5, mb: 3, borderRadius: 5, bgcolor: '#f8fafc', 
              border: '2px solid #f1f5f9' 
            }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: themeColor.textSecondary }}>
                บัญชีเงินฝาก {fromAccount?.currency}
              </Typography>
              <Typography variant="h5" sx={{ color: themeColor.primary, fontWeight: 900 }}>
                {fromAccount?.currency === 'THB' ? '฿' : '$'}{fromAccount?.balance.toLocaleString()}
              </Typography>
            </Box>

            <Typography variant="caption" sx={{ fontWeight: 800, color: themeColor.textSecondary, ml: 1, textTransform: 'uppercase' }}>
              บัญชีปลายทาง
            </Typography>
            <TextField
              select
              fullWidth
              margin="dense"
              value={toId}
              onChange={(e) => setToId(e.target.value)}
              sx={{ 
                '& .MuiOutlinedInput-root': { borderRadius: 5, bgcolor: '#fff', mt: 0.5 },
                mb: 3
              }}
            >
              {accounts.filter(a => a.id !== fromId).map(a => (
                <MenuItem key={a.id} value={a.id} sx={{ py: 2, borderRadius: 2, mx: 1 }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>{a.currency} - {a.country}</Typography>
                    <Typography variant="caption" color="text.secondary">คงเหลือ: {a.balance.toLocaleString()}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </TextField>

            <Typography variant="caption" sx={{ fontWeight: 800, color: themeColor.textSecondary, ml: 1, textTransform: 'uppercase' }}>
              ระบุจำนวนเงิน
            </Typography>
            <TextField
              placeholder="0.00"
              type="number"
              fullWidth
              margin="dense"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1.5, fontWeight: 800, color: themeColor.textSecondary }}>{fromAccount?.currency}</Typography>
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 5, mt: 0.5 } }}
            />
          </Box>

          {error && <Alert severity="error" sx={{ mt: 3, borderRadius: 4, fontWeight: 600 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 3, borderRadius: 4, fontWeight: 600 }}>โอนเงินสำเร็จเรียบร้อย!</Alert>}
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleTransfer}
            disabled={loading || success}
            sx={{
              py: 2.2,
              borderRadius: 5,
              textTransform: 'none',
              fontWeight: 900,
              fontSize: '1.1rem',
              bgcolor: themeColor.primary,
              '&:hover': { bgcolor: themeColor.primaryDark },
              boxShadow: `0 12px 24px -6px rgba(16, 185, 129, 0.4)`,
              transition: 'all 0.2s'
            }}
          >
            {loading ? <CircularProgress size={26} color="inherit" /> : 'ยืนยันการทำรายการ'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}