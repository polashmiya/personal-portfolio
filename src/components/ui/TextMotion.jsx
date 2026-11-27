import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { EASE } from '../../lib/motion';

/*
 * Text motion. Each component keeps the real text available to screen readers once,
 * and animates an aria-hidden visual copy split into letters or words.
 */

/**
 * Letters rise out of a mask, one after another.
 * Plays on mount by default (the hero), or the first time it scrolls into view with `onView`.
 */
export function SplitLetters({ text, delay = 0, stagger = 0.045, className = '', letterClassName = '', onView = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -5% 0px' });
  const show = !onView || inView;
  return (
    <span ref={ref} className={`inline-block ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex">
        {[...text].map((ch, i) => (
          // Padding keeps descenders inside the mask; the negative margin gives the space back
          <span key={i} className="-mb-[0.24em] inline-block overflow-hidden pb-[0.24em]">
            <motion.span
              className={`inline-block whitespace-pre ${letterClassName}`}
              initial={{ y: '108%' }}
              animate={show ? { y: '0%' } : undefined}
              transition={{ duration: 1, delay: delay + i * stagger, ease: EASE }}
            >
              {ch}
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  );
}

/** Words rise out of a mask the first time they scroll into view (section titles). */
export function RevealWords({ text, className = '', delay = 0, stagger = 0.06, as: Tag = 'span' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  const words = text.split(' ');
  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
            <motion.span
              className="inline-block"
              initial={{ y: '110%' }}
              animate={inView ? { y: '0%' } : undefined}
              transition={{ duration: 0.9, delay: delay + i * stagger, ease: EASE }}
            >
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

/* One word of a scroll-lit paragraph: its opacity follows the reader's scroll position. */
function LitWord({ children, progress, range, className }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className={className}>
      {children}
    </motion.span>
  );
}

/** Splits "plain *marked words* plain" into words, flagging the ones between asterisks. */
function parseMarked(text) {
  let marked = false;
  return text.split(' ').map((raw) => {
    const opens = raw.startsWith('*');
    if (opens) marked = true;
    const word = { text: raw.replace(/\*/g, ''), marked };
    if (raw.slice(opens ? 1 : 0).includes('*')) marked = false;
    return word;
  });
}

/**
 * A paragraph that lights up word by word as it scrolls through the viewport,
 * so the eye is led through the statement at reading pace.
 * Words between *asterisks* light up in the accent color.
 */
export function ScrollLit({ text, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
  const words = parseMarked(text);
  const plain = text.replace(/\*/g, '');
  const space = (i) => (i < words.length - 1 ? ' ' : '');

  if (reduce)
    return (
      <p ref={ref} className={className}>
        {words.map((w, i) => (
          <span key={i} className={w.marked ? 'text-accent' : undefined}>
            {w.text}
            {space(i)}
          </span>
        ))}
      </p>
    );

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{plain}</span>
      <span aria-hidden="true">
        {words.map((w, i) => {
          const start = i / words.length;
          return (
            <LitWord
              key={i}
              progress={scrollYProgress}
              range={[start, start + 1 / words.length]}
              className={w.marked ? 'text-accent' : undefined}
            >
              {w.text}
              {space(i)}
            </LitWord>
          );
        })}
      </span>
    </p>
  );
}

/** Label whose letters roll up one after another when its `.group` parent is hovered. */
export function RollText({ children, className = '' }) {
  const text = String(children);
  return (
    <span className={`roll ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex">
        {[...text].map((ch, i) => (
          <span key={i} className="roll-char" data-c={ch} style={{ '--i': i }}>
            {ch}
          </span>
        ))}
      </span>
    </span>
  );
}

/** Counts a figure like "50+" up from zero the first time it is seen. */
export function CountUp({ value, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : '';
  const [shown, setShown] = useState(reduce || target === null ? target : 0);

  useEffect(() => {
    if (!inView || reduce || target === null) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, target]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {target === null ? value : shown}
        {suffix && <span className="text-accent">{suffix}</span>}
      </span>
    </span>
  );
}
