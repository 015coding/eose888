import { NextResponse } from "next/server";
import { prismaApp } from "@/lib/prismaApp";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbolFilter = searchParams.get("symbol");

  // Always filter to the last 24 hours by actual timestamp
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

  if (symbolFilter) {
    const rows = await prismaApp.stockHistoryDaily.findMany({
      where: {
        symbol: symbolFilter,
        time: { gte: since },
      },
      orderBy: { time: "asc" },
    });

    return NextResponse.json({
      [symbolFilter]: rows.map((r) => ({
        id: r.id.toString(),
        price: Number(r.price),
        time: r.time,
      })),
    });
  }

  const rows = await prismaApp.stockHistoryDaily.findMany({
    where: {
      time: { gte: since },
    },
    orderBy: { time: "asc" },
  });

  const result: Record<string, any[]> = {};

  for (const r of rows) {
    if (!result[r.symbol]) result[r.symbol] = [];
    result[r.symbol].push({
      id: r.id.toString(),
      price: Number(r.price),
      time: r.time,
    });
  }

  return NextResponse.json(result);
}