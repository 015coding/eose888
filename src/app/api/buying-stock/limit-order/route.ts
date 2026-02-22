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

  const totalCost = quantity * price;


  const account = await prismaApp.bankAccount.findFirst({
    where: { 
      id: accountId,
      userId: session.user.id,  // ← verify เจ้าของ
      currency: 'USD' 
    },
  });

  if (!account) return NextResponse.json({ error: 'ไม่พบบัญชี USD' }, { status: 400 });
  if (Number(account.balance) < totalCost) return NextResponse.json({ error: 'ยอดเงินไม่เพียงพอ' }, { status: 400 });

  await prismaApp.$transaction([
    prismaApp.bankAccount.update({
      where: { id: account.id },
      data: { balance: { decrement: totalCost } },
    }),
    prismaApp.transactionStock.create({
      data: {
        userId: session.user.id,
        stockId,
        type: 'PENDING',
        quantity,
        price,
      },
    }),
  ]);

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

  const refund = Number(order.quantity) * Number(order.price);

  const account = await prismaApp.bankAccount.findFirst({
    where: { userId: session.user.id, currency: 'USD' },
  });

  if (!account) return NextResponse.json({ error: 'ไม่พบบัญชี' }, { status: 400 });

  await prismaApp.$transaction([
    prismaApp.transactionStock.update({
      where: { id: order.id },
      data: { type: 'CANCELLED' },
    }),
    prismaApp.bankAccount.update({
      where: { id: account.id },
      data: { balance: { increment: refund } },
    }),
  ]);

  return NextResponse.json({ success: true });
}