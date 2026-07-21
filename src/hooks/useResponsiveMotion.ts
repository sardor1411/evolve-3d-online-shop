import { useLayoutEffect, useState } from 'react';
import gsap from 'gsap';

export function useResponsiveMotion() {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    
    mm.add(
      {
        isDesktop: "(min-width: 769px)",
        isMobile: "(max-width: 768px)",
      },
      (context) => {
        const { isMobile: mobile } = context.conditions as { isMobile: boolean; isDesktop: boolean };
        setIsMobile(mobile);
        
        // This context is where you'd write your GSAP animations
        // and they will be automatically reverted when the breakpoint changes.
        // Example:
        // if (mobile) { 
        //   gsap.to('.element', { y: 20 }); 
        // } else { 
        //   gsap.to('.element', { rotation: 360 }); 
        // }
      }
    );

    return () => mm.revert();
  }, []);

  return { isMobile };
}
