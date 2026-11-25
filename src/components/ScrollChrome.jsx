import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { LuArrowUp } from 'react-icons/lu';

/** Thin reading-progress bar at the very top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      className="bg-gradient-accent fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

/** Floating "back to top" button that appears after scrolling down. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="glass fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full text-fg shadow-xl transition-colors hover:border-accent/50 sm:bottom-8 sm:right-8"
          aria-label="Back to top"
        >
          <LuArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
