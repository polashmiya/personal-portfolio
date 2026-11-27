import Lenis from 'lenis';
import { prefersReducedMotion } from './motion';

/*
 * Smooth wheel scrolling with Lenis. Touch devices keep native scrolling, and people who
 * ask for reduced motion get plain native scrolling everywhere.
 * Scrollable areas inside overlays opt out with the `data-lenis-prevent` attribute.
 */
let lenis = null;

export function startSmoothScroll() {
  if (lenis || prefersReducedMotion()) return lenis;
  lenis = new Lenis({
    lerp: 0.11,
    wheelMultiplier: 1,
    autoRaf: true,
    anchors: { offset: -72 },
  });
  return lenis;
}

export function stopSmoothScroll() {
  lenis?.destroy();
  lenis = null;
}

/** Pause page scrolling while an overlay (modal, menu) is open. */
export function lockScroll(locked) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

/** Scroll to a y position or an element, smoothly when Lenis is running. */
export function scrollToTarget(target) {
  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === 'number' ? 0 : -72 });
    return;
  }
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
  else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
}
