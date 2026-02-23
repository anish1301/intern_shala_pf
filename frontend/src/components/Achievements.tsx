import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import {
  HiGlobeAlt,
  HiStar,
  HiAcademicCap,
  HiCode,
  HiLightningBolt,
  HiSparkles,
} from 'react-icons/hi';

/* ── Data ────────────────────────────────────────────────────────────── */

const achievements = [
  {
    icon: <HiSparkles />,
    title: 'ICPC Taiwan 2024',
    subtitle: 'Global Rank 99 · India Rank 3',
    color: 'from-amber-400 to-orange-500',
    glow: 'shadow-amber-500/20',
    bg: 'bg-amber-500/10',
    badge: '🥇',
  },
  {
    icon: <HiGlobeAlt />,
    title: 'ICPC Regionalist 2025',
    subtitle: 'Amritapuri Regional Qualifier',
    color: 'from-indigo-400 to-blue-500',
    glow: 'shadow-indigo-500/20',
    bg: 'bg-indigo-500/10',
    badge: '🌏',
  },
  {
    icon: <HiStar />,
    title: 'Codeforces Specialist',
    subtitle: 'Peak Rating 1500+',
    color: 'from-cyan-400 to-teal-500',
    glow: 'shadow-cyan-500/20',
    bg: 'bg-cyan-500/10',
    badge: '⭐',
  },
  {
    icon: <HiCode />,
    title: 'CodeChef 4-Star',
    subtitle: 'National Level Competitor',
    color: 'from-purple-400 to-pink-500',
    glow: 'shadow-purple-500/20',
    bg: 'bg-purple-500/10',
    badge: '🏅',
  },
  {
    icon: <HiAcademicCap />,
    title: 'Coding Club Lead',
    subtitle: 'IIIT Manipur',
    color: 'from-emerald-400 to-green-500',
    glow: 'shadow-emerald-500/20',
    bg: 'bg-emerald-500/10',
    badge: '🎓',
  },
  {
    icon: <HiLightningBolt />,
    title: '500+ DSA Problems',
    subtitle: 'LeetCode / Codeforces / CodeChef',
    color: 'from-rose-400 to-red-500',
    glow: 'shadow-rose-500/20',
    bg: 'bg-rose-500/10',
    badge: '⚡',
  },
];

/* ── Achievement Card ────────────────────────────────────────────────── */

function AchievementCard({
  item,
  index,
}: {
  item: (typeof achievements)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.9 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ y: -8, scale: 1.03 }}
      className={`relative glass rounded-2xl p-6 group cursor-default overflow-hidden
        hover:shadow-xl ${item.glow} transition-shadow duration-500`}
    >
      {/* Animated gradient border overlay */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-[0.06]`}
        />
        <div
          className={`absolute inset-[1px] rounded-2xl bg-[#030014]`}
          style={{ background: 'rgba(3,0,20,0.95)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-start gap-4">
        {/* Icon */}
        <div
          className={`shrink-0 w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center
            text-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
        >
          <span
            className={`bg-gradient-to-br ${item.color} bg-clip-text text-transparent`}
          >
            {item.icon}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold text-sm leading-tight mb-1 group-hover:text-indigo-200 transition-colors">
            {item.title}
          </h4>
          <p className="text-gray-500 text-xs leading-relaxed">{item.subtitle}</p>
        </div>

        {/* Badge */}
        <span className="text-2xl select-none transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12">
          {item.badge}
        </span>
      </div>

      {/* Shimmer line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, var(--tw-gradient-from, #6366f1), transparent)`,
        }}
        initial={{ width: '0%', left: '50%' }}
        whileInView={{ width: '80%', left: '10%' }}
        transition={{ duration: 1.2, delay: index * 0.1 + 0.3 }}
        viewport={{ once: true }}
      />
    </motion.div>
  );
}

/* ── Achievements Section ────────────────────────────────────────────── */

export default function Achievements() {
  return (
    <section id="achievements" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Achievements & <span className="gradient-text">Awards</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Milestones from my competitive programming journey and beyond.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mt-4" />
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((item, i) => (
            <AchievementCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
