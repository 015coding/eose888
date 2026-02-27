import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prismaApp } from "@/lib/prismaApp";
import { NextResponse } from "next/server";


// ======================================================
// POST → ใช้สำหรับสร้างคำสั่งซื้อ (BUY) หรือขาย (SELL)
// ======================================================
export async function POST(req: Request) {

  // ตรวจสอบ session (user ต้อง login ก่อน)
  const session = await getServerSession(authOptions);

  // ถ้าไม่ได้ login → block
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // รับค่าที่ frontend ส่งมา
  const { stockId, quantity, price, type = 'BUY', accountId } = await req.json();

  // ตรวจสอบความถูกต้องของข้อมูล
  // stockId ต้องมี
  // quantity และ price ต้อง > 0
  if (!stockId || !quantity || !price || quantity <= 0 || price <= 0) {
    return NextResponse.json({ error: 'ข้อมูลไม่ถูกต้อง' }, { status: 400 });
  }

  // ==============================
  // กรณี BUY (ตั้งคำสั่งซื้อ)
  // ==============================
  if (type === 'BUY') {

    // คำนวณเงินที่ต้องใช้ซื้อ
    const totalCost = quantity * price;

    // หา account USD ของ user
    const account = await prismaApp.bankAccount.findFirst({
      where: {
        id: accountId,
        userId: session.user.id,
        currency: 'USD',
      },
    });

    // ถ้าไม่พบบัญชี
    if (!account)
      return NextResponse.json({ error: 'ไม่พบบัญชี USD' }, { status: 400 });

    // ถ้าเงินไม่พอ
    if (Number(account.balance) < totalCost)
      return NextResponse.json({ error: 'ยอดเงินไม่เพียงพอ' }, { status: 400 });

    // ทำ transaction แบบ atomic (execute พร้อมกันทั้งหมด)
    await prismaApp.$transaction([

      // 1️⃣ หักเงินจากบัญชีทันที (lock เงินไว้)
      prismaApp.bankAccount.update({
        where: { id: account.id },
        data: { balance: { decrement: totalCost } },
      }),

      // 2️⃣ สร้าง transactionStock แบบ PENDING
      // แปลว่ายังไม่ match order
      prismaApp.transactionStock.create({
        data: {
          userId: session.user.id,
          stockId,
          type: 'PENDING',
          quantity,
          price,
          accountId: account.id,
        },
      }),

    ]);

  }
  // ==============================
  // กรณี SELL (ตั้งคำสั่งขาย)
  // ==============================
  else {

    // ตรวจสอบว่าผู้ใช้ถือหุ้นตัวนี้อยู่หรือไม่
    const holding = await prismaApp.holding.findUnique({
      where: {
        userId_stockId: {
          userId: session.user.id,
          stockId
        }
      },
    });

    // ถ้าไม่มีหุ้น หรือจำนวนไม่พอ → block
    if (!holding || Number(holding.quantity) < quantity) {
      return NextResponse.json({ error: 'จำนวนหุ้นไม่เพียงพอ' }, { status: 400 });
    }

    // หา account USD
    const account = await prismaApp.bankAccount.findFirst({
      where: {
        id: accountId,
        userId: session.user.id,
        currency: 'USD'
      },
    });

    if (!account)
      return NextResponse.json({ error: 'ไม่พบบัญชี USD' }, { status: 400 });

    // ทำ transaction เพื่อ update holding + create order
    await prismaApp.$transaction(async (tx) => {

      // คำนวณจำนวนหุ้นใหม่หลังจากถูก lock ไปขาย
      const newQty = Number(holding.quantity) - quantity;

      if (newQty === 0) {
        // ถ้าขายหมด → ลบ holding
        await tx.holding.delete({
          where: {
            userId_stockId: {
              userId: session.user.id,
              stockId
            }
          },
        });
      } else {
        // ถ้ายังเหลือ → update จำนวนหุ้น
        await tx.holding.update({
          where: {
            userId_stockId: {
              userId: session.user.id,
              stockId
            }
          },
          data: { quantity: newQty },
        });
      }

      // สร้าง order แบบ PENDING
      await tx.transactionStock.create({
        data: {
          userId: session.user.id,
          stockId,
          type: 'PENDING',
          quantity,
          price,
          accountId: account.id,
        },
      });

    });
  }

  // ส่ง success กลับไป
  return NextResponse.json({ success: true });
}


// ======================================================
// DELETE → ใช้ยกเลิกคำสั่งซื้อ/ขายที่ยังเป็น PENDING
// ======================================================
export async function DELETE(req: Request) {

  // ตรวจสอบ session
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // รับ orderId จาก client
  const { orderId } = await req.json();

  // หา order ที่เป็นของ user และยังเป็น PENDING
  const order = await prismaApp.transactionStock.findFirst({
    where: {
      id: BigInt(orderId),
      userId: session.user.id,
      type: 'PENDING'
    },
  });

  // ถ้าไม่พบ order
  if (!order)
    return NextResponse.json({ error: 'ไม่พบ order' }, { status: 404 });

  // หา account USD ของ user
  const account = await prismaApp.bankAccount.findFirst({
    where: {
      userId: session.user.id,
      currency: 'USD'
    },
  });

  if (!account)
    return NextResponse.json({ error: 'ไม่พบบัญชี' }, { status: 400 });

  // หา holding ปัจจุบัน
  const holding = await prismaApp.holding.findUnique({
    where: {
      userId_stockId: {
        userId: session.user.id,
        stockId: order.stockId
      }
    },
  });

  // ทำ transaction สำหรับการยกเลิก
  await prismaApp.$transaction(async (tx) => {

    // 1️⃣ เปลี่ยนสถานะ order เป็น CANCELLED
    await tx.transactionStock.update({
      where: { id: order.id },
      data: { type: 'CANCELLED' },
    });

    // เช็คว่า order นี้เป็น SELL pending หรือ BUY pending แบบง่าย ๆ
    const currentHoldingQty = holding ? Number(holding.quantity) : 0;

    // ถ้า holding ปัจจุบันน้อยกว่าจำนวน order
    // แปลว่าเคย lock หุ้นไว้ขาย → ต้องคืนหุ้น
    const isSellPending = currentHoldingQty < Number(order.quantity);

    if (isSellPending) {

      // คืนหุ้นกลับเข้า holding

      if (holding) {

        // เพิ่มจำนวนหุ้นกลับ
        await tx.holding.update({
          where: {
            userId_stockId: {
              userId: session.user.id,
              stockId: order.stockId
            }
          },
          data: {
            quantity: { increment: Number(order.quantity) }
          },
        });

      } else {

        // ถ้าไม่มี holding แล้ว → สร้างใหม่
        await tx.holding.create({
          data: {
            userId: session.user.id,
            stockId: order.stockId,
            quantity: Number(order.quantity),
            avgCost: Number(order.price),
          },
        });

      }

    } else {

      // ถ้าเป็น BUY pending → ต้องคืนเงิน

      const refundAmount =
        Number(order.quantity) * Number(order.price);

      await tx.bankAccount.update({
        where: { id: account.id },
        data: { balance: { increment: refundAmount } },
      });
    }

  });

  // ส่งผลลัพธ์กลับ
  return NextResponse.json({ success: true });
}