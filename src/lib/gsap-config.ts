import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(ScrollTrigger, Flip, Observer);

// Performance tweaks for "Potato PCs"
// Limits GSAP's processing if the thread is blocked, preventing jank spikes
gsap.ticker.lagSmoothing(1000, 16);

export const mm = gsap.matchMedia();

export default gsap;
