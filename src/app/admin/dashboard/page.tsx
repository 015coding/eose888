'use client'

import { useEffect, useState } from 'react'
import { Box, Typography, Paper, Grid, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, LinearProgress, Stack } from '@mui/material'
import { People, Receipt, AccountBalanceWallet, Dns, Speed, Memory } from '@mui/icons-material'

const THEME = {
    bg: '#0b0e11', // Darker background for monitor feel
    cardBg: '#1E222D',
    grid: '#2A2E39',
    textMain: '#D1D4DC',
    textMuted: '#787B86',
    up: '#089981',
    down: '#EF5350',
    accent: '#2962FF',
    warning: '#F57C00',
    success: '#089981',
}

interface DashboardData {
    stats: {
        totalUsers: number
        totalTransactions: number
        totalPortfolioValue: number
    }
    transactionTrend: { date: string; count: number }[]
    topStocks: { name: string; value: number }[]
    recentTransactions: {
        id: string
        userName: string
        stockId: string
        type: string
        quantity: number
        price: number
        tradeDate: string
    }[]
}

export default function AdminDashboard() {
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/admin/dashboard')
                if (res.ok) {
                    const json = await res.json()
                    setData(json)
                }
            } catch (error) {
                console.error('Failed to fetch dashboard data', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: THEME.bg, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress sx={{ color: THEME.accent }} />
            </Box>
        )
    }

    if (!data) return null

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: THEME.bg, color: THEME.textMain, p: 3 }}>
            {/* Header & System Status */}
            <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'start', md: 'center' }, gap: 2 }}>
                    <Typography variant="h5" fontWeight="800" sx={{ letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: THEME.success, boxShadow: `0 0 10px ${THEME.success}` }} />
                        SYSTEM MONITOR <span style={{ color: THEME.textMuted, fontWeight: 400 }}> : ADMIN</span>
                    </Typography>
                    
                    <Clock />
           
                
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard 
                        title="TOTAL USERS" 
                        value={data.stats.totalUsers} 
                        icon={<People />} 
                        color={THEME.accent} 
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard 
                        title="TRANSACTIONS" 
                        value={data.stats.totalTransactions} 
                        icon={<Receipt />} 
                        color={THEME.accent} 
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard 
                        title="ASSETS UNDER MGMT" 
                        value={`$${data.stats.totalPortfolioValue.toLocaleString()}`} 
                        icon={<AccountBalanceWallet />} 
                        color={THEME.warning} 
                    />
                </Grid>
            </Grid>

            {/* Transaction Trend Chart */}
            <Box sx={{ mb: 4 }}>
                <TrendChart data={data.transactionTrend} />
            </Box>

            <Grid container spacing={3}>
                {/* Live Transaction Feed */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ bgcolor: THEME.cardBg, p: 3, borderRadius: 2, border: `1px solid ${THEME.grid}` }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6" fontWeight="700" sx={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' , color: THEME.textMain }}>
                                Live Transaction Feed
                            </Typography>
                            <Chip 
                                label="REAL-TIME" 
                                size="small" 
                                sx={{ 
                                    bgcolor: `${THEME.success}15`, 
                                    color: THEME.success, 
                                    fontWeight: 'bold', 
                                    border: `1px solid ${THEME.success}30`,
                                    fontSize: '0.7rem'
                                }} 
                            />
                        </Box>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: THEME.textMuted, borderBottom: `1px solid ${THEME.grid}`, fontSize: '0.75rem' }}>USER</TableCell>
                                        <TableCell sx={{ color: THEME.textMuted, borderBottom: `1px solid ${THEME.grid}`, fontSize: '0.75rem' }}>SYMBOL</TableCell>
                                        <TableCell sx={{ color: THEME.textMuted, borderBottom: `1px solid ${THEME.grid}`, fontSize: '0.75rem' }}>SIDE</TableCell>
                                        <TableCell align="right" sx={{ color: THEME.textMuted, borderBottom: `1px solid ${THEME.grid}`, fontSize: '0.75rem' }}>VALUE</TableCell>
                                        <TableCell align="right" sx={{ color: THEME.textMuted, borderBottom: `1px solid ${THEME.grid}`, fontSize: '0.75rem' }}>TIME</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.recentTransactions.map((row) => (
                                        <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: `${THEME.grid}40` } }}>
                                            <TableCell sx={{ color: THEME.textMain, borderBottom: `1px solid ${THEME.grid}`, fontWeight: 500 }}>
                                                {row.userName}
                                            </TableCell>
                                            <TableCell sx={{ borderBottom: `1px solid ${THEME.grid}` }}>
                                                <span style={{ color: THEME.accent, fontWeight: 'bold', fontFamily: 'monospace' }}>{row.stockId}</span>
                                            </TableCell>
                                            <TableCell sx={{ borderBottom: `1px solid ${THEME.grid}` }}>
                                                <Typography sx={{ color: row.type === 'BUY' ? THEME.up : THEME.down, fontWeight: 700, fontSize: '0.75rem' }}>
                                                    {row.type}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right" sx={{ color: THEME.textMain, borderBottom: `1px solid ${THEME.grid}`, fontFamily: 'monospace', fontWeight: 500 }}>
                                                ${(row.price * row.quantity).toLocaleString()}
                                            </TableCell>
                                            <TableCell align="right" sx={{ color: THEME.textMuted, borderBottom: `1px solid ${THEME.grid}`, fontFamily: 'monospace', fontSize: '0.75rem' }}>
                                                {new Date(row.tradeDate).toLocaleTimeString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>

                {/* Market Exposure */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ bgcolor: THEME.cardBg, p: 3, borderRadius: 2, border: `1px solid ${THEME.grid}`, height: '100%' }}>
                        <Typography variant="h6" fontWeight="700" sx={{ mb: 3, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' , color: THEME.textMain }}>
                            Market Exposure
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {data.topStocks.map((stock, index) => (
                                <Box 
                                    key={stock.name} 
                                    sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'space-between', 
                                        p: 2, 
                                        bgcolor: `${THEME.bg}80`, 
                                        borderRadius: 2,
                                        border: `1px solid ${THEME.grid}`,
                                        transition: 'all 0.2s',
                                        '&:hover': { borderColor: THEME.accent, transform: 'translateX(4px)' }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box 
                                            sx={{ 
                                                width: 24, 
                                                height: 24, 
                                                borderRadius: '50%', 
                                                bgcolor: index < 3 ? THEME.accent : THEME.grid, 
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {index + 1}
                                        </Box>
                                        <Typography fontWeight="700" sx={{ fontFamily: 'monospace' }}>{stock.name}</Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography sx={{ color: THEME.textMain, fontWeight: 'bold' }}>{stock.value}</Typography>
                                        <Typography variant="caption" sx={{ color: THEME.textMuted, fontSize: '0.65rem' }}>VOL</Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

function Clock() {
    const [time, setTime] = useState(new Date())
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])
    return (
        <Typography variant="caption" sx={{ color: THEME.textMuted, fontFamily: 'monospace', letterSpacing: '1px' }}>
            SERVER TIME: <span style={{ color: THEME.textMain }}>{time.toISOString().replace('T', ' ').split('.')[0]} : UTC+00</span>
        </Typography>
    )
}

function SystemStatus({ label, value, icon }: { label: string, value: number, icon: React.ReactNode }) {
    return (
        <Box sx={{ bgcolor: THEME.cardBg, p: 1, px: 2, borderRadius: 1, border: `1px solid ${THEME.grid}`, minWidth: 100 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Box sx={{ color: THEME.textMuted }}>{icon}</Box>
                <Typography variant="caption" fontWeight="bold" sx={{ color: THEME.textMuted }}>{label}</Typography>
            </Box>
            <LinearProgress variant="determinate" value={value} sx={{ bgcolor: THEME.grid, '& .MuiLinearProgress-bar': { bgcolor: THEME.accent }, height: 4, borderRadius: 2 }} />
        </Box>
    )
}

function TrendChart({ data }: { data: { date: string; count: number }[] }) {
    const max = Math.max(...data.map(d => d.count), 1)
    
    return (
        <Paper sx={{ p: 3, bgcolor: THEME.cardBg, borderRadius: 2, border: `1px solid ${THEME.grid}` }}>
            <Typography variant="h6" fontWeight="700" sx={{ mb: 3, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' , color: THEME.textMain }}>
                Transaction Volume (7D)
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 200, pt: 2 }}>
                {data.map((d) => (
                    <Box key={d.date} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, height: '100%' }}>
                        <Box sx={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
                            <Box 
                                sx={{ 
                                    width: '100%', 
                                    bgcolor: THEME.accent, 
                                    borderRadius: '4px 4px 0 0',
                                    height: `${(d.count / max) * 100}%`,
                                    minHeight: 4,
                                    transition: 'all 0.3s ease',
                                    opacity: 0.7,
                                    '&:hover': { opacity: 1, transform: 'scaleY(1.02)' },
                                    position: 'relative',
                                    cursor: 'pointer'
                                }} 
                            >
                                <Box 
                                    sx={{ 
                                        position: 'absolute', 
                                        top: -25, 
                                        left: '50%', 
                                        transform: 'translateX(-50%)', 
                                        fontSize: '0.75rem', 
                                        fontWeight: 'bold',
                                        color: THEME.textMain,
                                        opacity: 0,
                                        transition: 'opacity 0.2s',
                                        '.MuiBox-root:hover &': { opacity: 1 }
                                    }}
                                >
                                    {d.count}
                                </Box>
                            </Box>
                        </Box>
                        <Typography variant="caption" sx={{ color: THEME.textMuted, fontSize: '0.7rem', whiteSpace: 'nowrap' }}>
                            {d.date}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Paper>
    )
}

function StatCard({ title, value, icon, color }: { title: string, value: string | number, icon: React.ReactNode, color: string }) {
    return (
        <Paper 
            sx={{ 
                bgcolor: THEME.cardBg, 
                p: 3, 
                borderRadius: 2, 
                border: `1px solid ${THEME.grid}`,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                transition: 'all 0.2s',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    borderColor: color,
                    boxShadow: `0 4px 20px ${color}15`
                }
            }}
        >
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `${color}10`, color: color, display: 'flex' }}>
                {icon}
            </Box>
            <Box>
                <Typography variant="caption" fontWeight="bold" sx={{ color: THEME.textMuted, letterSpacing: '0.5px' }}>{title}</Typography>
                <Typography variant="h5" fontWeight="800" sx={{ color: THEME.textMain, fontFamily: 'monospace' }}>{value}</Typography>
            </Box>
        </Paper>
    )
}