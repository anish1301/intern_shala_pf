import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiCodeforces, SiCodechef } from 'react-icons/si';

const roles = [
  'Full Stack Developer',
  'Competitive Programmer',
  'ICPC Regionalist',
  'Problem Solver',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text.length < currentRole.length) {
      timeout = setTimeout(() => setText(currentRole.slice(0, text.length + 1)), 80);
    } else if (!isDeleting && text.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 40);
    } else if (isDeleting && text.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.3 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Floating geometric decorations */}
      <FloatingShapes />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.p
          variants={childVariants}
          className="text-indigo-400 text-base md:text-lg mb-4 font-medium tracking-widest uppercase"
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          variants={childVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
        >
          <span className="gradient-text shimmer-text">Anish Kumar</span>
        </motion.h1>

        <motion.div
          variants={childVariants}
          className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 h-10 font-light"
        >
          <span>{text}</span>
          <span className="text-indigo-400 animate-pulse ml-0.5">|</span>
        </motion.div>

        <motion.p
          variants={childVariants}
          className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          ICPC Regionalist | India Rank 3 at ICPC Taiwan 2024.
          I build scalable systems and love solving algorithmic challenges.
        </motion.p>

        <motion.div
          variants={childVariants}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-105"
          >
            <span className="relative z-10">View My Work</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 border border-indigo-500/30 rounded-full text-indigo-400 font-semibold hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all duration-300 hover:scale-105"
          >
            Get In Touch
          </a>
        </motion.div>

        <motion.div
          variants={childVariants}
          className="flex items-center justify-center gap-6 mt-14"
        >
          <a
            href="https://github.com/anish1301"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-all duration-300 hover:scale-125 hover:-translate-y-0.5"
          >
            <FaGithub size={22} />
          </a>
          <a
            href="https://linkedin.com/in/anish-kumar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-all duration-300 hover:scale-125 hover:-translate-y-0.5"
          >
            <FaLinkedin size={22} />
          </a>
          <a
            href="https://codeforces.com/profile/anish1301"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-cyan-400 transition-all duration-300 hover:scale-125 hover:-translate-y-0.5"
          >
            <SiCodeforces size={22} />
          </a>
          <a
            href="https://codechef.com/users/anish1301"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-amber-400 transition-all duration-300 hover:scale-125 hover:-translate-y-0.5"
          >
            <SiCodechef size={22} />
          </a>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
          <span className="text-gray-600 text-sm">Imphal, Manipur, India</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-gray-600 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HiArrowDown className="text-gray-500 text-lg" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ── Floating geometric shapes ───────────────────────────────────────── */

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient circles */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          top: '5%',
          left: '5%',
        }}
        animate={{ x: [0, 80, -30, 0], y: [0, -40, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
          bottom: '5%',
          right: '5%',
        }}
        animate={{ x: [0, -80, 40, 0], y: [0, 60, -40, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />

      {/* Geometric shapes */}
      <motion.div
        className="absolute w-16 h-16 border border-indigo-500/15 rounded-xl"
        style={{ top: '18%', right: '15%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-6 h-6 bg-purple-500/10 rounded-full"
        style={{ top: '65%', left: '8%' }}
        animate={{ y: [-15, 15, -15], x: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-10 h-10 border border-cyan-500/15"
        style={{ bottom: '25%', left: '18%' }}
        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-3 h-3 bg-indigo-400/20 rounded-full"
        style={{ top: '30%', left: '30%' }}
        animate={{ y: [-10, 10, -10], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-20 h-20 border border-purple-500/10 rounded-full"
        style={{ bottom: '15%', right: '25%' }}
        animate={{ scale: [1, 1.15, 1], rotate: 180 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
