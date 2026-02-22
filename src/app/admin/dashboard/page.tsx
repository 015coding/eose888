'use client'

import { useEffect, useState } from 'react'
import {
  Box, Typography, CircularProgress, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TablePagination, Stack, Chip,
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

// ── Palette — match iOS glass sidebar ────────────────────────────────────────
const T = {
  wallpaper:   '#FFFFFF',
  glass:       'rgba(255,255,255,0.60)',
  glassBright: 'rgba(255,255,255,0.80)',
  glassBorder: 'rgba(255,255,255,0.85)',
  shadow:      '0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',
  shadowHov:   '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)',

  text:        '#374151',
  textDim:     '#9CA3AF',
  textBright:  '#111827',

  emerald:     '#10B981',
  emeraldBg:   'rgba(16,185,129,0.10)',
  emeraldGlow: 'rgba(16,185,129,0.25)',

  blue:        '#3B82F6',
  blueBg:      'rgba(59,130,246,0.10)',

  amber:       '#F59E0B',
  amberBg:     'rgba(245,158,11,0.10)',

  red:         '#EF4444',
  redBg:       'rgba(239,68,68,0.10)',

  purple:      '#8B5CF6',
  purpleBg:    'rgba(139,92,246,0.10)',

  hover:       'rgba(255,255,255,0.50)',

  mono:        '"DM Mono","JetBrains Mono",monospace',
  sans:        '"SF Pro Rounded","SF Pro Display",-apple-system,"Helvetica Neue",sans-serif',
}

interface TxRow { type: string; amount: string; createdAt: string }
interface DashboardData {
  transactions: { data: TxRow[]; meta: { total: number; page: number; limit: number; totalPage: number } }
  Allbalances: number
  totalCount: number
  dailyVolume: { date: string; volume: number }[]
  totalBalance: number
}

const txMeta = (type: string) => {
  if (type === 'DEPOSIT')      return { color: T.emerald, bg: T.emeraldBg, sign: '+', Icon: ArrowDownward, label: 'Deposit'      }
  if (type === 'TRANSFER_IN')  return { color: T.blue,    bg: T.blueBg,    sign: '+', Icon: ArrowDownward, label: 'Transfer In'  }
  if (type === 'TRANSFER_OUT') return { color: T.purple,  bg: T.purpleBg,  sign: '-', Icon: ArrowUpward,   label: 'Transfer Out' }
  if (type === 'STOCK_BUY')    return { color: T.amber,   bg: T.amberBg,   sign: '-', Icon: SwapHoriz,     label: 'Stock Buy'    }
  if (type === 'STOCK_SELL')   return { color: T.emerald, bg: T.emeraldBg, sign: '+', Icon: SwapHoriz,     label: 'Stock Sell'   }
  if (type === 'STOCK_PENDING') return { color: T.blue,   bg: T.blueBg,    sign: '•', Icon: SwapHoriz,     label: 'Stock Pending'}
  if (type === 'STOCK_CANCELLED') return { color: T.textDim, bg: T.hover,  sign: '•', Icon: SwapHoriz,     label: 'Stock Cancelled'}
  return                              { color: T.red,     bg: T.redBg,     sign: '-', Icon: ArrowUpward,   label: 'Withdraw'     }
}

const fmt = (n: number) =>
  n >= 1_000_000 ? `฿${(n/1_000_000).toFixed(2)}M`
  : n >= 1_000   ? `฿${(n/1_000).toFixed(1)}K`
  : `฿${n.toLocaleString()}`

// ── Shared ────────────────────────────────────────────────────────────────────

function GlassCard({ children, sx = {}, hover = false }: { children: React.ReactNode; sx?: object; hover?: boolean }) {
  return (
    <Box sx={{
      bgcolor: T.glass,
      backdropFilter: 'blur(20px)',
      border: `1px solid ${T.glassBorder}`,
      borderRadius: '20px',
      boxShadow: T.shadow,
      overflow: 'hidden',
      transition: hover ? 'all 0.2s ease' : undefined,
      ...(hover ? { '&:hover': { boxShadow: T.shadowHov, transform: 'translateY(-2px)' } } : {}),
      ...sx,
    }}>
      {children}
    </Box>
  )
}

function CardHead({ label, sub, right }: { label: string; sub?: string; right?: React.ReactNode }) {
  return (
    <Box sx={{ px: 2.5, pt: 2.25, pb: 1.25, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Box>
        <Typography sx={{ fontFamily: T.mono, fontSize: '0.58rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: T.textDim }}>
          {label}
        </Typography>
        {sub && <Typography sx={{ fontFamily: T.sans, fontSize: '0.7rem', color: T.textDim, mt: 0.2 }}>{sub}</Typography>}
      </Box>
      {right}
    </Box>
  )
}

function Clock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t) }, [])
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: T.emerald, boxShadow: `0 0 8px ${T.emeraldGlow}` }} />
      <Typography sx={{ fontFamily: T.mono, fontSize: '0.68rem', color: T.textDim, letterSpacing: '0.04em' }}>
        {time.toISOString().replace('T',' ').split('.')[0]}{' '}
        <span style={{ opacity: 0.4 }}>UTC</span>
      </Typography>
    </Box>
  )
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, iconBg, icon, delta }: {
  label: string; value: string; sub?: string
  iconBg: string; icon: React.ReactNode
  delta?: { value: string; up: boolean }
}) {
  return (
    <GlassCard hover sx={{ p: 2.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography sx={{ fontFamily: T.mono, fontSize: '0.58rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: T.textDim }}>
          {label}
        </Typography>
        <Box sx={{ width: 32, height: 32, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: iconBg, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)' }}>
          {icon}
        </Box>
      </Box>
      <Typography sx={{ fontFamily: T.sans, fontSize: '1.7rem', fontWeight: 700, color: T.textBright, letterSpacing: '-0.05em', lineHeight: 1 }}>
        {value}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.8 }}>
        {sub && <Typography sx={{ fontFamily: T.sans, fontSize: '0.7rem', color: T.textDim }}>{sub}</Typography>}
        {delta && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
            {delta.up ? <TrendingUp sx={{ fontSize: 11, color: T.emerald }} /> : <TrendingDown sx={{ fontSize: 11, color: T.red }} />}
            <Typography sx={{ fontFamily: T.mono, fontSize: '0.6rem', fontWeight: 700, color: delta.up ? T.emerald : T.red }}>
              {delta.value}
            </Typography>
          </Box>
        )}
      </Box>
    </GlassCard>
  )
}

// ── Charts ────────────────────────────────────────────────────────────────────

const axisStyle = { fill: T.textDim, fontFamily: 'DM Mono, monospace', fontSize: 10 }

function VolumeLineChart({ data }: { data: { date: string; volume: number }[] }) {
  return (
    <GlassCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHead label="Volume · 7 Days" sub="Daily transaction volume (฿ THB)" />
      <Box sx={{ flex: 1, px: 1, pb: 1.5 }}>
        <LineChart
          xAxis={[{ scaleType: 'point', data: data.map(d => d.date.slice(5)), tickLabelStyle: axisStyle }]}
          yAxis={[{ width: 68, tickLabelStyle: axisStyle }]}
          series={[{ data: data.map(d => d.volume), color: T.emerald, area: true, showMark: true, label: 'Volume' }]}
          height={300}
          margin={{ top: 16, bottom: 28, left: 8, right: 16 }}
          sx={{
            '& .MuiChartsAxis-line':   { stroke: 'rgba(0,0,0,0.06)' },
            '& .MuiChartsAxis-tick':   { stroke: 'rgba(0,0,0,0.06)' },
            '& .MuiAreaElement-root':  { fill: `${T.emerald}18` },
            '& .MuiLineElement-root':  { strokeWidth: 2 },
            '& .MuiChartsLegend-root': { display: 'none' },
            '& .MuiMarkElement-root':  { stroke: T.emerald, fill: '#fff', strokeWidth: 2 },
          }}
        />
      </Box>
    </GlassCard>
  )
}

function TxBreakdownPie({ data }: { data: TxRow[] }) {
  const agg: Record<string, number> = {}
  data.forEach(r => { const k = r.type.replace(/_/g,' '); agg[k] = (agg[k]||0) + Number(r.amount) })
  const palette = [T.emerald, T.red, T.blue, T.amber, T.purple]
  const pieData = Object.entries(agg).map(([label, value], i) => ({ id: i, label, value, color: palette[i % palette.length] }))
  const total   = pieData.reduce((s,d) => s + d.value, 0)

  return (
    <GlassCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHead label="Volume Breakdown" sub="Share by type" />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <PieChart
          series={[{ data: pieData, innerRadius: 52, outerRadius: 78, paddingAngle: 3, cornerRadius: 5, cx: 110 }]}
          width={220} height={180}
          sx={{ '& .MuiChartsLegend-root': { display: 'none' } }}
          slotProps={{ legend: { } }}
        />
      </Box>
      <Stack spacing={0.85} sx={{ px: 2.5, pb: 2.5 }}>
        {pieData.map(d => (
          <Box key={d.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '3px', bgcolor: d.color }} />
              <Typography sx={{ fontFamily: T.sans, fontSize: '0.72rem', color: T.text }}>{d.label}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
              <Typography sx={{ fontFamily: T.mono, fontSize: '0.65rem', color: T.textDim }}>{fmt(d.value)}</Typography>
              <Typography sx={{ fontFamily: T.mono, fontSize: '0.65rem', fontWeight: 700, color: d.color, minWidth: 36, textAlign: 'right' }}>
                {((d.value/total)*100).toFixed(1)}%
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </GlassCard>
  )
}

function TxRadarChart({ data }: { data: TxRow[] }) {
  const countMap: Record<string, number> = {}
  const amountMap: Record<string, number> = {}
  data.forEach(r => {
    const k = r.type.replace(/_/g,' ')
    countMap[k]  = (countMap[k]  || 0) + 1
    amountMap[k] = (amountMap[k] || 0) + Number(r.amount)
  })
  const maxC = Math.max(...Object.values(countMap), 1)
  const maxA = Math.max(...Object.values(amountMap), 1)
  const radarData = Object.keys(countMap).map(type => ({
    type: type.replace('TRANSFER ', 'XFER '),
    count:  Math.round((countMap[type]  / maxC) * 100),
    amount: Math.round((amountMap[type] / maxA) * 100),
  }))

  return (
    <GlassCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHead label="Type Distribution" sub="Count vs Amount (normalized)" />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 2, pb: 2 }}>
        <ResponsiveContainer width="100%" height={230}>
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="rgba(0,0,0,0.07)" />
            <PolarAngleAxis dataKey="type" tick={{ fontFamily: 'DM Mono, monospace', fontSize: 10, fill: T.textDim }} />
            <PolarRadiusAxis angle={30} domain={[0,100]} tick={false} axisLine={false} tickLine={false} />
            <Radar name="Count"  dataKey="count"  stroke={T.blue}    fill={T.blue}    fillOpacity={0.12} strokeWidth={1.5} />
            <Radar name="Amount" dataKey="amount" stroke={T.emerald} fill={T.emerald} fillOpacity={0.10} strokeWidth={1.5} />
            <ReTooltip
              contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', border: `1px solid ${T.glassBorder}`, borderRadius: 12, fontFamily: 'DM Mono, monospace', fontSize: 11, color: T.text, boxShadow: T.shadow }}
              formatter={(val, name) => [`${val ?? 0}%`, String(name)]}
            />
          </RadarChart>
        </ResponsiveContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
          {[{ color: T.blue, label: 'Count' }, { color: T.emerald, label: 'Amount' }].map(l => (
            <Box key={l.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ width: 18, height: 2, bgcolor: l.color, borderRadius: 1 }} />
              <Typography sx={{ fontFamily: T.mono, fontSize: '0.6rem', color: T.textDim }}>{l.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </GlassCard>
  )
}

function TxTypeBarChart({ data }: { data: TxRow[] }) {
  const agg: Record<string, number> = {}
  data.forEach(r => { const k = r.type.replace(/_/g,' '); agg[k] = (agg[k]||0) + Number(r.amount) })
  return (
    <GlassCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHead label="By Transaction Type" sub="Total amount per type (฿)" />
      <Box sx={{ flex: 1, px: 1, pb: 1.5 }}>
        <BarChart
          xAxis={[{ scaleType: 'band', data: Object.keys(agg), tickLabelStyle: { ...axisStyle, fontSize: 9 } }]}
          yAxis={[{ width: 68, tickLabelStyle: axisStyle }]}
          series={[{ data: Object.values(agg), label: 'Amount', color: T.blue }]}
          height={210}
          margin={{ top: 12, bottom: 40, left: 8, right: 16 }}
          sx={{
            '& .MuiChartsAxis-line':   { stroke: 'rgba(0,0,0,0.06)' },
            '& .MuiChartsAxis-tick':   { stroke: 'rgba(0,0,0,0.06)' },
            '& .MuiChartsLegend-root': { display: 'none' },
          }}
        />
      </Box>
    </GlassCard>
  )
}

function SummaryCard({ total, txCount }: { total: number; txCount: number }) {
  const avg = txCount > 0 ? total / txCount : 0
  const rows = [
    { label: 'Total Balance',   value: fmt(total),      color: T.amber   },
    { label: 'Total Tx Count',  value: String(txCount), color: T.blue    },
    { label: 'Avg Tx Size',     value: fmt(avg),        color: T.emerald },
  ]
  return (
    <GlassCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHead label="Quick Stats" sub="Derived from data" />
      <Box sx={{ px: 2.5, pb: 2.5, flex: 1 }}>
        {rows.map((row, i) => (
          <Box key={row.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: i < rows.length-1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
            <Typography sx={{ fontFamily: T.sans, fontSize: '0.72rem', color: T.textDim }}>{row.label}</Typography>
            <Typography sx={{ fontFamily: T.mono, fontSize: '0.875rem', fontWeight: 700, color: row.color }}>{row.value}</Typography>
          </Box>
        ))}
      </Box>
    </GlassCard>
  )
}

// ── Transaction Table ── improved readability ─────────────────────────────────

function TxTable({ rows, meta, page, rowsPerPage, onPage, onRows }: {
  rows: TxRow[]
  meta: DashboardData['transactions']['meta']
  page: number; rowsPerPage: number
  onPage: (e: unknown, p: number) => void
  onRows: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <GlassCard>
      {/* Header */}
      <Box sx={{ px: 2.5, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <Typography sx={{ fontFamily: T.mono, fontSize: '0.58rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: T.textDim }}>
          Transaction Feed
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: T.emerald, boxShadow: `0 0 6px ${T.emeraldGlow}` }} />
          <Typography sx={{ fontFamily: T.mono, fontSize: '0.58rem', letterSpacing: '0.1em', color: T.emerald }}>LIVE</Typography>
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontFamily: T.mono, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: T.textDim, fontWeight: 600, borderBottom: '1px solid rgba(0,0,0,0.05)', py: 1.5, bgcolor: 'rgba(0,0,0,0.015)' }}>
                Transaction
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
              const amount  = Number(row.amount)
              const ts      = new Date(row.createdAt)
              const isLarge = amount >= 100_000
              const isEven  = i % 2 === 0

              return (
                <TableRow
                  key={i}
                  sx={{
                    bgcolor: isEven ? 'transparent' : 'rgba(0,0,0,0.012)',
                    transition: 'background 0.15s',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.7)' },
                    '&:last-child td': { border: 0 },
                  }}
                >
                  {/* Type */}
                  <TableCell sx={{ borderBottom: '1px solid rgba(0,0,0,0.04)', py: 1.75, pl: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      {/* Icon pill */}
                      <Box sx={{
                        width: 36, height: 36, borderRadius: '12px', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        bgcolor: bg, color,
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
                      }}>
                        <Icon sx={{ fontSize: 16 }} />
                      </Box>

                      <Box>
                        {/* Human-readable label */}
                        <Typography sx={{ fontFamily: T.sans, fontSize: '0.845rem', fontWeight: 600, color: T.textBright, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                          {label}
                        </Typography>
                        {/* Raw type code */}
                        <Typography sx={{ fontFamily: T.mono, fontSize: '0.62rem', color: T.textDim, letterSpacing: '0.02em' }}>
                          {row.type}
                        </Typography>
                      </Box>

                      {isLarge && (
                        <Box sx={{ ml: 0.5, px: 0.75, py: 0.2, borderRadius: '6px', bgcolor: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.2)' }}>
                          <Typography sx={{ fontFamily: T.mono, fontSize: '0.52rem', letterSpacing: '0.08em', color: T.amber, fontWeight: 700 }}>
                            LARGE
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </TableCell>

                  {/* Amount */}
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

                  {/* Time */}
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
        count={meta.total} page={page} rowsPerPage={rowsPerPage}
        onPageChange={onPage} onRowsPerPageChange={onRows}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{
          borderTop: '1px solid rgba(0,0,0,0.05)',
          color: T.textDim, fontFamily: T.mono,
          bgcolor: 'rgba(0,0,0,0.015)',
          '.MuiTablePagination-select':         { color: T.text, fontFamily: T.mono },
          '.MuiTablePagination-selectIcon':     { color: T.textDim },
          '.MuiTablePagination-actions button': { color: T.text },
          '.MuiTablePagination-displayedRows':  { fontFamily: T.mono, fontSize: '0.72rem' },
          '.MuiTablePagination-selectLabel':    { fontFamily: T.mono, fontSize: '0.72rem' },
        }}
      />
    </GlassCard>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [data, setData]               = useState<DashboardData | null>(null)
  const [loading, setLoading]         = useState(true)
  const [page, setPage]               = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    const load = async () => {
      if (!data) setLoading(true)
      try {
        const res = await fetch(`/api/admin/dashboard?page=${page+1}&limit=${rowsPerPage}`)
        if (res.ok) setData(await res.json())
      } catch(e) { console.error(e) }
      finally { setLoading(false) }
    }
    load()
  }, [page, rowsPerPage])

  if (loading) return (
    <Box sx={{ minHeight: '100vh', background: T.wallpaper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress size={22} thickness={3} sx={{ color: T.emerald }} />
    </Box>
  )
  if (!data) return null

  const totalVolume = data.dailyVolume.reduce((s,d) => s + d.volume, 0)
  const latestVol   = data.dailyVolume.at(-1)?.volume ?? 0
  const prevVol     = data.dailyVolume.at(-2)?.volume ?? 0
  const volDeltaPct = prevVol > 0 ? (((latestVol-prevVol)/prevVol)*100).toFixed(1) : null

  return (
    <Box sx={{ minHeight: '100vh', background: T.wallpaper, p: { xs: 2, md: 3 } }}>

      {/* ── Header ── */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, pb: 2.5, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <Box>
          <Typography sx={{ fontFamily: T.mono, fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: T.textDim, mb: 0.4 }}>
            Admin Console
          </Typography>
          <Typography sx={{ fontFamily: T.sans, fontSize: '1.25rem', fontWeight: 700, color: T.textBright, letterSpacing: '-0.04em' }}>
            Dashboard
          </Typography>
        </Box>
        <Clock />
      </Box>

      {/* ── Row 1 — Stat Cards ── */}
      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="Total Users" value={String(data.totalCount)} sub="registered accounts"
            iconBg={T.blueBg} icon={<People sx={{ fontSize: 16, color: T.blue }} />}
            delta={{ value: '+2 this week', up: true }} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="Transactions" value={String(data.transactions.meta.total)} sub={`${data.transactions.meta.totalPage} pages`}
            iconBg={T.purpleBg} icon={<Receipt sx={{ fontSize: 16, color: T.purple }} />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="Total Balance" value={`฿${data.totalBalance.toLocaleString()}`} sub={`7D vol · ${fmt(totalVolume)}`}
            iconBg={T.amberBg} icon={<AccountBalanceWallet sx={{ fontSize: 16, color: T.amber }} />}
            delta={volDeltaPct ? { value: `${volDeltaPct}% vs prev`, up: Number(volDeltaPct) >= 0 } : undefined} />
        </Grid>
      </Grid>

      {/* ── Row 2 — Volume + Pie ── */}
      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        <Grid size={{ xs: 12, md: 8 }} sx={{ display: 'flex' }}>
          <Box sx={{ width: '100%' }}><VolumeLineChart data={data.dailyVolume} /></Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
          <Box sx={{ width: '100%' }}><TxBreakdownPie data={data.transactions.data} /></Box>
        </Grid>
      </Grid>

      {/* ── Row 3 — Bar + Radar + Summary ── */}
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

      {/* ── Row 4 — Table ── */}
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