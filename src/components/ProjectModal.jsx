import { useState } from 'react';
import { LuX, LuExternalLink, LuCircleCheck, LuServer, LuKeyRound, LuLayoutDashboard } from 'react-icons/lu';
import { SiGithub } from 'react-icons/si';
import Modal from './ui/Modal';
import ProjectCover from './ProjectCover';
import { projectFilters } from '../data/portfolio';

const categoryLabel = (key) => projectFilters.find((f) => f.key === key)?.label ?? key;

export default function ProjectModal({ project: selected, onClose }) {
  // Keep showing the last project while the modal animates closed.
  const [project, setProject] = useState(selected);
  const [shot, setShot] = useState(0);
  if (selected && selected !== project) {
    setProject(selected);
    setShot(0);
  }

  const gallery = project?.gallery?.length > 1 ? project.gallery : null;
  const coverProject = gallery ? { ...project, image: gallery[shot]?.src ?? project.image } : project;

  return (
    <Modal open={Boolean(selected)} onClose={onClose} labelledBy="project-modal-title" className="max-w-3xl">
      {project && (
        <>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
            aria-label="Close project details"
            data-autofocus
          >
            <LuX className="h-5 w-5" />
          </button>

          <div className="overflow-y-auto overscroll-contain">
            <ProjectCover project={coverProject} className="aspect-[16/9] w-full" />

            {gallery && (
              <div className="scrollbar-none flex gap-3 overflow-x-auto border-b border-line px-6 py-4 sm:px-9" role="group" aria-label="Screenshots">
                {gallery.map((g, i) => (
                  <button
                    key={g.caption}
                    type="button"
                    onClick={() => setShot(i)}
                    aria-pressed={shot === i}
                    className={`shrink-0 overflow-hidden rounded-xl border text-left transition ${
                      shot === i ? 'border-accent ring-2 ring-accent/30' : 'border-line opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={g.src} alt="" loading="lazy" className="h-16 w-28 object-cover object-left-top" />
                    <span className="block bg-surface-2/60 px-2.5 py-1.5 text-[11px] font-medium text-muted">{g.caption}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="p-6 sm:p-9">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip border-accent/30 bg-accent/10 text-accent">{categoryLabel(project.category)}</span>
                {project.year && <span className="chip font-mono">{project.year}</span>}
              </div>
              <h3 id="project-modal-title" className="mt-4 text-3xl font-semibold tracking-tight text-fg">
                {project.title}
              </h3>
              <p className="mt-1 text-muted">{project.tagline}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary px-5 py-2.5">
                    <LuExternalLink className="h-4 w-4" /> Live demo
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost px-5 py-2.5">
                    <SiGithub className="h-4 w-4" /> Source code
                  </a>
                )}
                {project.api && (
                  <a href={project.api} target="_blank" rel="noopener noreferrer" className="btn-ghost px-5 py-2.5">
                    <LuServer className="h-4 w-4" /> API repo
                  </a>
                )}
                {project.links?.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-ghost px-5 py-2.5">
                    <LuLayoutDashboard className="h-4 w-4" /> {l.label}
                  </a>
                ))}
              </div>

              {project.demo && (
                <p className="mt-5 flex items-start gap-2.5 rounded-2xl border border-accent/25 bg-accent/5 p-4 text-sm leading-relaxed text-muted">
                  <LuKeyRound className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>
                    <span className="font-semibold text-fg">Demo access: </span>
                    {project.demo}
                  </span>
                </p>
              )}

              <p className="mt-7 leading-relaxed text-muted">{project.description}</p>

              {project.highlights?.length > 0 && (
                <>
                  <h4 className="mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-fg">Highlights</h4>
                  <ul className="mt-4 space-y-3">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                        <LuCircleCheck className="mt-1 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <h4 className="mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-fg">Built with</h4>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}
