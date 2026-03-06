import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { prismaApp } from "@/lib/prismaApp";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json([], { status: 401 });

  const holdings = await prismaApp.holding.findMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json(holdings.map(h => ({
    stockId: h.stockId,
    quantity: Number(h.quantity),
    avgCost: Number(h.avgCost),
  })));
}