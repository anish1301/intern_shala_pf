import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ── Aurora Scroll-Progress Bar ──────────────────────────────────────
   A glowing, color-shifting aurora strip at the very top of the
   viewport that fills as the user scrolls down.                      */

export default function ScrollProgressAurora() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  // Only show after user starts scrolling
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      setVisible(v > 0.01);
    });
    return unsub;
  }, [scrollYProgress]);

  // Map scroll (0→1) to a hue rotation for an aurora feel
  const hue = useTransform(scrollYProgress, [0, 1], [220, 360]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9998] h-[3px] origin-left"
      style={{
        scaleX: scrollYProgress,
        opacity: visible ? 1 : 0,
        background: `linear-gradient(90deg,
          hsl(${hue.get()}, 80%, 60%),
          hsl(${(hue.get() + 40) % 360}, 80%, 55%),
          hsl(${(hue.get() + 80) % 360}, 80%, 60%))`,
        boxShadow: `0 0 14px 2px hsla(${hue.get()}, 90%, 55%, 0.45),
                    0 0 40px 4px hsla(${(hue.get() + 60) % 360}, 90%, 55%, 0.2)`,
        transition: 'opacity 0.3s',
      }}
    >
      {/* Bright leading edge dot */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
        style={{
          background: `hsl(${(hue.get() + 80) % 360}, 90%, 70%)`,
          boxShadow: `0 0 8px 3px hsla(${(hue.get() + 80) % 360}, 90%, 60%, 0.6)`,
        }}
      />
    </motion.div>
  );
}
