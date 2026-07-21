import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useCartStore } from '../store/cart';
import { Product } from '../data/mockProducts';
import { useUISounds } from '../lib/SoundContext';

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export default function AddToCartModal({ isOpen, onClose, product }: AddToCartModalProps) {
  const [size, setSize] = useState('M');
  const [color, setColor] = useState('Black');
  const { addItem } = useCartStore();
  const { playCartAdd, playPrimaryHover } = useUISounds();

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = ['Black', 'White', 'Graphite'];

  const handleAdd = () => {
    playCartAdd();
    // Generate a unique ID based on size and color so they stack separately in cart
    const cartItem = {
      ...product,
      id: `${product.id}-${size}-${color}`,
      name: `${product.name} (${size}, ${color})`
    };
    addItem(cartItem);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-card border border-border/30 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-2xl font-medium mb-1 text-foreground">{product.name}</h3>
            <p className="text-muted-foreground mb-6">${product.price}</p>

            <div className="space-y-4 mb-8">
              <div>
                <label className="text-sm text-muted-foreground uppercase tracking-wider mb-2 block">Size</label>
                <div className="flex gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => { playPrimaryHover(); setSize(s); }}
                      className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                        size === s 
                          ? 'border-foreground bg-foreground text-background' 
                          : 'border-border/50 text-muted-foreground hover:border-foreground/50 text-foreground'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground uppercase tracking-wider mb-2 block">Color</label>
                <div className="flex gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => { playPrimaryHover(); setColor(c); }}
                      className={`px-4 h-10 rounded-full border flex items-center justify-center transition-colors text-sm ${
                        color === c 
                          ? 'border-foreground bg-foreground text-background' 
                          : 'border-border/50 text-muted-foreground hover:border-foreground/50 text-foreground'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAdd}
              className="w-full py-4 bg-foreground text-background rounded-full font-medium tracking-wide"
            >
              Confirm Add to Cart
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
