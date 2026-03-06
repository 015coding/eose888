import Navbar from '@/components/NavBarHome'
import HeroSection from '@/components/Herosection'
import StatsSection from '@/components/StatBar'
import FeaturesSection from '@/components/FeaturesSection'
import Footer from '@/components/Footer'
import { CTASection } from '@/components/CTASection'
import { Box } from '@mui/material'

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      {/* We can reuse HeroSection logic or create a dedicated CTA component here if needed, 
          but based on your original code, the bottom CTA is very similar to Hero. */}
        <CTASection />
      <Footer />
    </Box>
  )
}