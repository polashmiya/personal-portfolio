import { prefersReducedMotion } from './motion';

/** How long the intro curtain stays down before it lifts, in seconds. The hero waits for it. */
export const INTRO_HOLD = 1.15;
/** How long the curtain takes to lift, in seconds. */
export const INTRO_LIFT = 0.85;
/** Delay for the hero's entrance when the intro plays: it rises while the curtain lifts. */
export const INTRO_HERO_DELAY = INTRO_HOLD + 0.35;

const KEY = 'intro-seen';

/** The intro plays once per browser session, and never for people who ask for reduced motion. */
export function shouldPlayIntro() {
  if (typeof window === 'undefined' || prefersReducedMotion()) return false;
  try {
    return !sessionStorage.getItem(KEY);
  } catch {
    return false;
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    /* private mode: the intro may play again, which is fine */
  }
}
