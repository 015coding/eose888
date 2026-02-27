import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prismaApp } from "@/lib/prismaApp";
import { NextResponse } from "next/server";


// ======================================================
// GET → ใช้ดึงประวัติธุรกรรมหุ้นของ user
// ======================================================
export async function GET(req: Request) {

  // ตรวจสอบว่า user login หรือไม่
  const session = await getServerSession(authOptions);

  // ถ้ายังไม่ได้ login → ส่ง empty array พร้อม status 401
  if (!session)
    return NextResponse.json([], { status: 401 });

  // อ่าน query parameters จาก URL
  const { searchParams } = new URL(req.url);

  // รับค่า symbol ถ้ามีการ filter ตามหุ้นตัวใดตัวหนึ่ง
  const symbol = searchParams.get("symbol");

  // ==============================
  // Query ธุรกรรมจาก database
  // ==============================
  const transactions = await prismaApp.transactionStock.findMany({

    // เงื่อนไข:
    // - ต้องเป็นของ user คนนี้
    // - ถ้ามี symbol → กรองตาม stockId ด้วย
    where: {
      userId: session.user.id,
      ...(symbol ? { stockId: symbol } : {}),
    },

    // include ข้อมูลบัญชีที่เกี่ยวข้อง
    include: {
      account: {
        select: {
          country: true,
          currency: true
        }
      }
    },

    // เรียงจากใหม่ไปเก่า ตาม tradeDate
    orderBy: { tradeDate: 'desc' },

    // จำกัดจำนวนไม่เกิน 50 รายการล่าสุด
    take: 50,
  });

  // ==============================
  // แปลงข้อมูลก่อนส่งกลับ client
  // ==============================
  return NextResponse.json(

    // map แปลง format บาง field ให้ใช้ใน frontend ง่ายขึ้น
    transactions.map(tx => ({

      // id ใน Prisma เป็น BigInt → แปลงเป็น string
      id: tx.id.toString(),

      // รหัสหุ้น
      stockId: tx.stockId,

      // ประเภทของ transaction (PENDING / BUY / SELL / CANCELLED ฯลฯ)
      type: tx.type,

      // quantity เป็น Decimal → แปลงเป็น number
      quantity: Number(tx.quantity),

      // price เป็น Decimal → แปลงเป็น number
      price: Number(tx.price),

      // วันที่ทำรายการ → แปลงเป็น ISO string
      tradeDate: tx.tradeDate.toISOString(),

      // ข้อมูลบัญชี (ถ้ามี)
      account: tx.account
        ? {
            country: tx.account.country,
            currency: tx.account.currency
          }
        : null,

    }))
  );
}