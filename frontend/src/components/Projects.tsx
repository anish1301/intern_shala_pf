import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

/* ── Data ────────────────────────────────────────────────────────────── */

const projects = [
  {
    title: 'IoT Mini-Satellite',
    description:
      'LoRa-based mesh network for internet-independent campus communication and real-time disaster prediction using ML for floods, fires, and air-quality crises.',
    emoji: '🛰️',
    gradient: 'from-violet-500/20 to-indigo-500/20',
    tags: ['LoRa', 'IoT', 'ML', 'Python'],
    github: '#',
    live: '#',
    category: 'fullstack',
  },
  {
    title: 'Restaurant Ordering System',
    description:
      'Full-stack ordering app with JWT authentication, real-time WebSocket updates, and Docker + CI/CD deployment for scalable operations.',
    emoji: '🍕',
    gradient: 'from-pink-500/20 to-rose-500/20',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Docker'],
    github: '#',
    live: '#',
    category: 'fullstack',
  },
  {
    title: 'Lucknow Metro Kiosk',
    description:
      'Interactive kiosk for Lucknow Metro with efficient routing algorithms and Google Maps API integration, built during NGSpurs internship.',
    emoji: '🚇',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    tags: ['Java', 'React.js', 'MySQL', 'Maps API'],
    github: '#',
    live: '#',
    category: 'fullstack',
  },
  {
    title: '3D Model Renderer',
    description:
      'Optimized 3D model rendering pipeline built during Syntheim internship using Python and TensorFlow, achieving 25% performance improvement.',
    emoji: '🎨',
    gradient: 'from-emerald-500/20 to-green-500/20',
    tags: ['Python', 'TensorFlow', 'ML'],
    github: '#',
    live: '#',
    category: 'backend',
  },
];

const categories = ['all', 'fullstack', 'backend'];

/* ── Component ───────────────────────────────────────────────────────── */

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const filtered =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              A showcase of my recent work — from full-stack apps to developer tools.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mt-4" />
          </div>
        </ScrollReveal>

        {/* Filter tabs */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                  filter === cat
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20'
                    : 'glass text-gray-400 hover:text-white hover:border-white/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="glass rounded-2xl overflow-hidden group hover:border-indigo-500/20 transition-all duration-500 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1"
              >
                {/* Card image / emoji */}
                <div
                  className={`h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
                >
                  <span className="text-6xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6 select-none">
                    {project.emoji}
                  </span>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href={project.github}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                      <FaGithub size={18} />
                    </a>
                    <a
                      href={project.live}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                      <FaExternalLinkAlt size={14} />
                    </a>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300/80 border border-indigo-500/15 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
