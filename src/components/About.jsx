import { LuArrowRight } from 'react-icons/lu';
import { profile, principles, education, stats } from '../data/portfolio';
import { useLocalTime } from '../hooks/useLocalTime';
import { SectionLabel } from './ui/SectionHeading';
import { CountUp, RollText, ScrollLit } from './ui/TextMotion';
import Reveal from './ui/Reveal';

function Fact({ label, children }) {
  return (
    <div className="border-t border-line pt-4">
      <dt className="label">{label}</dt>
      <dd className="mt-2 text-[15px] leading-snug text-fg">{children}</dd>
    </div>
  );
}

export default function About({ onOpenResume }) {
  const time = useLocalTime(profile.timezone);

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container-site">
        <SectionLabel index="01" label="About" />
        <h2 id="about-title" className="sr-only">
          About me
        </h2>

        {/* The statement, lit word by word as it is read */}
        <ScrollLit
          text={profile.statement}
          className="display mt-12 max-w-[30ch] text-[1.875rem] leading-[1.14] sm:text-[2.5rem] lg:mt-16 lg:text-[3.25rem]"
        />

        <div className="mt-20 grid gap-16 lg:mt-28 lg:grid-cols-12 lg:gap-8">
          {/* Figures */}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 self-start lg:sticky lg:top-28 lg:col-span-5">
            {stats().map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06} className="flex flex-col-reverse border-t border-line pt-5">
                <dt className="mt-3 text-sm text-muted">{s.label}</dt>
                <dd className="display text-[3.25rem] leading-none sm:text-[4rem]">
                  <CountUp value={s.value} />
                </dd>
              </Reveal>
            ))}
          </dl>

          {/* Bio and facts */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-[17px]">
              {profile.bio.slice(1).map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="How I work">
                {principles.map((p) => (
                  <li key={p} className="chip text-[13px]">
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <dl className="mt-12 grid gap-6 sm:grid-cols-3">
                <Fact label="Based in">{profile.shortLocation}</Fact>
                <Fact label="Local time">
                  <span className="tabular-nums">{time}</span> <span className="text-muted">GMT+6</span>
                </Fact>
                <Fact label="Education">
                  {education.degree}
                  <span className="mt-1 block text-sm text-muted">{education.institute}</span>
                </Fact>
              </dl>
            </Reveal>

            <Reveal delay={0.2} className="mt-12 flex flex-wrap gap-3">
              <a href="#contact" className="btn-primary group">
                <RollText>Work with me</RollText>
                <LuArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <button type="button" onClick={onOpenResume} className="btn-ghost group">
                <RollText>Read my resume</RollText>
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
