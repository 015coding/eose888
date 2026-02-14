'use client'

import { Box, Card, CardContent, Typography } from '@mui/material'

export default function AccountCards() {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        flexWrap: 'wrap'
      }}
    >
      <Card sx={{ width: 250 }}>
        <CardContent>
          <Typography variant="h6">Savings Account</Typography>
          <Typography variant="h4" color="primary">
            $12,500
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ width: 250 }}>
        <CardContent>
          <Typography variant="h6">Checking Account</Typography>
          <Typography variant="h4" color="primary">
            $3,200
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ width: 250 }}>
        <CardContent>
          <Typography variant="h6">Investment</Typography>
          <Typography variant="h4" color="primary">
            $27,800
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
