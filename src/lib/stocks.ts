
export interface StockPoint {
  price: number
  time: string
}

export interface ComputedStock {
  symbol: string
  name: string
  price: string
  change: string
  percentChange: string
  isUp: boolean
  high: string
  low: string
  chartStrokePath: string
  chartAreaPath: string
  color: string
}

const NAMES: Record<string, string> = {
  'ETH/USD': 'Ethereum',
  'BTC/USD': 'Bitcoin',
  EOSE: 'Eos Energy',
  ONDS: 'Ondas Holdings',
}

const COLORS: Record<string, string> = {
  'ETH/USD': '#627EEA',
  'BTC/USD': '#F7931A',
  EOSE: '#089981',
  ONDS: '#2962FF',
}

function buildSVGPaths(prices: number[]): { stroke: string; area: string } {
  const W = 300
  const H = 100
  const PAD = 6
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const range = max - min || 1

  const pts = prices.map((p, i) => ({
    x: (i / (prices.length - 1)) * W,
    y: PAD + (H - PAD * 2) - ((p - min) / range) * (H - PAD * 2),
  }))

  // Smooth cubic bezier
  let stroke = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1]
    const curr = pts[i]
    const cpX = ((prev.x + curr.x) / 2).toFixed(1)
    stroke += ` C${cpX},${prev.y.toFixed(1)} ${cpX},${curr.y.toFixed(1)} ${curr.x.toFixed(1)},${curr.y.toFixed(1)}`
  }

  const last = pts[pts.length - 1]
  const area = `${stroke} L${last.x.toFixed(1)},${H} L0,${H} Z`

  return { stroke, area }
}

export function computeStock(symbol: string, raw: StockPoint[]): ComputedStock {
  const sorted = [...raw].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
  const prices = sorted.map((d) => d.price)

  const latest = prices[prices.length - 1]
  const prev = prices[prices.length - 2] ?? prices[0]
  const first = prices[0]

  const changeVal = latest - prev
  const changePct = ((latest - first) / first) * 100
  const isUp = changePct >= 0

  const { stroke, area } = buildSVGPaths(prices)

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return {
    symbol,
    name: NAMES[symbol] ?? symbol,
    price: fmt(latest),
    change: `${isUp ? '+' : ''}${fmt(changeVal)}`,
    percentChange: `${isUp ? '+' : ''}${changePct.toFixed(2)}%`,
    isUp,
    high: fmt(Math.max(...prices)),
    low: fmt(Math.min(...prices)),
    chartStrokePath: stroke,
    chartAreaPath: area,
    color: COLORS[symbol] ?? (isUp ? '#089981' : '#F23645'),
  }
}