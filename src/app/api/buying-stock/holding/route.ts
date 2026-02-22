import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prismaApp } from "@/lib/prismaApp";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json(null, { status: 401 });

  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");
  if (!symbol) return NextResponse.json(null, { status: 400 });

  const holding = await prismaApp.holding.findUnique({
    where: { userId_stockId: { userId: session.user.id, stockId: symbol } },
  });

  if (!holding) return NextResponse.json({ quantity: 0, avgCost: 0 });

  return NextResponse.json({
    quantity: Number(holding.quantity),
    avgCost: Number(holding.avgCost),
  });
}