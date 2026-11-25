import { useEffect, useRef, useState } from 'react';
import { LuDownload, LuX, LuLoaderCircle } from 'react-icons/lu';
import Modal from './ui/Modal';
import Resume from './Resume';
import { A4 } from './ui/paper';
import { profile } from '../data/portfolio';

export default function ResumeModal({ open, onClose }) {
  const viewportRef = useRef(null);
  const docRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

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

  const download = async () => {
    if (!docRef.current || busy) return;
    setBusy(true);
    setError(false);
    try {
      const { default: html2pdf } = await import('html2pdf.js');
      await html2pdf()
        .set({
          margin: 0,
          filename: `${profile.name.replace(/[^a-z]+/gi, '_').replace(/^_|_$/g, '')}_Resume.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak: { mode: ['css'] },
        })
        .from(docRef.current)
        .save();
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} labelledBy="resume-title" className="max-w-[880px] sm:h-[92svh]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
        <div>
          <h2 id="resume-title" className="text-lg font-semibold text-fg">
            Resume
          </h2>
          <p className="text-xs text-muted">{error ? 'Download failed — please try again.' : 'A4 · always up to date with this site'}</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={download} disabled={busy} className="btn-primary px-4 py-2.5" data-autofocus>
            {busy ? <LuLoaderCircle className="h-4 w-4 animate-spin" /> : <LuDownload className="h-4 w-4" />}
            <span className="hidden sm:inline">{busy ? 'Preparing…' : 'Download PDF'}</span>
            <span className="sm:hidden">{busy ? '…' : 'PDF'}</span>
          </button>
          <button type="button" onClick={onClose} className="icon-btn" aria-label="Close resume">
            <LuX className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div ref={viewportRef} className="flex-1 overflow-y-auto overscroll-contain bg-surface-2/70 p-4 sm:p-8">
        <div
          className="mx-auto overflow-hidden rounded-md shadow-[0_20px_60px_-20px_rgb(0_0_0/0.45)]"
          style={{ width: A4.width * scale, height: A4.height * scale }}
        >
          <div style={{ width: A4.width, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
            <Resume ref={docRef} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
