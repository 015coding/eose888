// app/admin/layout.tsx
import SidebarLayout from '@/components/SidebarAdmin'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  if (session.user?.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  return (
    <SidebarLayout session={session}>
      {children}
    </SidebarLayout>
  )
}