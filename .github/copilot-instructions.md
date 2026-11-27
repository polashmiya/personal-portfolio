<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Portfolio Project Instructions

React 19 + Vite portfolio styled with Tailwind CSS 3, animated with Framer Motion, smooth scrolling with Lenis, icons from React Icons.

## Where things live
- `src/data/portfolio.js` — **all site content** (profile, statement, experience, skills, projects, stats). Edit content here, not in components. In `profile.statement`, words between `*asterisks*` are lit in the accent color.
- `src/data/resume.js` — the resume (plain data, no imports). `Resume.jsx` + `resume.css` draw it; `npm run resume` (`scripts/resume/build.mjs`) prints `public/Md-Polash-Miya-Resume.pdf` from that component with Edge/Chrome and writes `resume/Md-Polash-Miya-Resume.docx` with the `docx` package, mirroring `resume.css`. Keep it to one A4 page: cut words, don't shrink the type.
- `src/components/` — one component per section; shared primitives in `src/components/ui/`:
  - `Palash.jsx` — the palash mark (logo, badge, separators, intro; `bloom` opens the petals)
  - `TextMotion.jsx` — `SplitLetters`, `RevealWords`, `ScrollLit`, `RollText`, `CountUp`
  - `SectionHeading.jsx` (`SectionLabel` + numbered title), `Reveal.jsx`, `Magnetic.jsx`, `Modal.jsx`
- `src/lib/motion.js` — the easing curve; `src/lib/smoothScroll.js` — Lenis start / lock / scrollTo; `src/lib/intro.js` — first-visit intro timing (the hero waits for it).
- `services` in the data file drive the hero: `phrase` completes "I build …", `short` is the line in the "What I do" strip.
- `src/index.css` — design tokens (CSS variables for light `:root` and dark `.dark`) and component classes (`card`, `chip`, `label`, `display`, `btn-primary`, `btn-ghost`, `btn-sm`, `icon-btn`, `input`, `link`, `roll`).

## Design guidelines
- Direction: indigo & marigold (Bengal's indigo dye and marigold garlands). Dark theme: marigold accent on a deep indigo night with cream text. Light theme: vivid indigo accent and indigo ink on porcelain white with white cards. The palash flower mark (the name means "flame of the forest") is coral in both. Editorial and personal: large serif type, ruled lines, numbered sections.
- Use the token colors (`bg`, `deep`, `surface`, `surface-2`, `line`, `fg`, `muted`, `subtle`, `accent`, `accent-fg`, `gold`, `gold-fg`, `flame`, `success`, `danger`), never raw Tailwind palette colors. `flame` (coral) is for the palash mark only; `gold` (marigold in both themes) is for the hero badge and underline; UI uses `accent`.
- The accent is rare: primary buttons, the hero badge and underline, section index numbers, marked words in the About statement, stat suffixes, the active nav dot, timeline fill, cursor ring, focus ring. No gradients between hues, no gradient text, no glows, colored shadows, glass or blurred color blobs.
- Fonts: Fraunces (`font-display` / `.display`) for headlines, names and big figures, weight 400. Instrument Sans for text and UI. Geist Mono (`.label`) only for small meta: section numbers, dates, counts. Sentence case, no uppercase tracked labels, no italic for emphasis.
- Signature: the palash mark. It appears in the logo, the hero badge, the tech band separators, the intro and the footer name — nowhere else. No Bangla script and no botanical illustrations (the owner tried them and removed them).
- Icons: one set (Lucide via `react-icons/lu`), 16–18px, in the `subtle` or `muted` text color — never brand colors.
- Radius: buttons and icon buttons are pills (`rounded-full`), cards `rounded-[20px]`, skill tags `rounded-[10px]`, chips `rounded-md`. Inputs are underlines.
- Motion: one easing curve `cubic-bezier(0.22, 1, 0.36, 1)` (`EASE`). Motion should answer the reader: entrances on scroll, scroll-linked effects, hover feedback. Springs only critically damped (no bounce). Animate transform and opacity, never layout properties (the cursor ring scales; it doesn't resize). The only things that move on their own are the tech band and the hero's "What I do" rotation (which pauses on hover, off screen and for reduced motion); the hero badge turns only with scroll. No fake progress, like a loader counting to 100.
- Text is never cut off with an ellipsis where it can wrap: list rows wrap on phones and clamp to two lines on desktop.
- Framer Motion writes inline `transform` / `opacity`, which override Tailwind transform and opacity classes on the same element. Put Tailwind offsets or hover opacity on a wrapper or child.
- Overlays with their own scroll area need `data-lenis-prevent`, and call `lockScroll(true/false)` while open.
- Copy: no exclamation marks, no trailing periods on labels, buttons and captions, no hype words.
- New sections should use `SectionHeading` (with the next `index`) and wrap content in `Reveal`.
- Keep layouts fully responsive (check 375px phones), with no horizontal overflow.
- The resume uses fixed print colors and Carlito (metric twin of Calibri, the Word font), never the site tokens.
- `Cursor.jsx`: add `data-cursor="Label"` to an element to show a labeled cursor over it (mouse devices only).

## Code conventions
- Functional components with hooks; semantic HTML; accessible labels for icon-only buttons. Split-text components keep the real text in an `sr-only` span.
- Respect reduced motion (`MotionConfig reducedMotion="user"` is set in `App.jsx`, and Lenis does not start).
