import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Navbar from '@/components/Navbar'
import { prismaApp } from '@/lib/prismaApp'
import ResetPasswordForm from './ResetPasswordForm'



type Props = {
  params: Promise<{ user: string }>
}

export default async function UserSettingPage({ params }: Props) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  const { user } = await params
  const email = session.user.email ?? ''
  const slugFromEmail = email.split('@')[0]?.toLowerCase()
  const routeSlug = user.toLowerCase()

  if (session.user.role !== 'USER') {
    redirect('/dashboard')
  }

  if (!slugFromEmail || routeSlug !== slugFromEmail) {
    redirect('/dashboard')
  }

  const profile = await prismaApp.user.findUnique({
    where: { id: session.user.id },
    select: {
      firstName: true,
      lastName: true,
    },
  })

  const firstName = profile?.firstName ?? '-'
  const lastName = profile?.lastName ?? '-'
  const username = slugFromEmail
  const displayEmail = email || '-'

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8" suppressHydrationWarning>
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="rounded-xl bg-white p-6 shadow">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="mt-2 text-sm text-gray-600">Manage your account information.</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-900">Profile</h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">First Name</p>
                <p className="mt-1 text-base font-medium text-gray-900">{firstName}</p>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Last Name</p>
                <p className="mt-1 text-base font-medium text-gray-900">{lastName}</p>
              </div>

              <div className="rounded-lg border border-gray-200 p-4 sm:col-span-2">
                <p className="text-xs uppercase tracking-wide text-gray-500">Username</p>
                <p className="mt-1 text-base font-medium text-gray-900">{username}</p>
              </div>

              <div className="rounded-lg border border-gray-200 p-4 sm:col-span-2">
                <p className="text-xs uppercase tracking-wide text-gray-500">Email</p>
                <p className="mt-1 text-base font-medium text-gray-900">{displayEmail}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </>
  )
}
