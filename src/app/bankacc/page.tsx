import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prismaApp } from "@/lib/prismaApp"
import { redirect } from "next/navigation"
import Navbar from '@/components/Navbar'
import AccountCards from './AccountCards'

export default async function BankAcc_Page() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) redirect("/login")

  const accounts = await prismaApp.bankAccount.findMany({
    where: { userId: session.user.id },
  })

  const serializedAccounts = accounts.map((acc) => ({
    ...acc,
    balance: Number(acc.balance),
    createdAt: acc.createdAt.toISOString(),
  }))

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <AccountCards accounts={serializedAccounts} />
      </div>
    </>
  )
}