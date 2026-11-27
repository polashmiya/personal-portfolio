import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { LuSun, LuMoon, LuArrowUpRight } from 'react-icons/lu';
import { navLinks, profile, socials } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';
import { useTheme } from '../hooks/useTheme';
import { EASE } from '../lib/motion';
import { lockScroll } from '../lib/smoothScroll';
import { PalashMark } from './ui/Palash';
import { RollText } from './ui/TextMotion';

// 'home' is observed too, so no link is highlighted while the hero is on screen.
const sectionIds = ['home', ...navLinks.map((l) => l.href.slice(1))];

export function Logo({ className = '' }) {
  return (
    <a href="#home" className={`group flex items-center gap-2 ${className}`} aria-label={`${profile.name} — home`}>
      <PalashMark className="h-7 w-7 text-flame transition-transform duration-500 group-hover:-rotate-12" />
      <span className="whitespace-nowrap font-display text-[19px] leading-none tracking-[-0.01em] text-fg">Polash Miya</span>
    </a>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      className="icon-btn border-transparent"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light theme' : 'Dark theme'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -60 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 60 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="grid place-items-center"
        >
          {isDark ? <LuSun className="h-[18px] w-[18px]" /> : <LuMoon className="h-[18px] w-[18px]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/* Two lines that turn into a cross */
function MenuIcon({ open }) {
  return (
    <span className="relative block h-3 w-5" aria-hidden="true">
      <span
        className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-300 ${open ? 'top-1/2 rotate-45' : 'top-0'}`}
      />
      <span
        className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-300 ${open ? 'top-1/2 -rotate-45' : 'bottom-0'}`}
      />
    </span>
  );
}

export default function Navbar({ onOpenResume }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const active = useActiveSection(sectionIds);
  const { scrollY } = useScroll();

  // Slide away while reading down the page, come back as soon as the reader scrolls up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 8);
    setHidden((h) => (y > 160 && y > prev + 2 ? true : y < prev - 2 ? false : h));
  });

  useEffect(() => {
    lockScroll(open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.45, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled && !open ? 'border-line bg-bg/95' : 'border-transparent bg-transparent'
        }`}
      >
        <nav aria-label="Primary" className="container-site flex h-[72px] items-center justify-between gap-4">
          <Logo />

          {/* Desktop links. Below 1024px they don't fit beside the logo and buttons, so the menu takes over */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`group relative flex h-10 items-center gap-2 px-3 text-sm transition-colors ${
                      isActive ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span className="relative grid h-1.5 w-1.5 place-items-center" aria-hidden="true">
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full bg-accent"
                          transition={{ duration: 0.4, ease: EASE }}
                        />
                      )}
                    </span>
                    <RollText>{link.label}</RollText>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button type="button" onClick={onOpenResume} className="btn-ghost btn-sm group hidden sm:inline-flex">
              <RollText>Resume</RollText>
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="icon-btn border-transparent text-fg lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu: a full-screen sheet with large links */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-bg pt-[72px] lg:hidden"
          >
            <div className="container-site flex flex-1 flex-col pb-8 pt-8">
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <li key={link.href} className="overflow-hidden border-b border-line">
                    <motion.a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      initial={{ y: '100%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease: EASE }}
                      className="flex items-baseline gap-4 py-4"
                    >
                      <span className="label w-6">{String(i + 1).padStart(2, '0')}</span>
                      <span
                        className={`display text-[2.5rem] leading-none ${active === link.href.slice(1) ? 'text-accent' : ''}`}
                      >
                        {link.label}
                      </span>
                    </motion.a>
                  </li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
                className="mt-auto pt-10"
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onOpenResume();
                  }}
                  className="btn-primary w-full"
                >
                  View resume
                </button>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-fg"
                    >
                      {s.label}
                      <LuArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
