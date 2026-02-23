import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Ripple Click ────────────────────────────────────────────────────
   Spawns an expanding ring wherever the user clicks on the page.
   Adds a satisfying, interactive feel to the entire site.            */

interface Ripple {
  id: number;
  x: number;
  y: number;
}

let nextId = 0;

export default function RippleClick() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const id = nextId++;
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 1200);
    };

    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  return (
    <div className="fixed inset-0 z-[9996] pointer-events-none">
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute pointer-events-none rounded-full"
            style={{
              left: r.x - 30,
              top: r.y - 30,
              width: 60,
              height: 60,
              border: '1.5px solid rgba(99,102,241,0.35)',
              boxShadow: '0 0 12px rgba(99,102,241,0.15)',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
