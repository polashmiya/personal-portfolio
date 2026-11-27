/**
 * Resume content: one source for the resume preview on the site (components/Resume.jsx)
 * and for the PDF and Word files (`npm run resume`, see scripts/resume/build.mjs).
 * Plain data with no imports, so Node can read it too.
 *
 * After editing, run `npm run resume` to regenerate public/Md-Polash-Miya-Resume.pdf
 * and resume/Md-Polash-Miya-Resume.docx.
 */
export const resume = {
  name: 'Md. Polash Miya',
  headline: 'Software Engineer II · React, Next.js, TypeScript, ASP.NET Core',
  // Two lines, so no link breaks in the middle
  contact: [
    [
      { label: 'Dhaka, Bangladesh' },
      { label: '+880 1719 623984', href: 'tel:+8801719623984' },
      { label: 'polashmiya2015@gmail.com', href: 'mailto:polashmiya2015@gmail.com' },
    ],
    [
      { label: 'linkedin.com/in/md-polash-miya-726667193', href: 'https://www.linkedin.com/in/md-polash-miya-726667193/' },
      { label: 'github.com/polashmiya', href: 'https://github.com/polashmiya' },
      { label: 'polash-portfolio.vercel.app', href: 'https://polash-portfolio.vercel.app' },
    ],
  ],

  summary:
    'Software engineer with 4+ years of experience building enterprise ERP software at AKIJ iBOS Limited, where I have grown from junior engineer to Software Engineer II. I lead front-end development for Managerium, an ERP covering purchase, sales, accounts, inventory and production, working mainly with React, TypeScript and Next.js alongside ASP.NET Core APIs. Outside work, I build offline-first POS systems and mobile apps.',

  experience: [
    {
      company: 'AKIJ iBOS Limited',
      note: 'An AKIJ Group company',
      location: 'Dhaka, Bangladesh',
      roles: [
        {
          title: 'Software Engineer II',
          dates: 'Jul 2026 – Present',
          bullets: [
            'Lead front-end engineering for Managerium, an enterprise ERP covering Purchase, Sales, Accounts, Inventory, Production, Assets, POS and Configuration',
            'Build ERP features in React and TypeScript on top of ASP.NET Core Web APIs',
            'Own the UI architecture: refactoring, shared components and hooks, and PDF, barcode and Excel generation',
            'Review code, plan features and turn complex business requirements into scalable solutions',
          ],
        },
        {
          title: 'Software Engineer I',
          dates: 'Jul 2024 – Jun 2026',
          bullets: [
            'Built CRM features in React and TypeScript for customers, leads and follow-ups over REST APIs',
            'Built booking and payment flows for AKIJ Air, a Next.js airline platform with SSR and dynamic routing',
            'Resolved critical production issues and complex business logic across ERP modules',
          ],
        },
        {
          title: 'Junior Software Engineer',
          dates: 'Apr 2022 – Jun 2024',
          bullets: [
            'Developed the Purchase, Sales, Accounts, Inventory and Production modules of Managerium in React and Redux',
            'Built Apon Bazar’s promotion module, and Internal Expense, Advance Payment and Internal Control for AKIJ ERP',
          ],
        },
      ],
    },
  ],

  projects: [
    {
      name: 'Super Shop POS',
      stack: 'Electron, React, TypeScript, SQLite (WASM)',
      link: { label: 'super-shop-pos-software.vercel.app', href: 'https://super-shop-pos-software.vercel.app' },
      bullets: [
        'Offline-first, bilingual supermarket POS for desktop and browser from one codebase, on local SQLite',
        'Barcode checkout, exact money math with multi-rate VAT, split payments (cash, card, bKash, Nagad, Rocket) and thermal receipts; tested with Vitest and Playwright',
      ],
    },
    {
      name: 'Corelium ERP',
      stack: 'React, Redux Toolkit, Ant Design, i18next',
      link: { label: 'corelium-erp.vercel.app', href: 'https://corelium-erp.vercel.app' },
      bullets: [
        'ERP for purchase, sales, accounts and inventory with approval workflows and an executive KPI dashboard',
        'Multi-language React front end over ASP.NET Core and Node.js REST APIs',
      ],
    },
    {
      name: 'MediNest',
      stack: 'Next.js 16, React 19, TypeScript, Zustand',
      link: { label: 'medinest-ecommerce-pi.vercel.app', href: 'https://medinest-ecommerce-pi.vercel.app' },
      bullets: [
        'Online pharmacy with 2,400+ products, generic-name search, coupons, delivery zones and prescription upload',
      ],
    },
  ],

  skills: [
    { group: 'Languages', items: 'TypeScript, JavaScript, C#, SQL, Dart' },
    {
      group: 'Front end',
      items: 'React, Next.js, Redux Toolkit, TanStack Query, React Hook Form, Tailwind CSS, Ant Design, Material UI',
    },
    { group: 'Back end', items: 'ASP.NET Core Web API, Node.js, Express, REST APIs, JWT authentication, Swagger / OpenAPI' },
    { group: 'Mobile & desktop', items: 'React Native, Expo, Flutter, Electron' },
    { group: 'Databases', items: 'SQL Server, PostgreSQL, MongoDB, SQLite' },
    { group: 'Tools & practice', items: 'Git, GitHub Actions, Azure DevOps, Docker (basic), Vitest, Playwright, Postman, Agile / Scrum' },
  ],

  education: [
    {
      degree: 'Diploma in Engineering, Computer Technology',
      school: 'Dhaka Polytechnic Institute',
      location: 'Dhaka, Bangladesh',
      dates: 'Jun 2015 – Jun 2019',
    },
  ],
};
