import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from './lib/gsap-config';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useUISounds } from './lib/SoundContext';
import { LenisProvider } from './lib/lenis';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Craftsmanship from './components/Craftsmanship';
import GSAPShowcase from './components/GSAPShowcase';
import FeaturedGrid from './components/FeaturedGrid';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { enableAudio } = useUISounds();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      
      const enableAudioOnFirstClick = () => {
        enableAudio();
        document.removeEventListener('click', enableAudioOnFirstClick);
      };
      document.addEventListener('click', enableAudioOnFirstClick);
    }, 2500);
    return () => clearTimeout(timer);
  }, [enableAudio]);

  return (
    <LenisProvider>
      <div className="bg-background min-h-[100dvh] text-foreground font-sans selection:bg-foreground selection:text-background">
        <AnimatePresence>
          {showSplash && (
            <motion.div 
              key="splash"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center pointer-events-none"
            >
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-light tracking-[0.5em] text-foreground uppercase ml-[0.5em]"
              >
                Evolve
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>

        <Navbar />
        <CartDrawer />
        
        <main>
          <Hero />
          <Marquee />
          <Craftsmanship />
          <GSAPShowcase />
          <FeaturedGrid />
          <CTASection />
        </main>

        <Footer />
      </div>
    </LenisProvider>
  );
}
