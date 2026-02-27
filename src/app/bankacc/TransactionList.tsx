'use client'

import { useState } from 'react'
import {
  Box, Typography, Tabs, Tab, Chip,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
} from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon   from '@mui/icons-material/ArrowUpward'
import SwapHorizIcon     from '@mui/icons-material/SwapHoriz'

// ─── Types ────────────────────────────────────────────────────────────────────

type Account = {
  id:       string
  currency: string
  country:  string
}

type TransactionLog = {
  id:            string
  accountId:     string
  type:          'DEPOSIT' | 'WITHDRAW' | 'TRANSFER_OUT' | 'TRANSFER_IN'
  amount:        number
  balanceBefore: number
  balanceAfter:  number
  createdAt:     string
  transfer: { fromAccountId: string; toAccountId: string } | null
}

type Props = {
  accounts: Account[]
  logs:     TransactionLog[]
}

// ─── Design tokens (mirroring admin palette) ──────────────────────────────────

const T = {
  glass:       'rgba(255,255,255,0.60)',
  glassBorder: 'rgba(255,255,255,0.85)',
  shadow:      '0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',

  text:       '#374151',
  textDim:    '#9CA3AF',
  textBright: '#111827',

  emerald:    '#10B981',
  emeraldBg:  'rgba(16,185,129,0.10)',

  blue:       '#3B82F6',
  blueBg:     'rgba(59,130,246,0.10)',

  amber:      '#F59E0B',
  amberBg:    'rgba(245,158,11,0.10)',

  red:        '#EF4444',
  redBg:      'rgba(239,68,68,0.10)',

  purple:     '#8B5CF6',
  purpleBg:   'rgba(139,92,246,0.10)',

  mono: '"DM Mono","JetBrains Mono",monospace',
  sans: '"SF Pro Rounded","SF Pro Display",-apple-system,"Helvetica Neue",sans-serif',
}

// ─── Per-type config (same pattern as admin txMeta) ───────────────────────────

const TYPE_META = {
  DEPOSIT:      { label: 'ฝากเงิน',   labelEn: 'DEPOSIT',      color: T.emerald, bg: T.emeraldBg, sign: '+', Icon: ArrowDownwardIcon },
  WITHDRAW:     { label: 'ถอนเงิน',   labelEn: 'WITHDRAW',     color: T.red,     bg: T.redBg,     sign: '-', Icon: ArrowUpwardIcon   },
  TRANSFER_OUT: { label: 'โอนออก',    labelEn: 'TRANSFER_OUT', color: T.purple,  bg: T.purpleBg,  sign: '-', Icon: ArrowUpwardIcon   },
  TRANSFER_IN:  { label: 'รับโอน',    labelEn: 'TRANSFER_IN',  color: T.blue,    bg: T.blueBg,    sign: '+', Icon: ArrowDownwardIcon },
}

const SYM: Record<string, string> = { THB: '฿', USD: '$' }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtMoney(amount: number, currency: string) {
  const sym = SYM[currency] ?? ''
  return `${sym}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function fmtShort(amount: number, currency: string) {
  const sym = SYM[currency] ?? ''
  if (amount >= 1_000_000) return `${sym}${(amount / 1_000_000).toFixed(2)}M`
  if (amount >= 1_000)     return `${sym}${(amount / 1_000).toFixed(1)}K`
  return null // no shorthand needed below 1K
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TransactionList({ accounts, logs }: Props) {
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id ?? '')
  const [page,         setPage]         = useState(0)
  const [rowsPerPage,  setRowsPerPage]  = useState(10)

  const selectedAccount = accounts.find(a => a.id === selectedAccountId)
  const currency        = selectedAccount?.currency ?? 'THB'
  const filteredLogs    = logs.filter(l => l.accountId === selectedAccountId)
  const paginated       = filteredLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const getCounterpart = (log: TransactionLog) => {
    if (!log.transfer) return null
    const otherId = log.type === 'TRANSFER_OUT' ? log.transfer.toAccountId : log.transfer.fromAccountId
    const other   = accounts.find(a => a.id === otherId)
    return other ? `${other.currency} · ${other.country}` : 'Other account'
  }

  const handleTabChange = (_: any, val: string) => {
    setSelectedAccountId(val)
    setPage(0)
  }

  return (
    <Box sx={{ width: '100%', px: 2.5, pt: 3, pb: 1 }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 2 }}>
        <Box>
          <Typography sx={{ fontFamily: T.mono, fontSize: '0.58rem', letterSpacing: '0.13em',
            textTransform: 'uppercase', color: T.textDim, mb: 0.3 }}>
            Transaction History
          </Typography>
          <Typography sx={{ fontFamily: T.sans, fontSize: '1rem', fontWeight: 700,
            color: T.textBright, letterSpacing: '-0.03em' }}>
            ประวัติธุรกรรม
          </Typography>
        </Box>
        <Typography sx={{ fontFamily: T.mono, fontSize: '0.65rem', color: T.textDim }}>
          {filteredLogs.length} รายการ
        </Typography>
      </Box>

      {/* ── Account Tabs ───────────────────────────────────────────────────── */}
      <Tabs
        value={selectedAccountId}
        onChange={handleTabChange}
        sx={{
          mb: 0,
          minHeight: 36,
          '& .MuiTab-root': {
            fontFamily: T.mono, fontSize: '0.7rem', letterSpacing: '0.04em',
            textTransform: 'none', fontWeight: 600, minHeight: 36,
            color: T.textDim, px: 2,
          },
          '& .Mui-selected':       { color: T.emerald },
          '& .MuiTabs-indicator':  { bgcolor: T.emerald, height: 2 },
        }}
      >
        {accounts.map(acc => (
          <Tab
            key={acc.id} value={acc.id}
            label={`${acc.currency} · ${acc.country}`}
          />
        ))}
      </Tabs>

      {/* ── Table ──────────────────────────────────────────────────────────── */}
      <Box sx={{
        bgcolor: T.glass,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${T.glassBorder}`,
        borderRadius: '16px',
        boxShadow: T.shadow,
        overflow: 'hidden',
        mt: 2,
      }}>
        <TableContainer>
          <Table size="small">

            {/* Head */}
            <TableHead>
              <TableRow sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
                {['ประเภท', 'จำนวนเงิน', 'คงเหลือ', 'วันที่'].map((h, i) => (
                  <TableCell key={h} align={i === 0 ? 'left' : 'right'}
                    sx={{ borderBottom: '1px solid rgba(0,0,0,0.06)',
                      py: 1.4, px: i === 0 ? 2.5 : 2,
                      ...(i === 3 ? { pr: 2.5 } : {}) }}>
                    <Typography sx={{ fontFamily: T.mono, fontSize: '0.58rem',
                      letterSpacing: '0.12em', textTransform: 'uppercase', color: T.textDim, fontWeight: 600 }}>
                      {h}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Body */}
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} sx={{ py: 5, textAlign: 'center', border: 'none' }}>
                    <Typography sx={{ fontFamily: T.sans, fontSize: '0.85rem', color: T.textDim }}>
                      ยังไม่มีธุรกรรม
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : paginated.map((log) => {
                const meta        = TYPE_META[log.type]
                const { color, bg, sign, Icon, label, labelEn } = meta
                const counterpart = getCounterpart(log)
                const isLarge     = log.amount >= 10_000
                const short       = fmtShort(log.amount, currency)
                const ts          = new Date(log.createdAt)

                return (
                  <TableRow
                    key={log.id}
                    sx={{ '&:hover': { bgcolor: 'rgba(0,0,0,0.015)' }, transition: 'background 0.15s' }}
                  >
                    {/* Type column */}
                    <TableCell sx={{ borderBottom: '1px solid rgba(0,0,0,0.04)', py: 1.75, pl: 2.5, pr: 2 }}>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        {/* Icon bubble */}
                        <Box sx={{
                          width: 32, height: 32, borderRadius: '10px', flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          bgcolor: bg, color,
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
                        }}>
                          <Icon sx={{ fontSize: 16 }} />
                        </Box>

                        <Box>
                          {/* Thai label */}
                          <Box display="flex" alignItems="center" gap={0.75}>
                            <Typography sx={{ fontFamily: T.sans, fontSize: '0.845rem', fontWeight: 600,
                              color: T.textBright, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                              {label}
                            </Typography>
                            {/* Counterpart badge */}
                            {counterpart && (
                              <Typography sx={{ fontFamily: T.mono, fontSize: '0.6rem', color: T.textDim }}>
                                {sign === '-' ? `→ ${counterpart}` : `← ${counterpart}`}
                              </Typography>
                            )}
                            {/* Large transaction badge */}
                            {isLarge && (
                              <Box sx={{ px: 0.75, py: 0.15, borderRadius: '6px',
                                bgcolor: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.2)' }}>
                                <Typography sx={{ fontFamily: T.mono, fontSize: '0.5rem',
                                  letterSpacing: '0.08em', color: T.amber, fontWeight: 700 }}>
                                  LARGE
                                </Typography>
                              </Box>
                            )}
                          </Box>
                          {/* Raw type code */}
                          <Typography sx={{ fontFamily: T.mono, fontSize: '0.6rem',
                            color: T.textDim, letterSpacing: '0.02em' }}>
                            {labelEn}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Amount column */}
                    <TableCell align="right" sx={{ borderBottom: '1px solid rgba(0,0,0,0.04)', py: 1.75, px: 2 }}>
                      <Typography sx={{ fontFamily: T.mono, fontSize: '0.9rem', fontWeight: 700,
                        color, letterSpacing: '-0.03em', lineHeight: 1.3 }}>
                        {sign}{fmtMoney(log.amount, currency)}
                      </Typography>
                      {short && (
                        <Typography sx={{ fontFamily: T.mono, fontSize: '0.6rem', color: T.textDim, textAlign: 'right' }}>
                          {short}
                        </Typography>
                      )}
                    </TableCell>

                    {/* Balance after column */}
                    <TableCell align="right" sx={{ borderBottom: '1px solid rgba(0,0,0,0.04)', py: 1.75, px: 2 }}>
                      <Typography sx={{ fontFamily: T.mono, fontSize: '0.82rem', fontWeight: 600,
                        color: T.text, letterSpacing: '-0.02em' }}>
                        {fmtMoney(log.balanceAfter, currency)}
                      </Typography>
                      <Typography sx={{ fontFamily: T.mono, fontSize: '0.6rem', color: T.textDim }}>
                        after tx
                      </Typography>
                    </TableCell>

                    {/* Date column */}
                    <TableCell align="right" sx={{ borderBottom: '1px solid rgba(0,0,0,0.04)', py: 1.75, pl: 2, pr: 2.5 }}>
                      <Typography sx={{ fontFamily: T.sans, fontSize: '0.8rem', fontWeight: 500,
                        color: T.text, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                        {ts.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </Typography>
                      <Typography sx={{ fontFamily: T.mono, fontSize: '0.65rem', color: T.textDim, mt: '1px' }}>
                        {ts.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </Typography>
                    </TableCell>

                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredLogs.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, p) => setPage(p)}
          onRowsPerPageChange={e => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0) }}
          rowsPerPageOptions={[10, 25, 50]}
          labelRowsPerPage="แถว:"
          sx={{
            borderTop: '1px solid rgba(0,0,0,0.05)',
            color: T.textDim, fontFamily: T.mono,
            bgcolor: 'rgba(0,0,0,0.015)',
            '.MuiTablePagination-select':         { color: T.text,    fontFamily: T.mono },
            '.MuiTablePagination-selectIcon':     { color: T.textDim },
            '.MuiTablePagination-actions button': { color: T.text     },
            '.MuiTablePagination-displayedRows':  { fontFamily: T.mono, fontSize: '0.72rem' },
            '.MuiTablePagination-selectLabel':    { fontFamily: T.mono, fontSize: '0.72rem' },
          }}
        />
      </Box>
    </Box>
  )
}