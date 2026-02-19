"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route"
import { prismaApp } from "@/lib/prismaApp";

export async function pinStock(stockSymbol: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const userId = session.user.id;

  // Check if already pinned
  const existing = await prismaApp.pinnedStock.findFirst({
    where: { userId, stockId: stockSymbol },
  });

  if (existing) {
    // Unpin if already pinned
    await prismaApp.pinnedStock.delete({ where: { id: existing.id } });
    return { pinned: false };
  }

  // Pin it
  await prismaApp.pinnedStock.create({
    data: { userId, stockId: stockSymbol },
  });

  return { pinned: true };
}