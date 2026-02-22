'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Session as NextAuthSession } from 'next-auth'
import {
  Box, Drawer, AppBar, Toolbar, List, Typography, IconButton,
  ListItem, ListItemButton, ListItemIcon, ListItemText,
  Avatar, Collapse, Button,
} from '@mui/material'

import MenuIcon               from '@mui/icons-material/Menu'
import DashboardRoundedIcon   from '@mui/icons-material/DashboardRounded'
import PeopleRoundedIcon      from '@mui/icons-material/PeopleRounded'
import SettingsRoundedIcon    from '@mui/icons-material/SettingsRounded'
import LogoutRoundedIcon      from '@mui/icons-material/LogoutRounded'
import HistoryRoundedIcon     from '@mui/icons-material/HistoryRounded'
import ExpandMoreRoundedIcon  from '@mui/icons-material/ExpandMoreRounded'
import LoginRoundedIcon       from '@mui/icons-material/LoginRounded'
import SwapHorizRoundedIcon   from '@mui/icons-material/SwapHorizRounded'
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded'

const drawerWidth = 260

const EMERALD = '#10B981'
const T = {
  wallpaper:   'linear-gradient(145deg, #e8f5f0 0%, #f0f4ff 40%, #fdf4ff 100%)',
  glass:       'rgba(255,255,255,0.62)',
  glassBorder: 'rgba(255,255,255,0.85)',
  glassInner:  'rgba(255,255,255,0.45)',
  activeBg:    'rgba(255,255,255,0.80)',
  hoverBg:     'rgba(255,255,255,0.45)',
  shadow:      '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
  shadowFloat: '0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)',
  text:        '#374151',
  textDim:     '#9CA3AF',
  textBright:  '#111827',
  emerald:     EMERALD,
  emeraldGlow: 'rgba(16,185,129,0.25)',
  red:         '#EF4444',
  sans:        '"SF Pro Rounded","SF Pro Display",-apple-system,"Helvetica Neue",sans-serif',
  mono:        '"SF Mono","DM Mono",monospace',
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
    { text: 'Dashboard', icon: <DashboardRoundedIcon  sx={{ fontSize: 19 }} />, path: '/admin/dashboard' },
    { text: 'Users',     icon: <PeopleRoundedIcon     sx={{ fontSize: 19 }} />, path: '/admin/users'     },
    { text: 'Settings',  icon: <SettingsRoundedIcon   sx={{ fontSize: 19 }} />, path: '/admin/settings'  },
  ]

  const logItems = [
    { text: 'Auth',         icon: <LoginRoundedIcon    sx={{ fontSize: 16 }} />, path: '/admin/log/auth'         },
    { text: 'Transactions', icon: <SwapHorizRoundedIcon sx={{ fontSize: 16 }} />, path: '/admin/log/transactions' },
  ]

  const NavItem = ({ text, icon, path }: { text: string; icon: React.ReactNode; path: string }) => {
    const active = pathname === path
    return (
      <ListItem disablePadding sx={{ mb: 0.5 }}>
        <ListItemButton
          onClick={() => router.push(path)}
          sx={{
            px: 1.5, py: 0.95, borderRadius: '14px',
            transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
            bgcolor: active ? T.activeBg : 'transparent',
            boxShadow: active ? `0 2px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)` : 'none',
            border: active ? `1px solid ${T.glassBorder}` : '1px solid transparent',
            '&:hover': {
              bgcolor: active ? T.activeBg : T.hoverBg,
              transform: active ? 'none' : 'translateX(2px)',
            },
            '&:active': { transform: 'scale(0.98)' },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <Box sx={{
              width: 30, height: 30, borderRadius: '9px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              bgcolor: active ? `rgba(16,185,129,0.12)` : 'rgba(0,0,0,0.04)',
              color: active ? T.emerald : T.textDim,
              transition: 'all 0.2s ease',
            }}>
              {icon}
            </Box>
          </ListItemIcon>
          <ListItemText
            primary={text}
            primaryTypographyProps={{
              fontFamily: T.sans, fontSize: '0.875rem',
              fontWeight: active ? 600 : 500,
              color: active ? T.textBright : T.text,
              letterSpacing: '-0.02em',
            }}
          />
          {active && (
            <Box sx={{
              width: 6, height: 6, borderRadius: '50%',
              bgcolor: T.emerald,
              boxShadow: `0 0 8px ${T.emeraldGlow}`,
              flexShrink: 0,
            }} />
          )}
        </ListItemButton>
      </ListItem>
    )
  }

  const GroupLabel = ({ label }: { label: string }) => (
    <Typography sx={{
      px: 1.5, pt: 2, pb: 0.75, display: 'block',
      fontFamily: T.mono, fontSize: '0.58rem',
      letterSpacing: '0.12em', textTransform: 'uppercase',
      color: T.textDim, userSelect: 'none',
    }}>
      {label}
    </Typography>
  )

  const drawerContent = (
    // outer: wallpaper background
    <Box sx={{
      height: '100%',
      background: T.wallpaper,
      display: 'flex', flexDirection: 'column',
      p: 1.5,
      gap: 1,
    }}>

      {/* ── Logo card ── */}
      <Box sx={{
        borderRadius: '20px',
        bgcolor: T.glass,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${T.glassBorder}`,
        boxShadow: T.shadow,
        px: 2, py: 1.5,
        display: 'flex', alignItems: 'center', gap: 1.5,
        cursor: 'pointer', flexShrink: 0,
        transition: 'all 0.2s ease',
        '&:hover': { boxShadow: T.shadowFloat, transform: 'translateY(-1px)' },
        '&:active': { transform: 'scale(0.98)' },
      }}
        onClick={() => router.push('/')}
      >
        {/* Logo mark */}
        <Box sx={{
          width: 36, height: 36, borderRadius: '12px', flexShrink: 0,
          background: `linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.08) 100%)`,
          border: `1.5px solid rgba(16,185,129,0.2)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.6)`,
        }}>
          <Box sx={{
            width: 10, height: 10, borderRadius: '50%',
            background: `radial-gradient(circle at 35% 35%, #34D399, ${T.emerald})`,
            boxShadow: `0 0 10px ${T.emeraldGlow}, 0 2px 4px rgba(16,185,129,0.3)`,
          }} />
        </Box>

        {/* Wordmark */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'baseline', lineHeight: 1 }}>
            <Typography sx={{
              fontFamily: T.sans, fontSize: '1.1rem', fontWeight: 700,
              color: '#111827', letterSpacing: '-0.04em',
            }}>
              Eose
            </Typography>
            <Typography sx={{
              fontFamily: T.sans, fontSize: '1.1rem', fontWeight: 700,
              color: T.emerald, letterSpacing: '-0.04em',
            }}>
              888
            </Typography>
          </Box>
          <Typography sx={{ fontFamily: T.mono, fontSize: '0.55rem', color: T.textDim, letterSpacing: '0.08em' }}>
            ADMIN CONSOLE
          </Typography>
        </Box>
      </Box>

      {/* ── Nav card ── */}
      <Box sx={{
        flex: 1, minHeight: 0,
        borderRadius: '20px',
        bgcolor: T.glass,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${T.glassBorder}`,
        boxShadow: T.shadow,
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        <Box sx={{ flex: 1, overflowY: 'auto', px: 1, py: 0.5, '&::-webkit-scrollbar': { width: 0 } }}>
          <GroupLabel label="Menu" />
          <List disablePadding>
            {menuItems.map(item => <NavItem key={item.path} {...item} />)}
          </List>

          <GroupLabel label="Logs" />
          <List disablePadding>
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => setLogsOpen(p => !p)}
                sx={{
                  px: 1.5, py: 0.95, borderRadius: '14px',
                  transition: 'all 0.2s ease',
                  '&:hover': { bgcolor: T.hoverBg, transform: 'translateX(2px)' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Box sx={{ width: 30, height: 30, borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(0,0,0,0.04)', color: T.textDim }}>
                    <HistoryRoundedIcon sx={{ fontSize: 19 }} />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary="All Logs"
                  primaryTypographyProps={{ fontFamily: T.sans, fontSize: '0.875rem', fontWeight: 500, color: T.text, letterSpacing: '-0.02em' }}
                />
                <Box sx={{
                  color: T.textDim, display: 'flex',
                  transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                  transform: logsOpen ? 'rotate(180deg)' : 'none',
                }}>
                  <ExpandMoreRoundedIcon sx={{ fontSize: 18 }} />
                </Box>
              </ListItemButton>
            </ListItem>

            <Collapse in={logsOpen} timeout={250} unmountOnExit>
              <List disablePadding sx={{ pl: 1 }}>
                {logItems.map(item => {
                  const active = pathname === item.path
                  return (
                    <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                      <ListItemButton
                        onClick={() => router.push(item.path)}
                        sx={{
                          px: 1.5, py: 0.85, borderRadius: '12px',
                          transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                          bgcolor: active ? T.activeBg : 'transparent',
                          boxShadow: active ? '0 2px 12px rgba(0,0,0,0.08)' : 'none',
                          border: active ? `1px solid ${T.glassBorder}` : '1px solid transparent',
                          '&:hover': { bgcolor: active ? T.activeBg : T.hoverBg, transform: 'translateX(2px)' },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Box sx={{ width: 26, height: 26, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: active ? 'rgba(16,185,129,0.10)' : 'rgba(0,0,0,0.04)', color: active ? T.emerald : T.textDim }}>
                            {item.icon}
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={item.text}
                          primaryTypographyProps={{ fontFamily: T.sans, fontSize: '0.825rem', fontWeight: active ? 600 : 500, color: active ? T.textBright : T.text, letterSpacing: '-0.02em' }}
                        />
                      </ListItemButton>
                    </ListItem>
                  )
                })}
              </List>
            </Collapse>
          </List>
        </Box>
      </Box>

      {/* ── User card ── */}
      <Box sx={{
        borderRadius: '20px',
        bgcolor: T.glass,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${T.glassBorder}`,
        boxShadow: T.shadow,
        p: 1.25, flexShrink: 0,
        display: 'flex', flexDirection: 'column', gap: 0.75,
      }}>
        {/* User row */}
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1.25,
          px: 1, py: 0.75, borderRadius: '12px',
          transition: 'background 0.15s',
          '&:hover': { bgcolor: T.hoverBg },
        }}>
          <Avatar sx={{
            width: 34, height: 34, flexShrink: 0,
            background: `linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.08))`,
            border: `1.5px solid rgba(16,185,129,0.2)`,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.6)`,
          }}>
            <ManageAccountsRoundedIcon sx={{ fontSize: 17, color: T.emerald }} />
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{
              fontFamily: T.sans, fontSize: '0.825rem', fontWeight: 600,
              color: T.textBright, letterSpacing: '-0.02em',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {session.user?.name || 'Admin'}
            </Typography>
            <Typography sx={{
              fontFamily: T.mono, fontSize: '0.6rem', color: T.textDim,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {session.user?.email}
            </Typography>
          </Box>
          {/* Online dot */}
          <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: T.emerald, boxShadow: `0 0 6px ${T.emeraldGlow}`, flexShrink: 0 }} />
        </Box>

        {/* Sign out */}
        <Button
          fullWidth size="small"
          startIcon={<LogoutRoundedIcon sx={{ fontSize: '14px !important' }} />}
          onClick={() => signOut({ callbackUrl: '/login' })}
          sx={{
            justifyContent: 'flex-start', px: 1.5, py: 0.7, borderRadius: '12px',
            fontFamily: T.sans, fontSize: '0.825rem', fontWeight: 500,
            color: T.textDim, textTransform: 'none', letterSpacing: '-0.02em',
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: 'rgba(239,68,68,0.08)',
              color: T.red,
              transform: 'translateX(2px)',
            },
            '&:active': { transform: 'scale(0.97)' },
          }}
        >
          Sign out
        </Button>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: T.wallpaper }}>
      {/* Mobile AppBar */}
      <AppBar
        position="fixed" elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.6)',
          display: { md: 'none' }, boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ minHeight: '58px !important' }}>
          <IconButton edge="start" onClick={() => setMobileOpen(p => !p)} sx={{ color: T.text, mr: 1.5 }}>
            <MenuIcon sx={{ fontSize: 22 }} />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Typography sx={{ fontFamily: T.sans, fontSize: '1rem', fontWeight: 700, color: '#111827', letterSpacing: '-0.04em' }}>Eose</Typography>
            <Typography sx={{ fontFamily: T.sans, fontSize: '1rem', fontWeight: 700, color: T.emerald, letterSpacing: '-0.04em' }}>888</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth, border: 'none', bgcolor: 'transparent', boxShadow: 'none' },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { width: drawerWidth, border: 'none', bgcolor: 'transparent', boxShadow: 'none' },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          mt: { xs: '58px', md: 0 },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}