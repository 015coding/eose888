import { NextResponse } from "next/server";
import { prismaApp } from "@/lib/prismaApp";

export async function GET() {

  const rows = await prismaApp.stockHistory.findMany({
    orderBy: { time: "asc" }
  });

  const result: Record<string, any[]> = {};

  for (const r of rows) {

    const symbol = r.symbol;

    if (!result[symbol]) result[symbol] = [];

    result[symbol].push({
      id: r.id.toString(),
      price: Number(r.price),
      time: r.time
    });
  }

  return NextResponse.json(result);
}
