import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, [cursorX, cursorY, visible]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Wide ambient glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: springX,
          y: springY,
          width: 600,
          height: 600,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(99,102,241,0.10) 0%, rgba(139,92,246,0.06) 30%, rgba(6,182,212,0.03) 55%, transparent 75%)',
        }}
      />
      {/* Mid-ring glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: springX,
          y: springY,
          width: 250,
          height: 250,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(99,102,241,0.14) 0%, rgba(139,92,246,0.07) 50%, transparent 80%)',
        }}
      />
      {/* Inner bright dot */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: springX,
          y: springY,
          width: 10,
          height: 10,
          translateX: '-50%',
          translateY: '-50%',
          background: 'rgba(99,102,241,0.7)',
          boxShadow:
            '0 0 12px rgba(99,102,241,0.6), 0 0 30px rgba(99,102,241,0.4), 0 0 80px rgba(139,92,246,0.25), 0 0 120px rgba(6,182,212,0.1)',
        }}
      />
    </motion.div>
  );
}
