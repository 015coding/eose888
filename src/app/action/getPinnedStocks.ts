// app/action/getPinnedStocks.ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prismaApp } from "@/lib/prismaApp";

export async function getPinnedStocks() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return [];
  }

  const pinned = await prismaApp.pinnedStock.findMany({
    where: { userId: session.user.id },
    select: { stockId: true },
  });

  return pinned.map(p => ({ symbol: p.stockId }));
}