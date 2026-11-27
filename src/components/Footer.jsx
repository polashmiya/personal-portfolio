import { LuArrowUp, LuArrowUpRight } from 'react-icons/lu';
import { navLinks, profile, socials } from '../data/portfolio';
import { useLocalTime } from '../hooks/useLocalTime';
import { scrollToTarget } from '../lib/smoothScroll';
import { PalashMark } from './ui/Palash';
import { RollText, SplitLetters } from './ui/TextMotion';

export default function Footer() {
  const year = new Date().getFullYear();
  const time = useLocalTime(profile.timezone);

  return (
    <footer className="relative overflow-hidden border-t border-line pt-20 md:pt-28">
      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="display text-balance text-[1.75rem] leading-snug sm:text-[2.25rem]">
              Software engineer building ERP, SaaS and web products <span className="text-muted">that businesses run on</span>
            </p>
            <a href={`mailto:${profile.email}`} className="link mt-6 inline-block break-all text-[15px] text-muted hover:text-fg">
              {profile.email}
            </a>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
            <p className="label">Navigate</p>
            <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="group inline-flex text-[15px] text-muted transition-colors hover:text-fg">
                    <RollText>{l.label}</RollText>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="label">Elsewhere</p>
            <ul className="mt-5 space-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[15px] text-muted transition-colors hover:text-fg"
                  >
                    <RollText>{s.label}</RollText>
                    <LuArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The name, set across the full width, rising letter by letter */}
        <p
          className="display mt-20 flex items-end whitespace-nowrap text-[clamp(5rem,26vw,24rem)] leading-[0.82] tracking-[-0.05em] md:mt-28"
          aria-hidden="true"
        >
          <SplitLetters text="Polash" stagger={0.06} letterClassName="ember" onView />
          <PalashMark className="mb-[0.02em] -ml-[0.02em] h-[0.5em] w-[0.5em] shrink-0 text-flame" />
        </p>

        <div className="mt-10 flex flex-col gap-4 border-t border-line py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}
          </p>
          <p className="tabular-nums">Dhaka {time}</p>
          <button
            type="button"
            onClick={() => scrollToTarget(0)}
            className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
          >
            <RollText>Back to top</RollText>
            <LuArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
