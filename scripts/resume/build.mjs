/*
 * Builds the resume files from src/data/resume.js:
 *   public/Md-Polash-Miya-Resume.pdf   printed from the site's Resume component (Edge or Chrome)
 *   resume/Md-Polash-Miya-Resume.docx  the same layout as a Word document (Calibri)
 *
 * Run with `npm run resume`. Needs Microsoft Edge or Google Chrome installed.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { chromium } from 'playwright-core';
import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  LevelFormat,
  LineRuleType,
  Packer,
  Paragraph,
  Tab,
  TabStopType,
  TextRun,
} from 'docx';
import { resume } from '../../src/data/resume.js';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const FILE = 'Md-Polash-Miya-Resume';
const PDF_OUT = path.join(ROOT, 'public', `${FILE}.pdf`);
const DOCX_OUT = path.join(ROOT, 'resume', `${FILE}.docx`);

/* ------------------------------------------------------------------ */
/* PDF: print the Resume component with a real browser                 */
/* ------------------------------------------------------------------ */

async function launchBrowser() {
  for (const channel of ['msedge', 'chrome']) {
    try {
      return await chromium.launch({ channel, headless: true });
    } catch {
      /* try the next installed browser */
    }
  }
  throw new Error('Microsoft Edge or Google Chrome is needed to print the PDF.');
}

async function buildPdf() {
  const server = await createServer({ root: ROOT, logLevel: 'error', server: { port: 5310 } });
  await server.listen();
  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    const url = new URL('scripts/resume/print.html', server.resolvedUrls.local[0]).href;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.body.dataset.ready === '1', null, { timeout: 30_000 });
    await page.pdf({ path: PDF_OUT, format: 'A4', printBackground: true, preferCSSPageSize: true });
  } finally {
    await browser.close();
    await server.close();
  }
  const pdf = await readFile(PDF_OUT, 'latin1');
  return (pdf.match(/\/Type\s*\/Page[^s]/g) ?? []).length;
}

/* ------------------------------------------------------------------ */
/* DOCX: the same layout, values mirrored from src/components/resume.css */
/* ------------------------------------------------------------------ */

const FONT = 'Calibri'; // Carlito in the PDF has the same metrics
const C = { ink: '14163A', text: '2A2C45', muted: '5A5C78', accent: '2B2FB8', rule: 'D9D8E6', sep: 'A6A8C0', bullet: '8A8CA8' };
const pt = (n) => Math.round(n * 2); // font sizes are in half-points
const tw = (n) => Math.round(n * 20); // spacing is in twentieths of a point
const PAGE = { width: 11906, height: 16838, margin: tw(0.6 * 72) }; // A4, 0.6 in margins
const RIGHT = PAGE.width - 2 * PAGE.margin; // right edge of the text block, for right-aligned dates
const exact = (line) => ({ line: tw(line), lineRule: LineRuleType.EXACT });

const run = (text, opts = {}) => new TextRun({ text, font: FONT, size: pt(10.5), color: C.text, ...opts });
const link = (label, href, opts = {}) =>
  new ExternalHyperlink({ link: href, children: [run(label, { color: C.accent, ...opts })] });

/** A line with content on the left and a value pushed to the right margin. */
const row = (left, right, { before = 0 } = {}) =>
  new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: RIGHT }],
    spacing: { before: tw(before), ...exact(13.5) },
    keepNext: true,
    children: [...left, new TextRun({ children: [new Tab()] }), ...right],
  });

const heading = (title) =>
  new Paragraph({
    spacing: { before: tw(11), after: tw(5), ...exact(15.5) },
    keepNext: true,
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.rule, space: 2 } },
    children: [run(title, { bold: true, allCaps: true, color: C.accent, characterSpacing: tw(0.84) })],
  });

const bullet = (text) =>
  new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    spacing: { before: tw(1.5), ...exact(13.5) },
    children: [run(text)],
  });

function buildDocx() {
  const children = [];

  // Header
  children.push(
    new Paragraph({ spacing: exact(28), children: [run(resume.name, { bold: true, size: pt(24), color: C.ink })] }),
    new Paragraph({ spacing: { before: tw(2), ...exact(15) }, children: [run(resume.headline, { size: pt(11.5), color: C.accent })] }),
    ...resume.contact.map(
      (line, li) =>
        new Paragraph({
          spacing: { before: tw(li ? 0 : 4), ...exact(13) },
          children: line.flatMap((c, i) => [
            ...(i > 0 ? [run('  |  ', { size: pt(9.5), color: C.sep })] : []),
            c.href ? link(c.label, c.href, { size: pt(9.5), color: C.muted }) : run(c.label, { size: pt(9.5), color: C.muted }),
          ]),
        })
    )
  );

  children.push(heading('Summary'), new Paragraph({ spacing: exact(13.5), children: [run(resume.summary)] }));

  children.push(heading('Experience'));
  for (const job of resume.experience) {
    children.push(
      row(
        [run(job.company, { bold: true, size: pt(11), color: C.ink }), run(` · ${job.note}`, { color: C.muted })],
        [run(job.location, { color: C.muted })]
      )
    );
    for (const role of job.roles) {
      children.push(row([run(role.title, { bold: true, color: C.ink })], [run(role.dates, { color: C.muted })], { before: 5 }));
      role.bullets.forEach((b) => children.push(bullet(b)));
    }
  }

  children.push(heading('Projects'));
  resume.projects.forEach((p, i) => {
    children.push(
      row(
        [run(p.name, { bold: true, color: C.ink }), run(` · ${p.stack}`, { color: C.muted })],
        [link(p.link.label, p.link.href)],
        { before: i ? 6 : 0 }
      )
    );
    p.bullets.forEach((b) => children.push(bullet(b)));
  });

  children.push(heading('Skills'));
  resume.skills.forEach((s, i) =>
    children.push(
      new Paragraph({
        spacing: { before: tw(i ? 1.5 : 0), ...exact(13.5) },
        children: [run(`${s.group}: `, { bold: true, color: C.ink }), run(s.items)],
      })
    )
  );

  children.push(heading('Education'));
  for (const e of resume.education) {
    children.push(
      row(
        [run(e.degree, { bold: true, color: C.ink }), run(` · ${e.school}, ${e.location}`, { color: C.muted })],
        [run(e.dates, { color: C.muted })]
      )
    );
  }

  return new Document({
    creator: resume.name,
    title: `${resume.name} — Resume`,
    description: resume.headline,
    styles: { default: { document: { run: { font: FONT, size: pt(10.5), color: C.text } } } },
    numbering: {
      config: [
        {
          reference: 'bullets',
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: '•',
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: { indent: { left: tw(15), hanging: tw(11) } },
                run: { font: FONT, color: C.bullet },
              },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: PAGE.width, height: PAGE.height },
            margin: { top: PAGE.margin, right: PAGE.margin, bottom: PAGE.margin, left: PAGE.margin },
          },
        },
        children,
      },
    ],
  });
}

/* ------------------------------------------------------------------ */

await mkdir(path.dirname(DOCX_OUT), { recursive: true });
await writeFile(DOCX_OUT, await Packer.toBuffer(buildDocx()));
console.log(`Word: ${path.relative(ROOT, DOCX_OUT)}`);

const pages = await buildPdf();
console.log(`PDF:  ${path.relative(ROOT, PDF_OUT)} (${pages} page${pages === 1 ? '' : 's'})`);
