import { motion } from 'framer-motion';

export default function Marquee() {
  const text = "FREE WORLDWIDE SHIPPING • SECURE CHECKOUT • PREMIUM QUALITY • 30-DAY RETURNS • ";
  const repeatCount = 4;

  return (
    <div className="w-full overflow-hidden border-y border-border/30 py-6 bg-background flex">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        }}
      >
        {Array.from({ length: repeatCount }).map((_, i) => (
          <span key={i} className="text-muted-foreground text-sm tracking-widest uppercase px-4 font-medium">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
