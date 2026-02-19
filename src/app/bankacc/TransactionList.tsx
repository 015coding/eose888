'use client'

import { useState } from 'react'
import {
  Box, Typography, Tabs, Tab, Chip, Divider, Avatar, Pagination, Stack
} from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'

type Account = {
  id: string
  currency: string
  country: string
}

type TransactionLog = {
  id: string
  accountId: string
  type: 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER'
  amount: number
  balanceBefore: number
  balanceAfter: number
  createdAt: string
  transfer: {
    fromAccountId: string
    toAccountId: string
  } | null
}

type Props = {
  accounts: Account[]
  logs: TransactionLog[]
}

const themeColor = {
  primary: '#10b981',
  secondary: '#f8fafc',
  textMain: '#1e293b',
  textSecondary: '#64748b',
  border: '#e2e8f0',
}

function formatMoney(amount: number, currency: string) {
  return `${currency === 'THB' ? '฿' : '$'}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('th-TH', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

const TYPE_CONFIG = {
  DEPOSIT: { label: 'เงินฝาก', color: '#10b981', bg: '#ecfdf5', icon: <ArrowDownwardIcon fontSize="small" /> },
  WITHDRAW: { label: 'ถอนเงิน', color: '#ef4444', bg: '#fef2f2', icon: <ArrowUpwardIcon fontSize="small" /> },
  TRANSFER: { label: 'โอนเงิน', color: '#3b82f6', bg: '#eff6ff', icon: <SwapHorizIcon fontSize="small" /> },
}

export default function TransactionList({ accounts, logs }: Props) {
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id ?? '')
  const [page, setPage] = useState(1)
  const ITEMS_PER_PAGE = 8 // จำนวนรายการต่อ 1 หน้า

  const selectedAccount = accounts.find(a => a.id === selectedAccountId)
  
  // กรอง เรียงลำดับ และเตรียมข้อมูลสำหรับ Pagination
  const allFilteredLogs = logs
    .filter(l => l.accountId === selectedAccountId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const totalPages = Math.ceil(allFilteredLogs.length / ITEMS_PER_PAGE)
  const pagedLogs = allFilteredLogs.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handleTabChange = (_: any, val: string) => {
    setSelectedAccountId(val)
    setPage(1) // รีเซ็ตหน้าเมื่อเปลี่ยนแท็บ
  }

  const handlePageChange = (_: any, value: number) => {
    setPage(value)
    // เลื่อนขึ้นเบาๆ เมื่อเปลี่ยนหน้า
    window.scrollTo({ top: 450, behavior: 'smooth' })
  }

  const getTransferDirection = (log: TransactionLog) => {
    if (!log.transfer || !selectedAccount) return null
    const isFrom = log.transfer.fromAccountId === selectedAccountId
    const otherAccountId = isFrom ? log.transfer.toAccountId : log.transfer.fromAccountId
    const otherAccount = accounts.find(a => a.id === otherAccountId)
    return {
      isFrom,
      otherLabel: otherAccount ? `${otherAccount.currency} — ${otherAccount.country}` : 'บัญชีอื่น'
    }
  }

  return (
    <Box sx={{ width: '100%', maxWidth: '1000px', mx: 'auto', px: 2, mt: 6, pb: 10 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Avatar sx={{ bgcolor: themeColor.textMain, width: 36, height: 36 }}>
          <ReceiptLongIcon sx={{ fontSize: 20 }} />
        </Avatar>
        <Typography variant="h5" fontWeight={800} sx={{ color: themeColor.textMain, letterSpacing: '-0.5px' }}>
          Transaction History
        </Typography>
      </Box>

      {/* Account Tabs (Pill Style) */}
      <Tabs
        value={selectedAccountId}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 4,
          '& .MuiTabs-indicator': { display: 'none' },
          '& .MuiTabs-flexContainer': { gap: 1.5 },
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 4,
            minHeight: '40px',
            color: themeColor.textSecondary,
            border: `1px solid ${themeColor.border}`,
            bgcolor: '#fff',
            transition: '0.2s',
            '&.Mui-selected': {
              color: '#fff',
              bgcolor: themeColor.textMain,
              borderColor: themeColor.textMain,
            },
            '&:hover': { bgcolor: '#f1f5f9' },
          },
        }}
      >
        {accounts.map(acc => (
          <Tab key={acc.id} value={acc.id} label={`${acc.currency} — ${acc.country}`} />
        ))}
      </Tabs>

      {/* Transaction Table Container */}
      <Box sx={{ 
        bgcolor: 'white', 
        borderRadius: 6, 
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.04)', 
        border: `1px solid ${themeColor.border}`,
        overflow: 'hidden' 
      }}>
        {pagedLogs.length === 0 ? (
          <Box sx={{ py: 10, textAlign: 'center' }}>
            <Typography variant="h6" fontWeight={700} color={themeColor.textSecondary}>
              No transactions yet
            </Typography>
          </Box>
        ) : (
          <>
            {pagedLogs.map((log, index) => {
              const config = TYPE_CONFIG[log.type]
              const direction = getTransferDirection(log)
              const isDebit = log.type === 'WITHDRAW' || (log.type === 'TRANSFER' && direction?.isFrom)

              return (
                <Box key={log.id} sx={{ transition: '0.2s', '&:hover': { bgcolor: '#f8fafc' } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', px: { xs: 2, sm: 4 }, py: 3, gap: 3 }}>
                    <Box sx={{
                      width: 48, height: 48, borderRadius: 4,
                      bgcolor: config.bg, color: config.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                      {config.icon}
                    </Box>

                    <Box flex={1}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body1" fontWeight={800} color={themeColor.textMain}>
                          {config.label}
                        </Typography>
                        {direction && (
                          <Chip 
                            label={direction.isFrom ? `To: ${direction.otherLabel}` : `From: ${direction.otherLabel}`} 
                            size="small" 
                            sx={{ fontSize: '0.65rem', fontWeight: 700, height: 20 }} 
                          />
                        )}
                      </Box>
                      <Typography variant="caption" sx={{ color: themeColor.textSecondary, fontWeight: 500 }}>
                        {formatDate(log.createdAt)} • ID: {log.id.slice(-6).toUpperCase()}
                      </Typography>
                    </Box>

                    <Box textAlign="right">
                      <Typography variant="h6" fontWeight={900} sx={{ color: isDebit ? '#ef4444' : '#10b981' }}>
                        {isDebit ? '-' : '+'}{formatMoney(log.amount, selectedAccount?.currency ?? '')}
                      </Typography>
                      <Typography variant="caption" sx={{ color: themeColor.textSecondary, fontWeight: 600 }}>
                        Balance: {formatMoney(log.balanceAfter, selectedAccount?.currency ?? '')}
                      </Typography>
                    </Box>
                  </Box>
                  {index < pagedLogs.length - 1 && <Divider sx={{ mx: 4 }} />}
                </Box>
              )
            })}

            {/* Pagination Section */}
            {totalPages > 1 && (
              <Stack 
                direction="column"
                alignItems="center"
                spacing={1}
                sx={{ py: 4, bgcolor: '#f8fafc', borderTop: `1px solid ${themeColor.border}` }}
              >
                <Pagination 
                  count={totalPages} 
                  page={page} 
                  onChange={handlePageChange} 
                  shape="rounded"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontWeight: 800,
                      '&.Mui-selected': {
                        bgcolor: themeColor.textMain,
                        color: 'white',
                        '&:hover': { bgcolor: '#000' }
                      }
                    }
                  }}
                />
                <Typography variant="caption" fontWeight={600} color="text.secondary">
                  Page {page} of {totalPages} ({allFilteredLogs.length} Transactions)
                </Typography>
              </Stack>
            )}
          </>
        )}
      </Box>
    </Box>
  )
}