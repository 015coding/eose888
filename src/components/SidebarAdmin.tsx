'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Session as NextAuthSession } from 'next-auth'
// MUI Components
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  List, 
  Typography, 
  Divider, 
  IconButton, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Avatar,
} from '@mui/material'

// Icons
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Session } from 'inspector/promises'

const drawerWidth = 260

interface SidebarProps {
  children: React.ReactNode
  session: NextAuthSession
}

export default function Sidebar({ children, session }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  // รายการเมนู
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Users', icon: <PeopleIcon />, path: '/users' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ]

  const drawerContent = (
    <div className="flex flex-col h-full bg-white">
      {/* Logo Section */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <Typography 
          variant="h5" 
          className="font-bold text-emerald-500 cursor-pointer"
          onClick={() => router.push('/dashboard')}
        >
          eose888
        </Typography>
      </div>

      {/* User Profile Summary */}
      <div className="p-4 flex items-center gap-3 bg-gray-50/50 mx-2 mt-2 rounded-lg">
        <Avatar sx={{ bgcolor: '#49e6b7' }}>
            <AccountCircleIcon />
        </Avatar>
        <div className="overflow-hidden">
            <p className="text-sm font-semibold text-gray-700 truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">admin@eose888.com</p>
        </div>
      </div>

      {/* Menu List */}
      <List className="flex-1 px-2 mt-2 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => router.push(item.path)}
                selected={isActive}
                sx={{
                  borderRadius: '8px',
                  '&.Mui-selected': {
                    backgroundColor: '#ecfdf5', // สีเขียวอ่อนๆ (Emerald-50)
                    color: '#059669', // สีเขียวเข้ม (Emerald-600)
                    '&:hover': {
                      backgroundColor: '#d1fae5',
                    },
                    '& .MuiListItemIcon-root': {
                      color: '#059669',
                    },
                  },
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                  },
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    minWidth: 40,
                    color: isActive ? '#059669' : '#9ca3af' 
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontSize: '0.95rem',
                    fontWeight: isActive ? 600 : 400
                  }} 
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      {/* Logout Button */}
      <div className="p-2 mt-auto border-t border-gray-100">
        <ListItemButton
          onClick={() => signOut({ callbackUrl: '/login' })}
          sx={{
            borderRadius: '8px',
            color: '#ef4444', // Red-500
            '&:hover': {
              backgroundColor: '#fef2f2', // Red-50
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: '#ef4444' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </div>
    </div>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      
      {/* Mobile Header (Hamburger) */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'white',
          boxShadow: 'none',
          borderBottom: '1px solid #f3f4f6',
          display: { sm: 'none' } // ซ่อนบน Desktop
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: '#4b5563' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" className="text-emerald-500 font-bold">
            eose888
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Navigation */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none' },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth, 
                borderRight: '1px solid #f3f4f6' 
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          bgcolor: '#f9fafb', // Gray-50
          mt: { xs: 8, sm: 0 } // เว้นระยะ AppBar บน Mobile
        }}
      >
        {children}
      </Box>
    </Box>
  )
}