import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, User, Menu } from 'lucide-react';
import { useCartStore } from '../store/cart';
import { useUISounds } from '../lib/SoundContext';
import ShatterMenu from './ShatterMenu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const { playTransition } = useUISounds();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-out flex justify-center ${
          scrolled 
            ? 'top-4 px-4' 
            : 'top-0 px-8 md:px-28'
        }`}
      >
        <div className={`flex items-center justify-between w-full transition-all duration-500 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border border-border/30 rounded-full py-3 px-6 md:px-8 max-w-5xl shadow-lg shadow-black/5'
            : 'bg-transparent border-transparent py-6 max-w-none'
        }`}>
          {/* Left: Hamburger & Logo */}
          <div className="flex items-center gap-4 cursor-pointer group">
            <button
              onClick={() => {
                playTransition();
                setMenuOpen(true);
              }}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-foreground/5 transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="relative w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border border-foreground/20 group-hover:border-foreground/50 transition-colors">
              <motion.div 
                className="absolute inset-0 bg-foreground/10"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <div className="w-2.5 h-2.5 bg-foreground rounded-full relative z-10" />
            </div>
            <span className="font-bold text-xl tracking-[0.2em] uppercase hidden sm:block">Aura</span>
          </div>

          {/* Center: Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-[13px] font-medium uppercase tracking-widest">
            {['Shop', 'New Arrivals', 'About', 'Journal'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className="relative text-muted-foreground hover:text-foreground transition-colors group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-1 md:gap-2">
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-foreground/5 text-foreground/70 hover:text-foreground transition-colors">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button className="hidden md:flex w-10 h-10 rounded-full items-center justify-center hover:bg-foreground/5 text-foreground/70 hover:text-foreground transition-colors">
              <User size={18} strokeWidth={1.5} />
            </button>
            <button 
              className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center relative hover:scale-105 transition-transform"
              onClick={() => { playTransition(); toggleCart(); }}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-1 right-1 w-3.5 h-3.5 bg-foreground text-background text-[9px] font-bold flex items-center justify-center rounded-full"
                  >
                    {cartCount}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      <ShatterMenu isOpen={menuOpen} onClose={() => {
        setMenuOpen(false);
        try { playTransition(); } catch (e) {}
      }} />
    </>
  );
}
