import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion';
import { marquee } from '../data/portfolio';
import { PalashMark } from './ui/Palash';

const BASE_SPEED = 2.2; // percent of one copy per second

/*
 * A band of the main technologies set in the display serif. It drifts slowly, speeds up with
 * the reader's scroll and turns around when they scroll back up, so it answers the page's motion.
 */
function Track({ reverse = false }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 });
  const boost = useTransform(velocity, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
  const direction = useRef(reverse ? -1 : 1);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < 0) direction.current = reverse ? 1 : -1;
    else if (b > 0) direction.current = reverse ? -1 : 1;
    const move = direction.current * BASE_SPEED * (delta / 1000) * (1 + Math.abs(b));
    baseX.set(baseX.get() - move);
  });

  const items = reverse ? [...marquee].reverse() : marquee;
  const copy = (hidden) =>
    items.map(({ name, icon: Icon }) => (
      <li key={name} aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
        <span className="flex items-center gap-[0.3em]">
          <Icon className="h-[0.62em] w-[0.62em] shrink-0 opacity-70" aria-hidden="true" />
          {name}
        </span>
        <PalashMark className="h-5 w-5 text-flame/80 sm:h-6 sm:w-6" />
      </li>
    ));

  return (
    <div className="overflow-hidden">
      <motion.ul style={{ x }} className="flex w-max whitespace-nowrap">
        {copy(false)}
        {copy(true)}
      </motion.ul>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section aria-labelledby="tech-strip-title" className="border-y border-line py-8 sm:py-10">
      <h2 id="tech-strip-title" className="sr-only">
        Technologies I work with
      </h2>
      <div className="display flex flex-col gap-2 text-[2.25rem] leading-tight sm:text-5xl lg:text-[3.5rem]">
        <Track />
        <div className="text-subtle" aria-hidden="true">
          <Track reverse />
        </div>
      </div>
    </section>
  );
}
