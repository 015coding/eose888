'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  AppBar, Toolbar, Container, Typography, Box, Button, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText, useTheme, useMediaQuery
} from '@mui/material'
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
  { label: 'Features', path: '#features' },
  { label: 'Markets', path: '#markets' },
  { label: 'About', path: '#about' }
]

const THEME = {
  bg: '#131722',
  accent: '#10b981', // Emerald 500
  accentHover: '#059669',
  textMain: '#D1D4DC',
  grid: '#2A2E39'
}

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: scrolled ? 'rgba(19, 23, 34, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        borderBottom: scrolled ? `1px solid ${THEME.grid}` : '1px solid transparent',
        color: '#ffffff'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: { xs: 64, md: 80 } }}>
          
          {/* Logo Section */}
          <Box 
            onClick={() => router.push('/')}
            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-1px', color: '#fff' }}>
              Eose<span style={{ color: THEME.accent }}>888</span>
            </Typography>
          </Box>

          {/* Desktop Menu */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {NAV_ITEMS.map((item) => (
                <Button 
                  key={item.label}
                  component={motion.button}
                  whileHover={{ y: -2 }}
                  sx={{ 
                    color: THEME.textMain, 
                    px: 2,
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    textTransform: 'none',
                    '&:hover': { color: '#fff', bgcolor: 'transparent' },
                    position: 'relative',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 8,
                        left: '50%',
                        width: 0,
                        height: '2px',
                        bgcolor: THEME.accent,
                        transition: 'all 0.3s ease',
                        transform: 'translateX(-50%)'
                    },
                    '&:hover::after': { width: '40%' }
                  }}
                >
                  {item.label}
                </Button>
              ))}
              
              <Box sx={{ ml: 4, display: 'flex', gap: 1.5 }}>
                <Button
                  onClick={() => router.push('/login')}
                  sx={{ 
                    color: '#fff', 
                    textTransform: 'none', 
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    px: 3,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="contained"
                  onClick={() => router.push('/register')}
                  sx={{ 
                    bgcolor: THEME.accent, 
                    color: '#000',
                    fontWeight: 700,
                    textTransform: 'none',
                    px: 3,
                    borderRadius: '8px',
                    boxShadow: `0 4px 14px ${THEME.accent}40`,
                    '&:hover': { bgcolor: THEME.accentHover, transform: 'translateY(-1px)' },
                    transition: 'all 0.2s'
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Box>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton onClick={() => setMobileMenuOpen(true)} sx={{ color: '#fff' }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer (TradingView Dark Style) */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{ 
          sx: { 
            width: '100%', 
            maxWidth: 300, 
            bgcolor: THEME.bg, 
            backgroundImage: 'none',
            color: '#fff',
            borderLeft: `1px solid ${THEME.grid}`
          } 
        }}
      >
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff' }}>
              Eose<span style={{ color: THEME.accent }}>888</span>
            </Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: '#fff' }}>
              <CloseIcon />
            </IconButton>
          </Box>
            
          <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {NAV_ITEMS.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton sx={{ borderRadius: '8px', py: 1.5 }}>
                  <ListItemText 
                    primary={item.label} 
                    primaryTypographyProps={{ fontSize: '1.1rem', fontWeight: 500 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button 
              fullWidth 
              variant="outlined" 
              onClick={() => router.push('/login')} 
              sx={{ borderColor: THEME.grid, color: '#fff', py: 1.5, borderRadius: '8px' }}
            >
              Sign In
            </Button>
            <Button 
              fullWidth 
              variant="contained" 
              onClick={() => router.push('/register')} 
              sx={{ bgcolor: THEME.accent, color: '#000', py: 1.5, fontWeight: 700, borderRadius: '8px' }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  )
}