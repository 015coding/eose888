import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prismaApp } from "@/lib/prismaApp";
import { NextResponse } from "next/server";


// ==============================
// API สำหรับซื้อ / ขายหุ้น
// ==============================
export async function POST(req: Request) {

  // ตรวจสอบ session ของ user
  const session = await getServerSession(authOptions);

  // ถ้าไม่มี session แปลว่ายังไม่ login → block ทันที
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // รับข้อมูลที่ client ส่งมา
  const { stockId, quantity, price, type = 'BUY', accountId } = await req.json();

  // validate ข้อมูลเบื้องต้น
  // ต้องมี stockId
  // quantity และ price ต้อง > 0
  if (!stockId || !quantity || !price || quantity <= 0 || price <= 0) {
    return NextResponse.json({ error: 'ข้อมูลไม่ถูกต้อง' }, { status: 400 });
  }

  // ==============================
  // ดึงราคาล่าสุดของหุ้นจาก stockHistoryDaily
  // ==============================
  const latest = await prismaApp.stockHistoryDaily.findFirst({
    where: { symbol: stockId },      // หาเฉพาะหุ้นตัวนี้
    orderBy: { time: 'desc' },       // เรียงจากใหม่ → เก่า
  });

  // ถ้ามีราคาล่าสุด → ใช้ราคาตลาด
  // ถ้าไม่มี → fallback ไปใช้ราคาที่ client ส่งมา
  const marketPrice = latest ? latest.price : price;

  // คำนวณมูลค่ารวมของธุรกรรม
  const totalCost = quantity * marketPrice;

  // ==============================
  // ตรวจสอบบัญชีธนาคาร USD ของ user
  // ==============================
  const account = await prismaApp.bankAccount.findFirst({
    where: {
      id: accountId,                // ต้องเป็นบัญชีที่ส่งมา
      userId: session.user.id,      // ต้องเป็นของ user คนนี้
      currency: 'USD',              // ต้องเป็นสกุล USD
    },
  });

  // ถ้าไม่พบบัญชี → error
  if (!account)
    return NextResponse.json({ error: 'ไม่พบบัญชี USD' }, { status: 400 });

  // ==============================
  // กรณี BUY
  // ==============================
  if (type === 'BUY') {

    // ตรวจสอบว่าเงินพอหรือไม่
    if (Number(account.balance) < totalCost) {
      return NextResponse.json({ error: 'ยอดเงินไม่เพียงพอ' }, { status: 400 });
    }

    // ใช้ transaction เพื่อให้ทุกขั้นตอนสำเร็จพร้อมกัน
    await prismaApp.$transaction(async (tx) => {

      // 1️⃣ หักเงินออกจากบัญชี
      await tx.bankAccount.update({
        where: { id: account.id },
        data: { balance: { decrement: totalCost } },
      });

      // 2️⃣ บันทึก transaction การซื้อหุ้น
      await tx.transactionStock.create({
        data: {
          userId: session.user.id,
          stockId,
          type: 'BUY',
          quantity,
          price: marketPrice,
          accountId: account.id,
        },
      });

      // 3️⃣ ตรวจสอบว่ามี holding เดิมหรือไม่
      const holding = await tx.holding.findUnique({
        where: {
          userId_stockId: {
            userId: session.user.id,
            stockId
          }
        },
      });

      if (holding) {
        // ถ้ามีอยู่แล้ว → update จำนวน + คำนวณ avgCost ใหม่

        const newQty = Number(holding.quantity) + quantity;

        // คำนวณ average cost ใหม่แบบ weighted average
        const newAvg =
          (Number(holding.avgCost) * Number(holding.quantity)
            + marketPrice * quantity)
          / newQty;

        await tx.holding.update({
          where: {
            userId_stockId: {
              userId: session.user.id,
              stockId
            }
          },
          data: {
            quantity: newQty,
            avgCost: newAvg,
          },
        });

      } else {
        // ถ้ายังไม่เคยถือหุ้นตัวนี้ → create ใหม่
        await tx.holding.create({
          data: {
            userId: session.user.id,
            stockId,
            quantity,
            avgCost: marketPrice,
          },
        });
      }
    });

  }
  // ==============================
  // กรณี SELL
  // ==============================
  else {

    // ตรวจสอบ holding ปัจจุบัน
    const holding = await prismaApp.holding.findUnique({
      where: {
        userId_stockId: {
          userId: session.user.id,
          stockId
        }
      },
    });

    // ถ้าไม่มีหุ้น หรือ จำนวนไม่พอ → error
    if (!holding || Number(holding.quantity) < quantity) {
      return NextResponse.json({ error: 'จำนวนหุ้นไม่เพียงพอ' }, { status: 400 });
    }

    // ทำ transaction แบบ atomic
    await prismaApp.$transaction(async (tx) => {

      // 1️⃣ เพิ่มเงินเข้าบัญชี
      await tx.bankAccount.update({
        where: { id: account.id },
        data: { balance: { increment: totalCost } },
      });

      // 2️⃣ บันทึก transaction การขาย
      await tx.transactionStock.create({
        data: {
          userId: session.user.id,
          stockId,
          type: 'SELL',
          quantity,
          price: marketPrice,
          accountId: account.id,
        },
      });

      // 3️⃣ คำนวณจำนวนหุ้นใหม่
      const newQty = Number(holding.quantity) - quantity;

      if (newQty === 0) {
        // ถ้าขายหมด → ลบ holding ทิ้ง
        await tx.holding.delete({
          where: {
            userId_stockId: {
              userId: session.user.id,
              stockId
            }
          },
        });
      } else {
        // ถ้ายังเหลือ → update จำนวน
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
    });
  }

  // ส่งผลลัพธ์กลับไป client
  return NextResponse.json({
    success: true,
    executedPrice: marketPrice
  });
}