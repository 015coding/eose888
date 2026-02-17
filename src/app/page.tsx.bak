// app/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  TrendingUp,
  Security,
  Speed,
  AccountBalance,
  Menu as MenuIcon,
  Close as CloseIcon,
  ArrowForward,
  CheckCircle,
} from '@mui/icons-material'

export default function HomePage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      icon: <TrendingUp sx={{ fontSize: 48 }} />,
      title: 'Real-Time Trading',
      description: 'Execute trades instantly with live market data and real-time price updates.',
    },
    {
      icon: <Security sx={{ fontSize: 48 }} />,
      title: 'Bank-Level Security',
      description: 'Your assets are protected with enterprise-grade encryption and secure storage.',
    },
    {
      icon: <Speed sx={{ fontSize: 48 }} />,
      title: 'Lightning Fast',
      description: 'Experience blazing-fast order execution with minimal latency and maximum uptime.',
    },
    {
      icon: <AccountBalance sx={{ fontSize: 48 }} />,
      title: 'Low Fees',
      description: 'Keep more of your profits with our competitive, transparent fee structure.',
    },
  ]

  const stats = [
    { value: '10K+', label: 'Active Traders' },
    { value: '$500M+', label: 'Trading Volume' },
    { value: '99.9%', label: 'Uptime' },
    { value: '50+', label: 'Assets Available' },
  ]

  const navItems = ['Features', 'Markets', 'About']

  return (
    <Box 
      className="bg-white min-h-screen"
      sx={{ bgcolor: '#ffffff', color: '#111827', overflowX: 'hidden' }}
      suppressHydrationWarning
    >
      {/* Navbar */}
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          // Navbar: เวลาเลื่อนลงเปลี่ยนเป็นสีขาวโปร่งแสง
          bgcolor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          transition: 'all 0.3s ease',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
          boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters className="justify-between">
            {/* Logo */}
            <Typography
              variant="h5"
              component="div"
              className="font-bold text-emerald-600 cursor-pointer"
              onClick={() => router.push('/')}
              sx={{ fontWeight: 'bold', color: '#059669', flexGrow: { xs: 1, md: 0 } }}
            >
              eose888
            </Typography>

            {/* Desktop Menu */}
            <Box className="hidden md:flex items-center gap-6">
              
              <Box sx={{ ml: 2, display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => router.push('/login')}
                  sx={{
                    borderColor: '#10b981',
                    color: '#10b981',
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: '#059669',
                      bgcolor: 'rgba(16, 185, 129, 0.1)',
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  onClick={() => router.push('/register')}
                  sx={{
                    bgcolor: '#10b981',
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#059669' },
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>

            {/* Mobile Menu Icon: เปลี่ยนเป็นสีดำ */}
            <IconButton
              className="md:hidden text-gray-900"
              onClick={() => setMobileMenuOpen(true)}
              sx={{ color: '#111827', display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          // Drawer Background: สีขาว
          sx: { bgcolor: '#ffffff', width: 280, borderLeft: '1px solid #e5e7eb' },
        }}
      >
        <Box className="p-4 h-full flex flex-col">
          <Box className="flex justify-between items-center mb-6">
            <Typography variant="h6" className="font-bold text-emerald-600">
              eose888
            </Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: '#111827' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <List>
            {navItems.map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton 
                  className="text-gray-700 hover:text-emerald-600"
                  sx={{ borderRadius: 1 }}
                >
                  <ListItemText primary={text} primaryTypographyProps={{ color: '#374151' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          
          <Box className="mt-auto space-y-3 pb-4">
            <Button
              fullWidth
              variant="outlined"
              onClick={() => router.push('/login')}
              sx={{
                borderColor: '#10b981',
                color: '#10b981',
                py: 1,
              }}
            >
              Login
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => router.push('/register')}
              sx={{ bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' }, py: 1 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Hero Section */}
      <Box className="pt-32 pb-20 px-4 bg-gray-50" sx={{ pt: { xs: 15, md: 20 }, pb: 10, bgcolor: '#f9fafb' }}>
        <Container maxWidth="lg">
          <Box className="text-center">
            <Box 
              className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 rounded-full px-4 py-2 mb-6"
              sx={{ bgcolor: '#d1fae5', border: '1px solid #a7f3d0', borderRadius: 50, px: 2, py: 1, mb: 3, display: 'inline-flex', alignItems: 'center', gap: 1 }}
            >
              <TrendingUp className="text-emerald-600" fontSize="small" sx={{ color: '#059669' }} />
              <Typography className="text-emerald-700 text-sm font-medium" sx={{ color: '#047857', fontSize: '0.875rem' }}>
                Trade with Confidence
              </Typography>
            </Box>

            <Typography
              variant="h1"
              className="font-bold text-gray-900 mb-6 leading-tight"
              sx={{ 
                fontSize: { xs: '2.5rem', md: '4rem' }, 
                fontWeight: 800, 
                mb: 3,
                lineHeight: 1.2,
                color: '#111827' // สีดำ
              }}
            >
              Invest in Your Future
              <br />
              <span style={{ color: '#059669' }}>Start Trading Today</span>
            </Typography>

            <Typography
              variant="h6"
              className="text-gray-600 mb-8 max-w-2xl mx-auto"
              sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, color: '#4b5563', mb: 5, maxWidth: '42rem', mx: 'auto' }}
            >
              Access global markets with a platform built for modern traders.
              Fast execution, low fees, and powerful tools at your fingertips.
            </Typography>

            <Box className="flex flex-col sm:flex-row gap-4 justify-center" sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                onClick={() => router.push('/register')}
                sx={{
                  bgcolor: '#10b981',
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#059669' },
                }}
              >
                Get Started Free
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: '#d1d5db', // สีขอบเทาอ่อน
                  color: '#374151', // สีตัวหนังสือเทาเข้ม
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#10b981',
                    color: '#10b981',
                    bgcolor: 'rgba(16, 185, 129, 0.05)',
                  },
                }}
              >
                View Markets
              </Button>
            </Box>

            <Box className="flex flex-wrap justify-center gap-8 mt-12 text-gray-600 text-sm" sx={{ mt: 6, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
              {['No Hidden Fees', 'Bank-Level Security', '24/7 Support'].map((item) => (
                 <Box key={item} className="flex items-center gap-2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle fontSize="small" className="text-emerald-500" sx={{ color: '#10b981' }} />
                  <Typography variant="body2" sx={{ color: '#4b5563' }}>{item}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Stats Section: คงสีเขียวไว้ แต่ปรับ Gradient ให้ดูสดใสขึ้น */}
      <Box className="py-16 bg-gradient-to-r from-emerald-500 to-teal-500" sx={{ py: 8, background: 'linear-gradient(to right, #10b981, #14b8a6)' }}>
        <Container maxWidth="lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Box key={index} className="text-center">
                <Typography
                  variant="h3"
                  className="font-bold text-white mb-2"
                  sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 'bold' }}
                >
                  {stat.value}
                </Typography>
                <Typography className="text-emerald-50" sx={{ color: '#ecfdf5' }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </div>
        </Container>
      </Box>

      {/* Features Section */}
      <Box className="py-20 px-4 bg-white" sx={{ py: 10, bgcolor: '#ffffff' }}>
        <Container maxWidth="lg">
          <Box className="text-center mb-16" sx={{ mb: 8 }}>
            <Typography variant="h3" className="font-bold text-gray-900 mb-4" sx={{ fontWeight: 'bold', mb: 2, color: '#111827' }}>
              Why Choose eose888?
            </Typography>
            <Typography className="text-gray-600 text-lg max-w-2xl mx-auto" sx={{ color: '#4b5563', maxWidth: '42rem', mx: 'auto' }}>
              Everything you need to trade with confidence and grow your portfolio.
            </Typography>
          </Box>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                // Cards: พื้นขาว มีเงา ขอบเทาอ่อน
                className="bg-white border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300"
                sx={{ 
                  bgcolor: '#ffffff', 
                  borderColor: '#f3f4f6',
                  color: '#111827',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  '&:hover': { borderColor: '#10b981', transform: 'translateY(-4px)' }
                }}
              >
                <CardContent className="p-6 text-center">
                  <Box className="text-emerald-500 mb-4 flex justify-center" sx={{ color: '#10b981', mb: 2, display: 'flex', justifyContent: 'center' }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" className="font-semibold text-gray-900 mb-3" sx={{ fontWeight: 600, mb: 1, color: '#111827' }}>
                    {feature.title}
                  </Typography>
                  <Typography className="text-gray-600 text-sm" sx={{ color: '#4b5563' }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box className="py-20 px-4 bg-gray-50" sx={{ py: 10, bgcolor: '#f9fafb' }}>
        <Container maxWidth="md">
          <Box className="text-center">
            <Typography variant="h3" className="font-bold text-gray-900 mb-4" sx={{ fontWeight: 'bold', mb: 2, color: '#111827' }}>
              Ready to Start Trading?
            </Typography>
            <Typography className="text-gray-600 text-lg mb-8" sx={{ color: '#4b5563', mb: 4 }}>
              Join thousands of traders already using eose888 to build their financial future.
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => router.push('/register')}
              sx={{
                bgcolor: '#10b981',
                py: 2,
                px: 6,
                fontSize: '1.1rem',
                textTransform: 'none',
                '&:hover': { bgcolor: '#059669' },
              }}
            >
              Create Free Account
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box className="py-12 px-4 border-t border-gray-200 bg-white" sx={{ py: 6, borderColor: '#e5e7eb', bgcolor: '#ffffff' }}>
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Box>
              <Typography variant="h6" className="font-bold text-emerald-600 mb-4" sx={{ color: '#059669', fontWeight: 'bold', mb: 2 }}>
                eose888
              </Typography>
              <Typography className="text-gray-500 text-sm" sx={{ color: '#6b7280' }}>
                Modern trading platform for the next generation of investors.
              </Typography>
            </Box>

            {/* Link Columns */}
            {[
              { title: 'Product', links: ['Features', 'Markets', 'Pricing', 'API'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Compliance'] },
            ].map((col) => (
              <Box key={col.title}>
                <Typography className="font-semibold text-gray-900 mb-4" sx={{ fontWeight: 600, mb: 2, color: '#111827' }}>
                  {col.title}
                </Typography>
                <Box className="space-y-2" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {col.links.map((link) => (
                    <Typography 
                      key={link} 
                      className="text-gray-600 text-sm hover:text-emerald-600 cursor-pointer"
                      sx={{ color: '#4b5563', '&:hover': { color: '#059669', cursor: 'pointer' }, fontSize: '0.875rem' }}
                    >
                      {link}
                    </Typography>
                  ))}
                </Box>
              </Box>
            ))}
          </div>

          <Box className="mt-12 pt-8 border-t border-gray-200 text-center" sx={{ mt: 6, pt: 4, borderColor: '#e5e7eb', textAlign: 'center' }}>
            <Typography className="text-gray-500 text-sm" sx={{ color: '#6b7280' }}>
              © 2024 eose888. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}