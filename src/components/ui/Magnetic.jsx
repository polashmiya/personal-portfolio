import { useRef } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';
import { canHover } from '../../lib/motion';

// Critically damped, so the element follows the pointer and settles without wobbling.
const SPRING = { stiffness: 220, damping: 22, mass: 0.55 };

/**
 * Pulls its child a few pixels toward the pointer while hovered.
 * Only on devices with a mouse, and never with reduced motion.
 */
export default function Magnetic({ children, strength = 0.22, max = 10, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  const onMove = (e) => {
    if (reduce || !canHover() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    x.set(Math.max(-max, Math.min(max, dx)));
    y.set(Math.max(-max, Math.min(max, dy)));
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.span>
  );
}
