/**
 * All portfolio content lives here. Edit this file to update the site —
 * every section (and the downloadable resume) reads from it.
 */
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiRedux,
  SiTailwindcss,
  SiAntdesign,
  SiMui,
  SiReactquery,
  SiReacthookform,
  SiFramer,
  SiDotnet,
  SiNodedotjs,
  SiExpress,
  SiSwagger,
  SiJsonwebtokens,
  SiPostgresql,
  SiMongodb,
  SiSqlite,
  SiSupabase,
  SiFlutter,
  SiDart,
  SiElectron,
  SiExpo,
  SiKotlin,
  SiGit,
  SiGithubactions,
  SiVercel,
  SiPostman,
  SiVite,
  SiVitest,
  SiPnpm,
  SiHtml5,
} from 'react-icons/si';
import { TbBrandCSharp, TbBrandReactNative, TbApi, TbTestPipe } from 'react-icons/tb';
import { DiMsqlServer } from 'react-icons/di';

import profileImg from '../assets/profile.webp';
import avatarImg from '../assets/avatar.webp';
import superShopImg from '../assets/project-super-shop-pos.webp';
import superShopDashboardImg from '../assets/project-super-shop-pos-dashboard.webp';
import superShopReportsImg from '../assets/project-super-shop-pos-reports.webp';
import eGadgetImg from '../assets/project-egadget.webp';
import polashDiaryImg from '../assets/project-polash-diary.webp';
import restaurantPosImg from '../assets/project-restaurant-pos.webp';
import mediNestImg from '../assets/project-medinest.webp';
import erpSolutionImg from '../assets/project-erp-solution.webp';
import erpSolutionLoginImg from '../assets/project-erp-solution-login.webp';
import coreliumImg from '../assets/project-corelium.webp';
import coreliumLoginImg from '../assets/project-corelium-login.webp';
import ukCoachingImg from '../assets/project-uk-coaching.webp';
import ukCoachingSiteImg from '../assets/project-uk-coaching-site.webp';
import furniBdImg from '../assets/project-furnibd.webp';

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export const CAREER_START = new Date('2022-04-01');

/** Whole years since the first full-time role, so the number never goes stale. */
export const yearsOfExperience = () => {
  const ms = Date.now() - CAREER_START.getTime();
  return Math.max(1, Math.floor(ms / (365.25 * 24 * 60 * 60 * 1000)));
};

export const profile = {
  name: 'Md. Polash Miya',
  firstName: 'Polash',
  initials: 'PM',
  role: 'Software Engineer',
  currentTitle: 'Software Engineer II',
  company: 'AKIJ iBOS Limited',
  location: 'Uttara, Dhaka, Bangladesh',
  shortLocation: 'Dhaka, Bangladesh',
  timezone: 'Asia/Dhaka',
  email: 'polashmiya2015@gmail.com',
  phone: '+88 01719 623984',
  phoneHref: 'tel:+8801719623984',
  siteUrl: 'https://polash-portfolio.vercel.app',
  available: true,
  image: profileImg,
  avatar: avatarImg,
  // Subhead under the hero headline
  tagline:
    'Software Engineer II at AKIJ iBOS Limited, working in React, Next.js and ASP.NET Core. On my own time I build offline-first POS systems and Bangla / English mobile apps.',
  // The large statement at the top of About, lit word by word as it scrolls past (*words* get the accent)
  statement:
    'I’m a software engineer in Dhaka. At AKIJ iBOS Limited I build the *ERP software* businesses run on every day, from sales, purchase and accounts to HR. On my own time I build *offline-first point-of-sale systems* and *bilingual Bangla and English apps.*',
  summary:
    'Software engineer with hands-on experience building scalable ERP solutions, responsive web applications and RESTful API integrations. Comfortable across React / TypeScript front ends and ASP.NET Core / Node.js back ends, with a strong focus on clean architecture, reusable components and business-critical delivery.',
  bio: [
    'I’m a software engineer based in Dhaka. At AKIJ iBOS Limited I build ERP software that real businesses run on every day — from sales, purchase and accounts to HR, promotions and insurance — for products like Managerium, Apon Bazar and AKIJ ERP.',
    'My core is React and TypeScript on the front end and ASP.NET Core and Node.js on the back end. Outside of work I build offline-first point-of-sale systems with Electron, mobile apps with React Native and Flutter, and bilingual (Bangla / English) products designed around how people here actually work.',
    'I care about clean architecture, reusable components, real test coverage and interfaces that are easy to use.',
  ],
};

export const socials = [
  { label: 'GitHub', href: 'https://github.com/polashmiya', handle: '@polashmiya' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/md-polash-miya-726667193/', handle: 'in/md-polash-miya' },
  { label: 'Email', href: `mailto:${profile.email}`, handle: profile.email },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

/* ------------------------------------------------------------------ */
/* What I do                                                           */
/* ------------------------------------------------------------------ */

/**
 * Shown in the hero: `phrase` completes "I build …" and rolls through in turn,
 * `short` is the one-line description in the hero's "What I do" strip.
 */
export const services = [
  {
    key: 'web',
    title: 'Web applications',
    phrase: 'ERP web applications',
    short: 'React and Next.js apps with clean, reusable components',
    text: 'Fast, accessible React and Next.js apps with a clean component architecture and responsive UI.',
  },
  {
    key: 'backend',
    title: 'APIs and back end',
    phrase: 'APIs and back ends',
    short: 'ASP.NET Core and Node.js services with auth and roles',
    text: 'ASP.NET Core and Node.js services with REST APIs, auth, role-based permissions and solid data models.',
  },
  {
    key: 'mobile',
    title: 'Mobile apps',
    phrase: 'mobile apps',
    short: 'React Native and Flutter apps that keep working offline',
    text: 'Cross-platform apps with React Native, Expo and Flutter — offline-first, bilingual and tested.',
  },
  {
    key: 'desktop',
    title: 'Desktop and POS',
    phrase: 'offline POS systems',
    short: 'Electron point of sale with local data and thermal printing',
    text: 'Electron point-of-sale software with local databases, thermal printing and zero internet dependency.',
  },
];

export const principles = ['Clean architecture', 'Offline-first', 'Bangla + English UX', 'Tested & typed', 'Accessible UI'];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export const experience = [
  {
    company: 'AKIJ iBOS Limited',
    companyNote: 'An AKIJ Company',
    employment: 'Full-time · On-site',
    location: 'Dhaka, Bangladesh',
    roles: [
      {
        title: 'Software Engineer II',
        period: 'Jul 2026 — Present',
        start: '2026-07-01',
        current: true,
        points: [
          'Build and maintain scalable full-stack ERP applications with React on the front end and ASP.NET Core Web APIs on the back end',
          'Integrate front-end modules with RESTful APIs for real-time data flow across ERP modules',
          'Partner with UX/UI designers to ship consistent, user-friendly interfaces that improve productivity and reduce user errors',
          'Take part in code reviews, feature planning and agile delivery of high-quality ERP releases',
        ],
        tech: ['React', 'Next.js', 'React Native', 'ASP.NET Core', 'SQL Server', 'Software Design', 'Software Infrastructure', 'REST APIs'],
      },
      {
        title: 'Software Engineer I',
        period: 'Jul 2024 — Jun 2026',
        start: '2024-07-01',
        end: '2026-06-01',
        points: [
          'Created and maintained responsive React applications with cross-browser compatibility',
          'Integrated front-end modules with back-end RESTful APIs',
          'Collaborated with UX designers to deliver a consistent experience on every device',
        ],
        tech: ['React', 'JavaScript', 'Next.js', 'ASP.NET Core', 'SQL Server', 'Redux', 'Tailwind CSS'],
      },
      {
        title: 'Junior Software Engineer',
        period: 'Apr 2022 — Jun 2024',
        start: '2022-04-01',
        end: '2024-06-01',
        points: [
          'Developed responsive, interactive web interfaces with React that improved ERP module usability',
          'Debugged issues, resolved defects and optimized performance to keep business workflows smooth',
          'Contributed across ERP modules, gaining hands-on experience integrating front ends with back-end services',
        ],
        tech: ['JavaScript', 'React', 'Redux', 'HTML & CSS'],
      },
    ],
    products: [
      {
        name: 'Managerium',
        kind: 'ERP solution',
        text: 'Lead front-end developer — shaped core modules including sales, purchase, accounts and HR',
      },
      {
        name: 'Apon Bazar',
        kind: 'For Apon Wellbeing Ltd',
        text: 'Led the Promotion Management module and built key features of Insurance Management',
      },
      {
        name: 'AKIJ ERP',
        kind: 'For AKIJ Group',
        text: 'Delivered Internal Expense, Advance in Payment and Internal Control features',
      },
    ],
  },
];

export const education = {
  institute: 'Dhaka Polytechnic Institute',
  degree: 'Diploma in Engineering — Computer Technology (CMT)',
  location: 'Dhaka, Bangladesh',
};

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export const skillGroups = [
  {
    key: 'frontend',
    title: 'Frontend',
    blurb: 'Interfaces that are fast, accessible and easy to use',
    skills: [
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'Redux / RTK Query', icon: SiRedux },
      { name: 'TanStack Query', icon: SiReactquery },
      { name: 'React Hook Form', icon: SiReacthookform },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Ant Design', icon: SiAntdesign },
      { name: 'Material UI', icon: SiMui },
      { name: 'Framer Motion', icon: SiFramer },
      { name: 'HTML & CSS', icon: SiHtml5 },
    ],
  },
  {
    key: 'backend',
    title: 'Backend',
    blurb: 'Reliable APIs with clear contracts and sensible data models',
    skills: [
      { name: 'ASP.NET Core', icon: SiDotnet },
      { name: 'C#', icon: TbBrandCSharp },
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express', icon: SiExpress },
      { name: 'REST APIs', icon: TbApi },
      { name: 'JWT Auth', icon: SiJsonwebtokens },
      { name: 'Swagger / OpenAPI', icon: SiSwagger },
    ],
  },
  {
    key: 'mobile',
    title: 'Mobile & desktop',
    blurb: 'Cross-platform apps that keep working offline',
    skills: [
      { name: 'React Native', icon: TbBrandReactNative },
      { name: 'Expo', icon: SiExpo },
      { name: 'Flutter', icon: SiFlutter },
      { name: 'Dart', icon: SiDart },
      { name: 'Electron', icon: SiElectron },
      { name: 'Kotlin', icon: SiKotlin },
    ],
  },
  {
    key: 'data',
    title: 'Databases',
    blurb: 'Relational and document stores, on the server or on the device',
    skills: [
      { name: 'SQL Server', icon: DiMsqlServer },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'SQLite', icon: SiSqlite },
      { name: 'Supabase', icon: SiSupabase },
    ],
  },
  {
    key: 'tools',
    title: 'Tooling & testing',
    blurb: 'The workflow that keeps quality high and releases boring',
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub Actions', icon: SiGithubactions },
      { name: 'Vite', icon: SiVite },
      { name: 'Vitest', icon: SiVitest },
      { name: 'Playwright', icon: TbTestPipe },
      { name: 'pnpm', icon: SiPnpm },
      { name: 'Postman', icon: SiPostman },
      { name: 'Vercel', icon: SiVercel },
    ],
  },
];

export const skillCount = skillGroups.reduce((n, g) => n + g.skills.length, 0);

/** Logos for the scrolling tech strip */
export const marquee = [
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'ASP.NET Core', icon: SiDotnet },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'React Native', icon: TbBrandReactNative },
  { name: 'Flutter', icon: SiFlutter },
  { name: 'Electron', icon: SiElectron },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Redux', icon: SiRedux },
  { name: 'SQL Server', icon: DiMsqlServer },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'SQLite', icon: SiSqlite },
  { name: 'Expo', icon: SiExpo },
  { name: 'Vite', icon: SiVite },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

const gh = (repo) => `https://github.com/polashmiya/${repo}`;

/**
 * `cover` drives the illustrated thumbnail when there is no screenshot:
 *   variant: 'pos' | 'dashboard' | 'store' | 'blog' | 'phone' | 'game' | 'terminal'
 *   hue:     one project color used inside the illustration
 * Drop a screenshot into src/assets and set `image` to replace it.
 *
 * Optional extras shown in the project modal:
 *   gallery: [{ src, caption }]      more screenshots (the main `image` is always first)
 *   demo:    'how to sign in…'       login hint for live demos
 *   links:   [{ label, href }]       extra buttons (e.g. an admin panel)
 */
export const projects = [
  {
    id: 'super-shop-pos',
    title: 'Super Shop POS',
    tagline: 'Offline-first supermarket point of sale',
    category: 'desktop',
    featured: true,
    year: '2026',
    image: superShopImg,
    cover: { variant: 'pos', hue: '#6dbe7b' },
    description:
      'A bilingual (Bangla / English) supermarket POS that runs as a desktop app and in the browser from one codebase. Barcode checkout, VAT, split payments, returns, inventory, suppliers and thermal receipts — all on a local SQLite database, with no internet required.',
    highlights: [
      'Keyboard-first checkout (scan → add → pay) with two cashier layouts: product grid or scan-only counter',
      'Exact money math in poisha — no floating-point errors — with inclusive / exclusive VAT at multiple rates',
      'Split payments across cash, card, bKash, Nagad, Rocket and loyalty points',
      'Returns with manager approval and a full audit trail; completed sales are never edited',
      'Inventory with low-stock and expiry alerts, purchase orders and goods receiving (GRN)',
      '80 mm / 58 mm thermal receipts and A4 invoices, printed in the language of the sale',
      'Unit tests with Vitest and end-to-end tests with Playwright against the real Electron app',
    ],
    tech: ['Electron', 'React', 'TypeScript', 'SQLite (WASM)', 'Zustand', 'Tailwind CSS', 'Vitest', 'Playwright'],
    github: gh('super-shop-pos-software'),
    live: 'https://super-shop-pos-software.vercel.app',
    demo: 'Pick any demo staff member on the login screen — their PIN is shown on the card (e.g. 1111).',
    gallery: [
      { src: superShopImg, caption: 'Checkout counter' },
      { src: superShopDashboardImg, caption: 'Sales dashboard' },
      { src: superShopReportsImg, caption: '25 built-in reports' },
    ],
  },
  {
    id: 'corelium',
    title: 'Corelium ERP',
    tagline: 'Enterprise suite for growing businesses',
    category: 'web',
    featured: true,
    year: '2026',
    image: coreliumImg,
    cover: { variant: 'dashboard', hue: '#6dbe7b' },
    description:
      'An enterprise resource planning suite covering purchase, sales, accounts, inventory, configuration and approval workflows, with an executive dashboard of sales, purchases, collections, receivables, payables, margins and cash flow.',
    highlights: [
      'Executive KPIs: sales, purchases, collections, receivables, payables, gross margin and stock value',
      'Charts for sales vs purchase, top items, top customers and suppliers, expenses and cash flow',
      'Purchase, sales, accounts and inventory modules with approval workflows',
      'Multi-language interface with i18next and a polished Ant Design UI',
    ],
    tech: ['React', 'Ant Design', 'Redux Toolkit', 'i18next', 'Recharts', 'Tailwind CSS'],
    github: gh('sme-front'),
    live: 'https://corelium-erp.vercel.app',
    demo: 'Sign in with polash@gmail.com and password 123456.',
    gallery: [
      { src: coreliumImg, caption: 'Dashboard' },
      { src: coreliumLoginImg, caption: 'Sign-in' },
    ],
  },
  {
    id: 'medinest',
    title: 'MediNest',
    tagline: 'Online pharmacy & healthcare storefront',
    category: 'web',
    featured: true,
    year: '2026',
    image: mediNestImg,
    cover: { variant: 'store', hue: '#4ba8a0' },
    description:
      'The full online-pharmacy journey — browse, search, product details, cart, checkout and order tracking — built with Next.js 16 and React 19 over a service layer that can be pointed at a real backend without touching the UI.',
    highlights: [
      'Catalog of 2,400+ products across 12 departments, with generic-name search and alternative brands',
      'Typeahead search across products, generics, categories and brands',
      'Checkout with coupons, delivery zones, cold-chain rules and prescription upload for Rx items',
      'Per-device display settings: theme, six colour presets, fonts, density and more',
      'App-style mobile UX with a bottom tab bar, bottom sheets and an installable web-app manifest',
      'SEO-ready: server rendering, sitemap, JSON-LD structured data and generated Open Graph images',
    ],
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Zustand'],
    github: gh('medinest-ecommerce'),
    live: 'https://medinest-ecommerce-pi.vercel.app',
  },
  {
    id: 'restaurant-pos',
    title: 'Restaurant POS',
    tagline: 'Fully offline restaurant POS for desktop',
    category: 'desktop',
    year: '2026',
    image: restaurantPosImg,
    cover: { variant: 'pos', hue: '#f2a33a' },
    description:
      'A restaurant point of sale for Windows, macOS and Linux that handles ordering, tables, payments, kitchen tickets, receipts, shifts and reports with Wi-Fi off. Bangla by default, English one tap away.',
    highlights: [
      'Touch-friendly split-screen ordering with search by Bangla name, English name or item code',
      'Dine-in, takeaway and delivery orders, with hold / resume that never loses an order',
      'Table floor plan drawn in isometric 3D or top-down, with live availability and guest counts',
      'Transaction-safe flow: a failed save changes nothing and a failed print never affects the saved order',
      'Incremental kitchen tickets (KOT) and 80 / 58 mm thermal receipts in Bangla or English',
      'Reports with period comparisons and busiest hours, plus shift close with over / short tracking',
      'Responsive from a 360 px phone to a wide monitor, with F1–F9 shortcuts and accessible dialogs',
    ],
    tech: ['Electron', 'React', 'TypeScript', 'Zustand', 'i18next', 'Tailwind CSS', 'Vitest', 'Playwright'],
    github: gh('restaurant-pos-electron'),
    live: 'https://restaurant-pos-electron.vercel.app',
    demo: 'The live demo runs in browser-preview mode — no login needed, and orders are saved only in your browser.',
  },
  {
    id: 'erp-solution',
    title: 'ERP Solution',
    tagline: 'Inventory, purchasing & POS operations hub',
    category: 'web',
    year: '2026',
    image: erpSolutionImg,
    cover: { variant: 'dashboard', hue: '#6dbe7b' },
    description:
      'An operations hub for inventory and supply chain: live stock KPIs, incoming shipments, purchase-order tracking, stock-level trends and a logistics activity feed — alongside POS sales, purchase receiving, items, suppliers and a Smart PO (AI) module.',
    highlights: [
      'Operations dashboard with stock, shipment, open-PO and inventory-turn KPIs',
      'Modules for POS sales, purchase receiving, items, suppliers and Smart PO (AI)',
      'Purchase-order table with search, status chips, pagination and activity comments',
      'Typed forms with React Hook Form + Zod and server state with TanStack Query',
      'Demo mode with realistic sample data — explore everything without a backend',
    ],
    tech: ['React', 'TypeScript', 'Mantine', 'TanStack Query', 'React Hook Form', 'Zod', 'Recharts'],
    github: gh('erp-solution'),
    live: 'https://erp-solution-tau.vercel.app',
    demo: 'Click “Continue in demo mode”, or sign in with polash / 123456.',
    gallery: [
      { src: erpSolutionImg, caption: 'Operations dashboard' },
      { src: erpSolutionLoginImg, caption: 'Sign-in' },
    ],
  },
  {
    id: 'my-erp',
    title: 'myErp — Configurable ERP',
    tagline: 'Multi-tenant ERP driven by configuration',
    category: 'web',
    year: '2026',
    cover: { variant: 'dashboard', hue: '#7fa7d9' },
    description:
      'One ERP codebase whose screens and data shape are configured per account. An internal Panel app sets up accounts, business units, fields and layouts; the client ERP renders its UI from that resolved configuration, served by an ASP.NET Core API.',
    highlights: [
      'pnpm monorepo with two React 19 apps (Panel + ERP) and an ASP.NET Core (.NET 10) API',
      'Tenant isolation enforced by global EF Core query filters per account and business unit',
      'Fine-grained permissions as module.feature.action codes — enforced on every endpoint and reflected in the UI',
      'Type-safe API client generated from OpenAPI (orval) into TanStack Query hooks',
      'JWT authentication, EF Core migrations and seeded demo tenants for instant onboarding',
      'Tested with Vitest, dotnet test and Playwright end-to-end suites',
    ],
    tech: ['React 19', 'TypeScript', 'Ant Design', 'TanStack Query', 'ASP.NET Core', 'EF Core', 'SQL Server', 'Playwright'],
    github: gh('all-in-one-erp'),
  },
  {
    id: 'uk-coaching',
    title: 'UK Coaching',
    tagline: 'Coaching-centre website & management system',
    category: 'web',
    year: '2026',
    image: ukCoachingImg,
    cover: { variant: 'dashboard', hue: '#7fa7d9' },
    description:
      'A Bangla-first platform for coaching centres: a public website for courses, teachers and admissions, plus a management dashboard for students, batches, attendance, exams, results, payments and more — with separate admin, teacher and student logins.',
    highlights: [
      'Public website with courses, faculty, gallery and an admission enquiry form',
      'Admin dashboard with enrolment, batch, revenue and attendance KPIs plus income analytics',
      'Modules for students, teachers, batches, courses, attendance, exams, results, payments, accounts, notices and assignments',
      'Role-based demo accounts for admin, teacher and student',
      'Bangla and English interface',
    ],
    tech: ['TanStack Start', 'React', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'Zustand', 'Recharts'],
    github: gh('coaching-management-v1'),
    live: 'https://coaching-management-v1-neon.vercel.app',
    demo: 'Use the one-click demo accounts on the login page (password: password).',
    gallery: [
      { src: ukCoachingImg, caption: 'Admin dashboard' },
      { src: ukCoachingSiteImg, caption: 'Public website' },
    ],
  },
  {
    id: 'furnibd',
    title: 'FurniBD',
    tagline: 'Furniture store for Bangladeshi homes',
    category: 'web',
    year: '2026',
    image: furniBdImg,
    cover: { variant: 'store', hue: '#6dbe7b' },
    description:
      'A modern furniture storefront for Bangladeshi homes with a hero-led landing page, category browsing, a shop with product listings, wishlist, orders and account login.',
    highlights: [
      'Editorial landing page with curated categories',
      'Shop, wishlist and order pages',
      'Light / dark theme',
      'Responsive UI built from shadcn/ui components',
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'TanStack Query'],
    github: gh('furniBD'),
    live: 'https://furni-bd.vercel.app',
  },
  {
    id: 'e-gadget',
    title: 'E-Gadget',
    tagline: 'E-commerce store for tech gadgets',
    category: 'web',
    year: '2025',
    image: eGadgetImg,
    cover: { variant: 'store', hue: '#7fa7d9' },
    description:
      'A responsive e-commerce storefront with category browsing, product listings, a persistent cart, validated checkout and user authentication.',
    highlights: [
      'Product catalog with mega-menu categories, filtering and search',
      'Persistent cart and checkout flow with form validation (React Hook Form)',
      'User authentication with protected routes',
      'Light / dark theme and smooth UI transitions with Framer Motion',
      'Mobile-first responsive UI, deployed on Vercel',
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'React Hook Form', 'React Router', 'Framer Motion'],
    github: gh('eGadget_Ecommerce'),
    live: 'https://e-gadget-ecommerce.vercel.app/',
  },
  {
    id: 'polash-diary',
    title: 'Polash Diary',
    tagline: 'Full-stack blogging platform',
    category: 'web',
    year: '2025',
    image: polashDiaryImg,
    cover: { variant: 'blog', hue: '#d9774b' },
    description:
      'A clean, fast blog where anyone can sign up, write posts with a rich-text editor and join the conversation in the comments — backed by its own REST API.',
    highlights: [
      'Rich-text editor (TipTap) with code-block syntax highlighting and Markdown rendering',
      'Category tabs, search and a responsive card grid',
      'Signup / login, post creation and comments through a remote REST API',
      'Express + MongoDB API with JWT auth, file uploads and Swagger documentation',
    ],
    tech: ['React', 'Tailwind CSS', 'TipTap', 'Express', 'MongoDB', 'JWT', 'Swagger'],
    github: gh('polashDiary'),
    api: gh('polash-dairy-api'),
    live: 'https://polash-diary.vercel.app/',
  },
  {
    id: 'sellzy',
    title: 'Sellzy Storefront',
    tagline: 'Multi-vendor, multi-language e-commerce',
    category: 'web',
    year: '2026',
    cover: { variant: 'store', hue: '#4ba8a0' },
    description:
      'A complete e-commerce storefront built on the Next.js App Router: 38 localized pages covering shop, product, compare, cart, checkout and order tracking, customer accounts, a blog and careers, plus vendor registration and a vendor dashboard.',
    highlights: [
      '38 pages including shop, search, product compare, cart, checkout and order success / tracking',
      'Five locales (English, English-SG, German, French, Italian) with next-intl routing',
      'Customer area with orders, addresses, notifications, wishlist and settings',
      'Vendor registration and vendor dashboard for a multi-vendor marketplace',
      'Cart and wishlist state with Zustand; a mock-data mode for running without the API',
    ],
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'next-intl', 'Zustand'],
    github: gh('ecommerce-sellzy-template'),
  },
  {
    id: 'crm-deal-room',
    title: 'CRM Deal Room',
    tagline: 'Collaborative B2B deal workspace',
    category: 'web',
    year: '2025',
    cover: { variant: 'dashboard', hue: '#4ba8a0' },
    description:
      'A shared workspace for a single B2B deal, where sellers and buyers track stakeholders, proposals, contracts, meetings, document requisitions and compliance in one place — with a built-in chat panel.',
    highlights: [
      'Collapsible sidebar with sections for overview, activities, proposals, contracts, meetings, requisitions and compliance',
      'Stakeholder directory with detail pages',
      'In-room chat panel for buyer–seller conversations',
      'Document-level permissions modelled in a typed Redux Toolkit store',
    ],
    tech: ['React', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS'],
    github: gh('crm-deal-room'),
  },
  {
    id: 'math-world',
    title: 'Math World',
    tagline: 'Offline maths learning & exam prep app',
    category: 'mobile',
    year: '2026',
    cover: { variant: 'phone', hue: '#e86f5c' },
    description:
      'A complete, fully offline mathematics learning, practice, brain-training and competitive-exam platform for Android and iOS. No backend, no account — and architected so a backend can be added later without a rewrite.',
    highlights: [
      'Layered clean architecture — the UI never talks to SQLite directly',
      'Use-case services over repository interfaces with a swappable SQLite adapter',
      '682 automated tests across the question engine and UI',
      'Content and question-generator validation built into the toolchain',
    ],
    tech: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'Zustand'],
    github: gh('math-world-react-native'),
  },
  {
    id: 'arthik',
    title: 'Arthik',
    tagline: 'Personal finance & smart tally app',
    category: 'mobile',
    year: '2026',
    cover: { variant: 'phone', hue: '#6dbe7b' },
    description:
      'An offline-first Android finance app with expense tracking, budgets, a Tally-style personal ledger, voice entry in Bangla, English or Banglish and a local financial-insight engine. Every byte stays on the device.',
    highlights: [
      'Voice entry that understands Bangla, English and Banglish',
      'Budgets, expense tracking and a Tally-style personal ledger',
      'On-device insight engine — no backend, no network calls',
      'Repository-style architecture ready for a future sync backend',
      '57 unit tests covering the parser, calculator and date maths',
    ],
    tech: ['Flutter', 'Dart', 'Hive'],
    github: gh('takar-hisab-flutter'),
  },
  {
    id: 'voice-studio',
    title: 'Voice Studio',
    tagline: 'Offline Bangla / English text-to-speech',
    category: 'mobile',
    year: '2026',
    cover: { variant: 'phone', hue: '#4ba8a0' },
    description:
      'An Android app that turns Bangla, English and Banglish text into natural speech entirely on the phone, running open-source TTS models with sherpa-onnx. No cloud, no paid API, no account.',
    highlights: [
      'Text pipeline that reads numbers, money, dates, units and acronyms correctly in both languages',
      'On-device inference on a background thread, cancellable, with crash recovery',
      'Read-along sentence highlighting and a full player with lock-screen controls',
      'Export to WAV, MP3, M4A, FLAC and Opus, plus SRT / WebVTT subtitles',
      'Background-music mixer with fades, ducking and a limiter',
    ],
    tech: ['React Native', 'Kotlin', 'sherpa-onnx', 'TypeScript'],
    github: gh('offline_personal_text2voice_app'),
  },
  {
    id: 'dhaka-one-more-day',
    title: 'Dhaka: One More Day',
    tagline: 'Bilingual survival-strategy game',
    category: 'game',
    year: '2026',
    cover: { variant: 'game', hue: '#ff7a59' },
    description:
      'Traffic. Rain. Bills. Somehow, survive. An offline survival-strategy game about getting through seven ordinary days in Dhaka, where every decision costs money, time, energy or your temper.',
    highlights: [
      '116 events and 268 choices, every one written in both Bangla and English',
      'Event chains and story flags that carry consequences across days',
      'Four mechanically distinct characters and 11 Dhaka locations with real gameplay weight',
      'Minute-accurate time, escalating weather and 29 achievements',
    ],
    tech: ['Flutter', 'Dart'],
    github: gh('-Dhaka-One-More-Day-game'),
  },
  {
    id: 'reverse-time',
    title: 'Reverse Time',
    tagline: 'Time-loop puzzle game for Android',
    category: 'game',
    year: '2026',
    cover: { variant: 'game', hue: '#4ba8a0' },
    description:
      'Time can be rewound, but knowledge cannot be forgotten. A puzzle game where every rewind resets the world — doors, items, people, the clock — but never what you have learned.',
    highlights: [
      'Six levels, each teaching one mechanic before combining them',
      'Four endings decided by knowledge, trust and paradox',
      'NPC schedules, time echoes and temporal anchors',
      'Bangla and English, switchable without a restart; 70+ tests including full playthroughs',
    ],
    tech: ['Flutter', 'Dart'],
    github: gh('reverse-time'),
  },
  {
    id: 'expense-tour-manager',
    title: 'Expense & Tour Manager',
    tagline: 'Mobile expense tracker',
    category: 'mobile',
    year: '2025',
    cover: { variant: 'phone', hue: '#f2a33a' },
    description:
      'A React Native app for logging and reviewing expenses on the go, with on-device storage, notification reminders and a clean Material Design interface.',
    highlights: [
      'Bottom-tab and stack navigation with React Navigation',
      'Offline persistence with AsyncStorage',
      'Local notification reminders with Notifee',
      'Material Design components with React Native Paper',
    ],
    tech: ['React Native', 'TypeScript', 'React Navigation', 'React Native Paper'],
    github: gh('expense-tour-manager'),
  },
  {
    id: 'mgm-pos-mobile',
    title: 'MGM POS Mobile',
    tagline: 'Restaurant POS app with Bluetooth printing',
    category: 'mobile',
    year: '2025',
    cover: { variant: 'phone', hue: '#ff7a59' },
    description:
      'A React Native point-of-sale app for restaurant staff, with real-time order updates, push notifications and receipt printing straight to Bluetooth thermal printers through custom native Android modules.',
    highlights: [
      'Custom native Android modules (Java) bridging ESC/POS Bluetooth thermal and pocket printers to React Native',
      'Real-time updates over SignalR',
      'Push notifications with Firebase Cloud Messaging and Notifee',
      'Drawer, tab and stack navigation with deep linking',
    ],
    tech: ['React Native', 'TypeScript', 'Java (Android)', 'SignalR', 'Firebase'],
    github: gh('restaurant-pos-react-native-'),
  },
  {
    id: 'ibos-erp-cli',
    title: 'iBOS ERP CLI',
    tagline: 'Scaffolding tool for ERP front ends',
    category: 'tools',
    year: '2026',
    cover: { variant: 'terminal', hue: '#7fa7d9' },
    description:
      'A command-line tool that scaffolds new iBOS ERP front-end projects in seconds — asking for the project name, API base URL, theme and package manager — and then injects whole modules or individual features from manifests, wiring up their routes automatically.',
    highlights: [
      'Interactive setup with @clack/prompts: project name, API URL, default theme and package manager',
      'Generates a React + Tailwind (shadcn/ui) app with auth, permission context and protected routes',
      'inject-module and inject-feature commands driven by JSON manifests',
      'Automatic route registration for injected features',
    ],
    tech: ['Node.js', 'CLI', 'React', 'Tailwind CSS', 'shadcn/ui', 'TanStack Query'],
    github: gh('erp-template'),
  },
  {
    id: 'simple-auth-api',
    title: 'Simple Auth API',
    tagline: 'Authentication REST API in ASP.NET Core',
    category: 'tools',
    year: '2025',
    cover: { variant: 'terminal', hue: '#7fa7d9' },
    description:
      'An ASP.NET Core Web API for user accounts: registration, login, and a forgot / reset password flow with expiring reset tokens sent by email.',
    highlights: [
      'Register, login, forgot-password and reset-password endpoints',
      'Expiring password-reset tokens, emailed with MailKit',
      'Repository pattern over Entity Framework Core and SQL Server',
      'Swagger / OpenAPI documentation',
    ],
    tech: ['ASP.NET Core', 'C#', 'EF Core', 'SQL Server', 'MailKit', 'Swagger'],
    github: gh('simpleAuthApi'),
  },
  {
    id: 'office-management-api',
    title: 'Office Management API',
    tagline: 'HR & office back end in ASP.NET Core',
    category: 'tools',
    year: '2024',
    cover: { variant: 'terminal', hue: '#4ba8a0' },
    description:
      'An ASP.NET Core Web API for running an office: employees and offices, plus the departments, designations, customers, suppliers, items, projects and units of measure around them.',
    highlights: [
      'Employee and office endpoints, including dropdown lookups for forms',
      'Service / repository layers wired with Autofac dependency injection',
      'Entity Framework Core with SQL Server, and OData support',
      'Swagger / OpenAPI documentation',
    ],
    tech: ['ASP.NET Core', 'C#', 'EF Core', 'SQL Server', 'Autofac', 'OData'],
    github: gh('om'),
  },
];

export const projectFilters = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web' },
  { key: 'desktop', label: 'Desktop' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'tools', label: 'APIs & Tools' },
  { key: 'game', label: 'Games' },
];

export const githubStats = {
  repos: '50+',
  url: 'https://github.com/polashmiya?tab=repositories',
};

/** Headline numbers shown in the hero */
export const stats = () => [
  { value: `${yearsOfExperience()}+`, label: 'Years of experience' },
  { value: '50+', label: 'Projects shipped' },
  { value: '3', label: 'Enterprise ERPs' },
  { value: `${Math.floor(skillCount / 5) * 5}+`, label: 'Technologies' },
];
