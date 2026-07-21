import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useResponsiveMotion } from '../hooks/useResponsiveMotion';

export default function Craftsmanship() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useResponsiveMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"] 
  });

  const text = "We don't just design products. We engineer experiences. Every stitch, every material, chosen with absolute purpose.";
  const words = text.split(" ");

  return (
    <section ref={containerRef} className="w-full py-32 md:py-44 px-8 md:px-28 bg-background relative flex flex-col md:flex-row gap-16">
      
      {/* Left Text (Sticky on Desktop and Mobile) */}
      <div className="w-full md:w-1/2 relative h-[150vh] md:h-[250vh]">
        <div className="sticky top-[25vh] md:top-32">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + (1 / words.length);
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
              
              return (
                <motion.span key={i} style={{ opacity }} className="mr-3 inline-block">
                  {word}
                </motion.span>
              );
            })}
          </h2>
        </div>
      </div>

      {/* Right Images (Hidden on Mobile, Scrolling on Desktop) */}
      <div className="hidden md:flex w-full md:w-1/2 flex-col gap-0 pb-0 items-center mt-0">
        {[
          "https://images.unsplash.com/photo-1550639525-c97d455acf70?w=800&q=80",
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80"
        ].map((src, i) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const y = useTransform(scrollYProgress, [0, 1], [0, -50 * (i + 1)]);
          return (
            <motion.div 
              key={i} 
              style={isMobile ? {} : { y }}
              className="min-w-[85vw] md:min-w-0 w-full max-w-md aspect-[3/4] md:aspect-square snap-center rounded-xl md:rounded-2xl overflow-hidden md:mb-32 md:last:mb-0 shrink-0"
            >
              <img src={src} alt="Craftsmanship detail" className="w-full h-full object-cover gpu-hover" loading="lazy" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
