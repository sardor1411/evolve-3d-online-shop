import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';
import { useCartStore } from '../store/cart';
import { useUISounds } from '../lib/SoundContext';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function FeaturedGrid() {
  const { playPrimaryHover, playCartAdd } = useUISounds();
  const addItem = useCartStore(state => state.addItem);

  const featured = mockProducts.slice(0, 3);

  return (
    <section id="new-arrivals" className="w-full pt-24 pb-32 px-8 md:px-28 bg-background">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <motion.h2 
          {...fadeUp(0.1)}
          className="text-4xl md:text-5xl font-medium tracking-tight uppercase"
        >
          NEW <span className="font-serif italic font-normal lowercase">Arrivals</span>
        </motion.h2>
        <motion.button 
          {...fadeUp(0.2)}
          className="liquid-glass rounded-full px-6 py-2.5 mt-6 md:mt-0 text-sm tracking-widest uppercase hover:bg-white/10 transition-colors"
        >
          View All
        </motion.button>
      </div>

      <div className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12 pb-8 -mx-8 px-8 md:mx-0 md:px-0">
        {featured.map((product, i) => (
          <motion.div 
            key={product.id}
            {...fadeUp(0.1 * i)}
            className="group cursor-pointer flex flex-col min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center"
          >
            <div className="relative aspect-[4/5] rounded-xl bg-muted overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover gpu-hover"
                loading="lazy"
              />
              {/* Add to cart overlay button */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:inset-0 md:p-0 md:bg-black/20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end md:items-center justify-center bg-gradient-to-t from-black/60 to-transparent">
                 <motion.button
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.95 }}
                   onMouseEnter={playPrimaryHover}
                   onClick={(e) => {
                     e.preventDefault();
                     e.stopPropagation();
                     playCartAdd();
                     addItem(product);
                     useCartStore.getState().toggleCart();
                   }}
                   className="w-full md:w-12 h-12 md:rounded-full rounded-xl liquid-glass md:bg-white/10 bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors shadow-lg border border-white/20"
                 >
                   <span className="md:hidden font-semibold uppercase tracking-wide text-xs mr-2">Add to Cart</span>
                   <Plus size={20} className="md:w-6 md:h-6" />
                 </motion.button>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-muted-foreground text-sm">{product.category}</p>
              </div>
              <span className="font-mono text-foreground">${product.price}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
