'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AppBar, Toolbar, Container, Typography, Box, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useTheme, useMediaQuery } from '@mui/material'
import { Menu as MenuIcon, Close as CloseIcon, Logout as LogoutIcon } from '@mui/icons-material'
import { motion } from 'framer-motion'
import LogoutButton from '@/app/dashboard/LogoutButton'
import PinnedStocksPanel from './PinnedStocksPanel';


const NAV_ITEMS = [
  { label: 'Watch List', path: '/favstock' },
  {label : 'Trade' , path:"/buying-stock"},
  { label: 'Portfolio', path: '/my-stock' },
  { label: 'Bank Account', path: '/bankacc' },

]

const THEME = {
  bg: '#131722',
  accent: '#10b981',
  textMain: '#D1D4DC',
  grid: '#2A2E39'
}

export default function NavbarAuth() {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing cookies/tokens)
    router.push('/')
  }

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: THEME.bg, borderBottom: `1px solid ${THEME.grid}`, color: '#fff' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box onClick={() => router.push('/')} sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
            <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-1px' }} >
              Eose<span style={{ color: THEME.accent }}>888</span>
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {NAV_ITEMS.map((item) => (
                <Button 
                  key={item.label}
                  onClick={() => router.push(item.path)}
                  sx={{ 
                    color: pathname === item.path ? '#fff' : THEME.textMain, 
                    px: 2, textTransform: 'none', fontWeight: 500,
                    borderBottom: pathname === item.path ? `2px solid ${THEME.accent}` : '2px solid transparent',
                    borderRadius: 0, '&:hover': { color: '#fff', bgcolor: 'transparent' }
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <LogoutButton/>
            </Box>
          )}

          {isMobile && (
            <IconButton onClick={() => setMobileMenuOpen(true)} sx={{ color: '#fff' }}><MenuIcon /></IconButton>
          )}
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} PaperProps={{ sx: { width: 280, bgcolor: THEME.bg, color: '#fff' } }}>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: '#fff' }}><CloseIcon /></IconButton>
          </Box>
          <List>
            {NAV_ITEMS.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton onClick={() => { router.push(item.path); setMobileMenuOpen(false); }}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItemButton onClick={handleLogout} sx={{ mt: 2, color: '#F23645' }}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
      <PinnedStocksPanel />
    </AppBar>
  )
}