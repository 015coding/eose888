'use client'

import { Box, Container, Typography } from '@mui/material'

const FOOTER_LINKS = [
  { title: 'Product', links: ['Features', 'Markets', 'Pricing', 'API'] },
  { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Compliance'] },
]

export default function Footer() {
  return (
    <Box sx={{ py: 6, borderTop: '1px solid #e5e7eb', bgcolor: '#ffffff' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 4 }}>
          <Box>
            <Typography variant="h6" sx={{ color: '#059669', fontWeight: 'bold', mb: 2 }}>
              eose888
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Modern trading platform for the next generation of investors.
            </Typography>
          </Box>

          {FOOTER_LINKS.map((col) => (
            <Box key={col.title}>
              <Typography sx={{ fontWeight: 600, mb: 2, color: '#111827' }}>
                {col.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {col.links.map((link) => (
                  <Typography
                    key={link}
                    variant="body2"
                    sx={{ color: '#4b5563', cursor: 'pointer', '&:hover': { color: '#059669' } }}
                  >
                    {link}
                  </Typography>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            © 2026 eose888. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}