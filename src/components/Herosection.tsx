'use client'

import { useRouter } from 'next/navigation'
import { Box, Container, Typography, Button, Stack, Chip, Divider, Badge } from '@mui/material'
import Grid from '@mui/material/Grid' // MUI v6 Grid
import { Bolt, CandlestickChart, ShowChart, Timeline } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'



// --- Types ---
interface StockData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  percentChange: string;
  isUp: boolean;
  color: string;
}

// --- Constants (TradingView Theme) ---
const THEME = {
  bg: '#131722',        // TV Main Background
  cardBg: '#1E222D',    // TV Panel Background
  grid: '#2A2E39',      // TV Grid Lines
  textMain: '#D1D4DC',
  textMuted: '#787B86',
  up: '#089981',        // TV Green
  down: '#F23645',      // TV Red
  accent: '#2962FF'     // TV Blue
}

export default function TradingHero() {
  const router = useRouter()

  // Mock Data
  const stockList: StockData[] = [
    { symbol: 'EOSE', name: 'Eos Energy', price: '2.45', change: '+0.32', percentChange: '+15.2%', isUp: true, color: THEME.up },
    { symbol: 'ONDS', name: 'Ondas Hld', price: '1.12', change: '+0.09', percentChange: '+8.4%', isUp: true, color: THEME.accent },
  ]


  return (
    <Box sx={{
      bgcolor: THEME.bg,
      minHeight: '100vh',
      width: '100%',
      color: THEME.textMain,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      
      {/* 1. Background Technical Grid (Pure CSS - No Render Load) */}
      <Box sx={{
        position: 'absolute', inset: 0, opacity: 0.15,
        backgroundImage: `
          linear-gradient(${THEME.grid} 1px, transparent 1px), 
          linear-gradient(90deg, ${THEME.grid} 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        zIndex: 0
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, pt: { xs: 8, md: 0 } }}>
        <Grid container spacing={6} alignItems="center">
          
          {/* --- LEFT: Content --- */}
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
                Experience the {stockList[0].symbol} chart with real-time analytics.
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={() => router.push('/trade')}
                  sx={{ 
                    bgcolor: THEME.accent, 
                    color: 'white', 
                    borderRadius: '6px', // เหลี่ยมขึ้นตามสไตล์ TV
                    px: 4, py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#1E54E8' }
                  }}
                >
                  Start Charting
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  startIcon={<ShowChart />}
                  sx={{ 
                    color: THEME.textMain, 
                    borderColor: THEME.grid,
                    borderRadius: '6px',
                    px: 3,
                    textTransform: 'none',
                    '&:hover': { borderColor: THEME.textMain, bgcolor: 'rgba(255,255,255,0.05)' }
                  }}
                >
                  View Markets
                </Button>
              </Stack>
            </Box>
          </Grid>

        <Grid size={{ xs: 12, md: 6 }} sx={{ 
            display: { xs: 'none', md: 'block' }, // <--- แก้ตรงนี้บรรทัดเดียว จบ!
            position: 'relative', 
            height: '800px' 
          }}>
            
            {/* Decorative Background Glow */}
            <Box sx={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '80%', height: '80%',
              background: `radial-gradient(circle, ${THEME.accent}20 0%, transparent 70%)`,
              filter: 'blur(60px)', zIndex: 0
            }} />

            {/* Main Card (EOSE) */}
            <TVStockCard 
              data={stockList[0]} 
              width="320px" // ไม่ต้องทำ responsive width แล้ว เพราะจอมือถือไม่แสดง
              sx={{ top: '15%', right: '10%', zIndex: 2 }} 
              animateDelay={0.2}
            />

            {/* Secondary Card (ONDS) */}
            <TVStockCard 
              data={stockList[1]} 
              width="320px"
              sx={{ 
                bottom: '10%', right: '50%', 
                zIndex: 1, opacity: 0.9, transform: 'scale(0.95)' 
              }} 
              animateDelay={0.4}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Ticker Tape at Bottom */}
      <TickerTape />
    </Box>
  )
}

// --- Component: TradingView Style Card ---
function TVStockCard({ data, width, sx, animateDelay }: { data: StockData, width: any, sx: any, animateDelay: number }) {
  
  // สร้างกราฟจำลอง (Static Path เพื่อลด Server Load ไม่ต้องคำนวณใหม่ตลอด)
  const chartPath = "M0,80 L20,75 L40,82 L60,65 L80,70 L100,50 L120,55 L140,40 L160,45 L180,30 L200,35 L220,15 L240,20 L260,5 L280,10 L300,0";
  const areaPath = `${chartPath} L300,100 L0,100 Z`;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animateDelay }}
      sx={{
        position: 'absolute',
        width: width,
        bgcolor: THEME.cardBg,
        border: `1px solid ${THEME.grid}`,
        borderRadius: '8px', // ขอบมนน้อยลง ให้ดู Pro
        boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
        overflow: 'hidden',
        ...sx
      }}
    >
      {/* Card Header */}
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
        <Chip label="BUY" size="small" sx={{ bgcolor: `${data.color}20`, color: data.color, fontWeight: 'bold', borderRadius: '4px', height: '24px' }} />
      </Box>

      {/* Price Section */}
      <Box sx={{ p: 2, pb: 0 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, fontFamily: 'Consolas, monospace', letterSpacing: '-1px' }}>
          {data.price}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
           <Typography variant="body2" sx={{ color: data.color, fontWeight: 500 }}>{data.change}</Typography>
           <Typography variant="body2" sx={{ color: data.color, fontWeight: 500 }}>({data.percentChange})</Typography>
           <Typography variant="caption" sx={{ color: THEME.textMuted }}>Market Open</Typography>
        </Stack>
      </Box>

      {/* Chart Area */}
      <Box sx={{ position: 'relative', height: '120px', mt: 2 }}>
        <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`grad-${data.symbol}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={data.color} stopOpacity={0.2} />
              <stop offset="100%" stopColor={data.color} stopOpacity={0} />
            </linearGradient>
          </defs>
          {/* Area Fill */}
          <path d={areaPath} fill={`url(#grad-${data.symbol})`} stroke="none" />
          {/* Stroke Line */}
          <motion.path 
            d={chartPath} 
            fill="none" 
            stroke={data.color} 
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: animateDelay + 0.2 }}
          />
        </svg>
        
        {/* Pulsing Dot (Current Price) */}
        <Box 
          component={motion.div}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          sx={{ 
            position: 'absolute', top: '5%', right: '-4px', 
            width: 8, height: 8, bgcolor: data.color, borderRadius: '50%',
            boxShadow: `0 0 10px ${data.color}`
          }} 
        />
      </Box>

      {/* Footer Metrics */}
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem sx={{ borderColor: THEME.grid }} />} sx={{ borderTop: `1px solid ${THEME.grid}`, bgcolor: '#171B26' }}>
         <Box sx={{ flex: 1, p: 1.5, textAlign: 'center' }}>
            <Typography variant="caption" display="block" color={THEME.textMuted}>VOL</Typography>
            <Typography variant="caption" fontWeight="bold">2.4M</Typography>
         </Box>
         <Box sx={{ flex: 1, p: 1.5, textAlign: 'center' }}>
            <Typography variant="caption" display="block" color={THEME.textMuted}>HIGH</Typography>
            <Typography variant="caption" fontWeight="bold">2.51</Typography>
         </Box>
         <Box sx={{ flex: 1, p: 1.5, textAlign: 'center' }}>
            <Typography variant="caption" display="block" color={THEME.textMuted}>LOW</Typography>
            <Typography variant="caption" fontWeight="bold">2.38</Typography>
         </Box>
      </Stack>
    </Box>
  )
}

// --- Component: Ticker Tape (Lightweight Animation) ---
function TickerTape() {
  const items = ['BTC 98,230', 'ETH 3,400', 'SOL 145', 'EOSE 2.45', 'ONDS 1.12', 'TSLA 180.20', 'AAPL 185.50', 'NVDA 890.00'];
  
  return (
    <Box sx={{ 
      position: 'absolute', bottom: 0, width: '100%', 
      bgcolor: THEME.cardBg, borderTop: `1px solid ${THEME.grid}`, py: 1,
      overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex'
    }}>
       <motion.div
         animate={{ x: [0, -1000] }}
         transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
         style={{ display: 'flex', gap: '40px', paddingLeft: '20px' }}
       >
          {[...items, ...items, ...items].map((item, i) => ( // Duplicate for infinite loop
            <Typography key={i} variant="caption" sx={{ fontFamily: 'Consolas, monospace', color: THEME.textMuted }}>
              {item.split(' ')[0]} <span style={{ color: THEME.up }}>{item.split(' ')[1]}</span>
            </Typography>
          ))}
       </motion.div>
    </Box>
  )
}