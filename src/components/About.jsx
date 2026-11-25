import { useEffect, useState } from 'react';
import {
  LuCodeXml,
  LuServer,
  LuSmartphone,
  LuMonitor,
  LuGraduationCap,
  LuMapPin,
  LuArrowRight,
  LuDownload,
} from 'react-icons/lu';
import { profile, services, principles, education, yearsOfExperience } from '../data/portfolio';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { trackSpotlight } from './ui/spotlight';

const SERVICE_ICONS = { web: LuCodeXml, backend: LuServer, mobile: LuSmartphone, desktop: LuMonitor };

function useLocalTime(timeZone) {
  const format = () =>
    new Intl.DateTimeFormat('en-US', { timeZone, hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 15_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);
  return time;
}

export default function About({ onOpenResume }) {
  const time = useLocalTime(profile.timezone);

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container-site">
        <SectionHeading
          id="about-title"
          index="01"
          eyebrow="About"
          title="Engineer by trade,"
          accent="builder at heart."
          description={`${yearsOfExperience()}+ years turning complex business workflows into software that is fast, reliable and genuinely pleasant to use.`}
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Bio */}
          <Reveal className="card spotlight p-7 sm:p-9 lg:col-span-2 lg:row-span-2" onMouseMove={trackSpotlight}>
            <div className="flex items-center gap-4">
              <img
                src={profile.avatar}
                alt=""
                width="56"
                height="56"
                loading="lazy"
                className="h-14 w-14 rounded-2xl object-cover ring-2 ring-line"
              />
              <div>
                <p className="text-lg font-semibold text-fg">{profile.name}</p>
                <p className="text-sm text-muted">
                  {profile.currentTitle} · {profile.company}
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-4 text-[15px] leading-relaxed text-muted sm:text-base">
              {profile.bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <ul className="mt-7 flex flex-wrap gap-2" aria-label="How I work">
              {principles.map((p) => (
                <li key={p} className="chip">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-accent" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="btn-primary group">
                Let’s work together
                <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <button type="button" onClick={onOpenResume} className="btn-ghost">
                <LuDownload className="h-4 w-4" />
                Download resume
              </button>
            </div>
          </Reveal>

          {/* Location & local time */}
          <Reveal delay={0.1} className="card relative overflow-hidden p-7">
            <div className="bg-dots absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_70%_40%,#000,transparent_70%)]" aria-hidden="true" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-[10px]">Based in</span>
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-accent-2" />
                </span>
              </div>
              <p className="mt-6 flex items-center gap-2 text-2xl font-semibold tracking-tight text-fg">
                <LuMapPin className="h-5 w-5 text-accent-2" />
                Dhaka
              </p>
              <p className="mt-1 text-sm text-muted">Bangladesh · GMT+6</p>
              <div className="mt-8 border-t border-line/70 pt-5">
                <p className="text-xs uppercase tracking-[0.2em] text-subtle">Local time</p>
                <p className="mt-1 font-mono text-3xl font-medium tabular-nums text-fg">{time}</p>
              </div>
            </div>
          </Reveal>

          {/* Education */}
          <Reveal delay={0.2} className="card relative overflow-hidden p-7">
            <div className="aurora -bottom-24 -right-24 h-56 w-56 bg-accent" aria-hidden="true" />
            <div className="relative">
              <span className="grid h-11 w-11 place-items-center rounded-2xl border border-line bg-surface-2 text-accent">
                <LuGraduationCap className="h-5 w-5" />
              </span>
              <p className="eyebrow mt-6 text-[10px]">Education</p>
              <p className="mt-2 text-lg font-semibold leading-snug text-fg">{education.degree}</p>
              <p className="mt-2 text-sm text-muted">{education.institute}</p>
            </div>
          </Reveal>
        </div>

        {/* What I do */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[s.key];
            return (
              <Reveal
                key={s.key}
                delay={0.08 * i}
                className="card spotlight group p-6 transition-transform duration-500 hover:-translate-y-1"
                onMouseMove={trackSpotlight}
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-accent text-white shadow-lg shadow-accent/25 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-fg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
