import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prismaApp } from "@/lib/prismaApp"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const accounts = await prismaApp.bankAccount.findMany({
    where: { userId: session.user.id },
  })

  return NextResponse.json(accounts)
}