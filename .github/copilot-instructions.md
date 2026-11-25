<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Portfolio Project Instructions

React 19 + Vite portfolio styled with Tailwind CSS 3, animated with Framer Motion, icons from React Icons.

## Where things live
- `src/data/portfolio.js` — **all content** (profile, experience, skills, projects, stats). Edit content here, not in components.
- `src/components/` — one component per section; shared primitives in `src/components/ui/`.
- `src/index.css` — design tokens (CSS variables for light `:root` and dark `.dark`) and component classes (`card`, `chip`, `btn-primary`, `btn-ghost`, `icon-btn`, `input`, `eyebrow`, `spotlight`, `text-gradient`).

## Design guidelines
- Use the token colors (`bg`, `surface`, `surface-2`, `line`, `fg`, `muted`, `subtle`, `accent`, `accent-2`, `success`), never raw Tailwind palette colors. This keeps light and dark themes consistent.
- Fonts: Geist (sans), Geist Mono (labels / code), Instrument Serif italic (accent words in headings).
- New sections should use `SectionHeading` and wrap content in `Reveal` for consistent entrance animations.
- Keep layouts fully responsive (check 375px phones), with no horizontal overflow.
- The resume (`Resume.jsx`) is exported to PDF with html2canvas. Use fixed hex colors there, and avoid `overflow: hidden` truncation and native list markers.

## Code conventions
- Functional components with hooks; semantic HTML; accessible labels for icon-only buttons.
- Respect reduced motion (`MotionConfig reducedMotion="user"` is set in `App.jsx`).
