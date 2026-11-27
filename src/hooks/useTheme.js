import { useCallback, useState } from 'react';

const getInitial = () =>
  typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light';

/**
 * Light / dark theme. The initial value is set by the inline script in index.html
 * (saved choice → system preference), so there is no flash on load.
 * Pass the click event to `toggle` and the new theme opens as a circle from that point.
 */
export function useTheme() {
  const [theme, setTheme] = useState(getInitial);

  const toggle = useCallback(
    (event) => {
      const next = theme === 'dark' ? 'light' : 'dark';
      const apply = () => {
        document.documentElement.classList.toggle('dark', next === 'dark');
        setTheme(next);
      };

      try {
        localStorage.setItem('theme', next);
      } catch {
        /* storage may be unavailable (private mode) — the toggle still works */
      }

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (document.startViewTransition && !reduceMotion) {
        const root = document.documentElement;
        if (event?.clientX !== undefined) {
          root.style.setProperty('--vt-x', `${event.clientX}px`);
          root.style.setProperty('--vt-y', `${event.clientY}px`);
        }
        document.startViewTransition(apply);
      } else {
        apply();
      }
    },
    [theme]
  );

  return { theme, toggle };
}
