import { prismaApp } from "@/lib/prismaApp";
import { NextResponse } from "next/server";

export async function GET() {
  const pendingOrders = await prismaApp.transactionStock.findMany({
    where: { type: 'PENDING' },
  });

  if (pendingOrders.length === 0) return NextResponse.json({ executed: 0 });

  const symbols = [...new Set(pendingOrders.map(o => o.stockId))];
  const latestPrices: Record<string, number> = {};

  for (const symbol of symbols) {
    const latest = await prismaApp.stockHistoryDaily.findFirst({
      where: { symbol },
      orderBy: { time: 'desc' },
    });
    if (latest) latestPrices[symbol] = latest.price;
  }

  let executed = 0;

  for (const order of pendingOrders) {
    const currentPrice = latestPrices[order.stockId];
    const targetPrice = Number(order.price);

    if (!currentPrice) continue;
    if (currentPrice > targetPrice) continue;

    await prismaApp.$transaction(async (tx) => {
      // อัพเดท order เป็น BUY
      await tx.transactionStock.update({
        where: { id: order.id },
        data: { type: 'BUY', price: currentPrice },
      });

      // อัพเดท Holding
      const holding = await tx.holding.findUnique({
        where: { userId_stockId: { userId: order.userId, stockId: order.stockId } },
      });

      const qty = Number(order.quantity);

      if (holding) {
        const newQty = Number(holding.quantity) + qty;
        const newAvg = (Number(holding.avgCost) * Number(holding.quantity) + currentPrice * qty) / newQty;
        await tx.holding.update({
          where: { userId_stockId: { userId: order.userId, stockId: order.stockId } },
          data: { quantity: newQty, avgCost: newAvg },
        });
      } else {
        await tx.holding.create({
          data: { userId: order.userId, stockId: order.stockId, quantity: qty, avgCost: currentPrice },
        });
      }

      // คืนส่วนต่างถ้าซื้อได้ถูกกว่า target
      const diff = (targetPrice - currentPrice) * qty;
      if (diff > 0) {
        const account = await tx.bankAccount.findFirst({
          where: { userId: order.userId, currency: 'USD' },
        });
        if (account) {
          await tx.bankAccount.update({
            where: { id: account.id },
            data: { balance: { increment: diff } },
          });
        }
      }
    });

    executed++;
  }

  return NextResponse.json({ executed });
}