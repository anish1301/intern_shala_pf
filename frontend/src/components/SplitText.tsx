import { useRef } from 'react';
import { motion, useInView, Variant } from 'framer-motion';

/* ── SplitText ───────────────────────────────────────────────────────
   Splits text into individual characters and animates each with a
   staggered wave. Supports rich children (e.g. <span>) by also
   accepting a raw `text` prop.                                       */

interface SplitTextProps {
  /** Plain string to split & animate */
  text: string;
  className?: string;
  /** Gradient class for the entire animated span (optional) */
  gradientClass?: string;
  /** Delay before starting (seconds) */
  delay?: number;
}

const charVariants: Record<string, Variant> = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function SplitText({
  text,
  className = '',
  gradientClass = '',
  delay = 0,
}: SplitTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} style={{ perspective: 600 }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          custom={i + delay * 25}
          variants={charVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={`inline-block ${gradientClass} ${char === ' ' ? 'w-[0.3em]' : ''}`}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}
