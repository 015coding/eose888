'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Session as NextAuthSession } from 'next-auth'
import {
  Box, Drawer, AppBar, Toolbar, List, Typography, IconButton,
  ListItem, ListItemButton, ListItemIcon, ListItemText,
  Avatar, Collapse, Button, Tooltip,
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import HistoryIcon from '@mui/icons-material/History'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import LoginIcon from '@mui/icons-material/Login'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

const drawerWidth = 240

const T = {
  bg:         '#F5F7FA',
  sidebar:    '#FFFFFF',
  border:     '#E8EBF2',
  text:       '#5A6072',
  textDim:    '#A0A8BC',
  textBright: '#0E1118',
  accent:     '#2962FF',
  accentBg:   'rgba(41, 98, 255, 0.07)',
  accentHov:  'rgba(41, 98, 255, 0.12)',
  hover:      'rgba(0,0,0,0.03)',
  green:      '#0C9B87',
  red:        '#EF5350',
  mono:       '"DM Mono", "JetBrains Mono", monospace',
}

interface SidebarProps {
  children: React.ReactNode
  session: NextAuthSession
}

export default function Sidebar({ children, session }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [logsOpen, setLogsOpen]     = useState(false)
  const pathname = usePathname()
  const router   = useRouter()

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: 18 }} />, path: '/admin/dashboard' },
    { text: 'Users',     icon: <PeopleIcon    sx={{ fontSize: 18 }} />, path: '/admin/users'     },
    { text: 'Settings',  icon: <SettingsIcon  sx={{ fontSize: 18 }} />, path: '/admin/settings'  },
  ]

  const logItems = [
    { text: 'Auth',         icon: <LoginIcon     sx={{ fontSize: 16 }} />, path: '/admin/log/auth'         },
    { text: 'Transactions', icon: <SwapHorizIcon sx={{ fontSize: 16 }} />, path: '/admin/log/transactions' },
  ]

  const NavItem = ({ text, icon, path }: { text: string; icon: React.ReactNode; path: string }) => {
    const active = pathname === path
    return (
      <Tooltip title={text} placement="right" disableHoverListener>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            onClick={() => router.push(path)}
            sx={{
              px: 1.5, py: 0.85, borderRadius: '6px', position: 'relative',
              transition: 'background 0.15s',
              bgcolor: active ? T.accentBg : 'transparent',
              '&:hover': { bgcolor: active ? T.accentHov : T.hover },
              '&::before': active ? {
                content: '""', position: 'absolute', left: 0, top: '20%',
                height: '60%', width: '2px', borderRadius: '0 2px 2px 0', bgcolor: T.accent,
              } : {},
            }}
          >
            <ListItemIcon sx={{ minWidth: 34, color: active ? T.accent : T.textDim }}>
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={text}
              primaryTypographyProps={{
                fontSize: '0.8125rem', fontWeight: active ? 600 : 400,
                letterSpacing: '0.01em',
                color: active ? T.accent : T.text,
                fontFamily: T.mono,
              }}
            />
          </ListItemButton>
        </ListItem>
      </Tooltip>
    )
  }

  const SectionLabel = ({ label }: { label: string }) => (
    <Typography sx={{
      display: 'block', px: 1.5, pt: 2, pb: 0.75,
      color: T.textDim, fontFamily: T.mono,
      fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase',
    }}>
      {label}
    </Typography>
  )

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: T.sidebar, borderRight: `1px solid ${T.border}` }}>
      {/* Logo */}
      <Box
        sx={{
          height: 52, display: 'flex', alignItems: 'center', px: 2,
          borderBottom: `1px solid ${T.border}`, cursor: 'pointer', flexShrink: 0,
        }}
        onClick={() => router.push('/')}
      >
        <Box sx={{
          width: 7, height: 7, borderRadius: '50%',
          bgcolor: T.green, boxShadow: `0 0 8px ${T.green}44`, mr: 1.25, flexShrink: 0,
        }} />
        <Typography sx={{
          fontFamily: T.mono, fontSize: '0.9rem', fontWeight: 700,
          letterSpacing: '-0.02em', color: T.textBright, userSelect: 'none',
        }}>
          Eose<span style={{ color: T.accent }}>888</span>
        </Typography>
        <Box sx={{
          ml: 'auto', px: 0.75, py: 0.2, borderRadius: '4px',
          bgcolor: 'rgba(12,155,135,0.08)', border: `1px solid rgba(12,155,135,0.2)`,
        }}>
          <Typography sx={{
            fontFamily: T.mono, fontSize: '0.55rem', letterSpacing: '0.08em',
            color: T.green, fontWeight: 600,
          }}>
            ADMIN
          </Typography>
        </Box>
      </Box>

      {/* Nav */}
      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', px: 1, py: 1, '&::-webkit-scrollbar': { width: 0 } }}>
        <SectionLabel label="Main" />
        <List disablePadding>
          {menuItems.map(item => <NavItem key={item.path} {...item} />)}
        </List>

        <SectionLabel label="Logs" />
        <List disablePadding>
          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => setLogsOpen(p => !p)}
              sx={{ px: 1.5, py: 0.85, borderRadius: '6px', '&:hover': { bgcolor: T.hover } }}
            >
              <ListItemIcon sx={{ minWidth: 34, color: T.textDim }}>
                <HistoryIcon sx={{ fontSize: 18 }} />
              </ListItemIcon>
              <ListItemText
                primary="All Logs"
                primaryTypographyProps={{ fontSize: '0.8125rem', fontWeight: 400, color: T.text, fontFamily: T.mono }}
              />
              {logsOpen
                ? <ExpandLess sx={{ fontSize: 16, color: T.textDim }} />
                : <ExpandMore sx={{ fontSize: 16, color: T.textDim }} />}
            </ListItemButton>
          </ListItem>
          <Collapse in={logsOpen} timeout="auto" unmountOnExit>
            <List disablePadding sx={{ pl: 1 }}>
              {logItems.map(item => {
                const active = pathname === item.path
                return (
                  <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                      onClick={() => router.push(item.path)}
                      sx={{
                        px: 1.5, py: 0.75, borderRadius: '6px',
                        bgcolor: active ? T.accentBg : 'transparent',
                        '&:hover': { bgcolor: active ? T.accentHov : T.hover },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 30, color: active ? T.accent : T.textDim }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          fontSize: '0.775rem', color: active ? T.accent : T.text,
                          fontWeight: active ? 600 : 400, fontFamily: T.mono,
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
          </Collapse>
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ borderTop: `1px solid ${T.border}`, p: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25, px: 0.5 }}>
          <Avatar sx={{ width: 30, height: 30, bgcolor: T.accentBg, border: `1px solid ${T.border}` }}>
            <AdminPanelSettingsIcon sx={{ fontSize: 15, color: T.accent }} />
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{
              fontSize: '0.775rem', fontWeight: 600, color: T.textBright,
              fontFamily: T.mono, letterSpacing: '-0.01em',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {session.user?.name || 'Admin'}
            </Typography>
            <Typography sx={{
              fontSize: '0.6rem', color: T.textDim, fontFamily: T.mono,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {session.user?.email}
            </Typography>
          </Box>
        </Box>
        <Button
          fullWidth size="small"
          startIcon={<LogoutIcon sx={{ fontSize: '14px !important' }} />}
          onClick={() => signOut({ callbackUrl: '/login' })}
          sx={{
            justifyContent: 'flex-start', px: 1.5, py: 0.75, borderRadius: '6px',
            color: T.textDim, fontFamily: T.mono, fontSize: '0.75rem',
            fontWeight: 500, letterSpacing: '0.02em', textTransform: 'none',
            transition: 'all 0.15s',
            '&:hover': { bgcolor: 'rgba(239,83,80,0.07)', color: T.red },
          }}
        >
          Sign out
        </Button>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', bgcolor: T.bg, minHeight: '100vh' }}>
      <AppBar
        position="fixed" elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: T.sidebar, borderBottom: `1px solid ${T.border}`,
          display: { md: 'none' },
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ minHeight: '52px !important' }}>
          <IconButton edge="start" onClick={() => setMobileOpen(p => !p)} sx={{ color: T.text, mr: 1 }}>
            <MenuIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <Typography sx={{ fontFamily: T.mono, fontSize: '0.875rem', fontWeight: 700, color: T.textBright }}>
            Eose<span style={{ color: T.accent }}>888</span>
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth, border: 'none' } }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { width: drawerWidth, border: 'none', boxShadow: '1px 0 0 #E8EBF2' } }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` }, minHeight: '100vh', bgcolor: T.bg, mt: { xs: '52px', md: 0 } }}
      >
        {children}
      </Box>
    </Box>
  )
}