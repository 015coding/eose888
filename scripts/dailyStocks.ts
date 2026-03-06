import { prismaApp } from "@/lib/prismaApp";

const API_KEY = process.env.STOCK_API_KEY;

const SYMBOLS = ["EOSE", "ONDS", "BTC/USD", "ETH/USD"];

const FIVE_MIN = 5 * 60 * 1000;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/* ------------------ TIME HELPERS ------------------ */

function roundTo5Min(date: Date): Date {
  const ms = date.getTime();
  return new Date(Math.floor(ms / FIVE_MIN) * FIVE_MIN);
}

function msAgo(ms: number): Date {
  return new Date(Date.now() - ms);
}

/* ------------------ SYNC LOGIC ------------------ */

async function syncSymbol(symbol: string) {
  const nowRounded = roundTo5Min(new Date());

  const last = await prismaApp.stockHistoryDaily.findFirst({
    where: { symbol },
    orderBy: { time: "desc" },
  });

  let startDate: Date;

  if (!last) {
    // No data → fetch last 24 hours
    startDate = roundTo5Min(msAgo(ONE_DAY_MS));
  } else {
    // Continue from last stored point + 5 min
    startDate = new Date(last.time.getTime() + FIVE_MIN);
  }

  if (startDate >= nowRounded) {
    console.log(`⏩ ${symbol} up to date`);
    return;
  }

  // Format dates as UTC ISO strings for the API
  const startStr = startDate.toISOString().replace("T", " ").slice(0, 19);
  const endStr = nowRounded.toISOString().replace("T", " ").slice(0, 19);

  const url =
    `https://api.twelvedata.com/time_series` +
    `?symbol=${encodeURIComponent(symbol)}` +
    `&interval=5min` +
    `&start_date=${encodeURIComponent(startStr)}` +
    `&end_date=${encodeURIComponent(endStr)}` +
    `&timezone=UTC` +
    `&apikey=${API_KEY}`;

  const res = await fetch(url);
  const json = await res.json();

  if (!json.values || !Array.isArray(json.values)) {
    console.log("API error:", symbol, json);
    return;
  }

  const data = json.values.map((v: any) => ({
    symbol,
    price: parseFloat(v.close),
    // Parse as UTC explicitly
    time: roundTo5Min(new Date(v.datetime + "Z")),
  }));

  if (data.length > 0) {
    await prismaApp.stockHistoryDaily.createMany({
      data,
      skipDuplicates: true,
    });
    console.log(`✅ synced: ${symbol} (${data.length} points)`);
  }

  /* -------- Keep only last 24 hours -------- */
  const cutoff = msAgo(ONE_DAY_MS);

  await prismaApp.stockHistoryDaily.deleteMany({
    where: {
      symbol,
      time: { lt: cutoff },
    },
  });
}

/* ------------------ MAIN RUN ------------------ */

async function run() {
  for (const s of SYMBOLS) {
    await syncSymbol(s);
  }
  console.log("🎯 all synced");
}

/* ------------------ AUTO RUN EVERY 5 MIN ------------------ */

run();

setInterval(async () => {
  console.log("⏳ 5min sync...");
  await run();
}, FIVE_MIN);