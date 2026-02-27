import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prismaApp } from "@/lib/prismaApp";

declare global {
  var historyStore: Record<string, Array<{ time: string; price: number }>>;
}

global.historyStore = global.historyStore || {};

const API_KEY = process.env.STOCK_API_KEY;

function msToNext60s() {
  const now = Date.now();
  return 60000 - (now % 60000);
}

function startRecorder(symbol: string) {
  if (global.historyStore[symbol]) return;

  global.historyStore[symbol] = [];

  const poll = async () => {
    try {
      const res = await fetch(
        `https://api.twelvedata.com/quote?symbol=${encodeURIComponent(symbol)}&apikey=${API_KEY}`
      );

      const json = await res.json();
      const price = parseFloat(json.close);

      if (!price) return;

      const history = global.historyStore[symbol];

      history.push({
        time: new Date().toLocaleTimeString(),
        price
      });

      if (history.length > 300) history.shift();

    } catch (err) {
      console.log("Polling error:", err);
    }
  };

  setTimeout(() => {
    poll();
    setInterval(poll, 60000);
  }, msToNext60s());
}

export async function GET() {
  // ✅ 1. อ่าน session
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // ✅ 2. ดึง pinned stock ของ user
  const pinned = await prismaApp.pinnedStock.findMany({
    where: { userId: session.user.id },
    select: { stockId: true }
  });

  // ✅ 3. start recorder + build response
  const result: Record<string, any[]> = {};

  for (const s of pinned) {
    startRecorder(s.stockId);
    result[s.stockId] = global.historyStore[s.stockId];
  }

  // ✅ 4. return history
  return NextResponse.json(result);
}
