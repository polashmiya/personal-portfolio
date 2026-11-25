import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LuMenu, LuX, LuSun, LuMoon, LuFileText } from 'react-icons/lu';
import { navLinks, profile } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';
import { useTheme } from '../hooks/useTheme';

// 'home' is observed too, so no link is highlighted while the hero is on screen.
const sectionIds = ['home', ...navLinks.map((l) => l.href.slice(1))];

export function Logo({ className = '' }) {
  return (
    <a href="#home" className={`group flex items-center gap-2.5 ${className}`} aria-label={`${profile.name} — home`}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-fg text-[13px] font-bold tracking-tight text-bg transition-transform duration-300 group-hover:rotate-[-6deg]">
        {profile.initials}
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-gradient-accent" />
      </span>
      <span className="hidden text-[15px] font-semibold tracking-tight text-fg sm:block">
        {profile.firstName}
        <span className="text-accent">.</span>
      </span>
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
      className="icon-btn h-9 w-9 border-transparent bg-transparent hover:bg-surface-2"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25 }}
        >
          {isDark ? <LuSun className="h-[18px] w-[18px]" /> : <LuMoon className="h-[18px] w-[18px]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default function Navbar({ onOpenResume }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape or when resizing up to desktop
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Primary"
        className={`mx-auto flex max-w-site items-center justify-between rounded-full py-2 pl-3 pr-2 transition-all duration-500 ${
          scrolled || open
            ? 'glass shadow-[0_8px_32px_-12px_rgb(0_0_0/0.35)]'
            : 'border border-transparent bg-transparent'
        }`}
      >
        <Logo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative isolate block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-line bg-surface-2"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <button type="button" onClick={onOpenResume} className="btn-primary hidden px-4 py-2 sm:inline-flex">
            <LuFileText className="h-4 w-4" />
            Resume
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="icon-btn h-9 w-9 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <LuX className="h-[18px] w-[18px]" /> : <LuMenu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="glass mx-auto mt-2 max-w-site overflow-hidden rounded-3xl p-3 shadow-2xl md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition-colors ${
                      active === link.href.slice(1) ? 'bg-surface-2 text-fg' : 'text-muted hover:bg-surface-2/60 hover:text-fg'
                    }`}
                  >
                    {link.label}
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onOpenResume();
              }}
              className="btn-primary mt-2 w-full"
            >
              <LuFileText className="h-4 w-4" />
              View Resume
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
