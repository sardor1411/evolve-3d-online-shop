import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { X } from 'lucide-react';
import { useLenis } from '../lib/lenis';

interface ShatterMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShatterMenu({ isOpen, onClose }: ShatterMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [contentVisible, setContentVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const isFirstRender = useRef(true);
  const lenis = useLenis();

  // Grid dimensions
  const rows = 10;
  const cols = 10;
  const totalCells = rows * cols;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [isOpen, lenis]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!isOpen) return;
    }

    if (!gridRef.current) return;
    const cells = gridRef.current.children;

    if (isOpen) {
      setContentVisible(false);
      setIsAnimating(true);
      // Assemble animation
      gsap.fromTo(cells, 
        {
          x: () => gsap.utils.random(-800, 800),
          y: () => gsap.utils.random(-800, 800),
          z: () => gsap.utils.random(-1000, 1000),
          rotationX: () => gsap.utils.random(-360, 360),
          rotationY: () => gsap.utils.random(-360, 360),
          rotationZ: () => gsap.utils.random(-360, 360),
          opacity: 0,
          scale: () => gsap.utils.random(0.2, 2)
        },
        {
          x: 0,
          y: 0,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
          stagger: {
            amount: 0.4,
            from: "random"
          },
          onComplete: () => {
            setContentVisible(true);
            setIsAnimating(false);
          }
        }
      );
    } else {
      // Shatter animation
      setContentVisible(false);
      setIsAnimating(true);
      gsap.to(cells, {
        x: () => gsap.utils.random(-1000, 1000),
        y: () => gsap.utils.random(-1000, 1000),
        z: () => gsap.utils.random(-1000, 500),
        rotationX: () => gsap.utils.random(-720, 720),
        rotationY: () => gsap.utils.random(-720, 720),
        rotationZ: () => gsap.utils.random(-720, 720),
        opacity: 0,
        scale: () => gsap.utils.random(0.1, 0.5),
        duration: 1,
        ease: "power4.inOut",
        stagger: {
          amount: 0.3,
          from: "center"
        },
        onComplete: () => {
          setIsAnimating(false);
        }
      });
    }
  }, [isOpen]);

  // Ensure it's visually hidden if closed and not animating.
  const showContainer = isOpen || contentVisible || isAnimating;

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[100] perspective-[1000px] ${showContainer ? 'pointer-events-auto' : 'pointer-events-none'}`}
      style={{ display: showContainer ? 'block' : 'none' }}
    >
      {/* Grid Container */}
      <div 
        ref={gridRef}
        className="absolute inset-0 grid pointer-events-none"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: totalCells }).map((_, i) => (
          <div 
            key={i} 
            className="w-full h-full bg-[#0a0a0a]"
            style={{ 
              transformStyle: 'preserve-3d',
              border: '1px solid rgba(255,255,255,0.01)' // slight edge for fragments
            }}
          />
        ))}
      </div>

      {/* Menu Content */}
      <AnimatePresence>
        {contentVisible && (
          <motion.div 
            ref={contentRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col p-8 md:p-16 z-10 text-white"
          >
            <div className="flex justify-between items-center w-full mb-16">
              <span className="text-xl font-semibold tracking-widest uppercase">Navigation</span>
              <button 
                onClick={onClose}
                className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer z-50 pointer-events-auto"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 md:gap-8 mt-12 md:mt-0 md:justify-center flex-1">
              {['Home', 'Collection', 'About', 'Contact'].map((item, idx) => (
                <motion.a 
                  key={item}
                  href="#"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                  }}
                  className="text-5xl md:text-7xl font-light hover:italic transition-all duration-300 transform origin-left hover:scale-105 inline-block w-fit pointer-events-auto"
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
