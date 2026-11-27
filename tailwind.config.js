/** @type {import('tailwindcss').Config} */

// Theme colors are CSS variables (see src/index.css) so light & dark share one set of class names.
const token = (name) => `rgb(var(${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: token('--bg'),
        deep: token('--bg-deep'),
        surface: token('--surface'),
        'surface-2': token('--surface-2'),
        line: token('--line'),
        fg: token('--fg'),
        muted: token('--muted'),
        subtle: token('--subtle'),
        accent: token('--accent'),
        'accent-fg': token('--accent-fg'),
        // Marigold in both themes: the hero badge and underline
        gold: token('--gold'),
        'gold-fg': token('--gold-fg'),
        // The palash flower itself: always the bright flame, in both themes (illustration only)
        flame: token('--flame'),
        success: token('--success'),
        danger: token('--danger'),
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      maxWidth: {
        site: '82rem',
      },
      // One easing curve everywhere: a long, soft ease-out.
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.22, 1, 0.36, 1)',
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        DEFAULT: '160ms',
      },
    },
  },
  plugins: [],
};
