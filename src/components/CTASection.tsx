import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Hls from 'hls.js';
import { useUISounds } from '../lib/SoundContext';

export default function CTASection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { playPrimaryHover } = useUISounds();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const src = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls({
        capLevelToPlayerSize: true,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {}); // catch autoplay restrictions
      });
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari native fallback
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }
  }, []);

  return (
    <section className="relative w-full py-32 md:py-44 overflow-hidden border-t border-border/30">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-background/60 z-[1]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-12 h-12 border-2 border-foreground/60 rounded-full flex items-center justify-center mb-8"
        >
          <div className="w-4 h-4 border border-foreground/60 rounded-full" />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-medium tracking-tight mb-4"
        >
          Make your <span className="font-serif italic font-normal">decision</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg mb-10 max-w-md"
        >
          Join 50,000+ customers who upgraded their lifestyle.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={playPrimaryHover}
            className="bg-foreground text-background rounded-full px-10 py-4 font-semibold tracking-wide transition-transform"
          >
            Shop the Catalog
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="liquid-glass rounded-full px-10 py-4 font-semibold tracking-wide hover:bg-white/10 transition-colors"
          >
            View Lookbook
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
