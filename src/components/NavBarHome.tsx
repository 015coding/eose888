'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  AppBar, Toolbar, Container, Typography, Box, Button, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText, useTheme, useMediaQuery
} from '@mui/material'
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'

const NAV_ITEMS = ['Features', 'Markets', 'About']

export default function Navbar() {
  const router = useRouter()
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
      elevation={scrolled ? 4 : 0}
      sx={{
        bgcolor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
        // Default text color for the app bar
        color: scrolled ? '#000000' : '#ffffff' 
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography
            variant="h5"
            onClick={() => router.push('/')}
            sx={{ fontWeight: 'bold', color: '#4cf5c0', cursor: 'pointer' }}
          >
            Eose888
          </Typography>

          {/* Desktop Menu */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {NAV_ITEMS.map((item) => (
                <Button 
                  key={item} 
                  sx={{ 
                    // UPDATED: Logic to switch color based on scroll state
                    color: scrolled ? '#000000' : '#ffffff', 
                    textTransform: 'none' 
                  }}
                >
                  {item}
                </Button>
              ))}
              <Box sx={{ ml: 2, display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => router.push('/login')}
                  sx={{ borderColor: '#10b981', color: '#10b981', textTransform: 'none' }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  onClick={() => router.push('/register')}
                  sx={{ bgcolor: '#10b981', textTransform: 'none', '&:hover': { bgcolor: '#059669' } }}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton 
              onClick={() => setMobileMenuOpen(true)} 
              sx={{ 
                 // UPDATED: Matches the text logic (White at top, Black on scroll)
                 color: scrolled ? '#000000' : '#ffffff' 
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{ sx: { width: 280 } }}
      >
        <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#059669' }}>
              Eose888
            </Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
           
          <List>
            {NAV_ITEMS.map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 2, pb: 2 }}>
            <Button fullWidth variant="outlined" onClick={() => router.push('/login')} sx={{ borderColor: '#10b981', color: '#10b981' }}>
              Login
            </Button>
            <Button fullWidth variant="contained" onClick={() => router.push('/register')} sx={{ bgcolor: '#10b981' }}>
              Sign Up
            </Button>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  )
}