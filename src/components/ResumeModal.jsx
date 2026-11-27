import { useEffect, useRef, useState } from 'react';
import { LuDownload, LuExternalLink, LuX } from 'react-icons/lu';
import Modal from './ui/Modal';
import Resume from './Resume';
import { A4 } from './ui/paper';

// Built from src/data/resume.js by `npm run resume`
const PDF_URL = '/Md-Polash-Miya-Resume.pdf';

export default function ResumeModal({ open, onClose }) {
  const viewportRef = useRef(null);
  const [scale, setScale] = useState(1);

  // Scale the A4 page down to fit narrow screens.
  useEffect(() => {
    if (!open) return;
    const el = viewportRef.current;
    if (!el) return;
    const update = () => {
      const styles = getComputedStyle(el);
      const inner = el.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
      setScale(Math.min(1, inner / A4.width));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} labelledBy="resume-title" className="max-w-[880px] sm:h-[92svh]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
        <div>
          <h2 id="resume-title" className="display text-2xl leading-tight">
            Resume
          </h2>
          <p className="text-xs text-muted">One page, A4 · PDF</p>
        </div>
        <div className="flex items-center gap-2">
          <a href={PDF_URL} download className="btn-primary btn-sm" data-autofocus>
            <LuDownload className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </a>
          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn hidden sm:inline-flex"
            aria-label="Open the PDF in a new tab"
            title="Open PDF"
          >
            <LuExternalLink className="h-4 w-4" />
          </a>
          <button type="button" onClick={onClose} className="icon-btn" aria-label="Close resume">
            <LuX className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div ref={viewportRef} data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain bg-surface-2 p-4 sm:p-8">
        <div
          className="mx-auto overflow-hidden rounded shadow-[0_8px_24px_rgb(0_0_0/0.12)]"
          style={{ width: A4.width * scale, height: A4.height * scale }}
        >
          <div style={{ width: A4.width, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
            <Resume />
          </div>
        </div>
      </div>
    </Modal>
  );
}
