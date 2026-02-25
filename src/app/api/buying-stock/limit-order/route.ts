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

  if (type === 'BUY') {
    const totalCost = quantity * price;

    const account = await prismaApp.bankAccount.findFirst({
      where: { id: accountId, userId: session.user.id, currency: 'USD' },
    });

    if (!account) return NextResponse.json({ error: 'ไม่พบบัญชี USD' }, { status: 400 });
    if (Number(account.balance) < totalCost) return NextResponse.json({ error: 'ยอดเงินไม่เพียงพอ' }, { status: 400 });

    await prismaApp.$transaction([
      prismaApp.bankAccount.update({
        where: { id: account.id },
        data: { balance: { decrement: totalCost } },
      }),
      prismaApp.transactionStock.create({
        data: { userId: session.user.id, stockId, type: 'PENDING', quantity, price },
      }),
    ]);

  } else {
    // SELL limit — เช็คว่ามีหุ้นพอขายไหม
    const holding = await prismaApp.holding.findUnique({
      where: { userId_stockId: { userId: session.user.id, stockId } },
    });

    if (!holding || Number(holding.quantity) < quantity) {
      return NextResponse.json({ error: 'จำนวนหุ้นไม่เพียงพอ' }, { status: 400 });
    }

    // lock หุ้นไว้ (ลด quantity ใน holding ก่อน)
    await prismaApp.$transaction(async (tx) => {
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

      await tx.transactionStock.create({
        data: { userId: session.user.id, stockId, type: 'PENDING', quantity, price },
      });
    });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { orderId } = await req.json();

  const order = await prismaApp.transactionStock.findFirst({
    where: { id: BigInt(orderId), userId: session.user.id, type: 'PENDING' },
  });

  if (!order) return NextResponse.json({ error: 'ไม่พบ order' }, { status: 404 });

  const account = await prismaApp.bankAccount.findFirst({
    where: { id: undefined, userId: session.user.id, currency: 'USD' },
  });

  if (!account) return NextResponse.json({ error: 'ไม่พบบัญชี' }, { status: 400 });

  // ต้องรู้ว่า order นี้เป็น BUY หรือ SELL pending
  // เช็คจาก stockId ว่า holding มีอยู่ไหม ถ้าไม่มี = เป็น BUY pending (lock เงิน)
  const holding = await prismaApp.holding.findUnique({
    where: { userId_stockId: { userId: session.user.id, stockId: order.stockId } },
  });

  await prismaApp.$transaction(async (tx) => {
    await tx.transactionStock.update({
      where: { id: order.id },
      data: { type: 'CANCELLED' },
    });

    // ถ้าเป็น BUY pending → คืนเงิน
    // ถ้าเป็น SELL pending → คืนหุ้น
    const refundAmount = Number(order.quantity) * Number(order.price);

    // ดูว่ามี holding อยู่ก่อน order นี้ไหม ถ้าไม่มีเลย = BUY pending
    // วิธีง่ายสุดคือเพิ่ม field 'side' ใน schema แต่ชั่วคราวเช็คจาก balance
    // ใช้วิธีเช็ค: ถ้า account balance + refund > balance เดิม = BUY
    // ตอนนี้ใช้วิธี: ลองคืนเงินก่อน แล้วแยก logic ด้วย type ใหม่

    // ** วิธีง่ายที่สุด: เพิ่ม PENDING_BUY / PENDING_SELL ใน schema **
    // แต่ถ้าไม่อยากแก้ schema ใช้วิธีนี้ชั่วคราว:
    // ถ้า holding ปัจจุบัน < quantity ที่สั่ง = เป็น SELL pending (หุ้นถูก lock ไปแล้ว)
    const currentHoldingQty = holding ? Number(holding.quantity) : 0;
    const isSellPending = currentHoldingQty < Number(order.quantity);

    if (isSellPending) {
      // คืนหุ้น
      if (holding) {
        await tx.holding.update({
          where: { userId_stockId: { userId: session.user.id, stockId: order.stockId } },
          data: { quantity: { increment: Number(order.quantity) } },
        });
      } else {
        await tx.holding.create({
          data: { userId: session.user.id, stockId: order.stockId, quantity: Number(order.quantity), avgCost: Number(order.price) },
        });
      }
    } else {
      // คืนเงิน
      await tx.bankAccount.update({
        where: { id: account.id },
        data: { balance: { increment: refundAmount } },
      });
    }
  });

  return NextResponse.json({ success: true });
}