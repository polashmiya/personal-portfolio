# Md. Polash Miya — Portfolio

Personal portfolio of **Md. Polash Miya**, full-stack software engineer (React · Next.js · ASP.NET Core · React Native · Flutter).

**Live:** https://polash-portfolio.vercel.app

## Features

- **Dark-first design** with a light theme. The visitor's choice is remembered, and the first visit follows their system setting with no flash on load.
- **Sections:** hero, tech marquee, about (bento), experience timeline, skills, projects (featured + filterable grid with detail modals), contact.
- **Illustrated project covers.** Projects without a screenshot get a generated mockup in their own colors. Add a screenshot any time.
- **Resume built from the same data:** A4 preview with one-click PDF download. The PDF library loads only when needed.
- **Working contact form** via [Web3Forms](https://web3forms.com), with a pre-filled email fallback.
- **Accessible:** keyboard-friendly modals (focus trap, Escape), skip link, visible focus rings, reduced-motion support.
- **SEO:** meta description, Open Graph / Twitter card image, JSON-LD `Person` schema, sitemap and robots.txt.
- **Fast:** WebP images (~250 KB total), vendor chunk splitting, lazy-loaded resume/PDF code.

## Tech stack

React 19 · Vite 6 · Tailwind CSS 3 · Framer Motion · React Icons

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

**All content lives in [`src/data/portfolio.js`](src/data/portfolio.js).** That covers the profile, bio, experience, skills, projects and stats. Every section and the downloadable resume read from it.

- **Add a project:** add an entry to `projects`. Set `featured: true` to show it in the large cards at the top.
- **Use a real screenshot:** put a `.webp` in `src/assets/`, import it at the top of the data file and set `image` on the project. Otherwise, `cover.variant` (`pos`, `dashboard`, `store`, `blog`, `phone` or `game`) and `cover.hue` control the illustrated cover.
- **Availability badge:** set `profile.available` to `false` to hide "Open to new opportunities".
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
│   └── ui/                  # Modal, Reveal, SectionHeading, SocialIcon, helpers
├── hooks/                   # useTheme, useActiveSection
└── index.css                # design tokens (light/dark) + component classes
public/                      # favicon, OG image, robots.txt, sitemap.xml
```

## Design tokens

Colors are CSS variables defined in `src/index.css` (`:root` for light, `.dark` for dark) and exposed to Tailwind as `bg`, `surface`, `surface-2`, `line`, `fg`, `muted`, `subtle`, `accent`, `accent-2` and `success`. Change the accent once and the whole site follows.

## Contact

Md. Polash Miya — [polashmiya2015@gmail.com](mailto:polashmiya2015@gmail.com) · [LinkedIn](https://www.linkedin.com/in/md-polash-miya-726667193/) · [GitHub](https://github.com/polashmiya)
