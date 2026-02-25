import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prismaApp } from "@/lib/prismaApp";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { stockId, quantity, price, type = 'BUY', accountId } = await req.json();

  if (!stockId || !quantity || !price || quantity <= 0 || price <= 0) {
    return NextResponse.json({ error: 'ข้อมูลไม่ถูกต้อง' }, { status: 400 });
  }

  // ดึงราคาตลาดล่าสุด
  const latest = await prismaApp.stockHistoryDaily.findFirst({
    where: { symbol: stockId },
    orderBy: { time: 'desc' },
  });
  const marketPrice = latest ? latest.price : price; // fallback เป็น price จาก frontend
  const totalCost = quantity * marketPrice;

  const account = await prismaApp.bankAccount.findFirst({
    where: {
      id: accountId,
      userId: session.user.id,
      currency: 'USD'
    },
  });

  if (!account) return NextResponse.json({ error: 'ไม่พบบัญชี USD' }, { status: 400 });

  if (type === 'BUY') {
    if (Number(account.balance) < totalCost) {
      return NextResponse.json({ error: 'ยอดเงินไม่เพียงพอ' }, { status: 400 });
    }

    await prismaApp.$transaction(async (tx) => {
      await tx.bankAccount.update({
        where: { id: account.id },
        data: { balance: { decrement: totalCost } },
      });

      await tx.transactionStock.create({
        data: { userId: session.user.id, stockId, type: 'BUY', quantity, price: marketPrice },
      });

      const holding = await tx.holding.findUnique({
        where: { userId_stockId: { userId: session.user.id, stockId } },
      });

      if (holding) {
        const newQty = Number(holding.quantity) + quantity;
        const newAvg = (Number(holding.avgCost) * Number(holding.quantity) + marketPrice * quantity) / newQty;
        await tx.holding.update({
          where: { userId_stockId: { userId: session.user.id, stockId } },
          data: { quantity: newQty, avgCost: newAvg },
        });
      } else {
        await tx.holding.create({
          data: { userId: session.user.id, stockId, quantity, avgCost: marketPrice },
        });
      }
    });

  } else {
    // SELL
    const holding = await prismaApp.holding.findUnique({
      where: { userId_stockId: { userId: session.user.id, stockId } },
    });

    if (!holding || Number(holding.quantity) < quantity) {
      return NextResponse.json({ error: 'จำนวนหุ้นไม่เพียงพอ' }, { status: 400 });
    }

    await prismaApp.$transaction(async (tx) => {
      await tx.bankAccount.update({
        where: { id: account.id },
        data: { balance: { increment: totalCost } },
      });

      await tx.transactionStock.create({
        data: { userId: session.user.id, stockId, type: 'SELL', quantity, price: marketPrice },
      });

      const newQty = Number(holding.quantity) - quantity;
      if (newQty === 0) {
        await tx.holding.delete({
          where: { userId_stockId: { userId: session.user.id, stockId } },
        });
      } else {
        await tx.holding.update({
          where: { userId_stockId: { userId: session.user.id, stockId } },
          data: { quantity: newQty },
        });
      }
    });
  }

  return NextResponse.json({ success: true, executedPrice: marketPrice });
}