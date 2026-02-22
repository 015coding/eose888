'use client'

import { useRouter } from 'next/navigation'
import { Box, Container, Typography, Button, Stack, Chip, Divider } from '@mui/material'
import Grid from '@mui/material/Grid' 
import { Bolt, ShowChart } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

// นำเข้าฟังก์ชันจาก lib/stocks.ts
import { computeStock, ComputedStock } from '@/lib/stocks'

const THEME = {
  bg: '#131722',
  cardBg: '#1E222D',
  grid: '#2A2E39',
  textMain: '#D1D4DC',
  textMuted: '#787B86',
  up: '#089981',
  down: '#F23645',
  accent: '#2962FF'
}

export default function TradingHero() {
  const router = useRouter()

  // 1. stockList เก็บแค่ 2 ตัวสำหรับ Card กราฟ
  const [stockList, setStockList] = useState<ComputedStock[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // 2. livePrices เก็บ 4 ตัวสำหรับ Ticker Tape
  const [livePrices, setLivePrices] = useState({
    BTC: '0.00', ETH: '0.00', EOSE: '0.00', ONDS: '0.00'
  })

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch('/api/stockdb')
        const data = await response.json()

        const get15DaysData = (symbol: string) => {
          if (!data[symbol]) return []
          return data[symbol].slice(-15).map((item: any) => ({
            price: item.price,
            time: item.time
          }))
        }

        // --- ส่วนที่ 1: กราฟทำแค่ 2 ตัวเหมือนเดิม ---
        const eoseData = get15DaysData('EOSE')
        const ondsData = get15DaysData('ONDS')

        if (eoseData.length > 0 && ondsData.length > 0) {
          setStockList([
            computeStock('EOSE', eoseData),
            computeStock('ONDS', ondsData)
          ])
        }

        // --- ส่วนที่ 2: ราคาล่าสุดดึงครบ 4 ตัว ---
        setLivePrices({
          BTC: data['BTC/USD']?.at(-1)?.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00',
          ETH: data['ETH/USD']?.at(-1)?.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00',
          EOSE: data['EOSE']?.at(-1)?.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00',
          ONDS: data['ONDS']?.at(-1)?.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'
        })

      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStockData()
  }, [])

  return (
    <Box sx={{
      bgcolor: THEME.bg, minHeight: '100vh', width: '100%', color: THEME.textMain,
      position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center'
    }}>
      
      <Box sx={{
        position: 'absolute', inset: 0, opacity: 0.15,
        backgroundImage: `linear-gradient(${THEME.grid} 1px, transparent 1px), linear-gradient(90deg, ${THEME.grid} 1px, transparent 1px)`,
        backgroundSize: '40px 40px', zIndex: 0
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, pt: { xs: 8, md: 0 } }}>
        <Grid container spacing={6} alignItems="center">
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Stack direction="row" spacing={1} mb={2}>
                 <Chip label="MARKET LIVE" size="small" sx={{ bgcolor: '#08998120', color: THEME.up, fontWeight: 'bold', borderRadius: '4px' }} />
                 <Chip label="ZERO COMMISSION" size="small" sx={{ bgcolor: '#2962FF20', color: THEME.accent, fontWeight: 'bold', borderRadius: '4px' }} />
              </Stack>
              
              <Typography variant="h1" sx={{ 
                fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' }, 
                fontWeight: 700, lineHeight: 1.1, mb: 3, letterSpacing: '-1px' 
              }}>
                Trade the Future <br />
                <span style={{ color: THEME.up }}>Precision</span> & Speed.
              </Typography>

              <Typography variant="body1" sx={{ color: THEME.textMuted, fontSize: '1.1rem', maxWidth: '500px', mb: 4 }}>
                Professional-grade execution for <b>Energy</b> & <b>Tech</b> stocks. 
                Experience the {stockList[0]?.symbol || 'Market'} chart with real-time analytics.
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button variant="contained" size="large" onClick={() => router.push('/trade')}
                  sx={{ bgcolor: THEME.accent, color: 'white', borderRadius: '6px', px: 4, py: 1.5, fontSize: '1rem', fontWeight: 600, textTransform: 'none', '&:hover': { bgcolor: '#1E54E8' } }}
                >Start Charting</Button>
                <Button variant="outlined" size="large" startIcon={<ShowChart />}
                  sx={{ color: THEME.textMain, borderColor: THEME.grid, borderRadius: '6px', px: 3, textTransform: 'none', '&:hover': { borderColor: THEME.textMain, bgcolor: 'rgba(255,255,255,0.05)' } }}
                >View Markets</Button>
              </Stack>
            </Box>
          </Grid>

          {/* ฝั่งขวาแสดง 2 ใบเหมือนเดิม */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' }, position: 'relative', height: '800px' }}>
            <Box sx={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '80%', height: '80%', background: `radial-gradient(circle, ${THEME.accent}20 0%, transparent 70%)`, filter: 'blur(60px)', zIndex: 0
            }} />

            {!isLoading && stockList[0] && (
              <TVStockCard data={stockList[0]} width="320px" sx={{ top: '15%', right: '10%', zIndex: 2 }} animateDelay={0.2} />
            )}
            {!isLoading && stockList[1] && (
              <TVStockCard data={stockList[1]} width="320px" sx={{ bottom: '10%', right: '50%', zIndex: 1, opacity: 0.9, transform: 'scale(0.95)' }} animateDelay={0.4} />
            )}
          </Grid>
        </Grid>
      </Container>

      <TickerTape livePrices={livePrices} />
    </Box>
  )
}

function TVStockCard({ data, width, sx, animateDelay }: { data: ComputedStock, width: any, sx: any, animateDelay: number }) {
  return (
    <Box
      component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: animateDelay }}
      sx={{ position: 'absolute', width: width, bgcolor: THEME.cardBg, border: `1px solid ${THEME.grid}`, borderRadius: '8px', boxShadow: '0 8px 30px rgba(0,0,0,0.4)', overflow: 'hidden', ...sx }}
    >
      <Box sx={{ p: 2, borderBottom: `1px solid ${THEME.grid}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={{ width: 32, height: 32, bgcolor: data.color, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
             <Bolt fontSize="small" />
          </Box>
          <Box>
            <Stack direction="row" spacing={1} alignItems="baseline">
              <Typography fontWeight={700} sx={{ fontSize: '1.1rem' }}>{data.symbol}</Typography>
              <Typography variant="caption" sx={{ color: THEME.textMuted, fontSize: '0.7rem', border: `1px solid ${THEME.textMuted}`, px: 0.5, borderRadius: '2px' }}>USD</Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: THEME.textMuted, display: 'block' }}>{data.name}</Typography>
          </Box>
        </Stack>
        <Chip label={data.isUp ? "BUY" : "SELL"} size="small" sx={{ bgcolor: `${data.color}20`, color: data.color, fontWeight: 'bold', borderRadius: '4px', height: '24px' }} />
      </Box>

      <Box sx={{ p: 2, pb: 0 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, fontFamily: 'Consolas, monospace', letterSpacing: '-1px', color: data.color }}>
          {data.price}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
           <Typography variant="body2" sx={{ color: data.color, fontWeight: 500 }}>{data.change}</Typography>
           <Typography variant="body2" sx={{ color: data.color, fontWeight: 500 }}>({data.percentChange})</Typography>
           <Typography variant="caption" sx={{ color: THEME.textMuted }}>Market Open</Typography>
        </Stack>
      </Box>

      <Box sx={{ position: 'relative', height: '120px', mt: 2 }}>
        <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`grad-${data.symbol.replace('/', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={data.color} stopOpacity={0.2} /><stop offset="100%" stopColor={data.color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <path d={data.chartAreaPath} fill={`url(#grad-${data.symbol.replace('/', '')})`} stroke="none" />
          <motion.path d={data.chartStrokePath} fill="none" stroke={data.color} strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: animateDelay + 0.2 }} />
        </svg>
      </Box>

      <Stack direction="row" divider={<Divider orientation="vertical" flexItem sx={{ borderColor: THEME.grid }} />} sx={{ borderTop: `1px solid ${THEME.grid}`, bgcolor: '#171B26' }}>
         <Box sx={{ flex: 1, p: 1.5, textAlign: 'center' }}><Typography variant="caption" display="block" color={THEME.textMuted}>VOL</Typography><Typography variant="caption" fontWeight="bold">2.4M</Typography></Box>
         <Box sx={{ flex: 1, p: 1.5, textAlign: 'center' }}><Typography variant="caption" display="block" color={THEME.textMuted}>HIGH</Typography><Typography variant="caption" fontWeight="bold" color={THEME.up}>{data.high}</Typography></Box>
         <Box sx={{ flex: 1, p: 1.5, textAlign: 'center' }}><Typography variant="caption" display="block" color={THEME.textMuted}>LOW</Typography><Typography variant="caption" fontWeight="bold" color={THEME.down}>{data.low}</Typography></Box>
      </Stack>
    </Box>
  )
}

function TickerTape({ livePrices }: { livePrices: any }) {
  const items = [
    `BTC ${livePrices.BTC}`, `ETH ${livePrices.ETH}`, 
    `EOSE ${livePrices.EOSE}`, `ONDS ${livePrices.ONDS}`, 
  ];
  
  // สร้าง Array ให้ยาวพอเพื่อวนลูปเนียนๆ
  const seamlessList = [...items, ...items, ...items, ...items, ...items, ...items];

  return (
    <Box sx={{ 
      position: 'absolute', bottom: 0, width: '100%', bgcolor: THEME.cardBg, borderTop: `1px solid ${THEME.grid}`, py: 1.5,
      overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex'
    }}>
       <motion.div
         animate={{ x: ["0%", "-50%"] }} 
         transition={{ repeat: Infinity, ease: "linear", duration: 25 }} 
         style={{ display: 'flex', width: 'max-content' }}
       >
         {seamlessList.map((item, i) => (
           <Box key={i} sx={{ px: 6 }}> 
             <Typography variant="body2" sx={{ fontFamily: 'Consolas, monospace', color: THEME.textMain }}>
               {item.split(' ')[0]} <span style={{ color: THEME.up }}>{item.split(' ')[1]}</span>
             </Typography>
           </Box>
         ))}
       </motion.div>
    </Box>
  )
}