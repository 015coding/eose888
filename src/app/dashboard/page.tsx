import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import LogoutButton from "./LogoutButton"
import { authOptions } from "../api/auth/[...nextauth]/route"


export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }
  console.log('=== SESSION DEBUG ===')
  console.log('Full session:', JSON.stringify(session, null, 2))
  console.log('User role:', session.user?.role)
  console.log('====================')

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-emerald-500">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg">Welcome, {session.user?.name || session.user?.email}!</p>
        <p className="text-sm text-gray-600">Email: {session.user?.email}</p>
        <p className="text-sm text-gray-600">Role: {session.user?.role}</p>
        <p className="text-sm text-gray-600">Uid: {session.user?.id}</p>
      </div>
      <LogoutButton />
    </div>
  )
}