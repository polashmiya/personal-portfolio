import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

// Critically damped: the ring trails the pointer slightly and settles without wobbling.
const FOLLOW = { stiffness: 420, damping: 38, mass: 0.5 };
const INTERACTIVE = 'a, button, [role="button"], summary, label[for]';
const TEXT_ENTRY = 'input, textarea, select, [contenteditable="true"]';

// The ring is drawn once at its largest size (88px) and scaled, so only transform animates.
// The stroke doesn't scale, so it stays 1.5px at every size.
const SIZE = 88;
const MODES = {
  idle: { scale: 32 / SIZE, ring: 'fill-transparent stroke-fg/40' },
  hover: { scale: 56 / SIZE, ring: 'fill-accent/10 stroke-accent' },
  label: { scale: 1, ring: 'fill-accent stroke-accent' },
  text: { scale: 32 / SIZE, ring: 'fill-transparent stroke-transparent' },
};

/**
 * A ring that follows the pointer (the system cursor stays visible). It grows over links and
 * buttons, and over anything with `data-cursor="Label"` it fills with the accent and shows the
 * label. Only on devices with a mouse, and never with reduced motion.
 */
export default function Cursor() {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduce = useReducedMotion();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, FOLLOW);
  const sy = useSpring(y, FOLLOW);
  const [mode, setMode] = useState('idle');
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);
  const enabled = fine && !reduce;

  useEffect(() => {
    if (!enabled) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target instanceof Element ? e.target : null;
      const labelled = target?.closest('[data-cursor]');
      if (labelled) {
        setMode('label');
        setLabel(labelled.getAttribute('data-cursor'));
      } else if (target?.closest(TEXT_ENTRY)) {
        setMode('text');
      } else {
        setMode(target?.closest(INTERACTIVE) ? 'hover' : 'idle');
      }
    };
    const hide = () => setVisible(false);
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[250]" style={{ x: sx, y: sy }}>
      <div
        className={`absolute left-0 top-0 grid h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2 place-items-center transition-opacity duration-300 ${
          visible && mode !== 'text' ? '' : 'opacity-0'
        }`}
      >
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 h-full w-full overflow-visible transition-transform duration-300 ease-out"
          style={{ transform: `scale(${MODES[mode].scale})` }}
        >
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={SIZE / 2 - 0.75}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            className={`transition-[fill,stroke] duration-300 ${MODES[mode].ring}`}
          />
        </svg>
        <span
          className={`relative text-[13px] font-medium text-accent-fg transition-opacity duration-200 ${
            mode === 'label' ? 'opacity-100 delay-100' : 'opacity-0'
          }`}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}
