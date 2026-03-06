// app/components/CTASection.tsx
'use client'

import { useRouter } from 'next/navigation'
import { Box, Container, Typography, Button } from '@mui/material'
import { ArrowForward } from '@mui/icons-material'

export function CTASection() {
  const router = useRouter()

  return (
    <Box
      sx={{
        py: { xs: 10, md: 15 },
        background: 'linear-gradient(135deg, #1A1F3A 0%, #0A0E27 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Effect */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              mb: 2,
              letterSpacing: '-0.5px',
              color: '#fff',
            }}
          >
            Ready to Start Trading?
          </Typography>
          <Typography
            sx={{
              fontSize: '1.15rem',
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 5,
              lineHeight: 1.6,
            }}
          >
            Join hundreds of thousands of traders who chose eose888 for superior trading conditions
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => router.push('/register')}
            sx={{
              background: 'linear-gradient(135deg, #30ff9b 0%, #05ed7d 100%)',
              color: '#0A0E27',
              textTransform: 'none',
              fontSize: '1.15rem',
              fontWeight: 700,
              px: 8,
              py: 2,
              borderRadius: 2,
              boxShadow: '0 8px 30px rgba(48, 255, 155, 0.35)',
              '&:hover': {
                background: 'linear-gradient(135deg, #30ff9b 0%, #05ed7d 100%)',
                boxShadow: '0 12px 40px rgba(48, 255, 155, 0.45)',
              },
            }}
          >
            Open Account in 2 Minutes
          </Button>
        </Box>
      </Container>
    </Box>
  )
}