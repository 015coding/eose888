import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prismaApp } from "@/lib/prismaApp";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json([], { status: 401 });

  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");

  const transactions = await prismaApp.transactionStock.findMany({
    where: {
      userId: session.user.id,
      ...(symbol ? { stockId: symbol } : {}),
    },
    orderBy: { tradeDate: 'desc' },
    take: 50,
  });

  return NextResponse.json(transactions.map(tx => ({
    id: tx.id.toString(),
    stockId: tx.stockId,
    type: tx.type,
    quantity: Number(tx.quantity),
    price: Number(tx.price),
    tradeDate: tx.tradeDate.toISOString(),
  })));
}