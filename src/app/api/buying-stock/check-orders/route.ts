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

    // BUY: execute ถ้าราคาตลาด <= ราคาเป้า
    // SELL: execute ถ้าราคาตลาด >= ราคาเป้า
    // แยกด้วยการเช็ค holding — ถ้าหุ้นถูก lock ไปแล้ว = SELL pending
    const holding = await prismaApp.holding.findUnique({
      where: { userId_stockId: { userId: order.userId, stockId: order.stockId } },
    });

    const isSellPending = holding
      ? Number(holding.quantity) < Number(order.quantity)
      : true; // ไม่มี holding เลย = หุ้นถูก lock ทั้งหมด = SELL

    const shouldExecute = isSellPending
      ? currentPrice >= targetPrice   // SELL: ราคาตลาด >= เป้า
      : currentPrice <= targetPrice;  // BUY: ราคาตลาด <= เป้า

    if (!shouldExecute) continue;

    await prismaApp.$transaction(async (tx) => {
      await tx.transactionStock.update({
        where: { id: order.id },
        data: { type: isSellPending ? 'SELL' : 'BUY', price: currentPrice },
      });

      const qty = Number(order.quantity);

      if (isSellPending) {
        // SELL execute → รับเงิน
        const account = await tx.bankAccount.findFirst({
          where: { userId: order.userId, currency: 'USD' },
        });
        if (account) {
          await tx.bankAccount.update({
            where: { id: account.id },
            data: { balance: { increment: currentPrice * qty } },
          });
        }
      } else {
        // BUY execute → อัพเดท holding + คืนส่วนต่าง
        const currentHolding = await tx.holding.findUnique({
          where: { userId_stockId: { userId: order.userId, stockId: order.stockId } },
        });

        if (currentHolding) {
          const newQty = Number(currentHolding.quantity) + qty;
          const newAvg = (Number(currentHolding.avgCost) * Number(currentHolding.quantity) + currentPrice * qty) / newQty;
          await tx.holding.update({
            where: { userId_stockId: { userId: order.userId, stockId: order.stockId } },
            data: { quantity: newQty, avgCost: newAvg },
          });
        } else {
          await tx.holding.create({
            data: { userId: order.userId, stockId: order.stockId, quantity: qty, avgCost: currentPrice },
          });
        }

        // คืนส่วนต่างถ้าซื้อถูกกว่า target
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
      }
    });

    executed++;
  }

  return NextResponse.json({ executed });
}