import ParticleBackground from './components/ParticleBackground';
import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectionDivider from './components/SectionDivider';
import About from './components/About';
import TechMarquee from './components/TechMarquee';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import TorchEasterEgg from './components/TorchEasterEgg';
import ScrollProgressAurora from './components/ScrollProgressAurora';
import GrainOverlay from './components/GrainOverlay';
import RippleClick from './components/RippleClick';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#030014]">
      {/* Cursor glow follower (desktop only) */}
      <CursorGlow />

      {/* Aurora scroll-progress bar */}
      <ScrollProgressAurora />

      {/* Cinematic film grain */}
      <GrainOverlay />

      {/* Ripple on every click */}
      <RippleClick />

      {/* Ambient gradient orbs */}
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <div className="ambient-orb ambient-orb-3" />

      {/* Interactive particle background */}
      <ParticleBackground />

      {/* Page content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <SectionDivider />
        <About />
        <TechMarquee />
        <Skills />
        <SectionDivider flip />
        <Experience />
        <SectionDivider />
        <Achievements />
        <SectionDivider flip />
        <Projects />
        <TorchEasterEgg />
        <SectionDivider />
        <Contact />
        <Footer />
      </div>

      {/* AI Chat widget */}
      <ChatWidget />
    </div>
  );
}
