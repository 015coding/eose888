'use client'

import { useState } from 'react'
import { Box, Container, Typography, Stack, IconButton } from '@mui/material'
import Grid from '@mui/material/Grid' // ใช้ Grid2 เพื่อรองรับ prop size
import { motion, AnimatePresence } from 'framer-motion'
import { East, West } from '@mui/icons-material'
import Navbar from '@/components/NavBarHome'
import Footer from '@/components/Footer'

const THEME = {
  bg: '#0B0E14',
  cardBg: '#131722',
  grid: 'rgba(255, 255, 255, 0.05)',
  accent: '#10b981',
  textMuted: '#787B86',
}

// ปรับ Path ให้ดึงจาก /public/...
const SLIDES = [
  { 
    src: "/image/about/image.png", // ตรวจสอบว่าไฟล์อยู่ที่ public/image/about/image.png
    title: "Our Vision", 
    location: "Beyond Trading" 
  },
  { 
    src: "/image/about/image2.jpg", // เพิ่มรูปแนวตั้งอื่นๆ ใน public
    title: "Chief Executive Officer", 
    location: "System Foundation" 
  },
  { 
    src: "/image/about/image3.jpg", 
    title: "จงกล้า ในวันที่อื่นกลัว", 
    location: "Beyond Passion" 
  }
]

export default function AboutPage() {
  const [current, setCurrent] = useState(0)

  const handleNext = () => setCurrent((prev) => (prev + 1) % SLIDES.length)
  const handlePrev = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)

  return (
    <Box sx={{ bgcolor: THEME.bg, color: 'white', minHeight: '100vh' }}>
      <Navbar />
      
      <Container maxWidth="lg" sx={{ pt: 20, pb: 15 }}>
        
        {/* --- SECTION 1: HERO & VERTICAL SLIDER --- */}
        <Grid container spacing={8} alignItems="center">
          
          {/* Left: Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography variant="caption" sx={{ color: THEME.accent, fontWeight: 700, letterSpacing: '3px', display: 'block', mb: 2 }}>
                EST. 2026
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: 300, mb: 4, fontSize: { xs: '2.8rem', md: '4rem' }, lineHeight: 1.1 }}>
                We believe in <br />
                <span style={{ fontWeight: 700, fontStyle: 'italic' }}>Transparency and Uncle EOSE</span> <br /> 
                above all else.
              </Typography>
              <Typography sx={{ color: THEME.textMuted, fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '500px', mb: 4 }}>
                Eose888 ไม่ได้ถูกสร้างมาเพื่อเป็นแค่แพลตฟอร์มเทรด แต่เราสร้างมาเพื่อ <b>ผู้ศรัทธา</b> ข้อมูล Fundamental ไม่สำคัญเท่า "ใจ" ที่นิ่งสงบดั่งภูผา
              </Typography>

              {/* Slider Controls for Desktop (Placed under text) */}
              <Stack direction="row" spacing={2}>
                <IconButton onClick={handlePrev} sx={{ border: `1px solid ${THEME.grid}`, color: 'white', '&:hover': { bgcolor: THEME.accent } }}>
                  <West />
                </IconButton>
                <IconButton onClick={handleNext} sx={{ border: `1px solid ${THEME.grid}`, color: 'white', '&:hover': { bgcolor: THEME.accent } }}>
                  <East />
                </IconButton>
              </Stack>
            </motion.div>
          </Grid>

          {/* Right: Vertical Image Slider */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  style={{ width: '100%', aspectRatio: '3/4', position: 'relative' }} // กำหนดเป็นแนวตั้ง 3:4
                >
                  <Box
                    component="img"
                    src={SLIDES[current].src}
                    sx={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      filter: 'grayscale(20%) brightness(0.9)' 
                    }}
                  />
                  {/* Overlay Info */}
                  <Box sx={{ 
                    position: 'absolute', bottom: 0, left: 0, right: 0, p: 4,
                    background: 'linear-gradient(to top, rgba(11,14,20,0.9) 0%, transparent 100%)' 
                  }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>{SLIDES[current].title}</Typography>
                    <Typography variant="body2" sx={{ color: THEME.accent }}>{SLIDES[current].location}</Typography>
                  </Box>
                </motion.div>
              </AnimatePresence>
            </Box>
          </Grid>
        </Grid>

        {/* --- SECTION 2: VALUES GRID --- */}
        <Box sx={{ mt: 15 }}>
          <Grid container spacing={0} sx={{ border: `1px solid ${THEME.grid}` }}>
            {[
              { title: "Open Source", desc: "Our core engine is open for audit. We have nothing to hide." },
              { title: "Privacy First", desc: "Your data is yours. We don't sell insights to hedge funds." },
              { title: "Speed", desc: "Optimized in Rust. Every microsecond belongs to you." }
            ].map((val, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i} sx={{ 
                p: 6, 
                borderRight: { md: i !== 2 ? `1px solid ${THEME.grid}` : 'none' },
                borderBottom: { xs: i !== 2 ? `1px solid ${THEME.grid}` : 'none', md: 'none' }
              }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{val.title}</Typography>
                <Typography sx={{ color: THEME.textMuted, lineHeight: 1.6 }}>{val.desc}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

      </Container>
      
      <Footer />
    </Box>
  )
}