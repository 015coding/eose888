'use client'

import { useEffect, useState } from 'react'
import { Skeleton, TablePagination } from '@mui/material'


interface LoginLog {
  _id: string
  userId?: string
  userEmail: string
  userName?: string
  action: string
  success: boolean
  errorMessage?: string
  createdAt: string
}

interface Stats {
  totalLogins: number
  successfulLogins: number
  failedLogins: number
  successRate: string
  logins24h: number
  logins7d: number
  uniqueUsers: number
}

export default function AdminLogsClient() {
  const DEFAULT_PAGE = 1
  const DEFAULT_LIMIT = 10
  const LIMIT_OPTIONS = [5, 10, 25] as const

  const [logs, setLogs] = useState<LoginLog[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(DEFAULT_PAGE)
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT)
  const [totalPages, setTotalPages] = useState(1)
  const [totalLogs, setTotalLogs] = useState(0)
  const [filter, setFilter] = useState({
    action: '',
    success: '',
    email: '',
  })

  useEffect(() => {
    fetchLogs()
  }, [filter, page, limit])

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchLogs = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (filter.action) params.set('action', filter.action)
    if (filter.success) params.set('success', filter.success)
    if (filter.email) params.set('email', filter.email)
    params.set('page', String(page))
    params.set('limit', String(limit))

    try {
      const res = await fetch(`/api/login-logs?${params}`)
      const data = await res.json()
      setLogs(data.logs || [])
      setLimit(data.limit || limit)
      setTotalPages(data.totalPages || 1)
      setTotalLogs(data.totalLogs || 0)
    } catch (error) {
      console.error('Error fetching logs:', error)
      setLogs([])
      setTotalPages(1)
      setTotalLogs(0)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (field: 'action' | 'success' | 'email', value: string) => {
    setFilter((prev) => ({ ...prev, [field]: value }))
    setPage(DEFAULT_PAGE)
  }

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/login-logs/stats')
      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage + 1)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(Number.parseInt(event.target.value, 10))
    setPage(DEFAULT_PAGE)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Login Logs Dashboard</h1>

        {/* Stats Cards */}
        {!stats ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow">
                <Skeleton variant="text" width="50%" sx={{ mb: 1 }} />
                <Skeleton variant="rectangular" height={40} width="40%" sx={{ borderRadius: 1 }} />
                <Skeleton variant="text" width="80%" sx={{ mt: 1 }} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-gray-500 text-sm">Total Logins</div>
              <div className="text-3xl font-bold">{stats.totalLogins}</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow">
              <div className="text-gray-500 text-sm">Successful</div>
              <div className="text-3xl font-bold text-green-600">
                {stats.successfulLogins}
              </div>
              <div className="text-sm text-gray-500">
                {stats.successRate}% success rate
              </div>
            </div>
            <div className="bg-red-50 p-6 rounded-lg shadow">
              <div className="text-gray-500 text-sm">Failed</div>
              <div className="text-3xl font-bold text-red-600">
                {stats.failedLogins}
              </div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow">
              <div className="text-gray-500 text-sm">Last 24h</div>
              <div className="text-3xl font-bold text-blue-600">
                {stats.logins24h}
              </div>
              <div className="text-sm text-gray-500">{stats.logins7d} in 7 days</div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Action</label>
              <select
                value={filter.action}
                onChange={(e) => handleFilterChange('action', e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">All Actions</option>
                <option value="login">Login</option>
                <option value="logout">Logout</option>
                <option value="register">Register</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={filter.success}
                onChange={(e) => handleFilterChange('success', e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">All Status</option>
                <option value="true">Success</option>
                <option value="false">Failed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="text"
                value={filter.email}
                onChange={(e) => handleFilterChange('email', e.target.value)}
                placeholder="Search by email..."
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Logs Table */}
        {loading ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            Loading logs...
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Error
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {logs.map((log) => (
                    <tr key={log._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(log.createdAt).toLocaleString('th-TH')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {log.userName || '-'}
                        </div>
                        <div className="text-sm text-gray-500">{log.userEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            log.action === 'login'
                              ? 'bg-blue-100 text-blue-800'
                              : log.action === 'logout'
                              ? 'bg-gray-100 text-gray-800'
                              : log.action === 'register'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {log.success ? (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Success
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            Failed
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-red-600">
                        {log.errorMessage || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <TablePagination
              component="div"
              count={totalLogs}
              page={page - 1}
              onPageChange={handleChangePage}
              rowsPerPage={limit}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={LIMIT_OPTIONS as unknown as number[]}
              sx={{
                borderTop: '1px solid rgba(0,0,0,0.05)',
                color: '#9CA3AF',
                bgcolor: 'rgba(0,0,0,0.015)',
                '.MuiTablePagination-select': { color: '#374151' },
                '.MuiTablePagination-selectIcon': { color: '#9CA3AF' },
                '.MuiTablePagination-actions button': { color: '#374151' },
                '.MuiTablePagination-displayedRows': { fontSize: '0.72rem' },
                '.MuiTablePagination-selectLabel': { fontSize: '0.72rem' },
              }}
            />
          </div>
        )}

        {logs.length === 0 && !loading && (
          <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
            No logs found
          </div>
        )}
      </div>
    </div>
  )
}