import { prismaApp } from "@/lib/prismaApp";

const API_KEY = process.env.STOCK_API_KEY;

const SYMBOLS = [
  "EOSE",
  "ONDS",
  "BTC/USD",
  "ETH/USD",
];

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

async function syncSymbol(symbol: string) {

  const last = await prismaApp.stockHistory.findFirst({
    where: { symbol },
    orderBy: { time: "desc" },
  });

  const startDate = last?.time ?? daysAgo(30);
  const today = new Date();

  const url =
    `https://api.twelvedata.com/time_series` +
    `?symbol=${encodeURIComponent(symbol)}` +
    `&interval=1day` +
    `&start_date=${startDate.toISOString().split("T")[0]}` +
    `&end_date=${today.toISOString().split("T")[0]}` +
    `&apikey=${API_KEY}`;

  const res = await fetch(url);
  const json = await res.json();

  if (!json.values) {
    console.log("API error:", symbol, json);
    return;
  }

  const data = json.values.map((v: any) => ({
    symbol,
    price: parseFloat(v.close),
    time: new Date(v.datetime),
  }));

  await prismaApp.stockHistory.createMany({
    data,
    skipDuplicates: true,
  });

  // cleanup > 30 days
  const cutoff = daysAgo(30);

  await prismaApp.stockHistory.deleteMany({
    where: {
      symbol,
      time: { lt: cutoff },
    },
  });

  console.log("✅ synced:", symbol);
}

async function run() {
  for (const s of SYMBOLS) {
    await syncSymbol(s);
  }
  console.log("🎯 all synced");
}

run();
