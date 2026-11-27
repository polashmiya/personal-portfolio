# Md. Polash Miya — Portfolio

Personal portfolio of **Md. Polash Miya**, software engineer (React · Next.js · ASP.NET Core · React Native · Flutter).

**Live:** https://polash-portfolio.vercel.app

## Features

- **Dark-first design** with a light theme. The visitor's choice is remembered, and the first visit follows their system setting with no flash on load.
- **Indigo & marigold design.** Dark theme: marigold on a deep indigo night; light theme: indigo ink on porcelain white, with marigold on the hero badge and underline. The logo is a palash flower mark in coral. Fraunces for headlines, Instrument Sans for text.
- **Motion with a purpose:** smooth scrolling (Lenis), a short intro on the first visit, a letter-by-letter name reveal, a headline that rolls through the kinds of work in step with a "What I do" strip, an arch outline that draws itself and a turning badge in the hero, an About statement that lights up as you read it, a timeline that fills as you scroll, sticky stacking project cards, a project index with a cursor-following preview, rolling hover labels, a cursor ring that labels project screenshots, and a circular theme switch. Everything respects reduced-motion settings.
- **Sections:** hero (with what I do, work and resume), tech band, about, experience timeline, skills, projects (featured stack + filterable index with detail modals), contact.
- **Illustrated project covers.** Projects without a screenshot get a generated mockup in their own colors. Add a screenshot any time.
- **Resume from one data file:** `src/data/resume.js` drives the A4 preview on the site, the downloadable PDF (`public/Md-Polash-Miya-Resume.pdf`) and a Word version (`resume/Md-Polash-Miya-Resume.docx`). After editing it, run `npm run resume` (needs Microsoft Edge or Google Chrome).
- **Working contact form** via [Web3Forms](https://web3forms.com), with a pre-filled email fallback.
- **Accessible:** keyboard-friendly modals (focus trap, Escape), skip link, visible focus rings, reduced-motion support.
- **SEO:** meta description, Open Graph / Twitter card image, JSON-LD `Person` schema, sitemap and robots.txt.
- **Fast:** WebP images (~250 KB total), vendor chunk splitting, lazy-loaded resume/PDF code.

## Tech stack

React 19 · Vite 6 · Tailwind CSS 3 · Framer Motion · Lenis · React Icons · docx + Playwright (resume build only)

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build
npm run lint
```

### Contact form (optional)

1. Get a free access key at [web3forms.com](https://web3forms.com), using the email address that should receive messages.
2. Copy `.env.example` to `.env.local` and set `VITE_WEB3FORMS_ACCESS_KEY`.
3. On Vercel, add the same variable under **Project → Settings → Environment Variables**, then redeploy.

Without a key, the form opens the visitor's email app with their message pre-filled, so no message is lost.

## Updating content

**Site content lives in [`src/data/portfolio.js`](src/data/portfolio.js)** (profile, bio, experience, skills, projects and stats). **The resume lives in [`src/data/resume.js`](src/data/resume.js)**; run `npm run resume` after changing it.

- **Add a project:** add an entry to `projects`. Set `featured: true` to show it in the large cards at the top.
- **Use a real screenshot:** put a `.webp` in `src/assets/`, import it at the top of the data file and set `image` on the project. Otherwise, `cover.variant` (`pos`, `dashboard`, `store`, `blog`, `phone` or `game`) and `cover.hue` control the illustrated cover.
- **Availability badge:** set `profile.available` to `false` to hide "Open to new roles".
- **Years of experience** is calculated from `CAREER_START`, so it stays current.

## Project structure

```
src/
├── data/portfolio.js        # ← all site content
├── components/
│   ├── Navbar.jsx  Hero.jsx  TechMarquee.jsx  About.jsx
│   ├── Experience.jsx  Skills.jsx  Projects.jsx  Contact.jsx  Footer.jsx
│   ├── ProjectCover.jsx     # illustrated project thumbnails
│   ├── ProjectModal.jsx  Resume.jsx  ResumeModal.jsx  ScrollChrome.jsx
│   ├── Intro.jsx            # first-visit curtain
│   └── ui/                  # Modal, Reveal, SectionHeading, TextMotion, Magnetic, Palash (mark)
├── hooks/                   # useTheme, useActiveSection, useLocalTime, useMediaQuery
├── lib/                     # motion constants, smooth scroll (Lenis), intro timing
└── index.css                # design tokens (light/dark) + component classes
public/                      # favicon, OG image, robots.txt, sitemap.xml
```

## Design tokens

Colors are CSS variables defined in `src/index.css` (`:root` for light, `.dark` for dark) and exposed to Tailwind as `bg`, `deep`, `surface`, `surface-2`, `line`, `fg`, `muted`, `subtle`, `accent`, `accent-fg`, `flame`, `success` and `danger`. `accent` is the flame used for actions and marks (darker on light so text on it stays readable), and `flame` is the coral of the palash mark.

## Contact

Md. Polash Miya — [polashmiya2015@gmail.com](mailto:polashmiya2015@gmail.com) · [LinkedIn](https://www.linkedin.com/in/md-polash-miya-726667193/) · [GitHub](https://github.com/polashmiya)
