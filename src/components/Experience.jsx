import { LuBuilding2, LuMapPin, LuCalendar, LuLayers } from 'react-icons/lu';
import { experience } from '../data/portfolio';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { trackSpotlight } from './ui/spotlight';

function duration(start, end) {
  const s = new Date(start);
  const e = end ? new Date(end) : new Date();
  const months = Math.max(1, (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth()) + 1);
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr${y > 1 ? 's' : ''}`, m && `${m} mo${m > 1 ? 's' : ''}`].filter(Boolean).join(' ');
}

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="aurora left-1/2 top-1/3 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 bg-accent/60" aria-hidden="true" />
      <div className="container-site">
        <SectionHeading
          id="experience-title"
          index="02"
          eyebrow="Experience"
          title="Where I’ve been"
          accent="building."
          description="Promoted twice — from Junior Software Engineer to Software Engineer II — building enterprise ERP products used across multiple companies."
        />

        {experience.map((job) => {
          const first = job.roles[job.roles.length - 1];
          return (
            <div key={job.company} className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] lg:gap-12">
              {/* Company + products */}
              <Reveal className="lg:sticky lg:top-28 lg:self-start">
                <div className="card p-7">
                  <div className="flex items-center gap-4">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-accent text-white shadow-lg shadow-accent/25">
                      <LuBuilding2 className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-fg">{job.company}</h3>
                      <p className="text-sm text-muted">{job.companyNote}</p>
                      <p className="mt-0.5 text-xs text-subtle">{job.employment}</p>
                    </div>
                  </div>
                  <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl border border-line/70 bg-surface-2/50 p-3">
                      <dt className="flex items-center gap-1.5 text-xs text-subtle">
                        <LuCalendar className="h-3.5 w-3.5" /> Tenure
                      </dt>
                      <dd className="mt-1 font-medium text-fg">{duration(first.start)}</dd>
                    </div>
                    <div className="rounded-2xl border border-line/70 bg-surface-2/50 p-3">
                      <dt className="flex items-center gap-1.5 text-xs text-subtle">
                        <LuMapPin className="h-3.5 w-3.5" /> Location
                      </dt>
                      <dd className="mt-1 font-medium text-fg">{job.location.split(',')[0]}</dd>
                    </div>
                  </dl>

                  <p className="eyebrow mt-8 text-[10px]">
                    <LuLayers className="h-3.5 w-3.5" /> Key products
                  </p>
                  <ul className="mt-4 space-y-3">
                    {job.products.map((p) => (
                      <li key={p.name} className="rounded-2xl border border-line/70 bg-surface-2/40 p-4">
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="font-semibold text-fg">{p.name}</p>
                          <p className="shrink-0 text-[11px] text-subtle">{p.kind}</p>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Role timeline */}
              <ol className="relative space-y-6 pl-8 sm:pl-10">
                <span
                  className="absolute bottom-4 left-[11px] top-4 w-px bg-gradient-to-b from-accent via-accent-2/60 to-transparent sm:left-[15px]"
                  aria-hidden="true"
                />
                {job.roles.map((role, i) => (
                  <Reveal as="li" key={role.title} delay={0.1 * i} className="relative">
                    <span
                      className="absolute -left-8 top-8 grid h-6 w-6 place-items-center rounded-full border border-line bg-bg sm:-left-10 sm:h-8 sm:w-8"
                      aria-hidden="true"
                    >
                      <span className={`h-2.5 w-2.5 rounded-full ${role.current ? 'bg-success' : 'bg-subtle'}`} />
                      {role.current && <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-success/70" />}
                    </span>

                    <article className="card spotlight p-6 sm:p-8" onMouseMove={trackSpotlight}>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">{role.title}</h3>
                          <p className="mt-1 text-sm text-muted">
                            {job.company} · {duration(role.start, role.end)}
                          </p>
                        </div>
                        <span
                          className={`chip font-mono ${role.current ? 'border-success/30 bg-success/10 text-success' : ''}`}
                        >
                          {role.period}
                        </span>
                      </div>

                      <ul className="mt-6 space-y-3">
                        {role.points.map((point) => (
                          <li key={point.slice(0, 32)} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                            <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                            {point}
                          </li>
                        ))}
                      </ul>

                      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
                        {role.tech.map((t) => (
                          <li key={t} className="chip">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                ))}
              </ol>
            </div>
          );
        })}
      </div>
    </section>
  );
}
