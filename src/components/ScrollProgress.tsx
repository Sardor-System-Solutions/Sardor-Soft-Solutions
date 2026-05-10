import { motion, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [on, setOn] = useState(true);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setOn(false);
  }, []);

  if (!on) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 right-0 left-0 z-[48] h-0.5 origin-left bg-linear-to-r from-primary via-sky-400 to-primary"
      style={{ scaleX: scrollYProgress }}
      aria-hidden
    />
  );
}
