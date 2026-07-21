import { useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/cart';
import { useUISounds } from '../lib/SoundContext';
import { useResponsiveMotion } from '../hooks/useResponsiveMotion';
import { useLenis } from '../lib/lenis';

export default function CartDrawer() {
  const { isOpen, items, toggleCart, removeItem } = useCartStore();
  const { playTransition } = useUISounds();
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const lenis = useLenis();

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

  
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      playTransition();
      toggleCart();
    }
  };

  const mobileProps = {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
    transition: { type: "spring" as const, damping: 25, stiffness: 200 },
    drag: "y" as const,
    dragConstraints: { top: 0 },
    dragElastic: 0.2,
    onDragEnd: handleDragEnd,
    className: "!fixed left-0 right-0 bottom-0 max-h-[90dvh] h-[90dvh] bg-card border-t border-border/30 z-[70] flex flex-col liquid-glass shadow-2xl rounded-t-3xl"
  };

  const desktopProps = {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    transition: { type: "spring" as const, damping: 25, stiffness: 200 },
    className: "!fixed top-0 right-0 bottom-0 w-[450px] bg-card border-l border-border/30 z-[70] flex flex-col liquid-glass shadow-2xl"
  };

  const motionProps = isMobile ? mobileProps : desktopProps;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { playTransition(); toggleCart(); }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60]"
          />
          
          {/* Drawer / Bottom Sheet */}
          <motion.div {...motionProps}>
            {/* Drag Handle (Mobile only) */}
            {isMobile && (
              <div className="w-full flex justify-center pt-4 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-white/20" />
              </div>
            )}
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/30">
              <h2 className="text-xl font-semibold tracking-wide uppercase">Your Bag</h2>
              <button 
                onClick={() => { playTransition(); toggleCart(); }}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6" data-lenis-prevent="true">
              {items.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  Your bag is empty.
                </div>
              ) : (
                <AnimatePresence>
                  {items.map(item => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex gap-4"
                    >
                      <div className="w-24 h-32 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-between flex-1 py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-foreground">{item.name}</h3>
                            <button 
                              onClick={() => { removeItem(item.id); }}
                              className="text-muted-foreground hover:text-foreground transition-colors p-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                           <div className="flex items-center gap-3 liquid-glass rounded-full px-3 py-1">
                              {/* Quantity controls could go here. For now just show quantity */}
                              <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                           </div>
                           <span className="font-mono font-medium">${item.price * item.quantity}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border/30 bg-background/50 backdrop-blur-md">
              <div className="flex justify-between items-center mb-6">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-xl font-mono font-medium">${subtotal}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-6">Shipping and taxes calculated at checkout.</p>
              <button 
                disabled={items.length === 0}
                className="w-full bg-foreground text-background py-4 rounded-full font-semibold tracking-wide uppercase hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:pointer-events-none"
              >
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
