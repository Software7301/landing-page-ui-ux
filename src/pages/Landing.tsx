import { useEffect } from 'react'
import Header from '@/components/header.new'
import Hero from '@/sections/Hero'
import { AnimatedBackground } from '../components/animated-background'
import Footer from '@/sections/Footer'
import Pricing from '@/sections/Pricing'
import Cta from '@/sections/Cta'
import Trust from '@/sections/Trust'
import Features from '@/sections/Features'
import HowItWorks from '@/sections/HowItWorks'
import Infrastructure from '@/sections/Infrastructure'
import { initLenis, destroyLenis } from '@/lib/lenis'

export default function Landing() {
  useEffect(() => {
    const lenis = initLenis()
    return () => {
      destroyLenis()
    }
  }, [])

  return (
    <main className="min-h-screen text-[#E5E7EB] relative bg-[#0B0F17]">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <Hero />
        <Trust />
        <Features />
        <Infrastructure />
        <HowItWorks />
        <Pricing />
        <Cta />
        <Footer />
      </div>
    </main>
  )
}
