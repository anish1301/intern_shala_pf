import { motion } from 'framer-motion';

interface SectionDividerProps {
  flip?: boolean;
}

export default function SectionDivider({ flip = false }: SectionDividerProps) {
  return (
    <div className={`relative w-full h-24 overflow-hidden ${flip ? 'rotate-180' : ''}`}>
      {/* Animated gradient line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full max-w-3xl h-px">
        <motion.div
          className="h-full w-full"
          style={{
            backgroundSize: '200% 100%',
            background:
              'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(139,92,246,0.6), rgba(6,182,212,0.5), transparent)',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '200% 0%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Center diamond ornament */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-2 h-2 bg-indigo-500/60 rotate-45"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating dots on the line */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400/40"
        animate={{ left: ['10%', '90%'] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-purple-400/40"
        animate={{ left: ['85%', '15%'] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />
    </div>
  );
}
