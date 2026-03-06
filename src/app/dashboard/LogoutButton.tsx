'use client'

import { Button } from '@mui/material'
import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  return (
    <Button 
      variant="contained" 
      sx={{ bgcolor: '#eb495c' }}
      onClick={() => signOut({ callbackUrl: '/login' })}
    >
      Logout
    </Button>
  )
}