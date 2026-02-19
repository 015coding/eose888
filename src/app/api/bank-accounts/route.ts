import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prismaApp } from "@/lib/prismaApp"
import { NextResponse } from "next/server"
import { TransactionType } from "@/lib/generated/prismaApp"
import { THB_PER_USD } from "@/constants"

function floorTo2(value: number): number {
  return Math.floor(value * 100) / 100
}

function convertAmount(amount: number, fromCurrency: string, toCurrency: string): number {
  if (fromCurrency === toCurrency) return amount
  if (fromCurrency === 'THB' && toCurrency === 'USD') return floorTo2(amount / THB_PER_USD)
  if (fromCurrency === 'USD' && toCurrency === 'THB') return floorTo2(amount * THB_PER_USD)
  return amount
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { fromAccountId, toAccountId, amount } = await req.json()

  if (!fromAccountId || !toAccountId || !amount || amount <= 0) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 })
  }
  if (fromAccountId === toAccountId) {
    return NextResponse.json({ error: "Cannot transfer to the same account" }, { status: 400 })
  }

  const deductAmount = parseFloat(amount)

  try {
    await prismaApp.$transaction(async (tx) => {
      const fromAccount = await tx.bankAccount.findFirst({
        where: { id: fromAccountId, userId: session.user.id },
      })
      if (!fromAccount) throw new Error("Source account not found")
      if (Number(fromAccount.balance) < deductAmount) throw new Error("Insufficient balance")

      const toAccount = await tx.bankAccount.findFirst({
        where: { id: toAccountId, userId: session.user.id },
      })
      if (!toAccount) throw new Error("Destination account not found")

      const creditAmount = convertAmount(deductAmount, fromAccount.currency, toAccount.currency)

      const newFromBalance = Number(fromAccount.balance) - deductAmount
      const newToBalance = Number(toAccount.balance) + creditAmount

      await tx.bankAccount.update({ where: { id: fromAccountId }, data: { balance: newFromBalance } })
      await tx.bankAccount.update({ where: { id: toAccountId }, data: { balance: newToBalance } })

      const transfer = await tx.transferTransaction.create({
        data: { fromAccountId, toAccountId, amount: deductAmount },
      })

      await tx.accountLog.createMany({
        data: [
          {
            accountId: fromAccountId,
            transferId: transfer.id,
            type: TransactionType.TRANSFER,
            amount: deductAmount,
            balanceBefore: Number(fromAccount.balance),
            balanceAfter: newFromBalance,
          },
          {
            accountId: toAccountId,
            transferId: transfer.id,
            type: TransactionType.TRANSFER,
            amount: creditAmount,
            balanceBefore: Number(toAccount.balance),
            balanceAfter: newToBalance,
          },
        ],
      })
    })

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Transfer failed"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}