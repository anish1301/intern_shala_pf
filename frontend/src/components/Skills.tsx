import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiReact, SiTypescript, SiPython, SiNodedotjs,
  SiPostgresql, SiDocker, SiAmazonwebservices, SiGit,
  SiTailwindcss, SiFastapi, SiMongodb, SiRedis,
} from 'react-icons/si';
import ScrollReveal from './ScrollReveal';

/* ── Data ────────────────────────────────────────────────────────────── */

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  color: string;
}

const skillCategories: { title: string; skills: Skill[] }[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React / Next.js', level: 95, icon: <SiReact />, color: '#61DAFB' },
      { name: 'TypeScript', level: 90, icon: <SiTypescript />, color: '#3178C6' },
      { name: 'Tailwind CSS', level: 92, icon: <SiTailwindcss />, color: '#06B6D4' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Python', level: 93, icon: <SiPython />, color: '#3776AB' },
      { name: 'Node.js', level: 88, icon: <SiNodedotjs />, color: '#539E43' },
      { name: 'FastAPI', level: 85, icon: <SiFastapi />, color: '#009688' },
    ],
  },
  {
    title: 'Database & Cloud',
    skills: [
      { name: 'PostgreSQL', level: 87, icon: <SiPostgresql />, color: '#4169E1' },
      { name: 'MongoDB', level: 82, icon: <SiMongodb />, color: '#47A248' },
      { name: 'Redis', level: 80, icon: <SiRedis />, color: '#DC382D' },
    ],
  },
  {
    title: 'DevOps & Tools',
    skills: [
      { name: 'Docker', level: 85, icon: <SiDocker />, color: '#2496ED' },
      { name: 'AWS', level: 80, icon: <SiAmazonwebservices />, color: '#FF9900' },
      { name: 'Git', level: 92, icon: <SiGit />, color: '#F05032' },
    ],
  },
];

/* ── Skill Bar Component ─────────────────────────────────────────────── */

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-2 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            style={{ color: skill.color }}
            className="text-lg transition-transform duration-300 group-hover:scale-125"
          >
            {skill.icon}
          </span>
          <span className="text-gray-300 font-medium text-sm">{skill.name}</span>
        </div>
        <span className="text-gray-500 text-xs font-mono">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${skill.color}66, ${skill.color})`,
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </div>
  );
}

/* ── Skills Section ──────────────────────────────────────────────────── */

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              My <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Technologies and tools I work with daily to build exceptional products.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mt-4" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIdx) => (
            <ScrollReveal key={category.title} delay={catIdx * 0.1}>
              <div className="glass rounded-2xl p-8 hover:border-indigo-500/20 transition-all duration-500 hover:shadow-lg hover:shadow-indigo-500/5 h-full">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                  {category.title}
                </h3>
                <div className="space-y-5">
                  {category.skills.map((skill, idx) => (
                    <SkillBar key={skill.name} skill={skill} delay={catIdx * 3 + idx} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
