import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import LogoutButton from "./LogoutButton"

export default async function Dashboard() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-emerald-500">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg">Welcome, {session.user?.name || session.user?.email}!</p>
        <p className="text-sm text-gray-600">Email: {session.user?.email}</p>
      </div>
      <LogoutButton />
    </div>
  )
}