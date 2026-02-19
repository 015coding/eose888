import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prismaApp } from "@/lib/prismaApp"
import { redirect } from "next/navigation"
import Navbar from '@/components/Navbar'
import AccountCards from './AccountCards'
import TransactionList from './TransactionList'

export default async function BankAcc_Page() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) redirect("/login")

  const [accounts, logs] = await Promise.all([
    prismaApp.bankAccount.findMany({
      where: { userId: session.user.id },
    }),
    prismaApp.accountLog.findMany({
      where: {
        account: { userId: session.user.id }
      },
      include: {
        transfer: {
          select: { fromAccountId: true, toAccountId: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    })
  ])

  const serializedAccounts = accounts.map((acc) => ({
    ...acc,
    balance: Number(acc.balance),
    createdAt: acc.createdAt.toISOString(),
  }))

  const serializedLogs = logs.map((log) => ({
    id: String(log.id),
    accountId: log.accountId,
    type: log.type,
    amount: Number(log.amount),
    balanceBefore: Number(log.balanceBefore),
    balanceAfter: Number(log.balanceAfter),
    createdAt: log.createdAt.toISOString(),
    transfer: log.transfer
      ? { fromAccountId: log.transfer.fromAccountId, toAccountId: log.transfer.toAccountId }
      : null
  }))

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <AccountCards accounts={serializedAccounts} />
        <TransactionList accounts={serializedAccounts} logs={serializedLogs} />
      </div>
    </>
  )
}