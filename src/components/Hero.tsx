import { motion } from 'framer-motion';
import { useUISounds } from '../lib/SoundContext';
import VideoPlayer from './VideoPlayer';

function AmbientGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 mix-blend-screen">
      <motion.div
        className="absolute left-1/2 bottom-[-10%] w-[900px] h-[900px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,140,90,0.2), transparent 60%), radial-gradient(circle at 70% 70%, rgba(80,180,220,0.15), transparent 60%)",
          filter: "blur(100px)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.65, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default function Hero() {
  const { playPrimaryHover } = useUISounds();

  return (
    <section id="hero-section" className="relative w-full h-[100dvh] overflow-hidden bg-background">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute inset-[-50%] opacity-40"
          style={{
            background: 'conic-gradient(from 180deg at 50% 50%, #000000 0deg, #1a1a2e 90deg, #000000 180deg, #1f1f2e 270deg, #000000 360deg)'
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_70%)]" />
      </div>

      {/* Background Ambient Glow */}
      <AmbientGlow />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full pt-28 md:pt-32 px-4 text-center">
        
        {/* Social Proof Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="liquid-glass rounded-full px-4 py-1.5 mb-8 flex items-center gap-2 border border-foreground/10"
        >
          <span className="text-white text-xs font-semibold tracking-widest uppercase shadow-sm">
            ★ 12,000+ five-star reviews
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-2px] text-white drop-shadow-md"
        >
          Redefine your <span className="font-serif italic font-normal">Style</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-white/90 max-w-md mx-auto mt-6 font-light drop-shadow-sm"
        >
          Premium aesthetics engineered for the modern minimalist.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={playPrimaryHover}
            className="liquid-glass rounded-full px-10 py-4 text-sm font-semibold tracking-widest uppercase text-white transition-colors hover:bg-white/20 border border-white/20 shadow-lg"
          >
            Explore Collection
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
