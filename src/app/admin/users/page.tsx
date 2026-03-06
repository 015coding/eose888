'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, TextField, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Select, MenuItem, FormControl, InputLabel, Skeleton,
  Alert, Snackbar, InputAdornment, TablePagination
} from '@mui/material'
import {
  EditRounded as EditIcon,
  DeleteRounded as DeleteIcon,
  PersonAddRounded as PersonAddIcon,
  SearchRounded as SearchIcon,
  AdminPanelSettingsRounded,
  PersonRounded,
} from '@mui/icons-material'

// ── Palette — match iOS glass sidebar ────────────────────────────────────────
const T = {
  wallpaper:   '#FFFFFF',
  glass:       'rgba(255,255,255,0.60)',
  glassBorder: 'rgba(255,255,255,0.85)',
  shadow:      '0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',
  shadowHov:   '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)',

  text:        '#374151',
  textDim:     '#9CA3AF',
  textBright:  '#111827',

  emerald:     '#10B981',
  emeraldBg:   'rgba(16,185,129,0.10)',

  blue:        '#3B82F6',
  blueBg:      'rgba(59,130,246,0.10)',

  red:         '#EF4444',
  redBg:       'rgba(239,68,68,0.10)',

  mono:        '"DM Mono","JetBrains Mono",monospace',
  sans:        '"SF Pro Rounded","SF Pro Display",-apple-system,"Helvetica Neue",sans-serif',
}

// ── Shared ────────────────────────────────────────────────────────────────────
function GlassCard({ children, sx = {} }: { children: React.ReactNode; sx?: object }) {
  return (
    <Box sx={{
      bgcolor: T.glass,
      backdropFilter: 'blur(20px)',
      border: `1px solid ${T.glassBorder}`,
      borderRadius: '20px',
      boxShadow: T.shadow,
      overflow: 'hidden',
      ...sx,
    }}>
      {children}
    </Box>
  )
}

// Types
interface User {
  id: string
  name: string | null
  email: string
  role: 'USER' | 'ADMIN'
  createdAt: string
}

interface NewUser {
  name: string
  email: string
  password: string
  role: 'USER' | 'ADMIN'
}

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Pagination state
  const [page, setPage] = useState(DEFAULT_PAGE)
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_LIMIT)
  const [totalUsers, setTotalUsers] = useState(0)

  // Dialog states
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  
  // Form states
  const [newUser, setNewUser] = useState<NewUser>({ name: '', email: '', password: '', role: 'USER' })
  const [editRole, setEditRole] = useState<'USER' | 'ADMIN'>('USER')
  
  // Snackbar
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' })

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(rowsPerPage) })
      const response = await fetch(`/api/admin/users?${params.toString()}`)
      const data = await response.json()
      setUsers(data.users || [])
      setTotalUsers(data.totalUsers || 0)
    } catch (error) {
      console.error('Failed to fetch users:', error)
      showSnackbar('Failed to fetch users', 'error')
      setUsers([])
      setTotalUsers(0)
    } finally {
      setLoading(false)
    }
  }, [page, rowsPerPage])

  useEffect(() => { fetchUsers() }, [fetchUsers])

  const filteredUsers = useMemo(
    () => users.filter(user =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [searchTerm, users]
  )

  const handleAddUser = async () => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to add user')

      showSnackbar('User added successfully', 'success')
      setOpenAddDialog(false)
      setNewUser({ name: '', email: '', password: '', role: 'USER' })
      fetchUsers()
    } catch (error: any) { showSnackbar(error.message, 'error') }
  }

  const handleUpdateRole = async () => {
    if (!selectedUser) return
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedUser.id, role: editRole })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to update role')

      showSnackbar('User role updated successfully', 'success')
      setOpenEditDialog(false)
      setSelectedUser(null)
      fetchUsers()
    } catch (error: any) { showSnackbar(error.message, 'error') }
  }

  const handleDeleteUser = async () => {
    if (!selectedUser) return
    try {
      const response = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedUser.id })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to delete user')

      showSnackbar('User deleted successfully', 'success')
      setOpenDeleteDialog(false)
      setSelectedUser(null)
      fetchUsers()
    } catch (error: any) { showSnackbar(error.message, 'error') }
  }

  const showSnackbar = (message: string, severity: 'success' | 'error') => setSnackbar({ open: true, message, severity })
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false })

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(DEFAULT_PAGE)
  }

  const TableSkeleton = () => (
    <>
      {[...Array(rowsPerPage)].map((_, row) => (
        <TableRow key={row}>
          {[1, 2, 3, 4, 5].map((col) => (
            <TableCell key={col} sx={{ py: 2 }}>
              <Skeleton variant="rounded" height={24} sx={{ bgcolor: 'rgba(0,0,0,0.04)' }} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )

  const dialogPaperProps = { sx: { borderRadius: '24px', bgcolor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(24px)', boxShadow: T.shadowHov, border: `1px solid ${T.glassBorder}`, backgroundImage: 'none' } }

  return (
    <Box sx={{ minHeight: '100vh', background: T.wallpaper, p: { xs: 2, md: 3 } }}>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, pb: 2.5, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <Box>
          <Typography sx={{ fontFamily: T.mono, fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: T.textDim, mb: 0.4 }}>
            Admin Console
          </Typography>
          <Typography sx={{ fontFamily: T.sans, fontSize: '1.25rem', fontWeight: 700, color: T.textBright, letterSpacing: '-0.04em' }}>
            Users Management
          </Typography>
        </Box>
        <Button disableElevation variant="contained" startIcon={<PersonAddIcon sx={{ fontSize: '18px !important' }} />} onClick={() => setOpenAddDialog(true)} sx={{ bgcolor: T.textBright, color: '#fff', borderRadius: '12px', px: 2, py: 1, fontFamily: T.sans, fontSize: '0.85rem', fontWeight: 600, textTransform: 'none', '&:hover': { bgcolor: '#000', transform: 'translateY(-1px)' }, transition: 'all 0.2s ease' }}>
          Add User
        </Button>
      </Box>

      <GlassCard sx={{ p: 1, mb: 3 }}>
        <TextField fullWidth placeholder="Search by name or email on the current page..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} variant="outlined" InputProps={{ startAdornment: ( <InputAdornment position="start"> <SearchIcon sx={{ color: T.textDim, fontSize: 20 }} /> </InputAdornment> ), sx: { fontFamily: T.sans, fontSize: '0.9rem', '& fieldset': { border: 'none' }, '& input': { py: 1.5, px: 1 } } }} />
      </GlassCard>

      <GlassCard>
        <Box sx={{ px: 2.5, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <Typography sx={{ fontFamily: T.mono, fontSize: '0.58rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: T.textDim }}>
            Registered Accounts
          </Typography>
          <Typography sx={{ fontFamily: T.mono, fontSize: '0.65rem', color: T.text }}>
            Total: {totalUsers}
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {['Name', 'Email', 'Role', 'Joined Date', 'Actions'].map((head, i) => (
                  <TableCell key={head} align={i === 4 ? 'center' : 'left'} sx={{ fontFamily: T.mono, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: T.textDim, fontWeight: 600, borderBottom: '1px solid rgba(0,0,0,0.05)', py: 1.5, bgcolor: 'rgba(0,0,0,0.015)' }}>
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? ( <TableSkeleton /> ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                    <Typography sx={{ fontFamily: T.sans, color: T.textDim, fontSize: '0.9rem' }}>No users found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user, i) => {
                  const isAdmin = user.role === 'ADMIN'
                  return (
                    <TableRow key={user.id} sx={{ '&:last-child td': { border: 0 }, '&:hover': { bgcolor: 'rgba(255,255,255,0.7)' } }}>
                      <TableCell sx={{ borderBottom: '1px solid rgba(0,0,0,0.04)', py: 1.75, pl: 2.5 }}>
                        <Typography sx={{ fontFamily: T.sans, fontSize: '0.875rem', fontWeight: 600, color: T.textBright, letterSpacing: '-0.02em' }}>
                          {user.name || 'Unnamed User'}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid rgba(0,0,0,0.04)', py: 1.75 }}>
                        <Typography sx={{ fontFamily: T.sans, fontSize: '0.85rem', color: T.text }}>{user.email}</Typography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid rgba(0,0,0,0.04)', py: 1.75 }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.35, borderRadius: '8px', bgcolor: isAdmin ? T.redBg : T.blueBg, border: `1px solid ${isAdmin ? 'rgba(239,68,68,0.2)' : 'rgba(59,130,246,0.2)'}` }}>
                          {isAdmin ? <AdminPanelSettingsRounded sx={{ fontSize: 13, color: T.red }} /> : <PersonRounded sx={{ fontSize: 13, color: T.blue }} />}
                          <Typography sx={{ fontFamily: T.mono, fontSize: '0.55rem', letterSpacing: '0.08em', color: isAdmin ? T.red : T.blue, fontWeight: 700 }}>
                            {user.role}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid rgba(0,0,0,0.04)', py: 1.75 }}>
                        <Typography sx={{ fontFamily: T.sans, fontSize: '0.8rem', fontWeight: 500, color: T.text }}>
                          {new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ borderBottom: '1px solid rgba(0,0,0,0.04)', py: 1.75 }}>
                        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                          <IconButton size="small" onClick={() => { setSelectedUser(user); setEditRole(user.role); setOpenEditDialog(true); }} sx={{ color: T.textDim, '&:hover': { color: T.blue, bgcolor: T.blueBg } }} > <EditIcon sx={{ fontSize: 18 }} /> </IconButton>
                          <IconButton size="small" onClick={() => { setSelectedUser(user); setOpenDeleteDialog(true); }} sx={{ color: T.textDim, '&:hover': { color: T.red, bgcolor: T.redBg } }} > <DeleteIcon sx={{ fontSize: 18 }} /> </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalUsers}
          page={page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{ borderTop: '1px solid rgba(0,0,0,0.05)', color: T.textDim, fontFamily: T.mono, bgcolor: 'rgba(0,0,0,0.015)', '.MuiTablePagination-select': { color: T.text, fontFamily: T.mono }, '.MuiTablePagination-selectIcon': { color: T.textDim }, '.MuiTablePagination-actions button': { color: T.text }, '.MuiTablePagination-displayedRows': { fontFamily: T.mono, fontSize: '0.72rem' }, '.MuiTablePagination-selectLabel': { fontFamily: T.mono, fontSize: '0.72rem' }, }}
        />
      </GlassCard>

      {/* Dialogs and Snackbar */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth PaperProps={dialogPaperProps}>
        <DialogTitle sx={{ fontFamily: T.sans, fontWeight: 700, fontSize: '1.2rem', pb: 1, color: T.textBright }}>Add New User</DialogTitle>
        <DialogContent sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
            <TextField label="Name" fullWidth value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} variant="filled" InputProps={{ disableUnderline: true, sx: { borderRadius: '12px', bgcolor: 'rgba(0,0,0,0.03)', '&.Mui-focused': { bgcolor: 'rgba(0,0,0,0.05)' } } }} />
            <TextField label="Email" type="email" fullWidth value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} variant="filled" InputProps={{ disableUnderline: true, sx: { borderRadius: '12px', bgcolor: 'rgba(0,0,0,0.03)', '&.Mui-focused': { bgcolor: 'rgba(0,0,0,0.05)' } } }} />
            <TextField label="Password" type="password" fullWidth value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} variant="filled" InputProps={{ disableUnderline: true, sx: { borderRadius: '12px', bgcolor: 'rgba(0,0,0,0.03)', '&.Mui-focused': { bgcolor: 'rgba(0,0,0,0.05)' } } }} />
            <FormControl fullWidth variant="filled">
              <InputLabel>Role</InputLabel>
              <Select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'USER' | 'ADMIN' })} disableUnderline sx={{ borderRadius: '12px', bgcolor: 'rgba(0,0,0,0.03)', '&.Mui-focused': { bgcolor: 'rgba(0,0,0,0.05)' } }}>
                <MenuItem value="USER" sx={{ fontFamily: T.sans }}>User</MenuItem>
                <MenuItem value="ADMIN" sx={{ fontFamily: T.sans }}>Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button onClick={() => setOpenAddDialog(false)} sx={{ color: T.text, fontFamily: T.sans, textTransform: 'none', fontWeight: 600 }}>Cancel</Button>
          <Button disableElevation onClick={handleAddUser} variant="contained" sx={{ bgcolor: T.textBright, color: '#fff', borderRadius: '10px', fontFamily: T.sans, textTransform: 'none', fontWeight: 600, '&:hover': { bgcolor: '#000' } }}>Add User</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="xs" fullWidth PaperProps={dialogPaperProps}>
        <DialogTitle sx={{ fontFamily: T.sans, fontWeight: 700, fontSize: '1.2rem', pb: 1, color: T.textBright }}>Edit User Role</DialogTitle>
        <DialogContent><Box sx={{ mt: 1 }}><Typography sx={{ fontFamily: T.sans, fontSize: '0.9rem', color: T.text, mb: 3 }}>Change role for <span style={{ fontWeight: 600, color: T.textBright }}>{selectedUser?.email}</span></Typography><FormControl fullWidth variant="filled"><InputLabel>Role</InputLabel><Select value={editRole} onChange={(e) => setEditRole(e.target.value as 'USER' | 'ADMIN')} disableUnderline sx={{ borderRadius: '12px', bgcolor: 'rgba(0,0,0,0.03)', '&.Mui-focused': { bgcolor: 'rgba(0,0,0,0.05)' } }}><MenuItem value="USER" sx={{ fontFamily: T.sans }}>User</MenuItem><MenuItem value="ADMIN" sx={{ fontFamily: T.sans }}>Admin</MenuItem></Select></FormControl></Box></DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1 }}><Button onClick={() => setOpenEditDialog(false)} sx={{ color: T.text, fontFamily: T.sans, textTransform: 'none', fontWeight: 600 }}>Cancel</Button><Button disableElevation onClick={handleUpdateRole} variant="contained" sx={{ bgcolor: T.blue, color: '#fff', borderRadius: '10px', fontFamily: T.sans, textTransform: 'none', fontWeight: 600 }}>Save Changes</Button></DialogActions>
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} PaperProps={dialogPaperProps}>
        <DialogTitle sx={{ fontFamily: T.sans, fontWeight: 700, fontSize: '1.2rem', pb: 1, color: T.textBright }}>Confirm Delete</DialogTitle>
        <DialogContent><Typography sx={{ fontFamily: T.sans, fontSize: '0.95rem', color: T.text }}>Are you sure you want to delete <span style={{ fontWeight: 600, color: T.textBright }}>{selectedUser?.email}</span>?</Typography><Alert severity="error" sx={{ mt: 2, borderRadius: '12px', '& .MuiAlert-message': { fontFamily: T.sans, fontSize: '0.85rem' } }}>This action cannot be undone.</Alert></DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1 }}><Button onClick={() => setOpenDeleteDialog(false)} sx={{ color: T.text, fontFamily: T.sans, textTransform: 'none', fontWeight: 600 }}>Cancel</Button><Button disableElevation onClick={handleDeleteUser} variant="contained" sx={{ bgcolor: T.red, color: '#fff', borderRadius: '10px', fontFamily: T.sans, textTransform: 'none', fontWeight: 600, '&:hover': { bgcolor: '#DC2626' } }}>Delete Account</Button></DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}><Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%', borderRadius: '12px', boxShadow: T.shadowHov, fontFamily: T.sans, fontWeight: 500, alignItems: 'center' }}>{snackbar.message}</Alert></Snackbar>
    </Box>
  )
}