import Header from '@/components/header.new'
import Hero from '@/sections/Hero'
import { AnimatedBackground } from '../components/animated-background'
import Footer from '@/sections/Footer'
import Pricing from '@/sections/Pricing'
import Cta from '@/sections/Cta'
import Trust from '@/sections/Trust'
import Features from '@/sections/Features'
import HowItWorks from '@/sections/HowItWorks'

export default function Landing() {
  return (
    <main className="min-h-screen text-[#F8F9FA] relative bg-[#0A0A0F]">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <Hero />
        <Trust />
        <Features />
        <HowItWorks />
        <Pricing />
        <Cta />
        <Footer />
      </div>
    </main>
  )
}
