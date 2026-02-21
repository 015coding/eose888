'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Box, Typography, TextField, Button, Alert,
  CircularProgress, IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

type Props = {
  open: boolean
  onClose: () => void
  accountId: string
  balance: number
  mode: 'DEPOSIT' | 'WITHDRAW'
}

const themeColor = {
  primary: '#10b981',
  primaryDark: '#059669',
  textMain: '#1e293b',
  textSecondary: '#64748b',
}

const MODE_CONFIG = {
  DEPOSIT: {
    label: 'ฝากเงิน',
    color: '#10b981',
    icon: <ArrowDownwardIcon />,
    apiType: 'DEPOSIT',
  },
  WITHDRAW: {
    label: 'ถอนเงิน',
    color: '#ef4444',
    icon: <ArrowUpwardIcon />,
    apiType: 'WITHDRAW',
  },
}

export default function DepositWithdrawDialog({ open, onClose, accountId, balance, mode }: Props) {
  const router = useRouter()
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const config = MODE_CONFIG[mode]

  const handleClose = () => {
    if (loading) return
    setAmount('')
    setError('')
    setSuccess(false)
    onClose()
  }

  const handleSubmit = async () => {
    setError('')
    const amountNum = parseFloat(amount)
    if (!amount || isNaN(amountNum) || amountNum <= 0) return setError('กรุณาระบุจำนวนเงินที่ถูกต้อง')
    if (mode === 'WITHDRAW' && amountNum > balance) return setError('ยอดเงินไม่เพียงพอ')

    setLoading(true)
    try {
      const res = await fetch('/api/bank-accounts/deposit-withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId, type: mode, amount: amountNum }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'ทำรายการไม่สำเร็จ')

      setSuccess(true)
      router.refresh()
      setTimeout(() => handleClose(), 1500)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { borderRadius: 8, width: '100%', maxWidth: 420, p: 1, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' } }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, pt: 3 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <Box sx={{ bgcolor: mode === 'DEPOSIT' ? '#d1fae5' : '#fee2e2', p: 1, borderRadius: 3, color: config.color, display: 'flex' }}>
            {config.icon}
          </Box>
          <Typography variant="h6" component="span" sx={{ fontWeight: 800, color: themeColor.textMain }}>
            {config.label}
          </Typography>
        </Box>
        <IconButton onClick={handleClose} size="small" sx={{ bgcolor: '#f1f5f9' }}>
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3 }}>
        <Box sx={{ mt: 2 }}>
          {/* แสดง balance ปัจจุบัน */}
          <Box sx={{ p: 2.5, mb: 3, borderRadius: 5, bgcolor: '#f8fafc', border: '2px solid #f1f5f9' }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: themeColor.textSecondary, textTransform: 'uppercase' }}>
              ยอดคงเหลือปัจจุบัน
            </Typography>
            <Typography variant="h5" sx={{ color: themeColor.primary, fontWeight: 900, mt: 0.5 }}>
              ฿{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Typography>
          </Box>

          {/* กรอกจำนวนเงิน */}
          <Typography variant="caption" sx={{ fontWeight: 800, color: themeColor.textSecondary, ml: 1, textTransform: 'uppercase' }}>
            ระบุจำนวนเงิน (THB)
          </Typography>
          <TextField
            placeholder="0.00"
            type="number"
            fullWidth
            margin="dense"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1.5, fontWeight: 800, color: themeColor.textSecondary }}>฿</Typography>
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 5, mt: 0.5 } }}
          />

          {/* แสดง balance หลังทำรายการ */}
          {amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0 && (
            <Box sx={{ mt: 2, p: 2, borderRadius: 4, bgcolor: mode === 'DEPOSIT' ? '#d1fae5' : '#fee2e2' }}>
              <Typography variant="caption" sx={{ color: config.color, fontWeight: 700 }}>
                ยอดหลังทำรายการ:{' '}
                ฿{(mode === 'DEPOSIT'
                  ? balance + parseFloat(amount)
                  : balance - parseFloat(amount)
                ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </Typography>
            </Box>
          )}
        </Box>

        {error && <Alert severity="error" sx={{ mt: 3, borderRadius: 4, fontWeight: 600 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 3, borderRadius: 4, fontWeight: 600 }}>ทำรายการสำเร็จ!</Alert>}
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button
          fullWidth variant="contained"
          onClick={handleSubmit}
          disabled={loading || success}
          sx={{
            py: 2.2, borderRadius: 5, textTransform: 'none', fontWeight: 900, fontSize: '1.1rem',
            bgcolor: config.color,
            '&:hover': { bgcolor: mode === 'DEPOSIT' ? themeColor.primaryDark : '#dc2626' },
            boxShadow: `0 12px 24px -6px ${mode === 'DEPOSIT' ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`,
          }}
        >
          {loading ? <CircularProgress size={26} color="inherit" /> : `ยืนยัน${config.label}`}
        </Button>
      </DialogActions>
    </Dialog>
  )
}