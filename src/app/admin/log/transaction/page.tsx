'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { ArrowDownward, ArrowUpward, Search, SwapHoriz } from '@mui/icons-material'

const T = {
  wallpaper: '#FFFFFF',
  glass: 'rgba(255,255,255,0.60)',
  glassBorder: 'rgba(255,255,255,0.85)',
  shadow: '0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',
  emerald: '#10B981',
  emeraldBg: 'rgba(16,185,129,0.10)',
  blue: '#3B82F6',
  blueBg: 'rgba(59,130,246,0.10)',
  amber: '#F59E0B',
  amberBg: 'rgba(245,158,11,0.10)',
  red: '#EF4444',
  redBg: 'rgba(239,68,68,0.10)',
  purple: '#8B5CF6',
  purpleBg: 'rgba(139,92,246,0.10)',
  text: '#374151',
  textDim: '#9CA3AF',
  textBright: '#111827',
  mono: '"DM Mono","JetBrains Mono",monospace',
  sans: '"SF Pro Rounded","SF Pro Display",-apple-system,"Helvetica Neue",sans-serif',
}

type TxRow = {
  type: string
  amount: number
  createdAt: string
  ownerId: string
  ownerName: string
}
type TxMeta = { total: number; page: number; limit: number; totalPage: number }
const TYPE_OPTIONS = ['ALL', 'DEPOSIT', 'WITHDRAW', 'TRANSFER_IN', 'TRANSFER_OUT', 'STOCK_BUY', 'STOCK_SELL', 'STOCK_PENDING', 'STOCK_CANCELLED'] as const

const txMeta = (type: string) => {
  if (type === 'DEPOSIT') return { color: T.emerald, bg: T.emeraldBg, sign: '+', Icon: ArrowDownward, label: 'Deposit' }
  if (type === 'TRANSFER_IN') return { color: T.blue, bg: T.blueBg, sign: '+', Icon: ArrowDownward, label: 'Transfer In' }
  if (type === 'TRANSFER_OUT') return { color: T.purple, bg: T.purpleBg, sign: '-', Icon: ArrowUpward, label: 'Transfer Out' }
  if (type === 'STOCK_BUY') return { color: T.amber, bg: T.amberBg, sign: '-', Icon: SwapHoriz, label: 'Stock Buy' }
  if (type === 'STOCK_SELL') return { color: T.emerald, bg: T.emeraldBg, sign: '+', Icon: SwapHoriz, label: 'Stock Sell' }
  if (type === 'STOCK_PENDING') return { color: T.blue, bg: T.blueBg, sign: '•', Icon: SwapHoriz, label: 'Stock Pending' }
  if (type === 'STOCK_CANCELLED') return { color: T.textDim, bg: 'rgba(255,255,255,0.5)', sign: '•', Icon: SwapHoriz, label: 'Stock Cancelled' }
  return { color: T.red, bg: T.redBg, sign: '-', Icon: ArrowUpward, label: 'Withdraw' }
}

const fmt = (n: number) =>
  n >= 1_000_000 ? `฿${(n / 1_000_000).toFixed(2)}M`
  : n >= 1_000 ? `฿${(n / 1_000).toFixed(1)}K`
  : `฿${n.toLocaleString()}`

export default function AdminTransactionLogsPage() {
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<TxRow[]>([])
  const [meta, setMeta] = useState<TxMeta>({ total: 0, page: 1, limit: 10, totalPage: 0 })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('ALL')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput.trim())
      setPage(0)
    }, 350)

    return () => clearTimeout(timeout)
  }, [searchInput])

  useEffect(() => {
    const load = async () => {
      if (!rows.length) setLoading(true)
      try {
        const params = new URLSearchParams({
          page: String(page + 1),
          limit: String(rowsPerPage),
          type: typeFilter,
        })

        if (search) {
          params.set('search', search)
        }

        const res = await fetch(`/api/admin/transactions?${params.toString()}`)
        if (!res.ok) return
        const payload = await res.json()
        setRows(payload.data ?? [])
        setMeta(payload.meta ?? { total: 0, page: 1, limit: rowsPerPage, totalPage: 0 })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [page, rowsPerPage, search, typeFilter])

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', background: T.wallpaper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={22} thickness={3} sx={{ color: T.emerald }} />
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', background: T.wallpaper, p: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: 2.5 }}>
        <Typography sx={{ fontFamily: T.mono, fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: T.textDim, mb: 0.4 }}>
          Admin Console
        </Typography>
        <Typography sx={{ fontFamily: T.sans, fontSize: '1.25rem', fontWeight: 700, color: T.textBright, letterSpacing: '-0.04em' }}>
          Transaction Logs
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 1.2, mb: 2, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search owner ID, owner name, or type"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          size="small"
          sx={{ minWidth: { xs: '100%', sm: 320 }, bgcolor: 'rgba(255,255,255,0.65)', borderRadius: '10px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ fontSize: 16, color: T.textDim }} />
              </InputAdornment>
            ),
            sx: {
              fontFamily: T.mono,
              fontSize: '0.72rem',
            },
          }}
        />

        <TextField
          select
          label="Type"
          size="small"
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value)
            setPage(0)
          }}
          sx={{ minWidth: 180, bgcolor: 'rgba(255,255,255,0.65)', borderRadius: '10px' }}
          InputProps={{ sx: { fontFamily: T.mono, fontSize: '0.72rem' } }}
        >
          {TYPE_OPTIONS.map((option) => (
            <MenuItem key={option} value={option} sx={{ fontFamily: T.mono, fontSize: '0.72rem' }}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ bgcolor: T.glass, backdropFilter: 'blur(20px)', border: `1px solid ${T.glassBorder}`, borderRadius: '20px', boxShadow: T.shadow, overflow: 'hidden' }}>
        <Box sx={{ px: 2.5, py: 2, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <Typography sx={{ fontFamily: T.mono, fontSize: '0.58rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: T.textDim }}>
            Transaction Feed
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontFamily: T.mono, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: T.textDim, fontWeight: 600, borderBottom: '1px solid rgba(0,0,0,0.05)', py: 1.5, bgcolor: 'rgba(0,0,0,0.015)' }}>
                  Transaction
                </TableCell>
                <TableCell sx={{ fontFamily: T.mono, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: T.textDim, fontWeight: 600, borderBottom: '1px solid rgba(0,0,0,0.05)', py: 1.5, bgcolor: 'rgba(0,0,0,0.015)' }}>
                  Owner
                </TableCell>
                <TableCell align="right" sx={{ fontFamily: T.mono, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: T.textDim, fontWeight: 600, borderBottom: '1px solid rgba(0,0,0,0.05)', py: 1.5, bgcolor: 'rgba(0,0,0,0.015)' }}>
                  Amount
                </TableCell>
                <TableCell align="right" sx={{ fontFamily: T.mono, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: T.textDim, fontWeight: 600, borderBottom: '1px solid rgba(0,0,0,0.05)', py: 1.5, bgcolor: 'rgba(0,0,0,0.015)' }}>
                  Time
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, i) => {
                const { color, bg, sign, Icon, label } = txMeta(row.type)
                const amount = Number(row.amount)
                const ts = new Date(row.createdAt)
                const isEven = i % 2 === 0

                return (
                  <TableRow
                    key={`${row.type}-${row.createdAt}-${i}`}
                    sx={{
                      bgcolor: isEven ? 'transparent' : 'rgba(0,0,0,0.012)',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.7)' },
                      '&:last-child td': { border: 0 },
                    }}
                  >
                    <TableCell sx={{ borderBottom: '1px solid rgba(0,0,0,0.04)', py: 1.75, pl: 2.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ width: 36, height: 36, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: bg, color, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)' }}>
                          <Icon sx={{ fontSize: 16 }} />
                        </Box>
                        <Box>
                          <Typography sx={{ fontFamily: T.sans, fontSize: '0.845rem', fontWeight: 600, color: T.textBright, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                            {label}
                          </Typography>
                          <Typography sx={{ fontFamily: T.mono, fontSize: '0.62rem', color: T.textDim, letterSpacing: '0.02em' }}>
                            {row.type}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ borderBottom: '1px solid rgba(0,0,0,0.04)', py: 1.75 }}>
                      <Typography sx={{ fontFamily: T.sans, fontSize: '0.82rem', fontWeight: 600, color: T.textBright, lineHeight: 1.25 }}>
                        {row.ownerName || '-'}
                      </Typography>
                      <Typography sx={{ fontFamily: T.mono, fontSize: '0.62rem', color: T.textDim, mt: '1px' }}>
                        {row.ownerId}
                      </Typography>
                    </TableCell>

                    <TableCell align="right" sx={{ borderBottom: '1px solid rgba(0,0,0,0.04)', py: 1.75, pr: 2.5 }}>
                      <Typography sx={{ fontFamily: T.mono, fontSize: '0.95rem', fontWeight: 700, color, letterSpacing: '-0.03em', lineHeight: 1.3 }}>
                        {sign}฿{amount.toLocaleString()}
                      </Typography>
                      {amount >= 1000 && (
                        <Typography sx={{ fontFamily: T.mono, fontSize: '0.62rem', color: T.textDim, textAlign: 'right' }}>
                          {fmt(amount)}
                        </Typography>
                      )}
                    </TableCell>

                    <TableCell align="right" sx={{ borderBottom: '1px solid rgba(0,0,0,0.04)', py: 1.75, pr: 2.5 }}>
                      <Typography sx={{ fontFamily: T.sans, fontSize: '0.8rem', fontWeight: 500, color: T.text, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                        {ts.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </Typography>
                      <Typography sx={{ fontFamily: T.mono, fontSize: '0.68rem', color: T.textDim, mt: '1px' }}>
                        {ts.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={meta.total}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, p) => setPage(p)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10))
            setPage(0)
          }}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{
            borderTop: '1px solid rgba(0,0,0,0.05)',
            color: T.textDim,
            fontFamily: T.mono,
            bgcolor: 'rgba(0,0,0,0.015)',
            '.MuiTablePagination-select': { color: T.text, fontFamily: T.mono },
            '.MuiTablePagination-selectIcon': { color: T.textDim },
            '.MuiTablePagination-actions button': { color: T.text },
            '.MuiTablePagination-displayedRows': { fontFamily: T.mono, fontSize: '0.72rem' },
            '.MuiTablePagination-selectLabel': { fontFamily: T.mono, fontSize: '0.72rem' },
          }}
        />
      </Box>
    </Box>
  )
}
