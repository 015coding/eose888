'use client'

import { Button } from '@mui/material'
import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  return (
    <Button 
      variant="contained" 
      sx={{ bgcolor: '#49e6b7' }}
      onClick={() => signOut({ callbackUrl: '/login' })}
    >
      Logout
    </Button>
  )
}