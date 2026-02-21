import ScrollReveal from './ScrollReveal';

/* ── Data ────────────────────────────────────────────────────────────── */

const experiences = [
  {
    title: 'Senior Full Stack Developer',
    company: 'TechVision Inc.',
    period: '2023 — Present',
    description:
      'Leading development of AI-powered SaaS products. Architecting microservices using Python and React, serving 50K+ users.',
    highlights: [
      'Led team of 5 developers',
      'Reduced load times by 40%',
      'CI/CD pipeline design',
      '1M+ events/day pipeline',
    ],
  },
  {
    title: 'Full Stack Developer',
    company: 'DataFlow Solutions',
    period: '2021 — 2022',
    description:
      'Built scalable web applications and RESTful APIs for enterprise clients with a focus on real-time analytics.',
    highlights: [
      '10+ client projects',
      'Real-time dashboard',
      'ML model integration',
      '90%+ test coverage',
    ],
  },
  {
    title: 'Frontend Developer',
    company: 'Creative Digital Agency',
    period: '2020 — 2021',
    description:
      'Created responsive, pixel-perfect web interfaces and reusable component libraries for diverse clients.',
    highlights: [
      '20+ landing pages',
      'UX metrics +35%',
      '95+ Lighthouse score',
      'Component library',
    ],
  },
  {
    title: 'Junior Developer',
    company: 'StartUp Hub',
    period: '2019 — 2020',
    description:
      'Kicked off my professional career by building full-stack features and migrating legacy systems to modern stacks.',
    highlights: [
      'Full stack features',
      'Agile workflow',
      'Legacy migration',
      'Automated testing',
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
