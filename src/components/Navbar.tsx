"use client";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  // Helper to style links with Reliability & Precision logic
  const navBtnStyle = (href) => {
    const isActive = pathname === href;
    return {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.9rem',
      px: 2,
      // Active link uses your signature green, inactive uses 70% white
      color: isActive ? '#49e6b7' : 'rgba(255, 255, 255, 0.7)',
      transition: 'all 0.3s ease',
      '&:hover': {
        color: '#49e6b7',
        backgroundColor: 'transparent',
        opacity: 1,
      },
    };
  };

  return (
    <AppBar 
      position="sticky" // Fixed ensures it stays as you scroll over charts
      elevation={0}
      sx={{ 
        // 1. Reliability Background: Dark Blue-Black with 80% Opacity
        backgroundColor: 'rgba(11, 14, 20, 0.8)', 
        // 2. Heavy Glass Effect
        backdropFilter: 'blur(12px)',
        // Subtle border instead of shadow for precision
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '64px' }}>
        
        {/* Left Section: Branding */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            size="large" 
            edge="start" 
            sx={{ mr: 1, color: '#fff', display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography 
            variant="h5" 
            component={Link}
            href="/"
            sx={{ 
              fontWeight: 800, 
              letterSpacing: '-1px',
              textDecoration: 'none',
              color: '#fff',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Eose<span style={{ color: '#49e6b7' }}>888</span>
          </Typography>
        </Box>

        {/* Center Section: Navigation Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Button component={Link} href="/bankacc" sx={navBtnStyle('/bankacc')}>
            Account
          </Button>
          <Button component={Link} href="/dashboard" sx={navBtnStyle('/dashboard')}>
            Dashboard
          </Button>
          <Button component={Link} href="/stock" sx={navBtnStyle('/stock')}>
            Stock
          </Button>
        </Box>

        {/* Right Section: Action Button */}
        <Box>
          <Button 
            variant="contained" 
            disableElevation
            sx={{ 
              borderRadius: '6px', // Sharper corners feel more professional
              textTransform: 'none',
              fontWeight: 700,
              // Dark button with white text to look like a "Terminal" action
              backgroundColor: '#fff', 
              color: '#0b0e14',
              px: 3,
              '&:hover': {
                backgroundColor: '#49e6b7',
                transform: 'translateY(-1px)',
              }
            }}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}