import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { LuArrowUp } from 'react-icons/lu';
import { EASE } from '../lib/motion';
import { scrollToTarget } from '../lib/smoothScroll';

/** "Back to top" button with a ring that fills as the page is read. Appears after the hero. */
export function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > 700));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={() => scrollToTarget(0)}
          className="group fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-surface text-muted shadow-[0_8px_24px_rgb(0_0_0/0.12)] transition-colors hover:text-fg sm:bottom-8 sm:right-8"
          aria-label="Back to top"
        >
          <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="24" cy="24" r="23" fill="none" stroke="rgb(var(--line))" strokeWidth="1.5" />
            <motion.circle
              cx="24"
              cy="24"
              r="23"
              fill="none"
              stroke="rgb(var(--accent))"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <LuArrowUp className="h-[18px] w-[18px] transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
