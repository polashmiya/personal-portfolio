import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LuArrowUpRight, LuExternalLink, LuCircleCheck, LuArrowRight } from 'react-icons/lu';
import { SiGithub } from 'react-icons/si';
import { projects, projectFilters, githubStats } from '../data/portfolio';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import ProjectCover from './ProjectCover';
import ProjectModal from './ProjectModal';
import { trackSpotlight } from './ui/spotlight';

const categoryLabel = (key) => projectFilters.find((f) => f.key === key)?.label ?? key;

function LinkIcons({ project }) {
  return (
    <div className="relative z-10 flex items-center gap-1">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-9 w-9 place-items-center rounded-full text-muted transition hover:bg-surface-2 hover:text-fg"
          aria-label={`${project.title} source code on GitHub`}
          title="Source code"
        >
          <SiGithub className="h-4 w-4" />
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-9 w-9 place-items-center rounded-full text-muted transition hover:bg-surface-2 hover:text-fg"
          aria-label={`${project.title} live demo`}
          title="Live demo"
        >
          <LuExternalLink className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

function LiveBadge() {
  return (
    <span className="pointer-events-none absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      Live demo
    </span>
  );
}

function TechList({ tech, max = tech.length }) {
  const shown = tech.slice(0, max);
  const rest = tech.length - shown.length;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {shown.map((t) => (
        <li key={t} className="chip px-2.5 py-0.5 text-[11px]">
          {t}
        </li>
      ))}
      {rest > 0 && <li className="chip px-2.5 py-0.5 text-[11px] text-subtle">+{rest}</li>}
    </ul>
  );
}

function FeaturedCard({ project, index, onOpen, wide }) {
  return (
    <Reveal
      as="article"
      delay={wide ? 0 : 0.1 * index}
      onMouseMove={trackSpotlight}
      className={`card spotlight group overflow-hidden ${wide ? 'lg:col-span-2 lg:grid lg:grid-cols-[1.35fr_1fr]' : 'flex flex-col'}`}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className={`relative block w-full overflow-hidden text-left ${wide ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[420px]' : 'aspect-[16/10]'}`}
        aria-label={`Open details for ${project.title}`}
      >
        <ProjectCover project={project} className="h-full w-full" />
        {project.live && <LiveBadge />}
      </button>

      <div className={`flex flex-1 flex-col p-6 sm:p-8 ${wide ? 'lg:p-10' : ''}`}>
        <p className="flex items-center gap-2 font-mono text-xs text-subtle">
          <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px w-5 bg-line" />
          Featured · {categoryLabel(project.category)} · {project.year}
        </p>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-fg sm:text-[1.7rem]">{project.title}</h3>
        <p className="mt-1 text-sm font-medium text-accent">{project.tagline}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">{project.description}</p>

        {wide && (
          <ul className="mt-5 space-y-2.5">
            {project.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                <LuCircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6">
          <TechList tech={project.tech} max={wide ? 8 : 5} />
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
          <button type="button" onClick={() => onOpen(project)} className="btn-primary px-5 py-2.5">
            Case study
            <LuArrowRight className="h-4 w-4" />
          </button>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-ghost px-5 py-2.5">
              <LuExternalLink className="h-4 w-4" /> Live demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label={`${project.title} source code on GitHub`}
              title="Source code"
            >
              <SiGithub className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={trackSpotlight}
      className="card spotlight group relative flex flex-col overflow-hidden transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_rgb(var(--accent)/0.5)]"
    >
      <div className="relative">
        <ProjectCover project={project} className="aspect-[16/10] w-full" />
        {project.live && <LiveBadge />}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-subtle">
          <span>{categoryLabel(project.category)}</span>
          <span>{project.year}</span>
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-fg">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.title}
          </button>
        </h3>
        <p className="text-sm font-medium text-accent">{project.tagline}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{project.description}</p>
        <div className="mb-5 mt-5">
          <TechList tech={project.tech} max={4} />
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-line/70 pt-4">
          <span className="inline-flex items-center gap-1 text-sm font-medium text-fg transition-colors group-hover:text-accent">
            View details
            <LuArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
          <LinkIcons project={project} />
        </div>
      </div>
    </motion.article>
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
    () => Object.fromEntries(projectFilters.map((f) => [f.key, f.key === 'all' ? others.length : others.filter((p) => p.category === f.key).length])),
    [others]
  );

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="aurora -right-40 top-20 -z-10 h-[32rem] w-[32rem] bg-accent-2/70" aria-hidden="true" />
      <div className="container-site">
        <SectionHeading
          id="projects-title"
          index="04"
          eyebrow="Projects"
          title="Selected work I’m"
          accent="proud of."
          description="Enterprise ERPs, offline-first POS systems, storefronts, mobile apps and even a couple of games — many with live demos you can try right now."
        />

        {/* Featured */}
        <div className="grid gap-5 lg:grid-cols-2">
          {featured.map((p, i) => (
            <FeaturedCard key={p.id} project={p} index={i} onOpen={setSelected} wide={i === 0} />
          ))}
        </div>

        {/* More projects */}
        <div className="mt-24 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <h3 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">More projects</h3>
            <p className="mt-2 text-muted">Web, desktop, mobile and games — filter to explore.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div
              className="scrollbar-none -mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:rounded-full sm:border sm:border-line sm:bg-surface/60 sm:p-1"
              role="group"
              aria-label="Filter projects"
            >
              {projectFilters.map((f) => {
                const active = filter === f.key;
                if (!counts[f.key]) return null;
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setFilter(f.key)}
                    aria-pressed={active}
                    className={`relative isolate shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active ? 'text-bg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-fg"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    {f.label}
                    <span className={`ml-1.5 font-mono text-[11px] ${active ? 'text-bg/70' : 'text-subtle'}`}>{counts[f.key]}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
        <Reveal className="card relative mt-14 overflow-hidden p-7 sm:p-9">
          <div className="aurora -left-20 -top-24 h-64 w-64 bg-accent" aria-hidden="true" />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-fg text-bg">
                <SiGithub className="h-7 w-7" />
              </span>
              <div>
                <p className="text-lg font-semibold text-fg">There’s plenty more on GitHub</p>
                <p className="mt-1 text-sm text-muted">
                  {githubStats.repos} public repositories — experiments, templates, APIs and works in progress.
                </p>
              </div>
            </div>
            <a href={githubStats.url} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0">
              Explore repositories
              <LuArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>

      <ProjectModal project={selected} onClose={closeModal} />
    </section>
  );
}
