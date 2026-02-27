'use client'

import { useMemo, useState } from 'react'
import { Box, Typography, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material'
import {
  PieChart, Pie, Cell, Tooltip as ReTooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, Legend,
} from 'recharts'

// ─── Types (matches your Prisma schema exactly) ───────────────────────────────

type Account = {
  id:       string
  currency: 'THB' | 'USD'
  country:  'THAILAND' | 'USA'
  balance:  number
}

type Log = {
  id:            string
  accountId:     string
  type:          'DEPOSIT' | 'WITHDRAW' | 'TRANSFER_OUT' | 'TRANSFER_IN'
  amount:        number
  balanceBefore: number
  balanceAfter:  number
  createdAt:     string
  transfer: { fromAccountId: string; toAccountId: string } | null
}

// ─── Constants ────────────────────────────────────────────────────────────────

import { THB_PER_USD } from "@/constants"

// Exchange rates derived from your shared constant
const RATE: Record<string, Record<string, number>> = {
  THB: { THB: 1,            USD: 1 / THB_PER_USD },
  USD: { THB: THB_PER_USD,  USD: 1               },
}

const SYM: Record<string, string> = { THB: '฿', USD: '$' }

// One colour per wallet slot
const WALLET_COLORS = ['#10b981', '#38bdf8', '#fbbf24', '#a78bfa']

// ─── Design tokens ────────────────────────────────────────────────────────────

const T = {
  font:      '"DM Sans", "Helvetica Neue", sans-serif',
  textMain:  '#f1f5f9',
  textSub:   '#64748b',
  textMuted: '#1e293b',
  border:    'rgba(255,255,255,0.07)',
  surface:   'rgba(255,255,255,0.04)',
  accent:    '#10b981',
  red:       '#f43f5e',
  blue:      '#38bdf8',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number, cur: string) =>
  `${SYM[cur] ?? ''}${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const shortFmt = (n: number) =>
  Math.abs(n) >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M`
  : Math.abs(n) >= 1_000   ? `${(n / 1_000).toFixed(1)}K`
  : n.toFixed(0)

const walletLabel = (acc: Account) =>
  `${acc.currency} · ${acc.country === 'THAILAND' ? 'TH' : 'US'}`

// ─── Dark Tooltip ─────────────────────────────────────────────────────────────

function DarkTooltip({ active, payload, label, currency }: any) {
  if (!active || !payload?.length) return null
  return (
    <Box sx={{
      bgcolor: '#1e293b', border: `1px solid ${T.border}`, borderRadius: '12px',
      p: '10px 14px', minWidth: 160, boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    }}>
      {label && (
        <Typography sx={{ fontFamily: T.font, fontSize: '0.63rem', color: T.textSub,
          mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}>
          {label}
        </Typography>
      )}
      {payload.map((p: any) => (
        <Box key={p.name} display="flex" justifyContent="space-between" gap={2.5} mb={0.3}>
          <Typography sx={{ fontFamily: T.font, fontSize: '0.75rem', color: p.color, fontWeight: 600 }}>
            {p.name}
          </Typography>
          <Typography sx={{ fontFamily: T.font, fontSize: '0.75rem', color: T.textMain, fontWeight: 800 }}>
            {currency ? `${SYM[currency]}${shortFmt(p.value)}` : shortFmt(p.value)}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Panel({ children, style }: { children: React.ReactNode; style?: any }) {
  return (
    <Box sx={{
      p: 3, borderRadius: '20px',
      bgcolor: T.surface, border: `1px solid ${T.border}`,
      ...style,
    }}>
      {children}
    </Box>
  )
}

function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography sx={{
      fontFamily: T.font, fontSize: '0.6rem', fontWeight: 700,
      letterSpacing: 2, color: T.textSub, textTransform: 'uppercase', mb: 2.5,
    }}>
      {children}
    </Typography>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AccountAnalytics({ accounts, logs }: { accounts: Account[]; logs: Log[] }) {

  const [displayCurrency, setDisplayCurrency] = useState<'THB' | 'USD'>('THB')

  // ── Donut: convert every wallet's balance to displayCurrency ─────────────────
  const donutData = useMemo(() => {
    return accounts
      .filter(a => a.balance > 0)
      .map((a, i) => {
        const rate          = RATE[a.currency][displayCurrency]
        const convertedBal  = a.balance * rate
        return {
          label:    walletLabel(a),
          value:    convertedBal,
          rawBal:   a.balance,
          currency: a.currency,
          color:    WALLET_COLORS[i % WALLET_COLORS.length],
        }
      })
  }, [accounts, displayCurrency])

  const totalConverted = donutData.reduce((s, d) => s + d.value, 0)

  // ── Balance history: reconstruct per-wallet balance over time from logs ───────
  // Strategy: walk logs in ascending time order, track running balance per wallet
  const { historyData, historyKeys } = useMemo(() => {
    // Sort all logs oldest → newest
    const sorted = [...logs].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )

    // Map accountId → wallet label + color index
    const accMap = Object.fromEntries(
      accounts.map((a, i) => [a.id, { label: walletLabel(a), idx: i, currency: a.currency }])
    )

    // Running balance tracker
    const running: Record<string, number> = Object.fromEntries(
      accounts.map(a => [a.id, 0])
    )

    // Build time-series: each log produces one data point
    const points: Record<string, any>[] = []
    sorted.forEach(log => {
      running[log.accountId] = log.balanceAfter
      const date = new Date(log.createdAt).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric',
      })
      // snapshot of all wallets at this moment, converted to displayCurrency
      const point: Record<string, any> = { date }
      accounts.forEach(a => {
        const rate = RATE[a.currency][displayCurrency]
        point[walletLabel(a)] = parseFloat((running[a.id] * rate).toFixed(2))
      })
      points.push(point)
    })

    // Deduplicate by date — keep last point per date
    const deduped: Record<string, Record<string, any>> = {}
    points.forEach(p => { deduped[p.date] = p })
    const historyData = Object.values(deduped)

    const historyKeys = accounts.map(walletLabel)

    return { historyData, historyKeys }
  }, [logs, accounts, displayCurrency])

  // ── Bar: income vs expense per wallet, converted to displayCurrency ───────────
  const barData = useMemo(() =>
    accounts.map((a, i) => {
      const al   = logs.filter(l => l.accountId === a.id)
      const rate = RATE[a.currency][displayCurrency]
      const income  = al.filter(l => l.type === 'DEPOSIT'  || l.type === 'TRANSFER_IN') .reduce((s, l) => s + l.amount * rate, 0)
      const expense = al.filter(l => l.type === 'WITHDRAW' || l.type === 'TRANSFER_OUT').reduce((s, l) => s + l.amount * rate, 0)
      return { name: walletLabel(a), Income: parseFloat(income.toFixed(2)), Expense: parseFloat(expense.toFixed(2)) }
    })
  , [accounts, logs, displayCurrency])

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <Box sx={{ fontFamily: T.font }}>

      {/* ── Header + currency toggle ─────────────────────────────────────────── */}
      <Box mb={3.5} display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
        <Box>
          <Typography sx={{ fontFamily: T.font, fontWeight: 900, fontSize: '1.35rem',
            color: '#000000', letterSpacing: '-0.5px' }}>
            Portfolio Overview
          </Typography>
          <Typography sx={{ fontFamily: T.font, fontSize: '0.72rem', color: T.textSub, mt: 0.3 }}>
            {logs.length} transaction{logs.length !== 1 ? 's' : ''} · {accounts.length} wallet{accounts.length !== 1 ? 's' : ''}
          </Typography>
        </Box>

        {/* Currency toggle */}
        <ToggleButtonGroup
          value={displayCurrency}
          exclusive
          onChange={(_, val) => { if (val) setDisplayCurrency(val) }}
          size="small"
          sx={{
            bgcolor: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: '12px',
            '& .MuiToggleButton-root': {
              fontFamily: T.font, fontWeight: 800, fontSize: '0.75rem',
              color: T.textSub, border: 'none', px: 2.5, py: 1,
              borderRadius: '10px !important',
              transition: 'all 0.2s',
              '&.Mui-selected': {
                bgcolor: T.accent,
                color: '#0f172a',
                boxShadow: `0 0 16px rgba(16,185,129,0.4)`,
                '&:hover': { bgcolor: T.accent },
              },
              '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
            },
          }}
        >
          <ToggleButton value="THB">฿ THB</ToggleButton>
          <ToggleButton value="USD">$ USD</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* ── Row 1: Donut + Balance History ──────────────────────────────────── */}
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '220px 1fr' }} gap={3} mb={3}>

        {/* Donut */}
        <Panel>
          <PanelLabel>Wallet Allocation</PanelLabel>

          <Box sx={{ height: 170 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData} cx="50%" cy="50%"
                  innerRadius={50} outerRadius={76}
                  paddingAngle={3} dataKey="value" stroke="none"
                >
                  {donutData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
                <ReTooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null
                    const d = payload[0].payload
                    return (
                      <Box sx={{ bgcolor: '#1e293b', border: `1px solid ${T.border}`,
                        borderRadius: '12px', p: '10px 14px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                        <Typography sx={{ fontFamily: T.font, fontSize: '0.72rem', fontWeight: 700, color: d.color, mb: 0.4 }}>
                          {d.label}
                        </Typography>
                        {/* Original balance */}
                        <Typography sx={{ fontFamily: T.font, fontSize: '0.7rem', color: T.textSub }}>
                          {fmt(d.rawBal, d.currency)} original
                        </Typography>
                        {/* Converted balance */}
                        <Typography sx={{ fontFamily: T.font, fontSize: '0.92rem', fontWeight: 900, color: T.textMain, mt: 0.2 }}>
                          {fmt(d.value, displayCurrency)} in {displayCurrency}
                        </Typography>
                        <Typography sx={{ fontFamily: T.font, fontSize: '0.65rem', color: T.textSub, mt: 0.3 }}>
                          {totalConverted > 0 ? Math.round(d.value / totalConverted * 100) : 0}% of total
                        </Typography>
                      </Box>
                    )
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          {/* Legend with % */}
          <Stack spacing={1.4} mt={1.5}>
            {donutData.map((d, i) => (
              <Box key={i} display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={1}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%',
                    bgcolor: d.color, flexShrink: 0, boxShadow: `0 0 6px ${d.color}` }} />
                  <Typography sx={{ fontFamily: T.font, fontSize: '0.7rem', color: T.textSub, fontWeight: 600 }}>
                    {d.label}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography sx={{ fontFamily: T.font, fontSize: '0.7rem', color: T.textMain, fontWeight: 800 }}>
                    {totalConverted > 0 ? Math.round(d.value / totalConverted * 100) : 0}%
                  </Typography>
                  <Typography sx={{ fontFamily: T.font, fontSize: '0.62rem', color: T.textSub, lineHeight: 1 }}>
                    {fmt(d.value, displayCurrency)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>

          {/* Total */}
          <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${T.border}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontFamily: T.font, fontSize: '0.62rem', color: T.textSub,
              textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>
              Total
            </Typography>
            <Typography sx={{ fontFamily: T.font, fontSize: '0.95rem', fontWeight: 900, color: T.textMain }}>
              {fmt(totalConverted, displayCurrency)}
            </Typography>
          </Box>
        </Panel>

        {/* Balance History Line Chart */}
        <Panel>
          <PanelLabel>Balance History · {displayCurrency}</PanelLabel>
          {historyData.length === 0 ? (
            <Box sx={{ height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ fontFamily: T.font, fontSize: '0.8rem', color: T.textSub }}>
                No transaction history yet
              </Typography>
            </Box>
          ) : (
            <Box sx={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData}>
                  <defs>
                    {historyKeys.map((key, i) => (
                      <linearGradient key={key} id={`lineGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={WALLET_COLORS[i % WALLET_COLORS.length]} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={WALLET_COLORS[i % WALLET_COLORS.length]} stopOpacity={0}   />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false}
                    stroke={T.textMuted} strokeOpacity={0.4} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false}
                    tick={{ fill: T.textSub, fontSize: 10, fontFamily: T.font }}
                    interval="preserveStartEnd" />
                  <YAxis axisLine={false} tickLine={false}
                    tick={{ fill: T.textSub, fontSize: 10, fontFamily: T.font }}
                    tickFormatter={shortFmt} />
                  <ReTooltip
                    content={(props) => <DarkTooltip {...props} currency={displayCurrency} />}
                    cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                  />
                  <Legend
                    wrapperStyle={{ fontFamily: T.font, fontSize: '0.7rem', paddingTop: '12px' }}
                    formatter={(value) => (
                      <span style={{ color: T.textSub, fontWeight: 600 }}>{value}</span>
                    )}
                  />
                  {historyKeys.map((key, i) => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={WALLET_COLORS[i % WALLET_COLORS.length]}
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 5, stroke: '#0f172a', strokeWidth: 2,
                        fill: WALLET_COLORS[i % WALLET_COLORS.length] }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </Box>
          )}
        </Panel>
      </Box>
    </Box>
  )
}