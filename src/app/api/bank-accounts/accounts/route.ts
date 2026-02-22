import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prismaApp } from "@/lib/prismaApp";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json([], { status: 401 });

  const accounts = await prismaApp.bankAccount.findMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json(accounts.map(acc => ({
    id: acc.id,
    country: acc.country,
    currency: acc.currency,
    balance: Number(acc.balance),
  })));
}