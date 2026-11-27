import { motion } from 'framer-motion';
import { EASE } from '../../lib/motion';

/*
 * The site's signature: the palash flower ("flame of the forest"), the tree the name comes from.
 * A long beak-shaped petal (the one that gives the tree its other name, "parrot tree") and a
 * smaller petal beside it, so it reads as a flower and as a flame. Drawn on a 32 × 32 grid with
 * the flower's base at (16, 29).
 */
const PETALS = [
  // the beak: a crescent that hooks over to the right
  'M9.5 29C4.5 18.5 9.5 5.5 25.5 2.5 17.5 7.5 13 16.5 15 29Z',
  // the small petal curling out beside it
  'M16 29c1-7 5.5-12 13-13.5-5.5 3.5-8 8-8.5 13.5Z',
];

/**
 * Flat one-color mark for the logo, badge, separators and favicon.
 * With `bloom`, the petals open from their base one after the other.
 */
export function PalashMark({ className = '', title, bloom = false, delay = 0 }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      aria-label={title}
    >
      {PETALS.map((d, i) =>
        bloom ? (
          <motion.path
            key={d}
            d={d}
            fill="currentColor"
            initial={{ scale: 0, rotate: -25, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: delay + i * 0.14, ease: EASE }}
            style={{ originX: 0.3, originY: 1 }}
          />
        ) : (
          <path key={d} d={d} fill="currentColor" />
        )
      )}
    </svg>
  );
}
