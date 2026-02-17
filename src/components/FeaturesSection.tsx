'use client'

import { Box, Container, Typography, Card, CardContent } from '@mui/material'
import { TrendingUp, Security, Speed, AccountBalance } from '@mui/icons-material'

const FEATURES = [
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

export default function FeaturesSection() {
  return (
    <Box sx={{ py: 10, bgcolor: '#ffffff' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, color: '#111827' }}>
            Why Choose eose888?
          </Typography>
          <Typography sx={{ color: '#4b5563', maxWidth: '42rem', mx: 'auto', fontSize: '1.125rem' }}>
            Everything you need to trade with confidence and grow your portfolio.
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
          {FEATURES.map((feature, index) => (
            <Card
              key={index}
              elevation={0}
              sx={{
                border: '1px solid #f3f4f6',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s',
                '&:hover': { borderColor: '#10b981', transform: 'translateY(-4px)', boxShadow: 3 }
              }}
            >
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{ color: '#10b981', mb: 2, display: 'flex', justifyContent: 'center' }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#111827' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#4b5563' }}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  )
}