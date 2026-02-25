// app/action/getPinStatus.ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route"
import { prismaApp } from "@/lib/prismaApp";

export async function getPinStatus(stockSymbol: string) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return { pinned: false };
  }

  const userId = session.user.id;

  const pinnedStock = await prismaApp.pinnedStock.findFirst({
    where: { userId, stockId: stockSymbol },
  });

  return { pinned: !!pinnedStock };
}