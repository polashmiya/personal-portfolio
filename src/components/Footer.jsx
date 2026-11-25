import { LuArrowUp } from 'react-icons/lu';
import { navLinks, profile, socials } from '../data/portfolio';
import { Logo } from './Navbar';
import SocialIcon from './ui/SocialIcon';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line/70">
      <div className="container-site py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Full-stack software engineer building ERP, POS and web products that businesses run on.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="icon-btn"
                  aria-label={s.label}
                  title={s.label}
                >
                  <SocialIcon label={s.label} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-subtle">Navigate</p>
            <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-subtle">Get in touch</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={`mailto:${profile.email}`} className="break-all text-muted transition-colors hover:text-fg">
                  {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.phoneHref} className="text-muted transition-colors hover:text-fg">
                  {profile.phone}
                </a>
              </li>
              <li className="text-muted">{profile.shortLocation}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-line/70 pt-6 text-xs text-subtle sm:flex-row sm:items-center">
          <p>
            © {year} {profile.name}. Designed & built with React, Tailwind CSS and Framer Motion.
          </p>
          <a href="#home" className="group inline-flex items-center gap-2 font-medium text-muted transition-colors hover:text-fg">
            Back to top
            <span className="grid h-7 w-7 place-items-center rounded-full border border-line transition-transform group-hover:-translate-y-0.5">
              <LuArrowUp className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </div>

      {/* Oversized wordmark */}
      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.22em] select-none text-center text-[22vw] font-bold leading-none tracking-[-0.06em] text-transparent [-webkit-background-clip:text] [background-clip:text] [background-image:linear-gradient(to_bottom,rgb(var(--fg)/0.09),transparent_85%)] md:text-[17vw]"
      >
        POLASH
      </p>
    </footer>
  );
}
