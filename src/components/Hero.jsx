import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { LuArrowDownRight, LuFileText, LuGithub, LuLinkedin, LuMail } from 'react-icons/lu';
import { profile, services, socials } from '../data/portfolio';
import { useLocalTime } from '../hooks/useLocalTime';
import { EASE } from '../lib/motion';
import { PalashMark } from './ui/Palash';
import { RollText, SplitLetters } from './ui/TextMotion';
import Magnetic from './ui/Magnetic';

const CYCLE = 3.8; // seconds each kind of work stays in the headline
const SOCIAL_ICONS = { GitHub: LuGithub, LinkedIn: LuLinkedin, Email: LuMail };
const pad = (n) => String(n).padStart(2, '0');

const rise = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

/*
 * Steps through the kinds of work on a timer. Hovering or focusing one pins it;
 * the timer stops while the hero is off screen and for reduced motion.
 */
function useRotation(count, { startDelay, enabled }) {
  const [active, setActive] = useState(0);
  const [round, setRound] = useState(0); // bumps on every step, so the progress line restarts
  const [pinned, setPinned] = useState(false);
  const running = enabled && !pinned;

  useEffect(() => {
    if (!running) return;
    const wait = (round === 0 ? startDelay + CYCLE : CYCLE) * 1000;
    const id = setTimeout(() => {
      setActive((a) => (a + 1) % count);
      setRound((r) => r + 1);
    }, wait);
    return () => clearTimeout(id);
  }, [running, round, count, startDelay]);

  const pin = useCallback((i) => {
    setActive(i);
    setPinned(true);
  }, []);
  const release = useCallback(() => {
    setPinned(false);
    setRound((r) => r + 1);
  }, []);

  return { active, round, running, pin, release };
}

/* The words after "I build" roll out letter by letter and the next ones roll in. */
function RollingPhrase({ text }) {
  const letters = {
    hidden: { y: '110%' },
    show: { y: '0%', transition: { duration: 0.6, ease: EASE } },
    exit: { y: '-110%', transition: { duration: 0.4, ease: EASE } },
  };
  return (
    <span className="relative -mb-[0.24em] inline-grid overflow-hidden pb-[0.24em] align-bottom">
      <AnimatePresence initial={false}>
        <motion.span
          key={text}
          className="display whitespace-nowrap text-[1.12em] [grid-area:1/1]"
          initial="hidden"
          animate="show"
          exit="exit"
          variants={{
            show: { transition: { staggerChildren: 0.018 } },
            exit: { transition: { staggerChildren: 0.01 } },
          }}
        >
          {[...text].map((ch, i) => (
            <motion.span key={i} variants={letters} className="inline-block whitespace-pre">
              {ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
      {/* A hand-drawn stroke under the words, drawn again for every new phrase */}
      <svg
        key={text}
        viewBox="0 0 300 12"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-0 left-0 h-[0.26em] w-full overflow-visible text-gold"
        aria-hidden="true"
      >
        <motion.path
          d="M3 8C58 3 118 10 176 6.5S262 3.5 297 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
        />
      </svg>
    </span>
  );
}

/* A round label that turns as the page scrolls, and rests when the reader does. */
function Badge({ rotate, delay }) {
  const text = 'Software engineer · ERP and SaaS · Dhaka · ';
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className="pointer-events-none absolute -left-2 bottom-8 h-24 w-24 sm:h-28 sm:w-28 lg:-left-10 lg:bottom-10 lg:h-24 lg:w-24 xl:h-28 xl:w-28"
      aria-hidden="true"
    >
      <motion.div style={{ rotate }} className="h-full w-full">
        <svg viewBox="0 0 120 120" className="h-full w-full">
          <defs>
            <path id="badge-circle" d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0" />
          </defs>
          <circle cx="60" cy="60" r="60" className="fill-gold" />
          <text className="fill-gold-fg font-mono" fontSize="11" textLength="282" lengthAdjust="spacing">
            <textPath href="#badge-circle">{text}</textPath>
          </text>
        </svg>
      </motion.div>
      <PalashMark className="absolute inset-0 m-auto h-[30%] w-[30%] text-gold-fg" />
    </motion.div>
  );
}

const OUTLINE_GAP = 12; // between the photo and the outline around it

/* Tracks an element’s size, so drawings can be fitted to it. */
function useSize(ref) {
  const [size, setSize] = useState(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      const h = Math.round(entry.contentRect.height);
      setSize((s) => (s?.w === w && s?.h === h ? s : { w, h }));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return size;
}

/*
 * The portrait in an arch, with an outline that draws itself around it. On desktop it fills the
 * height beside the name, so its proportions change with the screen; the round top and the
 * outline are drawn from its measured size, so they stay concentric at any proportion.
 */
function Portrait({ delay, photoY, badgeRotate }) {
  const ref = useRef(null);
  const size = useSize(ref);
  const r = size ? size.w / 2 : 0;
  const w = size ? size.w + OUTLINE_GAP * 2 : 0;
  const h = size ? size.h + OUTLINE_GAP : 0; // the outline stops level with the foot of the photo
  const R = w / 2;

  return (
    <figure
      ref={ref}
      className="relative order-last mx-auto w-[min(100%,22rem)] lg:order-none lg:col-start-2 lg:row-start-2 lg:mx-0 lg:mt-3 lg:w-full"
    >
      {size && (
        <svg
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          className="pointer-events-none absolute -left-3 -top-3 overflow-visible text-fg/25"
          aria-hidden="true"
        >
          <motion.path
            d={`M0.6 ${h}V${R}A${R - 0.6} ${R - 0.6} 0 0 1 ${w - 0.6} ${R}V${h}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: delay + 0.7, ease: EASE }}
          />
        </svg>
      )}
      <motion.div
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 1.3, delay: delay + 0.25, ease: EASE }}
        style={{ borderRadius: size ? `${r}px ${r}px 16px 16px` : '999px 999px 16px 16px' }}
        className="relative aspect-[4/5] overflow-hidden bg-surface-2 lg:absolute lg:inset-0 lg:aspect-auto"
      >
        <motion.img
          src={profile.image}
          alt={`Portrait of ${profile.name}`}
          width="640"
          height="800"
          fetchPriority="high"
          initial={{ scale: 1.3 }}
          animate={{ scale: 1.14 }}
          transition={{ duration: 1.8, delay: delay + 0.25, ease: EASE }}
          style={{ y: photoY }}
          className="h-full w-full object-cover object-[50%_30%]"
        />
      </motion.div>
      <Badge rotate={badgeRotate} delay={delay + 1} />
    </figure>
  );
}

export default function Hero({ onOpenResume, delay = 0 }) {
  const ref = useRef(null);
  const time = useLocalTime(profile.timezone);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.2 });
  const { active, round, running, pin, release } = useRotation(services.length, {
    startDelay: delay + 0.8,
    enabled: inView && !reduce,
  });

  // As the hero scrolls away, the two name lines drift apart, the photo sinks and the badge turns.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const firstX = useTransform(scrollYProgress, [0, 1], ['0%', '-7%']);
  const lastX = useTransform(scrollYProgress, [0, 1], ['0%', '9%']);
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const badgeRotate = useTransform(scrollYProgress, [0, 1], [0, 220]);

  return (
    <section ref={ref} id="home" className="relative flex min-h-[100svh] flex-col pt-[72px]">
      <div className="container-site flex flex-1 flex-col pb-8 pt-6 lg:pb-10 lg:pt-[clamp(1rem,3.5svh,2rem)]">
        {/* Meta line */}
        <motion.div {...rise(delay + 0.1)} className="label flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
          <span>
            {profile.currentTitle} · {profile.company}
          </span>
          <span className="hidden tabular-nums md:inline">Dhaka · {time} · GMT+6</span>
          {profile.available && (
            <span className="flex items-center gap-2 text-fg">
              <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
              Open to new roles
            </span>
          )}
        </motion.div>

        {/*
          Desktop: the name on one line with the statement and actions under it, the portrait beside
          them, and what I do along the bottom. The name is sized to the width of its column, so it
          always reaches the portrait, and the portrait takes the height of the name and statement,
          so its top lines up with the name and its foot with the buttons.
          Phones: the name stacks and the portrait moves to the end, after the words and buttons.
        */}
        <div className="mt-10 grid flex-1 grid-cols-1 gap-y-10 lg:mt-0 lg:grid-cols-[minmax(0,1fr)_26%] lg:grid-rows-[minmax(clamp(1rem,3.5svh,2rem),1fr)_auto_minmax(clamp(1rem,3.5svh,2rem),1fr)_auto] lg:gap-x-12 lg:gap-y-0">
          <div className="flex flex-col justify-end lg:row-start-2 lg:[container-type:inline-size]">
            <h1 className="display text-[clamp(4.5rem,24vw,10rem)] leading-[0.84] tracking-[-0.045em] lg:whitespace-nowrap lg:text-[22.8cqw]">
              <motion.span style={{ x: firstX }} className="block lg:inline-block">
                <SplitLetters text="Polash" delay={delay + 0.15} letterClassName="ember" />
              </motion.span>
              <motion.span style={{ x: lastX }} className="block pl-[0.85em] lg:inline-block lg:pl-[0.22em]">
                <SplitLetters text="Miya" delay={delay + 0.4} letterClassName="ember" />
              </motion.span>
              <span className="sr-only">, software engineer in Dhaka</span>
            </h1>

            {/* Statement and actions */}
            <div className="mt-10 grid gap-8 border-t border-line pt-8 lg:mt-[calc(4cqw+0.75rem)] lg:gap-6 lg:pt-6">
              <motion.p
                {...rise(delay + 0.8)}
                className="text-[1.3rem] leading-[1.3] text-fg sm:text-[2rem] lg:text-[clamp(1.75rem,2.3vw,2.25rem)]"
              >
                <span className="sr-only">
                  I build {services.map((s) => s.phrase).join(', ')} that businesses run on every day
                </span>
                <span aria-hidden="true">
                  I build <br className="sm:hidden" />
                  <RollingPhrase text={services[active].phrase} />
                  <br />
                  <span className="text-muted">that businesses run on every day</span>
                </span>
              </motion.p>

              <motion.div {...rise(delay + 0.9)} className="flex flex-wrap items-center gap-3">
                <Magnetic>
                  <a href="#projects" className="btn-primary group">
                    <RollText>View my work</RollText>
                    <LuArrowDownRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:rotate-[-45deg]"
                      aria-hidden="true"
                    />
                  </a>
                </Magnetic>
                <button type="button" onClick={onOpenResume} className="btn-ghost group">
                  <LuFileText className="h-4 w-4 text-subtle transition-colors group-hover:text-fg" aria-hidden="true" />
                  <RollText>Resume</RollText>
                </button>
                {/* On phones these would wrap into a third row; the menu and footer carry them there */}
                <ul className="hidden items-center gap-1 sm:flex" aria-label="Elsewhere">
                  {socials.map((s) => {
                    const Icon = SOCIAL_ICONS[s.label];
                    return (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target={s.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="icon-btn h-11 w-11"
                          aria-label={s.label}
                          title={s.label}
                        >
                          <Icon className="h-[18px] w-[18px]" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </div>
          </div>

          <Portrait delay={delay} photoY={photoY} badgeRotate={badgeRotate} />

          {/* What I do: in step with the headline, each with a line that fills while it is shown */}
          <motion.div {...rise(delay + 1)} className="lg:col-span-2 lg:row-start-4">
            <h2 className="label mb-4">What I do</h2>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-6 lg:grid-cols-4 lg:gap-x-8" onMouseLeave={release}>
              {services.map((s, i) => {
                const isActive = active === i;
                return (
                  <li key={s.key}>
                    <button
                      type="button"
                      onMouseEnter={() => pin(i)}
                      onFocus={() => pin(i)}
                      onBlur={release}
                      onClick={() => pin(i)}
                      aria-pressed={isActive}
                      className="group relative block w-full pt-4 text-left"
                    >
                      <span className="absolute inset-x-0 top-0 h-px bg-line" aria-hidden="true" />
                      {isActive && (
                        <motion.span
                          key={`${round}-${running}`}
                          className="absolute inset-x-0 -top-px h-[2px] origin-left rounded-full bg-accent"
                          initial={{ scaleX: running ? 0 : 1 }}
                          animate={{ scaleX: 1 }}
                          transition={
                            running ? { duration: CYCLE, delay: round === 0 ? delay + 0.8 : 0, ease: 'linear' } : { duration: 0 }
                          }
                          aria-hidden="true"
                        />
                      )}
                      <span className={`label transition-colors duration-300 ${isActive ? 'text-accent' : ''}`}>{pad(i + 1)}</span>
                      <span
                        className={`display mt-2 block text-[1.25rem] leading-tight tracking-normal transition-colors duration-300 sm:text-[1.5rem] ${
                          isActive ? 'text-fg' : 'text-subtle group-hover:text-fg'
                        }`}
                      >
                        {s.title}
                      </span>
                      <span
                        className={`mt-1.5 hidden text-sm leading-snug transition-colors duration-300 sm:block lg:[@media(max-height:820px)]:hidden ${
                          isActive ? 'text-muted' : 'text-subtle'
                        }`}
                      >
                        {s.short}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
