import { useCallback, useState } from 'react';

const getInitial = () =>
  typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light';

/**
 * Light / dark theme. The initial value is set by the inline script in index.html
 * (saved choice → system preference), so there is no flash on load.
 */
export function useTheme() {
  const [theme, setTheme] = useState(getInitial);

  const toggle = useCallback(() => {
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
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }, [theme]);

  return { theme, toggle };
}
