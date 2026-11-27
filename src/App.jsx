import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { BackToTop } from './components/ScrollChrome';
import Intro from './components/Intro';
import Cursor from './components/Cursor';
import { lockScroll, startSmoothScroll, stopSmoothScroll } from './lib/smoothScroll';
import { INTRO_HERO_DELAY, shouldPlayIntro } from './lib/intro';

// The resume (and the PDF library behind it) only loads when someone opens it.
const ResumeModal = lazy(() => import('./components/ResumeModal'));

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [resumeLoaded, setResumeLoaded] = useState(false);
  // Decided once on load, so the hero keeps the same entrance timing for the whole visit
  const [heroDelay] = useState(() => (shouldPlayIntro() ? INTRO_HERO_DELAY : 0));
  const [intro, setIntro] = useState(heroDelay > 0);

  useEffect(() => {
    startSmoothScroll();
    return stopSmoothScroll;
  }, []);

  // Hold the page still while the intro curtain is down
  useEffect(() => {
    lockScroll(intro);
    document.documentElement.style.overflow = intro ? 'hidden' : '';
  }, [intro]);
  const endIntro = useCallback(() => setIntro(false), []);

  const openResume = useCallback(() => {
    setResumeLoaded(true);
    setResumeOpen(true);
  }, []);
  const closeResume = useCallback(() => setResumeOpen(false), []);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      {intro && <Intro onDone={endIntro} />}
      <Navbar onOpenResume={openResume} />

      <main id="main">
        <Hero onOpenResume={openResume} delay={heroDelay} />
        <TechMarquee />
        <About onOpenResume={openResume} />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      <Cursor />

      {resumeLoaded && (
        <Suspense fallback={null}>
          <ResumeModal open={resumeOpen} onClose={closeResume} />
        </Suspense>
      )}
    </MotionConfig>
  );
}
