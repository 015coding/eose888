'use client'

import { Box, Container, Typography } from '@mui/material'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { use, useEffect, useRef, useState } from 'react'

// --- ตัวเลขวิ่ง (Counter) ---
function Counter({ to, prefix = '', suffix = '', decimals = 0 }: any) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  // ปรับความเร็วที่นี่: stiffness สูงขึ้น และ damping พอเหมาะเพื่อให้จบใน ~0.5s
  const spring = useSpring(0, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  })
  
  const displayValue = useTransform(spring, (current) => {
    return `${prefix}${current.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${suffix}`
  })

  useEffect(() => {
    if (inView) {
      spring.set(to)
    }
  }, [inView, to, spring])

  return <motion.span ref={ref}>{displayValue}</motion.span>
}

function AllBalance() {
  const [USD , setUSD] = useState(0);
  const [THB , setTHB] = useState(0);

  useEffect(() => {
    fetch('/api/users/getAllBalance')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched balances:", data);
        setUSD(parseFloat(data.USD) || 0);
        setTHB(parseFloat(data.THB) || 0);
      })
  },[])
  return {USD, THB}
}

function CountUsers() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('/api/users/countUsers')
      .then(res => res.json())
      .then(data => setCount(data.count))
  }, [])

  return count;
}



export default function StatsSection() {

  const {USD , THB} = AllBalance();
  const userCount = CountUsers();
  const STATS = [
  { value: userCount, suffix: '+', label: 'Active Traders' },
  { prefix: '$', value: USD, suffix: 'M+', label: 'Trading Volume' },
  { value: 99.9, suffix: '%', label: 'Uptime', decimals: 1 },
  { value: 50, suffix: '+', label: 'Assets Available' },
  ]



  return (
    <Box sx={{ py: 8, background: 'linear-gradient(to right, #10b981, #14b8a6)' }}>
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, 
            gap: 4, 
            textAlign: 'center' 
          }}
        >
          {STATS.map((stat, index) => (
            <Box key={index}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontSize: { xs: '2rem', md: '2.5rem' }, 
                  fontWeight: 'bold', 
                  color: 'white', 
                  mb: 1 
                }}
              >
                <Counter 
                  to={stat.value} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix} 
                  decimals={stat.decimals}
                />
              </Typography>
              <Typography sx={{ color: '#ecfdf5' }}>
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}