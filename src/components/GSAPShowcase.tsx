import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useResponsiveMotion } from '../hooks/useResponsiveMotion';
import AddToCartModal from './AddToCartModal';
import { mockProducts } from '../data/mockProducts';

gsap.registerPlugin(ScrollTrigger);

const showcaseItems = [
  {
    id: 'item1',
    product: mockProducts[1], // Sneaker
    title: "Ghost Sneaker",
    subtitle: "Aerospace Grade",
    description: "Ultra-lightweight EVA foam combined with an adaptive fly-knit mesh upper for unparalleled comfort.",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 'item2',
    product: mockProducts[3], // Shirt
    title: "Aero Tee",
    subtitle: "Moisture Wicking",
    description: "Seamless construction and advanced anti-odor treatment to keep you fresh all day.",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 'item3',
    product: mockProducts[4], // Jeans
    title: "Void Denim",
    subtitle: "Japanese Selvedge",
    description: "Relaxed baggy fit crafted from 14oz Japanese selvedge denim with custom gunmetal hardware.",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=2000&auto=format&fit=crop",
  }
];

export default function GSAPShowcase() {
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useResponsiveMotion();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Desktop Animation (Fluid Mask Split-Screen)
  useEffect(() => {
    if (isMobile || !desktopContainerRef.current) return;
    
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: desktopContainerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
        }
      });

      const texts = gsap.utils.toArray('.showcase-text-item');
      const images = gsap.utils.toArray('.showcase-image-item');
      const innerImages = gsap.utils.toArray('.showcase-inner-image');

      if (texts.length === 0 || images.length === 0) return;

      // Initial setup
      gsap.set(texts.slice(1), { yPercent: 100, opacity: 0 });
      gsap.set(texts[0], { yPercent: 0, opacity: 1 });

      gsap.set(images[0], { clipPath: 'inset(0% 0% 0% 0%)' });
      gsap.set(innerImages[0], { scale: 1 });

      gsap.set(images[1], { clipPath: 'circle(0% at 50% 100%)' });
      gsap.set(innerImages[1], { scale: 1.5 });

      gsap.set(images[2], { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(innerImages[2], { scale: 1.5 });

      // Step 1: Transition to Image 2 (Circle expanding from bottom)
      tl.to(texts[0], { yPercent: -100, opacity: 0, duration: 1 }, 0)
        .to(texts[1], { yPercent: 0, opacity: 1, duration: 1 }, 0)
        .to(innerImages[0], { scale: 1.2, duration: 1 }, 0)
        .to(images[1], { clipPath: 'circle(150% at 50% 100%)', duration: 1, ease: "power2.inOut" }, 0)
        .to(innerImages[1], { scale: 1, duration: 1, ease: "power2.out" }, 0);

      // Step 2: Transition to Image 3 (Swipe up)
      tl.to(texts[1], { yPercent: -100, opacity: 0, duration: 1 }, 1)
        .to(texts[2], { yPercent: 0, opacity: 1, duration: 1 }, 1)
        .to(innerImages[1], { scale: 1.2, duration: 1 }, 1)
        .to(images[2], { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: "power2.inOut" }, 1)
        .to(innerImages[2], { scale: 1, duration: 1, ease: "power2.out" }, 1);

    }, desktopContainerRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Mobile Animation (Sticky Snap & Fade)
  useEffect(() => {
    if (!isMobile || !mobileContainerRef.current) return;
    
    let ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.showcase-mobile-item');
      if (items.length === 0) return;

      // Set initial states
      gsap.set(items, { opacity: 0, y: 50 });
      gsap.set(items[0], { opacity: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mobileContainerRef.current,
          start: "top top",
          end: "+=200%", // 2 scroll transitions
          scrub: 1,
          pin: true,
          snap: {
            snapTo: 1 / (items.length - 1),
            duration: { min: 0.2, max: 0.5 },
            ease: "power2.inOut"
          }
        }
      });

      // Loop through items to create the crossfade sequence
      items.forEach((item, i) => {
        if (i === 0) return;
        
        // Item fades in, previous item fades out
        tl.to(items[i - 1], { opacity: 0, y: -50, duration: 1, ease: "power2.inOut" }, (i - 1))
          .to(item, { opacity: 1, y: 0, duration: 1, ease: "power2.inOut" }, (i - 1));
      });
      
    }, mobileContainerRef);

    return () => ctx.revert();
  }, [isMobile]);

  const handleAddToCart = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <section className="bg-background text-foreground relative w-full">
      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:block">
        <div ref={desktopContainerRef} className="w-full h-[100dvh] flex overflow-hidden">
          
          {/* Left Side: Text Drum */}
          <div className="w-[45%] h-full flex items-center justify-center relative bg-background z-10 px-16 xl:px-24 border-r border-border">
            <div className="relative w-full h-[350px] overflow-hidden">
              {showcaseItems.map((item) => (
                <div 
                  key={item.id} 
                  className="showcase-text-item absolute inset-0 flex flex-col justify-center"
                >
                  <div className="overflow-hidden mb-2">
                    <span className="text-sm font-semibold tracking-widest uppercase text-muted-foreground block">
                      {item.subtitle}
                    </span>
                  </div>
                  <h2 className="text-6xl xl:text-7xl font-medium tracking-tighter mb-6 leading-none">
                    {item.title}
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-md mb-10 font-light">
                    {item.description}
                  </p>
                  <div>
                    <button 
                      onClick={() => handleAddToCart(item.product)}
                      className="group relative px-8 py-4 bg-foreground text-background rounded-full overflow-hidden inline-flex items-center"
                    >
                      <span className="relative z-10 font-medium tracking-wide uppercase text-sm">
                        Add to Cart — ${item.product.price}
                      </span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Fluid Mask Images */}
          <div className="w-[55%] h-full relative overflow-hidden bg-background flex items-center justify-center p-12 pt-32 pb-16">
            {/* Constant Mask for all images (Arch / Leaf Shape) */}
            <div 
              className="relative w-full max-w-[340px] aspect-[4/5] overflow-hidden" 
              style={{ borderRadius: '160px 160px 16px 16px', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {showcaseItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="showcase-image-item absolute inset-0 w-full h-full"
                  style={{ zIndex: index }}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="showcase-inner-image w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="block md:hidden">
        <div ref={mobileContainerRef} className="w-full h-[100dvh] overflow-hidden flex items-center justify-center relative">
          {/* Animated Gradient Background underneath items to separate from page bg */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#121215] via-background to-[#0f111a]" />
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none" />

          {showcaseItems.map((item) => (
            <div 
              key={item.id}
              className="showcase-mobile-item absolute inset-0 w-full h-full flex flex-col items-center justify-center px-6 pt-24 pb-8 z-10"
            >
              {/* Image Side */}
              <div className="w-full h-[40vh] flex items-center justify-center mt-4">
                <div 
                  className="relative w-full max-w-[240px] aspect-[4/5] rounded-[80px] overflow-hidden shadow-2xl"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full flex flex-col items-center text-center mt-6">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-white/50 mb-3 block">
                  {item.subtitle}
                </span>
                <h2 className="text-4xl font-medium tracking-tighter mb-3">
                  {item.title}
                </h2>
                <p className="text-sm text-white/70 max-w-sm mb-6 font-light leading-relaxed">
                  {item.description}
                </p>
                <button 
                  onClick={() => handleAddToCart(item.product)}
                  className="group relative px-6 py-3 bg-white text-black rounded-full overflow-hidden inline-flex items-center hover:scale-105 transition-transform duration-300"
                >
                  <span className="relative z-10 font-medium tracking-wide uppercase text-xs">
                    Add to Cart — ${item.product.price}
                  </span>
                  <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <AddToCartModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}


