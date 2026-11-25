import { profile, experience, education, skillGroups, projects, socials } from '../data/portfolio';
import { A4 } from './ui/paper';

/*
 * A4 resume (794 × 1123 px at 96 dpi), generated from the same data as the site.
 * It always renders on white "paper" with fixed colors so the PDF export looks the same
 * regardless of the site theme.
 */

const stripProtocol = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

// A text bullet instead of list-style markers: html2canvas offsets text slightly when
// rasterizing, and a text glyph shifts with it while a native marker or a dot element does not.
function Bullets({ items, render = (x) => x }) {
  return (
    <ul className="mt-1 space-y-[3px] text-[#374151]">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 pl-1">
          <span className="shrink-0 text-[#9ca3af]" aria-hidden="true">
            •
          </span>
          <span>{render(item)}</span>
        </li>
      ))}
    </ul>
  );
}

function Heading({ children }) {
  return (
    <h2 className="mb-2.5 flex items-center gap-3 text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#5b3fd6]">
      {children}
      <span className="h-px flex-1 bg-[#e5e7eb]" />
    </h2>
  );
}

export default function Resume({ ref }) {
  const github = socials.find((s) => s.label === 'GitHub');
  const linkedin = socials.find((s) => s.label === 'LinkedIn');
  const selected = projects.filter((p) => p.featured).concat(projects.filter((p) => p.id === 'restaurant-pos'));
  const job = experience[0];

  const contacts = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { label: 'Phone', value: profile.phone, href: profile.phoneHref },
    { label: 'Location', value: profile.location },
    { label: 'GitHub', value: stripProtocol(github.href), href: github.href },
    { label: 'LinkedIn', value: stripProtocol(linkedin.href), href: linkedin.href },
    { label: 'Portfolio', value: stripProtocol(profile.siteUrl), href: profile.siteUrl },
  ];

  return (
    <article
      ref={ref}
      className="pdf-export bg-white font-sans text-[10.5px] leading-[1.5] text-[#1f2937]"
      style={{ width: A4.width, minHeight: A4.height - 3, padding: '40px 48px', boxSizing: 'border-box' }}
    >
      {/* Header */}
      <header className="flex items-center gap-5 border-b border-[#e5e7eb] pb-4">
        <img src={profile.avatar} alt="" width="68" height="68" className="h-[68px] w-[68px] rounded-2xl object-cover" />
        <div className="flex-1">
          <h1 className="text-[26px] font-bold leading-tight tracking-tight text-[#0b0c12]">{profile.name}</h1>
          <p className="mt-0.5 text-[12.5px] font-semibold text-[#5b3fd6]">
            {profile.role} · {profile.currentTitle} at {profile.company}
          </p>
        </div>
      </header>

      <ul className="mt-3.5 flex flex-wrap gap-x-5 gap-y-1.5 text-[10px]">
        {contacts.map((c) => (
          <li key={c.label}>
            <span className="font-semibold text-[#111827]">{c.label}: </span>
            {c.href ? (
              <a href={c.href} className="text-[#374151]">
                {c.value}
              </a>
            ) : (
              <span className="text-[#374151]">{c.value}</span>
            )}
          </li>
        ))}
      </ul>

      <section className="mt-5">
        <Heading>Summary</Heading>
        <p className="text-[#374151]">{profile.summary}</p>
      </section>

      <section className="mt-5">
        <Heading>Experience</Heading>
        <p className="text-[11.5px] font-bold text-[#0b0c12]">
          {job.company} <span className="font-normal text-[#6b7280]">— {job.companyNote} · {job.location}</span>
        </p>
        {job.roles.map((role) => (
          <div key={role.title} className="mt-2.5">
            <div className="flex items-baseline justify-between">
              <p className="font-semibold text-[#111827]">{role.title}</p>
              <p className="text-[9.5px] font-medium text-[#6b7280]">{role.period}</p>
            </div>
            <Bullets items={role.points} />
          </div>
        ))}
        <p className="mt-3.5 font-semibold text-[#111827]">Key ERP products</p>
        <Bullets
          items={job.products}
          render={(p) => (
            <>
              <span className="font-semibold text-[#111827]">{p.name}</span> ({p.kind}) — {p.text}
            </>
          )}
        />
      </section>

      <section className="mt-5">
        <Heading>Selected projects</Heading>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          {selected.map((p) => (
            <div key={p.id}>
              <p className="font-semibold text-[#111827]">
                {p.title} <span className="font-normal text-[#6b7280]">— {p.tagline}</span>
              </p>
              <p className="mt-0.5 text-[9.5px] text-[#4b5563]">{p.tech.slice(0, 6).join(' · ')}</p>
              <p className="text-[9px] text-[#5b3fd6]">{stripProtocol(p.live ?? p.github)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <Heading>Technical skills</Heading>
        <dl className="space-y-1">
          {skillGroups.map((g) => (
            <div key={g.key} className="flex gap-2">
              <dt className="w-[110px] shrink-0 font-semibold text-[#111827]">{g.title}</dt>
              <dd className="text-[#374151]">{g.skills.map((s) => s.name).join(', ')}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-5">
        <Heading>Education</Heading>
        <div className="flex items-baseline justify-between">
          <p>
            <span className="font-semibold text-[#111827]">{education.degree}</span>
            <span className="text-[#6b7280]"> — {education.institute}</span>
          </p>
          <p className="text-[9.5px] text-[#6b7280]">{education.location}</p>
        </div>
      </section>
    </article>
  );
}
