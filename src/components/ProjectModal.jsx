import { useState } from 'react';
import { LuX, LuExternalLink, LuGithub, LuServer, LuKeyRound, LuLayoutDashboard } from 'react-icons/lu';
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
            className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/60 text-white transition-[background-color,transform] duration-300 hover:rotate-90 hover:bg-black/80"
            aria-label="Close project details"
            data-autofocus
          >
            <LuX className="h-[18px] w-[18px]" />
          </button>

          <div className="overflow-y-auto overscroll-contain">
            <ProjectCover project={coverProject} className="aspect-[16/9] w-full" />

            {gallery && (
              <div className="scrollbar-none flex gap-3 overflow-x-auto border-b border-line px-6 py-4 sm:px-10" role="group" aria-label="Screenshots">
                {gallery.map((g, i) => (
                  <button
                    key={g.caption}
                    type="button"
                    onClick={() => setShot(i)}
                    aria-pressed={shot === i}
                    className={`shrink-0 overflow-hidden rounded-[10px] border text-left transition-[border-color,opacity] ${
                      shot === i ? 'border-fg/60' : 'border-line opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={g.src} alt="" loading="lazy" className="h-16 w-28 object-cover object-left-top" />
                    <span className="block bg-surface-2 px-2.5 py-1.5 text-xs text-muted">{g.caption}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="p-6 sm:p-10">
              <p className="label">
                {categoryLabel(project.category)}
                {project.year && ` · ${project.year}`}
              </p>
              <h3 id="project-modal-title" className="display mt-4 text-[2.5rem] leading-[1.05] sm:text-5xl">
                {project.title}
              </h3>
              <p className="mt-2 text-muted">{project.tagline}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm">
                    <LuExternalLink className="h-4 w-4" aria-hidden="true" /> Live demo
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm">
                    <LuGithub className="h-4 w-4" aria-hidden="true" /> Source code
                  </a>
                )}
                {project.api && (
                  <a href={project.api} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm">
                    <LuServer className="h-4 w-4" aria-hidden="true" /> API repo
                  </a>
                )}
                {project.links?.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm">
                    <LuLayoutDashboard className="h-4 w-4" aria-hidden="true" /> {l.label}
                  </a>
                ))}
              </div>

              {project.demo && (
                <p className="mt-5 flex items-start gap-3 rounded-xl border border-line bg-surface-2/60 p-4 text-sm leading-relaxed text-muted">
                  <LuKeyRound className="mt-0.5 h-4 w-4 shrink-0 text-subtle" aria-hidden="true" />
                  <span>
                    <span className="font-medium text-fg">Demo access: </span>
                    {project.demo}
                  </span>
                </p>
              )}

              <p className="mt-6 leading-relaxed text-muted">{project.description}</p>

              {project.highlights?.length > 0 && (
                <>
                  <h4 className="label mt-10">Highlights</h4>
                  <ul className="mt-3 space-y-2.5">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                        <span className="mt-[0.65em] h-[2px] w-2.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <h4 className="label mt-10">Built with</h4>
              <ul className="mt-3 flex flex-wrap gap-1.5">
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
