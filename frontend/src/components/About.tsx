import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { HiDownload } from 'react-icons/hi';
import ScrollReveal from './ScrollReveal';

/* ── Animated Counter ────────────────────────────────────────────────── */

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
}

function AnimatedCounter({ end, suffix = '', label }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let current = 0;
    const step = end / 50;
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center group">
      <div className="text-3xl md:text-4xl font-bold gradient-text transition-transform duration-300 group-hover:scale-110">
        {count}
        {suffix}
      </div>
      <div className="text-gray-500 text-sm mt-2 font-medium">{label}</div>
    </div>
  );
}

/* ── About Section ───────────────────────────────────────────────────── */

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Avatar / Image */}
          <ScrollReveal direction="left">
            <div className="relative flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden glass glow group">
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-cyan-500/20 flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                    <span className="text-[100px] select-none">👨‍💻</span>
                  </div>
                </div>
                {/* Decorative corners */}
                <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-indigo-500/30 rounded-tr-xl" />
                <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-purple-500/30 rounded-bl-xl" />
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-2 glow-sm">
                  <span className="text-sm font-semibold gradient-text">5+ Years</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Text content */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                A passionate developer creating{' '}
                <span className="gradient-text">digital experiences</span>
              </h3>
              <p className="text-gray-400 leading-relaxed">
                With over 5 years of experience in full-stack development, I specialize in
                building scalable web applications using modern technologies. My expertise
                spans across React, TypeScript, Python, and cloud infrastructure—always
                prioritizing clean, maintainable code.
              </p>
              <p className="text-gray-400 leading-relaxed">
                I'm deeply passionate about AI/ML and love exploring how these technologies
                can be woven into everyday applications. When I'm not coding, you'll find me
                contributing to open-source projects or hiking the Bay Area trails.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  UC Berkeley '19
                </span>
                <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  AWS Certified
                </span>
                <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  3 Certifications
                </span>
              </div>

              <button className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105 mt-2">
                <HiDownload className="text-lg" />
                Download Resume
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Stats counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
          {[
            { end: 5, suffix: '+', label: 'Years Experience' },
            { end: 50, suffix: '+', label: 'Projects Completed' },
            { end: 30, suffix: '+', label: 'Technologies' },
            { end: 15, suffix: '+', label: 'Happy Clients' },
          ].map((stat) => (
            <ScrollReveal key={stat.label}>
              <div className="glass rounded-2xl p-6 hover:border-indigo-500/20 transition-all duration-300">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} label={stat.label} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
