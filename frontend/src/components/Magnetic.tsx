import { useRef, useState, ReactNode, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

/* ── Magnetic wrapper ────────────────────────────────────────────────
   Wraps any element so it magnetically pulls toward the cursor
   when hovering within a configurable radius.                        */

interface MagneticProps {
  children: ReactNode;
  /** Pixels the element can shift (default 8) */
  strength?: number;
  className?: string;
}

export default function Magnetic({ children, strength = 8, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useSpring(0, { stiffness: 250, damping: 20 });
  const y = useSpring(0, { stiffness: 250, damping: 20 });

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * (strength / (rect.width / 2)));
      y.set((e.clientY - cy) * (strength / (rect.height / 2)));
    },
    [strength, x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
    setHovered(false);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        handleMove(e);
        if (!hovered) setHovered(true);
      }}
      onMouseLeave={reset}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
