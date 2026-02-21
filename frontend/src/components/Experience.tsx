import ScrollReveal from './ScrollReveal';

/* ── Data ────────────────────────────────────────────────────────────── */

const experiences = [
  {
    title: 'Software Development Intern',
    company: 'NGSpurs',
    period: 'May 2025 — Jul 2025',
    description:
      'Built scalable web apps and real-time systems using Java, React.js, and Node.js for high-traffic production environments.',
    highlights: [
      'REST APIs + WebSocket',
      'Wait times reduced 25%',
      'Metro Kiosk system',
      'MongoDB & MySQL',
    ],
  },
  {
    title: 'Software Engineering Research Intern',
    company: 'Syntheim',
    period: 'May 2024 — Nov 2024',
    description:
      'Optimized 3D model rendering using Python and TensorFlow, improving performance by 25% in agile development cycles.',
    highlights: [
      'Python + TensorFlow',
      'Performance +25%',
      'Distributed teams',
      'Research-driven',
    ],
  },
];

/* ── Component ───────────────────────────────────────────────────────── */

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Work <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              My professional journey and the impact I've made along the way.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mt-4" />
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500 md:-translate-x-px" />

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div
                  className={`relative flex flex-col md:flex-row gap-8 mb-14 ${
                    isLeft ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot on timeline */}
                  <div
                    className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20 -translate-x-[5px] md:-translate-x-1.5 mt-8 z-10"
                  />

                  {/* Card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? 'md:pr-0' : 'md:pl-0'
                    }`}
                  >
                    <div className="glass rounded-2xl p-6 hover:border-indigo-500/20 transition-all duration-500 group hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1">
                      <span className="inline-block text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-2">
                        {exp.period}
                      </span>
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-purple-400 font-medium text-sm">{exp.company}</p>
                      <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.highlights.map((h) => (
                          <span
                            key={h}
                            className="text-[11px] px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300/80 border border-indigo-500/15"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
