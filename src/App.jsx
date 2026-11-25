import { lazy, Suspense, useCallback, useState } from 'react';
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
import { ScrollProgress, BackToTop } from './components/ScrollChrome';

// The resume (and the PDF library behind it) only loads when someone opens it.
const ResumeModal = lazy(() => import('./components/ResumeModal'));

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [resumeLoaded, setResumeLoaded] = useState(false);

  const openResume = useCallback(() => {
    setResumeLoaded(true);
    setResumeOpen(true);
  }, []);
  const closeResume = useCallback(() => setResumeOpen(false), []);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-fg px-4 py-2 text-sm font-semibold text-bg transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Navbar onOpenResume={openResume} />

      <main id="main">
        <Hero onOpenResume={openResume} />
        <TechMarquee />
        <About onOpenResume={openResume} />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <BackToTop />

      {resumeLoaded && (
        <Suspense fallback={null}>
          <ResumeModal open={resumeOpen} onClose={closeResume} />
        </Suspense>
      )}
    </MotionConfig>
  );
}
