'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Skeleton,
} from '@mui/material'
import {
  AccountBalance,
  SwapHoriz,
  People,
} from '@mui/icons-material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

// Types
interface DashboardStats {
  totalUsers: number
  totalTransactions: number
  totalPortfolioValue: number
}

interface ChartData {
  name: string
  value: number
}

interface TransactionTrend {
  date: string
  count: number
}

interface RecentTransaction {
  id: string
  userName: string
  stockId: string
  type: 'BUY' | 'SELL'
  quantity: number
  price: number
  tradeDate: string
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalTransactions: 0,
    totalPortfolioValue: 0,
  })
  const [transactionTrend, setTransactionTrend] = useState<TransactionTrend[]>([])
  const [topStocks, setTopStocks] = useState<ChartData[]>([])
  const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard')
      const data = await response.json()
      
      setStats(data.stats)
      setTransactionTrend(data.transactionTrend || [])
      setTopStocks(data.topStocks || [])
      setRecentTransactions(data.recentTransactions || [])
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const StatCardSkeleton = () => (
    <Card className="h-full">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box className="flex-1">
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="80%" height={48} sx={{ my: 1 }} />
            <Skeleton variant="text" width="40%" height={20} />
          </Box>
          <Skeleton variant="circular" width={64} height={64} />
        </Box>
      </CardContent>
    </Card>
  )

  const ChartSkeleton = () => (
    <Paper className="p-4">
      <Skeleton variant="text" width="30%" height={32} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Paper>
  )

  const TableSkeleton = () => (
    <Paper className="p-4">
      <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <TableCell key={i}>
                  <Skeleton variant="text" width="100%" />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2, 3, 4, 5].map((row) => (
              <TableRow key={row}>
                {[1, 2, 3, 4, 5, 6].map((col) => (
                  <TableCell key={col}>
                    <Skeleton variant="text" width="100%" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )

  const renderCustomLabel = (entry: any) => {
    return `${entry.name} ${(entry.percent * 100).toFixed(0)}%`
  }

  return (
    <Box>
      {/* Header */}
      <Typography variant="h4" className="font-bold text-gray-800 mb-6">
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Users */}
        <div>
          {loading ? (
            <StatCardSkeleton />
          ) : (
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white h-full">
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" className="opacity-90 mb-1">
                      Total Users
                    </Typography>
                    <Typography variant="h3" className="font-bold">
                      {stats.totalUsers.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" className="opacity-75 mt-2">
                      Registered users
                    </Typography>
                  </Box>
                  <People sx={{ fontSize: 64, opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Total Transactions */}
        <div>
          {loading ? (
            <StatCardSkeleton />
          ) : (
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white h-full">
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" className="opacity-90 mb-1">
                      Total Transactions
                    </Typography>
                    <Typography variant="h3" className="font-bold">
                      {stats.totalTransactions.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" className="opacity-75 mt-2">
                      All-time trades
                    </Typography>
                  </Box>
                  <SwapHoriz sx={{ fontSize: 64, opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Total Portfolio Value */}
        <div>
          {loading ? (
            <StatCardSkeleton />
          ) : (
            <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white h-full">
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" className="opacity-90 mb-1">
                      Total Portfolio Value
                    </Typography>
                    <Typography variant="h3" className="font-bold">
                      ${stats.totalPortfolioValue.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" className="opacity-75 mt-2">
                      All users combined
                    </Typography>
                  </Box>
                  <AccountBalance sx={{ fontSize: 64, opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Transaction Trend Chart */}
        <div className="lg:col-span-2">
          {loading ? (
            <ChartSkeleton />
          ) : (
            <Paper className="p-4">
              <Typography variant="h6" className="font-semibold mb-4 text-gray-700">
                Transaction Trend (Last 7 Days)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={transactionTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Transactions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          )}
        </div>

        {/* Top Stocks Pie Chart */}
        <div>
          {loading ? (
            <ChartSkeleton />
          ) : (
            <Paper className="p-4">
              <Typography variant="h6" className="font-semibold mb-4 text-gray-700">
                Top Traded Stocks
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={topStocks}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {topStocks.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          )}
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div>
        {loading ? (
          <TableSkeleton />
        ) : (
          <Paper className="p-4">
            <Typography variant="h6" className="font-semibold mb-4 text-gray-700">
              Recent Transactions
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="font-semibold">User</TableCell>
                    <TableCell className="font-semibold">Stock</TableCell>
                    <TableCell className="font-semibold">Type</TableCell>
                    <TableCell className="font-semibold" align="right">Quantity</TableCell>
                    <TableCell className="font-semibold" align="right">Price</TableCell>
                    <TableCell className="font-semibold">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" className="text-gray-500 py-8">
                        No transactions yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id} hover>
                        <TableCell className="font-medium">{transaction.userName}</TableCell>
                        <TableCell className="font-mono text-sm">{transaction.stockId}</TableCell>
                        <TableCell>
                          <Chip
                            label={transaction.type}
                            size="small"
                            color={transaction.type === 'BUY' ? 'success' : 'error'}
                          />
                        </TableCell>
                        <TableCell align="right">{transaction.quantity.toLocaleString()}</TableCell>
                        <TableCell align="right">${transaction.price.toFixed(2)}</TableCell>
                        <TableCell className="text-sm">
                          {new Date(transaction.tradeDate).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </div>
    </Box>
  )
}