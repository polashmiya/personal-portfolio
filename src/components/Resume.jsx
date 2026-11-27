import { Fragment } from 'react';
import { resume } from '../data/resume';
import { A4 } from './ui/paper';
import './resume.css';

/*
 * The resume, drawn from src/data/resume.js. The site shows it as an A4 preview; the PDF in
 * public/ is printed from this same component by `npm run resume` (scripts/resume/build.mjs).
 */

/** The grey "|" between items in the header lines */
function Sep() {
  return (
    <span className="r-sep" aria-hidden="true">
      |
    </span>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function Resume({ print = false }) {
  return (
    <article
      className={`resume-sheet ${print ? 'is-print' : ''}`}
      style={print ? undefined : { width: A4.width, minHeight: A4.height }}
    >
      <header>
        <h1>{resume.name}</h1>
        <p className="r-headline">
          {resume.headline.map((part, i) => (
            <Fragment key={part}>
              {i > 0 && <Sep />}
              {part}
            </Fragment>
          ))}
        </p>
        {resume.contact.map((line, li) => (
          <p key={li} className={`r-contact ${li ? 'is-next' : ''}`}>
            {line.map((c, i) => (
              <Fragment key={c.label}>
                {i > 0 && <Sep />}
                {c.href ? <a href={c.href}>{c.label}</a> : c.label}
              </Fragment>
            ))}
          </p>
        ))}
      </header>

      <Section title="Summary">
        <p>{resume.summary}</p>
      </Section>

      <Section title="Experience">
        {resume.experience.map((job) => (
          <div key={job.company}>
            <div className="r-row">
              <p>
                <strong className="r-company">{job.company}</strong>
                <span className="r-muted"> · {job.note}</span>
              </p>
              <span className="r-right">{job.location}</span>
            </div>
            {job.roles.map((role) => (
              <div key={role.title} className="r-role">
                <div className="r-row">
                  <strong>{role.title}</strong>
                  <span className="r-right">{role.dates}</span>
                </div>
                <ul>
                  {role.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </Section>

      <Section title="Projects">
        {resume.projects.map((p) => (
          <div key={p.name} className="r-item">
            <div className="r-row">
              <p>
                <strong>{p.name}</strong>
                <span className="r-muted"> · {p.stack}</span>
              </p>
              <a className="r-right" href={p.link.href}>
                {p.link.label}
              </a>
            </div>
            <ul>
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Skills">
        <div className="r-skills">
          {resume.skills.map((s) => (
            <p key={s.group}>
              <strong>{s.group}:</strong> {s.items}
            </p>
          ))}
        </div>
      </Section>

      <Section title="Education">
        {resume.education.map((e) => (
          <div key={e.degree} className="r-row">
            <p>
              <strong>{e.degree}</strong>
              <span className="r-muted">
                {' '}
                · {e.school}, {e.location}
              </span>
            </p>
            <span className="r-right">{e.dates}</span>
          </div>
        ))}
      </Section>
    </article>
  );
}
