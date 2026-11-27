import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { EASE } from '../lib/motion';
import { INTRO_HOLD, INTRO_LIFT, markIntroSeen } from '../lib/intro';
import { PalashMark } from './ui/Palash';

/**
 * A short curtain on the first visit: the palash mark blooms over the name,
 * then the curtain lifts and the hero rises in behind it.
 */
export default function Intro({ onDone }) {
  const [lifting, setLifting] = useState(false);

  useEffect(() => {
    markIntroSeen();
    const lift = setTimeout(() => setLifting(true), INTRO_HOLD * 1000);
    return () => clearTimeout(lift);
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[300] flex flex-col bg-deep"
      initial={{ y: '0%' }}
      animate={{ y: lifting ? '-100%' : '0%' }}
      transition={{ duration: INTRO_LIFT, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => lifting && onDone()}
    >
      <div className="container-site flex flex-1 flex-col items-center justify-center">
        <PalashMark bloom delay={0.1} className="h-16 w-16 text-flame sm:h-20 sm:w-20" />
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          className="display mt-6 text-2xl tracking-normal"
        >
          {profile.name}
        </motion.p>
      </div>
      <div className="container-site pb-8">
        <span className="label">Software engineer · Dhaka</span>
      </div>
    </motion.div>
  );
}
