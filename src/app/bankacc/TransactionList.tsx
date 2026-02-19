'use client'

import { useState } from 'react'
import {
  Box, Typography, Tabs, Tab, Chip, Divider
} from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'

type Account = {
  id: string
  currency: string
  country: string
}

type TransactionLog = {
  id: string
  accountId: string
  type: 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER_OUT' | 'TRANSFER_IN'
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
  secondary: '#d1fae5',
  text: '#065f46',
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
  DEPOSIT:      { label: 'ฝากเงิน',  color: '#10b981', bg: '#d1fae5', icon: <ArrowDownwardIcon fontSize="small" /> },
  WITHDRAW:     { label: 'ถอนเงิน',  color: '#ef4444', bg: '#fee2e2', icon: <ArrowUpwardIcon fontSize="small" /> },
  TRANSFER_OUT: { label: 'โอนออก',   color: '#f59e0b', bg: '#fef3c7', icon: <ArrowUpwardIcon fontSize="small" /> },
  TRANSFER_IN:  { label: 'รับโอน',   color: '#3b82f6', bg: '#dbeafe', icon: <ArrowDownwardIcon fontSize="small" /> },
}

export default function TransactionList({ accounts, logs }: Props) {
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id ?? '')

  const selectedAccount = accounts.find(a => a.id === selectedAccountId)
  const filteredLogs = logs.filter(l => l.accountId === selectedAccountId)

  const getTransferCounterpart = (log: TransactionLog) => {
    if (!log.transfer) return null
    const otherAccountId = log.type === 'TRANSFER_OUT'
      ? log.transfer.toAccountId
      : log.transfer.fromAccountId
    const other = accounts.find(a => a.id === otherAccountId)
    return other ? `${other.currency} — ${other.country}` : 'บัญชีอื่น'
  }

  return (
    <Box sx={{ width: '100%', maxWidth: '1100px', px: 2, mt: 4 }}>
      <Typography variant="h6" fontWeight={700} color="#1e293b" mb={2}>
        ประวัติธุรกรรม
      </Typography>

      {/* Account Tabs */}
      <Tabs
        value={selectedAccountId}
        onChange={(_, val) => setSelectedAccountId(val)}
        sx={{
          mb: 3,
          '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, borderRadius: 2 },
          '& .Mui-selected': { color: themeColor.primary },
          '& .MuiTabs-indicator': { bgcolor: themeColor.primary },
        }}
      >
        {accounts.map(acc => (
          <Tab key={acc.id} value={acc.id} label={`${acc.currency} — ${acc.country}`} />
        ))}
      </Tabs>

      {/* Transaction Rows */}
      <Box sx={{ bgcolor: 'white', borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        {filteredLogs.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">ยังไม่มีธุรกรรม</Typography>
          </Box>
        ) : (
          filteredLogs.map((log, index) => {
            const config = TYPE_CONFIG[log.type]
            const counterpart = getTransferCounterpart(log)
            const isDebit = log.type === 'WITHDRAW' || log.type === 'TRANSFER_OUT'

            return (
              <Box key={log.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 3, py: 2, gap: 2 }}>
                  {/* Icon */}
                  <Box sx={{
                    width: 40, height: 40, borderRadius: '50%',
                    bgcolor: config.bg, color: config.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    {config.icon}
                  </Box>

                  {/* Info */}
                  <Box flex={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Chip label={config.label} size="small"
                        sx={{ bgcolor: config.bg, color: config.color, fontWeight: 600, fontSize: '0.7rem' }} />
                      {counterpart && (
                        <Typography variant="caption" color="text.secondary">
                          {log.type === 'TRANSFER_OUT' ? `→ ${counterpart}` : `← ${counterpart}`}
                        </Typography>
                      )}
                    </Box>
                    <Typography variant="caption" color="text.secondary" mt={0.5} display="block">
                      {formatDate(log.createdAt)}
                    </Typography>
                  </Box>

                  {/* Amount */}
                  <Box textAlign="right">
                    <Typography fontWeight={700} sx={{ color: isDebit ? '#ef4444' : '#10b981' }}>
                      {isDebit ? '-' : '+'}{formatMoney(log.amount, selectedAccount?.currency ?? '')}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      คงเหลือ {formatMoney(log.balanceAfter, selectedAccount?.currency ?? '')}
                    </Typography>
                  </Box>
                </Box>

                {index < filteredLogs.length - 1 && <Divider />}
              </Box>
            )
          })
        )}
      </Box>
    </Box>
  )
}