import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { LuArrowUpRight, LuArrowRight, LuGithub } from 'react-icons/lu';
import { projects, projectFilters, githubStats } from '../data/portfolio';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { EASE } from '../lib/motion';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { RollText } from './ui/TextMotion';
import ProjectCover from './ProjectCover';
import ProjectModal from './ProjectModal';

const categoryLabel = (key) => projectFilters.find((f) => f.key === key)?.label ?? key;
const pad = (n) => String(n).padStart(2, '0');

/* ------------------------------------------------------------------ */
/* Featured: large cards that stick and stack as the page scrolls      */
/* ------------------------------------------------------------------ */

const STACK_TOP = 104; // below the navigation
const STACK_STEP = 28; // each card stops a little lower, so the ones under it show their top edge
const STACK_FOOT = 24; // space kept under a card that is taller than the screen

/*
 * Where a card sticks. A card that fits on the screen stops at its place in the stack. One that
 * is taller than the screen sticks only once its bottom is in view, so all of it can be read
 * (and its buttons reached) before the next card slides over it.
 */
function useStickyTop(ref, index, enabled) {
  const base = STACK_TOP + index * STACK_STEP;
  const [top, setTop] = useState(base);
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    const update = () => setTop(Math.min(base, window.innerHeight - el.offsetHeight - STACK_FOOT));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [ref, base, enabled]);
  return top;
}

function StackCard({ project, index, total, progress, stacked, onOpen }) {
  const ref = useRef(null);
  const top = useStickyTop(ref, index, stacked);
  // Each card shrinks a little once the next one starts to slide over it.
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.04]);

  return (
    <div ref={ref} className="mb-6 lg:sticky lg:mb-[14vh] lg:last:mb-0" style={stacked ? { top } : undefined}>
      <motion.article
        style={stacked ? { scale } : undefined}
        className="card group grid origin-top overflow-hidden lg:min-h-[min(600px,calc(100svh-10rem))] lg:grid-cols-12"
      >
        <div className="flex flex-col p-6 sm:p-10 lg:col-span-5 lg:p-12">
          <p className="label flex items-center gap-3">
            <span className="text-accent">{pad(index + 1)}</span>
            <span>
              {categoryLabel(project.category)} · {project.year}
            </span>
          </p>
          <h3 className="display mt-6 text-[2.5rem] leading-[1.02] sm:text-[3.25rem]">{project.title}</h3>
          <p className="mt-3 text-muted">{project.tagline}</p>
          <p className="mt-6 text-[15px] leading-relaxed text-muted">{project.description}</p>

          {/* They repeat the description in short, so on short screens they are left to the case study */}
          <ul className="mt-6 space-y-2.5 lg:[@media(max-height:879px)]:hidden">
            {project.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed text-fg/90">
                <span className="mt-[0.6em] h-[2px] w-2.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.tech.slice(0, 6).map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-10">
            <button type="button" onClick={() => onOpen(project)} className="btn-primary btn-sm group/cta">
              <RollText>Case study</RollText>
              <LuArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" aria-hidden="true" />
            </button>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm group/live">
                <RollText>Live demo</RollText>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn hidden sm:inline-flex"
                aria-label={`${project.title} source code on GitHub`}
                title="Source code"
              >
                <LuGithub className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpen(project)}
          className="relative order-first block aspect-[16/10] w-full overflow-hidden text-left lg:order-none lg:col-span-7 lg:aspect-auto"
          aria-label={`Open details for ${project.title}`}
          data-cursor="View"
        >
          <ProjectCover project={project} className="h-full w-full" />
        </button>
      </motion.article>
    </div>
  );
}

function FeaturedStack({ items, onOpen }) {
  const ref = useRef(null);
  const stacked = useMediaQuery('(min-width: 1024px)');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    <div ref={ref} className="relative">
      {items.map((p, i) => (
        <StackCard
          key={p.id}
          project={p}
          index={i}
          total={items.length}
          progress={scrollYProgress}
          stacked={stacked}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Index: every other project as one ruled line, with a cursor preview */
/* ------------------------------------------------------------------ */

const FOLLOW = { stiffness: 260, damping: 32, mass: 0.6 };

function CursorPreview({ project, x, y }) {
  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
      style={{ x, y }}
      aria-hidden="true"
    >
      {/* Offset from the cursor lives on a plain wrapper, so Framer's transforms don't override it */}
      <div className="-translate-y-1/2 translate-x-8">
        <AnimatePresence>
          {project && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden rounded-2xl border border-line shadow-[0_24px_60px_-20px_rgb(0_0_0/0.45)]"
            >
              <div className="relative aspect-[16/10] w-[360px]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    <ProjectCover project={project} className="h-full w-full" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ProjectIndex({ items, onOpen }) {
  const hoverable = useMediaQuery('(hover: hover) and (pointer: fine)');
  const [hovered, setHovered] = useState(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, FOLLOW);
  const y = useSpring(my, FOLLOW);

  const onMove = (e) => {
    mx.set(e.clientX);
    my.set(e.clientY);
  };

  return (
    <>
      <ul
        className="group/list border-b border-line"
        onPointerMove={hoverable ? onMove : undefined}
        onPointerLeave={() => setHovered(null)}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((p, i) => (
            <motion.li
              key={p.id}
              layout="position"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              {/* Dimming lives on the button: Framer keeps an inline opacity on the <li> */}
              <button
                type="button"
                onClick={() => onOpen(p)}
                onPointerEnter={() => hoverable && setHovered(p)}
                className="group relative grid w-full grid-cols-[5rem_minmax(0,1fr)_auto] items-center gap-x-4 border-t border-line py-5 text-left transition-opacity duration-300 lg:grid-cols-12 lg:gap-x-8 lg:py-7 lg:group-hover/list:opacity-40 lg:hover:!opacity-100"
                aria-label={`${p.title}, ${p.tagline}. Open details`}
              >
                <span className="label hidden lg:col-span-1 lg:block">{pad(i + 1)}</span>
                {/* Below lg there is no cursor preview, so each row shows its own thumbnail */}
                <span className="block overflow-hidden rounded-lg border border-line lg:hidden" aria-hidden="true">
                  <ProjectCover project={p} className="aspect-[16/10] w-full" />
                </span>
                <span className="min-w-0 lg:col-span-5">
                  {/* Names and taglines wrap on small screens instead of being cut off */}
                  <span className="display block text-[1.5rem] leading-tight transition-transform duration-500 ease-out group-hover:translate-x-1.5 sm:text-[2rem] lg:truncate lg:text-[1.75rem] xl:text-[2rem]">
                    {p.title}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-muted lg:hidden">{p.tagline}</span>
                  {p.live && (
                    <span className="label mt-1.5 flex items-center gap-1.5 text-success lg:hidden">
                      <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                      Live demo
                    </span>
                  )}
                </span>
                <span className="hidden text-[15px] leading-snug text-muted lg:col-span-3 lg:line-clamp-2">{p.tagline}</span>
                <span className="label hidden items-center gap-3 lg:col-span-2 lg:flex">
                  {categoryLabel(p.category)}
                  {p.live && (
                    <span className="flex items-center gap-1.5 text-success" title="Has a live demo">
                      <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                      Live
                    </span>
                  )}
                </span>
                <span className="label flex items-center justify-end gap-3 lg:col-span-1">
                  <span className="hidden sm:inline">{p.year}</span>
                  <LuArrowUpRight
                    className="h-4 w-4 text-subtle transition-[transform,color] duration-300 group-hover:rotate-45 group-hover:text-accent"
                    aria-hidden="true"
                  />
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {hoverable && <CursorPreview project={hovered} x={x} y={y} />}
    </>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const closeModal = useCallback(() => setSelected(null), []);

  const featured = useMemo(() => projects.filter((p) => p.featured), []);
  const others = useMemo(() => projects.filter((p) => !p.featured), []);
  const visible = useMemo(
    () => (filter === 'all' ? others : others.filter((p) => p.category === filter)),
    [filter, others]
  );
  const counts = useMemo(
    () =>
      Object.fromEntries(
        projectFilters.map((f) => [f.key, f.key === 'all' ? others.length : others.filter((p) => p.category === f.key).length])
      ),
    [others]
  );

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container-site">
        <SectionHeading
          id="projects-title"
          index="04"
          label="Projects"
          title="Selected work"
          description="Enterprise ERPs, offline-first POS systems, storefronts, mobile apps and two games. Many have a live demo you can try."
        />

        <FeaturedStack items={featured} onOpen={setSelected} />

        {/* Index of everything else */}
        <div className="mt-28 flex flex-col gap-8 lg:mt-40 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h3 className="display text-[2.5rem] leading-none sm:text-5xl">More projects</h3>
            <p className="mt-3 text-muted">Web, desktop, mobile, APIs and games</p>
          </Reveal>
          <Reveal>
            <div className="scrollbar-none -mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="group" aria-label="Filter projects">
              {projectFilters.map((f) => {
                const active = filter === f.key;
                if (!counts[f.key]) return null;
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setFilter(f.key)}
                    aria-pressed={active}
                    className={`relative isolate flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm transition-colors ${
                      active ? 'text-bg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="filter-active"
                        className="absolute inset-0 -z-10 rounded-full bg-fg"
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    )}
                    {f.label}
                    <span className={`font-mono text-xs tabular-nums ${active ? 'text-bg/60' : 'text-subtle'}`}>{counts[f.key]}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div className="mt-10">
          <ProjectIndex items={visible} onOpen={setSelected} />
        </div>

        {/* GitHub */}
        <Reveal>
          <a
            href={githubStats.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-20 flex items-center justify-between gap-6 rounded-[20px] border border-line p-6 transition-colors duration-300 hover:bg-surface sm:p-10"
          >
            <span className="flex items-center gap-5">
              <LuGithub className="hidden h-7 w-7 shrink-0 text-muted sm:block" aria-hidden="true" />
              <span>
                <span className="display block text-[1.75rem] leading-tight sm:text-[2.5rem]">
                  {githubStats.repos} public repositories
                </span>
                <span className="mt-2 block text-sm text-muted sm:text-[15px]">
                  Experiments, templates, APIs and work in progress on GitHub
                </span>
              </span>
            </span>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-line text-fg transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg sm:h-16 sm:w-16">
              <LuArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
            </span>
          </a>
        </Reveal>
      </div>

      <ProjectModal project={selected} onClose={closeModal} />
    </section>
  );
}
