import {
  SiReact, SiPython, SiNodedotjs, SiDocker,
  SiGit, SiCplusplus, SiMongodb, SiMysql,
  SiJavascript, SiGooglecloud, SiTensorflow,
  SiTypescript, SiTailwindcss, SiLinux,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const techs = [
  { icon: <FaJava />, name: 'Java', color: '#ED8B00' },
  { icon: <SiCplusplus />, name: 'C++', color: '#00599C' },
  { icon: <SiPython />, name: 'Python', color: '#3776AB' },
  { icon: <SiReact />, name: 'React', color: '#61DAFB' },
  { icon: <SiNodedotjs />, name: 'Node.js', color: '#539E43' },
  { icon: <SiJavascript />, name: 'JavaScript', color: '#F7DF1E' },
  { icon: <SiTypescript />, name: 'TypeScript', color: '#3178C6' },
  { icon: <SiMysql />, name: 'MySQL', color: '#4479A1' },
  { icon: <SiMongodb />, name: 'MongoDB', color: '#47A248' },
  { icon: <SiDocker />, name: 'Docker', color: '#2496ED' },
  { icon: <SiGooglecloud />, name: 'GCP', color: '#4285F4' },
  { icon: <SiGit />, name: 'Git', color: '#F05032' },
  { icon: <SiTensorflow />, name: 'TensorFlow', color: '#FF6F00' },
  { icon: <SiTailwindcss />, name: 'Tailwind', color: '#06B6D4' },
  { icon: <SiLinux />, name: 'Linux', color: '#FCC624' },
];

// Duplicate the array for seamless infinite scroll
const allTechs = [...techs, ...techs];

export default function TechMarquee() {
  return (
    <div className="relative py-10 overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#030014] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#030014] to-transparent pointer-events-none" />

      {/* Scrolling row */}
      <div className="marquee-track flex gap-8 w-max">
        {allTechs.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="flex items-center gap-2.5 px-5 py-2.5 glass rounded-full
              hover:border-indigo-500/30 transition-all duration-300
              group cursor-default select-none shrink-0"
          >
            <span
              className="text-xl transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-lg"
              style={{ color: tech.color }}
            >
              {tech.icon}
            </span>
            <span className="text-gray-400 text-sm font-medium group-hover:text-white transition-colors duration-300">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
