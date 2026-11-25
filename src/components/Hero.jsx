import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate, useReducedMotion } from 'framer-motion';
import { LuArrowRight, LuDownload, LuBriefcase, LuMapPin, LuArrowDown } from 'react-icons/lu';
import { profile, socials, stats } from '../data/portfolio';
import SocialIcon from './ui/SocialIcon';

/* Types, pauses, deletes and moves to the next phrase. */
function useTypewriter(words, { typeMs = 65, deleteMs = 35, holdMs = 1800 } = {}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(reduce ? words[0] : '');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    if (reduce) {
      const t = setTimeout(() => {
        setIndex((i) => i + 1);
        setText(words[(index + 1) % words.length]);
      }, holdMs + 1000);
      return () => clearTimeout(t);
    }
    let t;
    if (!deleting && text === word) t = setTimeout(() => setDeleting(true), holdMs);
    else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => i + 1);
    } else {
      t = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? deleteMs : typeMs
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, index, words, reduce, typeMs, deleteMs, holdMs]);

  return text;
}

/* Counts up from 0 the first time it scrolls into view. */
function CountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const [n, setN] = useState(match ? 0 : value);

  useEffect(() => {
    if (!inView || !match) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function CodeCard() {
  return (
    <div className="glass w-64 rounded-2xl p-4 font-mono text-[11.5px] leading-relaxed shadow-2xl">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[10px] text-subtle">engineer.ts</span>
      </div>
      <p>
        <span className="text-accent">const</span> <span className="text-fg">polash</span>{' '}
        <span className="text-subtle">=</span> <span className="text-subtle">{'{'}</span>
      </p>
      <p className="pl-4">
        <span className="text-muted">stack</span>
        <span className="text-subtle">: [</span>
        <span className="text-accent-2">'React'</span>
        <span className="text-subtle">, </span>
        <span className="text-accent-2">'.NET'</span>
        <span className="text-subtle">],</span>
      </p>
      <p className="pl-4">
        <span className="text-muted">builds</span>
        <span className="text-subtle">: </span>
        <span className="text-accent-2">'ERP · POS · Apps'</span>
        <span className="text-subtle">,</span>
      </p>
      <p className="pl-4">
        <span className="text-muted">openToWork</span>
        <span className="text-subtle">: </span>
        <span className="text-accent">true</span>
      </p>
      <p className="text-subtle">{'};'}</p>
    </div>
  );
}

export default function Hero({ onOpenResume }) {
  const role = useTypewriter(profile.roles);
  const sectionRef = useRef(null);

  const onMove = (e) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--hx', `${e.clientX - r.left}px`);
    el.style.setProperty('--hy', `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={onMove}
      className="relative overflow-hidden pb-16 pt-28 sm:pt-36 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:pb-12"
    >
      {/* Background layers */}
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="aurora -left-40 -top-40 -z-10 h-[34rem] w-[34rem] bg-accent" aria-hidden="true" />
      <div className="aurora -right-40 top-40 -z-10 h-[28rem] w-[28rem] bg-accent-2" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
        style={{
          background:
            'radial-gradient(600px circle at var(--hx, 50%) var(--hy, 30%), rgb(var(--accent) / 0.07), transparent 45%)',
        }}
        aria-hidden="true"
      />

      <div className="container-site">
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          {/* Copy */}
          <motion.div initial="hidden" animate="show">
            {profile.available && (
              <motion.div variants={fadeUp} custom={0}>
                <a
                  href="#contact"
                  className="glass group inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-4 text-xs font-medium text-muted transition-colors hover:text-fg sm:text-sm"
                >
                  <span className="flex items-center gap-2 rounded-full bg-success/10 px-2.5 py-1 text-success">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                    </span>
                    Available
                  </span>
                  Open to new opportunities
                  <LuArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </motion.div>
            )}

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-7 text-[2.25rem] font-semibold leading-[1.06] tracking-[-0.035em] text-fg min-[400px]:text-[2.5rem] sm:text-6xl lg:text-[4.5rem]"
            >
              <span className="mb-3 block text-lg font-medium tracking-normal text-muted sm:text-xl">
                Hi, I’m {profile.name} <span className="inline-block origin-[70%_70%] animate-[wave_2.4s_ease-in-out_1s_2]">👋</span>
              </span>
              I build software that{' '}
              <span className="whitespace-nowrap pr-1 font-serif font-normal italic tracking-[-0.01em] text-gradient">
                businesses run on.
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="mt-6 font-mono text-sm text-muted sm:text-base">
              <span className="text-accent">~/</span>
              <span className="text-subtle">role $ </span>
              <span className="text-fg">{role}</span>
              <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-blink bg-accent" />
            </motion.p>

            <motion.p variants={fadeUp} custom={3} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {profile.tagline}
            </motion.p>

            <motion.div variants={fadeUp} custom={4} className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn-primary group">
                View my work
                <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <button type="button" onClick={onOpenResume} className="btn-ghost">
                <LuDownload className="h-4 w-4" />
                Resume
              </button>
              <div className="ml-1 flex items-center gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="icon-btn"
                    aria-label={s.label}
                    title={s.label}
                  >
                    <SocialIcon label={s.label} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px]"
          >
            {/* glow + rotating ring */}
            <div className="ring-animated absolute -inset-6 animate-spin-border rounded-[3rem] opacity-40 blur-3xl" aria-hidden="true" />
            <div className="ring-animated absolute -inset-[1.5px] animate-spin-border rounded-[2.1rem]" aria-hidden="true" />

            <div className="relative overflow-hidden rounded-[2rem] bg-surface">
              <img
                src={profile.image}
                alt={`Portrait of ${profile.name}`}
                width="640"
                height="800"
                fetchPriority="high"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* floating chips */}
            <div className="glass absolute -left-4 top-8 flex animate-float items-center gap-3 rounded-2xl py-2 pl-2 pr-4 shadow-xl sm:-left-12">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-accent text-white">
                <LuBriefcase className="h-4 w-4" />
              </span>
              <span className="leading-tight">
                <span className="block text-xs font-semibold text-fg">{profile.currentTitle}</span>
                <span className="block text-[11px] text-muted">@ {profile.company}</span>
              </span>
            </div>
            <div className="glass absolute -right-3 top-1/2 flex animate-float-delayed items-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium text-fg shadow-xl sm:-right-8">
              <LuMapPin className="h-3.5 w-3.5 text-accent-2" />
              {profile.shortLocation}
            </div>
            <div className="absolute -bottom-10 -left-24 hidden animate-float-delayed xl:block">
              <CodeCard />
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass mt-16 grid grid-cols-2 overflow-hidden rounded-3xl md:mt-20 md:grid-cols-4"
        >
          {stats().map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-1 p-5 sm:p-6 ${i % 2 === 1 ? 'border-l border-line/70' : ''} ${
                i >= 2 ? 'border-t border-line/70 md:border-t-0' : ''
              } ${i === 2 ? 'md:border-l' : ''}`}
            >
              <dt className="order-2 text-xs font-medium text-muted sm:text-sm">{s.label}</dt>
              <dd className="order-1 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                <CountUp value={s.value} />
              </dd>
            </div>
          ))}
        </motion.dl>

        <a
          href="#about"
          className="mx-auto mt-10 hidden w-fit items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-subtle transition-colors hover:text-fg lg:flex"
        >
          <LuArrowDown className="h-3.5 w-3.5 animate-bounce" />
          Scroll
        </a>
      </div>
    </section>
  );
}
