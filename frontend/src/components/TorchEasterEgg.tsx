import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HIDDEN_LINES = [
  '// You found the secret room...',
  'const developer = "Anish Kumar";',
  'const passion = Infinity;',
  'while (true) { code(); sleep(少し); }',
  '',
  '> "First, solve the problem.',
  '>  Then, write the code." — John Johnson',
  '',
  '🔥 Click anywhere to ignite...',
];

export default function TorchEasterEgg() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const [flash, setFlash] = useState(false);
  const [hint, setHint] = useState(true);

  // Fade out the hint after 4 s
  useEffect(() => {
    const t = setTimeout(() => setHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    if (!isInside) setIsInside(true);
  }, [isInside]);

  const handleLeave = useCallback(() => setIsInside(false), []);

  const handleClick = useCallback(() => {
    setFlash(true);

    // After flash animation, scroll to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);

    // Reset flash state
    setTimeout(() => setFlash(false), 1600);
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      className="relative w-full overflow-hidden select-none"
      style={{
        cursor: isInside ? 'none' : 'default',
        height: 340,
        background: '#030014',
      }}
    >
      {/* Torch-reveal mask layer — hides the text behind solid darkness */}
      <div
        className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
        style={{
          background: isInside
            ? `radial-gradient(circle 120px at ${mouse.x}px ${mouse.y}px, transparent 0%, rgba(3,0,20,0.55) 40%, #030014 70%)`
            : '#030014',
        }}
      />

      {/* Torch glow (warm colored ring under cursor) */}
      {isInside && (
        <div
          className="absolute z-20 pointer-events-none rounded-full"
          style={{
            left: mouse.x - 80,
            top: mouse.y - 80,
            width: 160,
            height: 160,
            background:
              'radial-gradient(circle, rgba(251,191,36,0.12) 0%, rgba(251,146,60,0.06) 40%, transparent 70%)',
            filter: 'blur(6px)',
          }}
        />
      )}

      {/* Custom torch cursor dot */}
      {isInside && (
        <div
          className="absolute z-30 pointer-events-none rounded-full"
          style={{
            left: mouse.x - 5,
            top: mouse.y - 5,
            width: 10,
            height: 10,
            background: 'rgba(251,191,36,0.9)',
            boxShadow:
              '0 0 8px rgba(251,191,36,0.8), 0 0 24px rgba(251,146,60,0.5), 0 0 60px rgba(251,146,60,0.2)',
          }}
        />
      )}

      {/* Hidden code-style text content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 z-0 px-4">
        {HIDDEN_LINES.map((line, i) => (
          <span
            key={i}
            className="font-mono text-sm md:text-base whitespace-pre"
            style={{
              color:
                line.startsWith('//')
                  ? '#6a9955'          // comment green
                  : line.startsWith('>')
                  ? '#ce9178'          // string orange
                  : line.startsWith('🔥')
                  ? '#fbbf24'          // gold
                  : '#d4d4d4',         // plain text
              textShadow: line.startsWith('🔥')
                ? '0 0 10px rgba(251,191,36,0.4)'
                : 'none',
              opacity: line === '' ? 0 : 1,
            }}
          >
            {line}
          </span>
        ))}
      </div>

      {/* Pulsing hint (fades away) */}
      <AnimatePresence>
        {hint && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 3, ease: 'easeInOut' }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-xs text-gray-500 tracking-widest"
          >
            move your cursor here...
          </motion.p>
        )}
      </AnimatePresence>

      {/* Flash explosion on click */}
      <AnimatePresence>
        {flash && (
          <motion.div
            key="flash"
            initial={{
              opacity: 0,
              scale: 0.2,
              borderRadius: '50%',
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.2, 1.5, 3, 4],
              borderRadius: ['50%', '50%', '30%', '0%'],
            }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute z-50 pointer-events-none"
            style={{
              left: mouse.x,
              top: mouse.y,
              width: '100vmax',
              height: '100vmax',
              translateX: '-50%',
              translateY: '-50%',
              background:
                'radial-gradient(circle, rgba(251,191,36,0.9) 0%, rgba(99,102,241,0.6) 40%, rgba(3,0,20,0.9) 80%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Decorative dim border lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-px bg-gradient-to-r from-transparent via-amber-800/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-px bg-gradient-to-r from-transparent via-amber-800/20 to-transparent" />
    </section>
  );
}
