import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import LogoutButton from "./LogoutButton"
import { authOptions } from "../api/auth/[...nextauth]/route"
import Link from "next/link"


export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }
  console.log('=== SESSION DEBUG ===')
  console.log('Full session:', JSON.stringify(session, null, 2))
  console.log('User role:', session.user?.role)
  console.log('====================')

  const displayName = session.user?.name ?? ''
  const email = session.user?.email ?? ''
  const slugFromName = displayName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '')
  const slugFromEmail = email.split('@')[0]?.toLowerCase() ?? ''
  const userSlug = slugFromEmail || slugFromName
  const settingHref = userSlug ? `/${userSlug}/setting` : '/dashboard'

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-emerald-500">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg">Welcome, {session.user?.name || session.user?.email}!</p>
        <p className="text-sm text-gray-600">Email: {session.user?.email}</p>
        <p className="text-sm text-gray-600">Role: {session.user?.role}</p>
        <p className="text-sm text-gray-600">Uid: {session.user?.id}</p>
        <div className="mt-4">
          <Link
            href={settingHref}
            className="inline-flex rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Setting
          </Link>
        </div>
      </div>
      <LogoutButton />
    </div>
  )
}