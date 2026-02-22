'use client'

import { useEffect, useState } from 'react'
import {
  Box, Typography, CircularProgress, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TablePagination, Stack, Chip, Avatar,
} from '@mui/material'
import { Grid } from '@mui/material'
import {
  People, Receipt, AccountBalanceWallet,
  ArrowUpward, ArrowDownward, SwapHoriz,
  TrendingUp, TrendingDown,
} from '@mui/icons-material'
import { LineChart, BarChart, PieChart } from '@mui/x-charts'
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip as ReTooltip,
} from 'recharts'

const T = {
  bg:        '#F5F7FA',
  surface:   '#FFFFFF',
  border:    '#E8EBF2',
  text:      '#5A6072',
  textDim:   '#A0A8BC',
  textBright:'#0E1118',
  accent:    '#2962FF',
  accentBg:  'rgba(41,98,255,0.07)',
  green:     '#0C9B87',
  greenBg:   'rgba(12,155,135,0.08)',
  red:       '#EF5350',
  redBg:     'rgba(239,83,80,0.08)',
  amber:     '#D97706',
  amberBg:   'rgba(217,119,6,0.08)',
  purple:    '#7C3AED',
  purpleBg:  'rgba(124,58,237,0.08)',
  hover:     'rgba(14,17,24,0.03)',
  shadow:    '0 1px 4px rgba(0,0,0,0.06)',
  mono:      '"DM Mono","JetBrains Mono",monospace',
}

interface TxRow   { type: string; amount: string; createdAt: string }
interface DashboardData {
  transactions: { data: TxRow[]; meta: { total: number; page: number; limit: number; totalPage: number } }
  Allbalances: number
  totalCount: number
  dailyVolume: { date: string; volume: number }[]
  totalBalance: number
}

const txMeta = (type: string) => {
  if (type.includes('DEPOSIT') || type.includes('IN'))
    return { color: T.green,  bg: T.greenBg,  sign: '+', Icon: ArrowDownward, label: 'Deposit / In' }
  if (type.includes('TRANSFER'))
    return { color: T.accent, bg: T.accentBg, sign: '±', Icon: SwapHoriz,     label: 'Transfer' }
  return   { color: T.red,    bg: T.redBg,    sign: '-', Icon: ArrowUpward,   label: 'Withdraw' }
}

const fmt = (n: number) =>
  n >= 1_000_000 ? `฿${(n/1_000_000).toFixed(2)}M`
  : n >= 1_000   ? `฿${(n/1_000).toFixed(1)}K`
  : `฿${n.toLocaleString()}`

// ─── Shared ──────────────────────────────────────────────────────────────────

function Card({ children, sx = {} }: { children: React.ReactNode; sx?: object }) {
  return (
    <Box sx={{ bgcolor: T.surface, border: `1px solid ${T.border}`, borderRadius: '12px', boxShadow: T.shadow, overflow: 'hidden', ...sx }}>
      {children}
    </Box>
  )
}

function SectionHead({ label, sub, action }: { label: string; sub?: string; action?: React.ReactNode }) {
  return (
    <Box sx={{ px: 2.5, pt: 2.5, pb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Box>
        <Typography sx={{ fontFamily: T.mono, fontSize: '0.6rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: T.textDim, mb: 0.3 }}>
          {label}
        </Typography>
        {sub && <Typography sx={{ fontFamily: T.mono, fontSize: '0.65rem', color: T.textDim, opacity: 0.75 }}>{sub}</Typography>}
      </Box>
      {action}
    </Box>
  )
}

function Clock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t) }, [])
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: T.green, boxShadow: `0 0 8px ${T.green}80` }} />
      <Typography sx={{ fontFamily: T.mono, fontSize: '0.7rem', color: T.textDim, letterSpacing: '0.04em' }}>
        {time.toISOString().replace('T',' ').split('.')[0]}{' '}
        <span style={{ opacity: 0.45 }}>UTC</span>
      </Typography>
    </Box>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon, accent=T.accent, accentBg=T.accentBg, delta }: {
  label: string; value: string; sub?: string; icon: React.ReactNode
  accent?: string; accentBg?: string; delta?: { value: string; up: boolean }
}) {
  return (
    <Card sx={{ p: 2.5, transition: 'border-color 0.2s', '&:hover': { borderColor: accent } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2.5 }}>
        <Typography sx={{ fontFamily: T.mono, fontSize: '0.58rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: T.textDim }}>
          {label}
        </Typography>
        <Box sx={{ width: 30, height: 30, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: accentBg, color: accent }}>
          {icon}
        </Box>
      </Box>
      <Typography sx={{ fontFamily: T.mono, fontSize: '1.65rem', fontWeight: 700, color: T.textBright, letterSpacing: '-0.05em', lineHeight: 1 }}>
        {value}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.8 }}>
        {sub && <Typography sx={{ fontFamily: T.mono, fontSize: '0.62rem', color: T.textDim }}>{sub}</Typography>}
        {delta && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
            {delta.up ? <TrendingUp sx={{ fontSize: 11, color: T.green }} /> : <TrendingDown sx={{ fontSize: 11, color: T.red }} />}
            <Typography sx={{ fontFamily: T.mono, fontSize: '0.58rem', fontWeight: 700, color: delta.up ? T.green : T.red }}>
              {delta.value}
            </Typography>
          </Box>
        )}
      </Box>
    </Card>
  )
}

// ─── Volume Line Chart ────────────────────────────────────────────────────────

function VolumeLineChart({ data }: { data: { date: string; volume: number }[] }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <SectionHead label="Volume · 7 Days" sub="Daily transaction volume (฿ THB)" />
      <Box sx={{ flex: 1, px: 1, pb: 1.5, minHeight: 0 }}>
        <LineChart
          xAxis={[{
            scaleType: 'point',
            data: data.map(d => d.date.slice(5)),
            tickLabelStyle: { fill: T.textDim, fontFamily: 'DM Mono,monospace', fontSize: 10 },
          }]}
          yAxis={[{
            width: 68,
            tickLabelStyle: { fill: T.textDim, fontFamily: 'DM Mono,monospace', fontSize: 10 },
          }]}
          series={[{ data: data.map(d => d.volume), color: T.accent, area: true, showMark: true, label: 'Volume' }]}
          height={310}
          margin={{ top: 16, bottom: 28, left: 8, right: 16 }}
          sx={{
            '& .MuiChartsAxis-line':   { stroke: T.border },
            '& .MuiChartsAxis-tick':   { stroke: T.border },
            '& .MuiAreaElement-root':  { fill: `${T.accent}0D` },
            '& .MuiLineElement-root':  { strokeWidth: 1.5 },
            '& .MuiChartsLegend-root': { display: 'none' },
            '& .MuiMarkElement-root':  { stroke: T.accent, fill: T.surface, strokeWidth: 2 },
          }}
        />
      </Box>
    </Card>
  )
}

// ─── Pie Breakdown ────────────────────────────────────────────────────────────

function TxBreakdownPie({ data }: { data: TxRow[] }) {
  const agg: Record<string, number> = {}
  data.forEach(r => { const k = r.type.replace(/_/g,' '); agg[k] = (agg[k]||0) + Number(r.amount) })
  const palette = [T.green, T.red, T.accent, T.amber, T.purple]
  const pieData = Object.entries(agg).map(([label, value], i) => ({ id: i, label, value, color: palette[i % palette.length] }))
  const total   = pieData.reduce((s,d) => s + d.value, 0)

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <SectionHead label="Volume Breakdown" sub="Share by transaction type" />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <PieChart
          series={[{ data: pieData, innerRadius: 54, outerRadius: 82, paddingAngle: 3, cornerRadius: 4, cx: 110 }]}
          width={220} height={190}
          sx={{ '& .MuiChartsLegend-root': { display: 'none' } }}
          slotProps={{ legend: { hidden: true } }}
        />
      </Box>
      <Box sx={{ px: 2.5, pb: 2.5, mt: 0.5 }}>
        <Stack spacing={1}>
          {pieData.map(d => (
            <Box key={d.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '2px', bgcolor: d.color, flexShrink: 0 }} />
                <Typography sx={{ fontFamily: T.mono, fontSize: '0.68rem', color: T.text }}>{d.label}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography sx={{ fontFamily: T.mono, fontSize: '0.65rem', color: T.textDim }}>{fmt(d.value)}</Typography>
                <Typography sx={{ fontFamily: T.mono, fontSize: '0.65rem', fontWeight: 700, color: d.color, minWidth: 36, textAlign: 'right' }}>
                  {((d.value/total)*100).toFixed(1)}%
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Card>
  )
}

// ─── Radar Chart ─────────────────────────────────────────────────────────────

function TxRadarChart({ data }: { data: TxRow[] }) {
  const countMap: Record<string, number> = {}
  const amountMap: Record<string, number> = {}
  data.forEach(r => {
    const k = r.type.replace(/_/g, ' ')
    countMap[k]  = (countMap[k]  || 0) + 1
    amountMap[k] = (amountMap[k] || 0) + Number(r.amount)
  })

  const maxCount  = Math.max(...Object.values(countMap),  1)
  const maxAmount = Math.max(...Object.values(amountMap), 1)

  const radarData = Object.keys(countMap).map(type => ({
    type: type.replace('TRANSFER ', 'XFER '),
    count:  Math.round((countMap[type]  / maxCount)  * 100),
    amount: Math.round((amountMap[type] / maxAmount) * 100),
  }))

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <SectionHead label="Type Distribution" sub="Count vs Amount intensity (normalized)" />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 2, pb: 2 }}>
        <ResponsiveContainer width="100%" height={240}>
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke={T.border} />
            <PolarAngleAxis
              dataKey="type"
              tick={{ fontFamily: 'DM Mono, monospace', fontSize: 10, fill: T.textDim }}
            />
            <PolarRadiusAxis
              angle={30} domain={[0, 100]} tick={false} axisLine={false}
              tickLine={false}
            />
            <Radar name="Count"  dataKey="count"  stroke={T.accent} fill={T.accent} fillOpacity={0.12} strokeWidth={1.5} />
            <Radar name="Amount" dataKey="amount" stroke={T.green}  fill={T.green}  fillOpacity={0.10} strokeWidth={1.5} />
            <ReTooltip
              contentStyle={{
                backgroundColor: T.surface, border: `1px solid ${T.border}`,
                borderRadius: 8, fontFamily: 'DM Mono, monospace', fontSize: 11,
                color: T.text, boxShadow: T.shadow,
              }}
              formatter={(val: number, name: string) => [`${val}%`, name]}
            />
          </RadarChart>
        </ResponsiveContainer>
        {/* Legend */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 0.5 }}>
          {[{ color: T.accent, label: 'Count' }, { color: T.green, label: 'Amount' }].map(l => (
            <Box key={l.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ width: 20, height: 2, bgcolor: l.color, borderRadius: 1 }} />
              <Typography sx={{ fontFamily: T.mono, fontSize: '0.62rem', color: T.textDim }}>{l.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Card>
  )
}

// ─── Bar Chart ────────────────────────────────────────────────────────────────

function TxTypeBarChart({ data }: { data: TxRow[] }) {
  const agg: Record<string, number> = {}
  data.forEach(r => { const k = r.type.replace(/_/g,' '); agg[k] = (agg[k]||0) + Number(r.amount) })

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <SectionHead label="By Transaction Type" sub="Total amount per type (฿)" />
      <Box sx={{ flex: 1, px: 1, pb: 1.5, minHeight: 0 }}>
        <BarChart
          xAxis={[{
            scaleType: 'band',
            data: Object.keys(agg),
            tickLabelStyle: { fill: T.textDim, fontFamily: 'DM Mono,monospace', fontSize: 9 },
          }]}
          yAxis={[{
            width: 68,
            tickLabelStyle: { fill: T.textDim, fontFamily: 'DM Mono,monospace', fontSize: 10 },
          }]}
          series={[{ data: Object.values(agg), label: 'Amount', color: T.accent }]}
          height={220}
          margin={{ top: 12, bottom: 40, left: 8, right: 16 }}
          sx={{
            '& .MuiChartsAxis-line':   { stroke: T.border },
            '& .MuiChartsAxis-tick':   { stroke: T.border },
            '& .MuiChartsLegend-root': { display: 'none' },
          }}
        />
      </Box>
    </Card>
  )
}

// ─── Summary Card ─────────────────────────────────────────────────────────────

function SummaryCard({ total, txCount }: { total: number; txCount: number }) {
  const avg = txCount > 0 ? total / txCount : 0
  const rows = [
    { label: 'Total Balance',  value: fmt(total),      color: T.amber  },
    { label: 'Total Tx Count', value: String(txCount), color: T.accent },
    { label: 'Avg Tx Size',    value: fmt(avg),        color: T.green  },
  ]
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <SectionHead label="Quick Stats" sub="Derived from current data" />
      <Box sx={{ px: 2.5, pb: 2.5, flex: 1 }}>
        {rows.map((row, i) => (
          <Box key={row.label} sx={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            py: 1.5, borderBottom: i < rows.length - 1 ? `1px solid ${T.border}` : 'none',
          }}>
            <Typography sx={{ fontFamily: T.mono, fontSize: '0.7rem', color: T.textDim }}>{row.label}</Typography>
            <Typography sx={{ fontFamily: T.mono, fontSize: '0.875rem', fontWeight: 700, color: row.color }}>{row.value}</Typography>
          </Box>
        ))}
      </Box>
    </Card>
  )
}

// ─── Transaction Table ────────────────────────────────────────────────────────

const TYPE_COLORS: Record<string, { color: string; bg: string }> = {
  DEPOSIT:      { color: T.green,  bg: T.greenBg  },
  TRANSFER_IN:  { color: T.green,  bg: T.greenBg  },
  WITHDRAW:     { color: T.red,    bg: T.redBg    },
  TRANSFER_OUT: { color: T.accent, bg: T.accentBg },
}

function TxTable({ rows, meta, page, rowsPerPage, onPage, onRows }: {
  rows: TxRow[]
  meta: DashboardData['transactions']['meta']
  page: number; rowsPerPage: number
  onPage: (e: unknown, p: number) => void
  onRows: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <Card>
      {/* Header */}
      <Box sx={{ px: 2.5, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${T.border}` }}>
        <Box>
          <Typography sx={{ fontFamily: T.mono, fontSize: '0.6rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: T.textDim }}>
            Transaction Feed
          </Typography>
        </Box>
        <Chip label="LIVE" size="small" sx={{
          height: 20, fontFamily: T.mono, fontSize: '0.55rem', letterSpacing: '0.1em',
          bgcolor: T.greenBg, color: T.green, border: `1px solid rgba(12,155,135,0.3)`,
          '& .MuiChip-label': { px: 1.25 },
        }} />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#FAFBFD' }}>
              <TableCell sx={{ fontFamily: T.mono, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: T.textDim, fontWeight: 600, borderBottom: `1px solid ${T.border}`, py: 1.25 }}>
                Type
              </TableCell>
              <TableCell align="right" sx={{ fontFamily: T.mono, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: T.textDim, fontWeight: 600, borderBottom: `1px solid ${T.border}`, py: 1.25 }}>
                Amount
              </TableCell>
              <TableCell align="right" sx={{ fontFamily: T.mono, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: T.textDim, fontWeight: 600, borderBottom: `1px solid ${T.border}`, py: 1.25 }}>
                Date & Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              const { color, bg, sign, Icon } = txMeta(row.type)
              const ts     = new Date(row.createdAt)
              const amount = Number(row.amount)
              const isLarge = amount >= 100_000
              return (
                <TableRow key={i} sx={{
                  '&:hover': { bgcolor: T.hover },
                  '&:last-child td': { border: 0 },
                }}>
                  {/* Type */}
                  <TableCell sx={{ borderBottom: `1px solid ${T.border}`, py: 1.75 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box sx={{ width: 32, height: 32, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: bg, color, flexShrink: 0 }}>
                        <Icon sx={{ fontSize: 15 }} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontFamily: T.mono, fontSize: '0.78rem', fontWeight: 600, color: T.textBright, letterSpacing: '0.01em' }}>
                          {row.type.replace(/_/g, ' ')}
                        </Typography>
                        {isLarge && (
                          <Typography sx={{ fontFamily: T.mono, fontSize: '0.6rem', color: T.amber, letterSpacing: '0.06em' }}>
                            LARGE TX
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  </TableCell>

                  {/* Amount */}
                  <TableCell align="right" sx={{ borderBottom: `1px solid ${T.border}`, py: 1.75 }}>
                    <Box>
                      <Typography sx={{ fontFamily: T.mono, fontSize: '0.9rem', fontWeight: 700, color, letterSpacing: '-0.02em' }}>
                        {sign}฿{amount.toLocaleString()}
                      </Typography>
                      {amount >= 1000 && (
                        <Typography sx={{ fontFamily: T.mono, fontSize: '0.62rem', color: T.textDim, textAlign: 'right' }}>
                          {fmt(amount)}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>

                  {/* Time */}
                  <TableCell align="right" sx={{ borderBottom: `1px solid ${T.border}`, py: 1.75 }}>
                    <Box>
                      <Typography sx={{ fontFamily: T.mono, fontSize: '0.75rem', color: T.text, letterSpacing: '0.01em' }}>
                        {ts.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </Typography>
                      <Typography sx={{ fontFamily: T.mono, fontSize: '0.65rem', color: T.textDim, mt: '1px' }}>
                        {ts.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div" count={meta.total} page={page} rowsPerPage={rowsPerPage}
        onPageChange={onPage} onRowsPerPageChange={onRows} rowsPerPageOptions={[5, 10, 25]}
        sx={{
          borderTop: `1px solid ${T.border}`, color: T.textDim, fontFamily: T.mono,
          bgcolor: '#FAFBFD',
          '.MuiTablePagination-select':         { color: T.text, fontFamily: T.mono },
          '.MuiTablePagination-selectIcon':     { color: T.textDim },
          '.MuiTablePagination-actions button': { color: T.text },
          '.MuiTablePagination-displayedRows':  { fontFamily: T.mono, fontSize: '0.72rem' },
          '.MuiTablePagination-selectLabel':    { fontFamily: T.mono, fontSize: '0.72rem' },
        }}
      />
    </Card>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [data, setData]               = useState<DashboardData | null>(null)
  const [loading, setLoading]         = useState(true)
  const [page, setPage]               = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    const load = async () => {
      if (!data) setLoading(true)
      try {
        const res = await fetch(`/api/test?page=${page+1}&limit=${rowsPerPage}`)
        if (res.ok) setData(await res.json())
      } catch(e) { console.error(e) }
      finally { setLoading(false) }
    }
    load()
  }, [page, rowsPerPage])

  if (loading) return (
    <Box sx={{ minHeight: '100vh', bgcolor: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress size={22} thickness={3} sx={{ color: T.accent }} />
    </Box>
  )
  if (!data) return null

  const totalVolume = data.dailyVolume.reduce((s,d) => s + d.volume, 0)
  const latestVol   = data.dailyVolume.at(-1)?.volume ?? 0
  const prevVol     = data.dailyVolume.at(-2)?.volume ?? 0
  const volDeltaPct = prevVol > 0 ? (((latestVol - prevVol) / prevVol) * 100).toFixed(1) : null

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: T.bg, color: T.text, p: { xs: 2, md: 3 } }}>

      {/* ── Header ── */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, pb: 2.5, borderBottom: `1px solid ${T.border}` }}>
        <Box>
          <Typography sx={{ fontFamily: T.mono, fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: T.textDim, mb: 0.4 }}>
            Admin Console
          </Typography>
          <Typography sx={{ fontFamily: T.mono, fontSize: '1.15rem', fontWeight: 700, color: T.textBright, letterSpacing: '-0.03em' }}>
            Dashboard
          </Typography>
        </Box>
        <Clock />
      </Box>

      {/* ── Row 1 — Stat Cards ── */}
      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="Total Users" value={String(data.totalCount)} sub="registered accounts"
            icon={<People sx={{ fontSize: 15 }} />} delta={{ value: '+2 this week', up: true }} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="Transactions" value={String(data.transactions.meta.total)} sub={`${data.transactions.meta.totalPage} pages`}
            icon={<Receipt sx={{ fontSize: 15 }} />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="Total Balance" value={`฿${data.totalBalance.toLocaleString()}`} sub={`7D vol · ${fmt(totalVolume)}`}
            icon={<AccountBalanceWallet sx={{ fontSize: 15 }} />} accent={T.amber} accentBg={T.amberBg}
            delta={volDeltaPct ? { value: `${volDeltaPct}% vs prev`, up: Number(volDeltaPct) >= 0 } : undefined} />
        </Grid>
      </Grid>

      {/* ── Row 2 — Volume (tall) + Pie (tall) ── */}
      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        <Grid size={{ xs: 12, md: 8 }} sx={{ display: 'flex' }}>
          <Box sx={{ width: '100%' }}>
            <VolumeLineChart data={data.dailyVolume} />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
          <Box sx={{ width: '100%' }}>
            <TxBreakdownPie data={data.transactions.data} />
          </Box>
        </Grid>
      </Grid>

      {/* ── Row 3 — Bar + Radar + Quick Stats ── */}
      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
          <Box sx={{ width: '100%' }}><TxTypeBarChart data={data.transactions.data} /></Box>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex' }}>
          <Box sx={{ width: '100%' }}><TxRadarChart data={data.transactions.data} /></Box>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }} sx={{ display: 'flex' }}>
          <Box sx={{ width: '100%' }}><SummaryCard total={data.totalBalance} txCount={data.transactions.meta.total} /></Box>
        </Grid>
      </Grid>

      {/* ── Row 4 — Transaction Table ── */}
      <TxTable
        rows={data.transactions.data}
        meta={data.transactions.meta}
        page={page} rowsPerPage={rowsPerPage}
        onPage={(_, p) => setPage(p)}
        onRows={e => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0) }}
      />
    </Box>
  )
}