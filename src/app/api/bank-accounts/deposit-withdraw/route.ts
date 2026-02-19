import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prismaApp } from "@/lib/prismaApp"
import { NextResponse } from "next/server"
import { TransactionType } from "@/lib/generated/prismaApp"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { accountId, type, amount } = await req.json()

  if (!accountId || !type || !amount || amount <= 0) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 })
  }
  if (type !== 'DEPOSIT' && type !== 'WITHDRAW') {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 })
  }

  const txAmount = parseFloat(amount)

  try {
    await prismaApp.$transaction(async (tx) => {
      const account = await tx.bankAccount.findFirst({
        where: { id: accountId, userId: session.user.id, currency: 'THB' },
      })
      if (!account) throw new Error("Account not found")
      if (type === 'WITHDRAW' && Number(account.balance) < txAmount) {
        throw new Error("Insufficient balance")
      }

      const balanceBefore = Number(account.balance)
      const balanceAfter = type === 'DEPOSIT'
        ? balanceBefore + txAmount
        : balanceBefore - txAmount

      await tx.bankAccount.update({
        where: { id: accountId },
        data: { balance: balanceAfter },
      })

      await tx.accountLog.create({
        data: {
          accountId,
          type: type as TransactionType,
          amount: txAmount,
          balanceBefore,
          balanceAfter,
        },
      })
    })

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Transaction failed"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}