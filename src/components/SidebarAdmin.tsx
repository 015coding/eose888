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

import MenuIcon                 from '@mui/icons-material/Menu'
import DashboardRoundedIcon   from '@mui/icons-material/DashboardRounded'
import PeopleRoundedIcon      from '@mui/icons-material/PeopleRounded'
import SettingsRoundedIcon    from '@mui/icons-material/SettingsRounded'
import LogoutRoundedIcon      from '@mui/icons-material/LogoutRounded'
import HistoryRoundedIcon     from '@mui/icons-material/HistoryRounded'
import ExpandMoreRoundedIcon  from '@mui/icons-material/ExpandMoreRounded'
import LoginRoundedIcon       from '@mui/icons-material/LoginRounded'
import SwapHorizRoundedIcon   from '@mui/icons-material/SwapHorizRounded'

const drawerWidth = 260

const T = {
  sidebarBg:   '#F5F5F7', 
  mainBg:      '#FFFFFF',
  textBright:  '#1D1D1F', 
  text:        '#515154', 
  textDim:     '#86868B', 
  accent:      '#10B981', 
  activeBg:    '#E8E8ED', 
  hoverBg:     '#EFEFF4',
  divider:     'rgba(0, 0, 0, 0.08)',
  sans:        '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
  mono:        '"SF Mono", "DM Mono", monospace',
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
    { text: 'Dashboard', icon: <DashboardRoundedIcon  sx={{ fontSize: 20 }} />, path: '/admin/dashboard' },
    { text: 'Users',     icon: <PeopleRoundedIcon     sx={{ fontSize: 20 }} />, path: '/admin/users'     },
    { text: 'Setting',  icon: <SettingsRoundedIcon   sx={{ fontSize: 20 }} />, path: '/admin/setting'  },
  ]

  const logItems = [
    { text: 'Auth',         icon: <LoginRoundedIcon    sx={{ fontSize: 18 }} />, path: '/admin/log/auth'         },
    { text: 'Transactions', icon: <SwapHorizRoundedIcon sx={{ fontSize: 18 }} />, path: '/admin/log/transaction' },
  ]

  const NavItem = ({ text, icon, path }: { text: string; icon: React.ReactNode; path: string }) => {
    const active = pathname === path
    return (
      <ListItem disablePadding sx={{ mb: 0.25, px: 1.5 }}>
        <ListItemButton
          onClick={() => router.push(path)}
          disableRipple
          sx={{
            px: 1.5, py: 1, 
            borderRadius: '10px',
            transition: 'background-color 0.2s ease',
            bgcolor: active ? T.activeBg : 'transparent',
            '&:hover': {
              bgcolor: active ? T.activeBg : T.hoverBg,
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 34, color: active ? T.accent : T.textDim }}>
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={text}
            primaryTypographyProps={{
              fontFamily: T.sans, 
              fontSize: '0.9rem',
              fontWeight: active ? 600 : 500,
              color: active ? T.textBright : T.text,
              letterSpacing: '-0.01em',
            }}
          />
        </ListItemButton>
      </ListItem>
    )
  }

  const GroupLabel = ({ label }: { label: string }) => (
    <Typography sx={{
      px: 3, pt: 2.5, pb: 1, 
      fontFamily: T.sans, fontSize: '0.75rem',
      fontWeight: 600, color: T.textDim, 
      letterSpacing: '0.04em', textTransform: 'uppercase',
      userSelect: 'none',
    }}>
      {label}
    </Typography>
  )

  const drawerContent = (
    <Box sx={{
      height: '100%',
      background: T.sidebarBg,
      borderRight: `1px solid ${T.divider}`,
      display: 'flex', flexDirection: 'column',
    }}>

      <Box sx={{
        px: 3, py: 3,
        display: 'flex', alignItems: 'center', gap: 1,
        cursor: 'pointer', flexShrink: 0,
      }}
        onClick={() => router.push('/')}
      >
        <Box sx={{ display: 'flex', alignItems: 'baseline', lineHeight: 1 }}>
          <Typography sx={{
            fontFamily: T.sans, fontSize: '1.25rem', fontWeight: 700,
            color: T.textBright, letterSpacing: '-0.03em',
          }}>
            Eose
          </Typography>
          <Typography sx={{
            fontFamily: T.sans, fontSize: '1.25rem', fontWeight: 700,
            color: T.accent, letterSpacing: '-0.03em',
          }}>
            888
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
        <GroupLabel label="Menu" />
        <List disablePadding>
          {menuItems.map(item => <NavItem key={item.path} {...item} />)}
        </List>

        <GroupLabel label="Logs" />
        <List disablePadding>
          <ListItem disablePadding sx={{ mb: 0.25, px: 1.5 }}>
            <ListItemButton
              onClick={() => setLogsOpen(p => !p)}
              disableRipple
              sx={{
                px: 1.5, py: 1, borderRadius: '10px',
                transition: 'background-color 0.2s ease',
                '&:hover': { bgcolor: T.hoverBg },
              }}
            >
              <ListItemIcon sx={{ minWidth: 34, color: T.textDim }}>
                <HistoryRoundedIcon sx={{ fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText
                primary="All Logs"
                primaryTypographyProps={{ 
                  fontFamily: T.sans, fontSize: '0.9rem', 
                  fontWeight: 500, color: T.text, letterSpacing: '-0.01em' 
                }}
              />
              <Box sx={{
                color: T.textDim, display: 'flex',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: logsOpen ? 'rotate(180deg)' : 'none',
              }}>
                <ExpandMoreRoundedIcon sx={{ fontSize: 18 }} />
              </Box>
            </ListItemButton>
          </ListItem>

          <Collapse in={logsOpen} timeout="auto" unmountOnExit>
            <List disablePadding sx={{ pl: 2, mt: 0.5 }}>
              {logItems.map(item => <NavItem key={item.path} {...item} />)}
            </List>
          </Collapse>
        </List>
      </Box>

      <Box sx={{
        p: 2, flexShrink: 0,
        borderTop: `1px solid ${T.divider}`,
      }}>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1.5,
          px: 1, py: 1, borderRadius: '10px', mb: 1,
        }}>
          <Avatar sx={{
            width: 36, height: 36, 
            bgcolor: '#E8E8ED', color: T.textBright,
            fontSize: '1rem', fontWeight: 600, fontFamily: T.sans,
          }}>
            {session.user?.name?.charAt(0) || 'A'}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{
              fontFamily: T.sans, fontSize: '0.875rem', fontWeight: 600,
              color: T.textBright, letterSpacing: '-0.01em',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {session.user?.name || 'Admin'}
            </Typography>
            <Typography sx={{
              fontFamily: T.sans, fontSize: '0.75rem', color: T.textDim,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {session.user?.email}
            </Typography>
          </Box>
        </Box>

        <Button
          fullWidth disableElevation disableRipple
          startIcon={<LogoutRoundedIcon sx={{ fontSize: '16px !important' }} />}
          onClick={() => signOut({ callbackUrl: '/login' })}
          sx={{
            justifyContent: 'flex-start', px: 2, py: 1, 
            borderRadius: '8px',
            fontFamily: T.sans, fontSize: '0.85rem', fontWeight: 500,
            color: T.text, textTransform: 'none',
            transition: 'background-color 0.2s ease',
            '&:hover': {
              bgcolor: 'rgba(239, 68, 68, 0.08)',
              color: '#EF4444',
            },
          }}
        >
          Sign out
        </Button>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: T.mainBg }}>
      <AppBar
        position="fixed" elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'saturate(180%) blur(20px)',
          borderBottom: `1px solid ${T.divider}`,
          display: { md: 'none' },
        }}
      >
        <Toolbar sx={{ minHeight: '60px !important' }}>
          <IconButton edge="start" onClick={() => setMobileOpen(p => !p)} sx={{ color: T.textBright, mr: 1.5 }}>
            <MenuIcon sx={{ fontSize: 24 }} />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Typography sx={{ fontFamily: T.sans, fontSize: '1.1rem', fontWeight: 700, color: T.textBright, letterSpacing: '-0.03em' }}>Eose</Typography>
            <Typography sx={{ fontFamily: T.sans, fontSize: '1.1rem', fontWeight: 700, color: T.accent, letterSpacing: '-0.03em' }}>888</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth, border: 'none', bgcolor: 'transparent' },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { width: drawerWidth, border: 'none', bgcolor: 'transparent' },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          mt: { xs: '60px', md: 0 },
          bgcolor: T.mainBg,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}