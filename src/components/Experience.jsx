import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { experience } from '../data/portfolio';
import { EASE } from '../lib/motion';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

function duration(start, end) {
  const s = new Date(start);
  const e = end ? new Date(end) : new Date();
  const months = Math.max(1, (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth()) + 1);
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr${y > 1 ? 's' : ''}`, m && `${m} mo${m > 1 ? 's' : ''}`].filter(Boolean).join(' ');
}

/* The marker on the timeline fills with flame when the reader reaches that role. */
function Node() {
  return (
    <span
      className="absolute left-0 top-[7px] grid h-[15px] w-[15px] place-items-center rounded-full border border-line bg-bg"
      aria-hidden="true"
    >
      <motion.span
        className="h-[7px] w-[7px] rounded-full bg-accent"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -45% 0px' }}
        transition={{ duration: 0.5, ease: EASE }}
      />
    </span>
  );
}

function Row({ label, children }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-line py-3">
      <dt className="label">{label}</dt>
      <dd className="text-right text-sm text-fg">{children}</dd>
    </div>
  );
}

function Timeline({ roles }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.65', 'end 0.65'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <ol ref={ref} className="relative">
      {/* The track and the flame line that fills it while reading */}
      <span className="absolute bottom-2 left-[7px] top-3 w-px bg-line" aria-hidden="true" />
      <motion.span
        className="absolute bottom-2 left-[7px] top-3 w-px origin-top bg-accent"
        style={{ scaleY: fill }}
        aria-hidden="true"
      />

      {roles.map((role) => (
        <li key={role.title} className="relative pb-16 pl-10 last:pb-2 sm:pl-14">
          <Node />
          <Reveal>
            <p className="label flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-fg">{role.period}</span>
              <span>{duration(role.start, role.end)}</span>
              {role.current && (
                <span className="flex items-center gap-1.5 text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                  Current role
                </span>
              )}
            </p>
            <h3 className="display mt-4 text-[2rem] leading-tight sm:text-[2.5rem]">{role.title}</h3>

            <ul className="mt-6 space-y-3">
              {role.points.map((point) => (
                <li key={point.slice(0, 32)} className="flex gap-4 text-[15px] leading-relaxed text-muted sm:text-base">
                  <span className="mt-[0.75em] h-px w-3 shrink-0 bg-subtle" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies used">
              {role.tech.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section bg-deep/50" aria-labelledby="experience-title">
      <div className="container-site">
        <SectionHeading
          id="experience-title"
          index="02"
          label="Experience"
          title="From junior engineer to Software Engineer II"
          description="Promoted twice at AKIJ iBOS Limited, building enterprise ERP products used across multiple companies"
        />

        {experience.map((job) => {
          const first = job.roles[job.roles.length - 1];
          return (
            <div key={job.company} className="grid gap-16 lg:grid-cols-12 lg:gap-8">
              {/* Company and the products built there */}
              <Reveal className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
                <p className="label">Company</p>
                <h3 className="display mt-3 text-[2.25rem] leading-tight">{job.company}</h3>
                <p className="mt-2 text-sm text-muted">
                  {job.companyNote} · {job.employment}
                </p>

                <dl className="mt-8 border-b border-line">
                  <Row label="Tenure">{duration(first.start)}</Row>
                  <Row label="Location">{job.location}</Row>
                </dl>

                <h4 className="label mt-10">Key products</h4>
                <ul className="mt-4 space-y-6">
                  {job.products.map((p) => (
                    <li key={p.name}>
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="display text-xl tracking-normal">{p.name}</p>
                        <p className="label shrink-0">{p.kind}</p>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <div className="lg:col-span-7 lg:col-start-6">
                <Timeline roles={job.roles} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
