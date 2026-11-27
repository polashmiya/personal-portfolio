import { motion } from 'framer-motion';
import { EASE } from '../../lib/motion';
import { RevealWords } from './TextMotion';
import Reveal from './Reveal';

/**
 * Section header, set like a chapter opening: a numbered label over a hairline that draws in,
 * a large serif title whose words rise into place, and a short description beside it.
 */
export function SectionLabel({ index, label, className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <p className="label shrink-0">
        <span className="text-accent">{index}</span>
        <span className="mx-2 opacity-50" aria-hidden="true">
          /
        </span>
        {label}
      </p>
      <motion.span
        aria-hidden="true"
        className="h-px flex-1 origin-left bg-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.2, ease: EASE }}
      />
    </div>
  );
}

export default function SectionHeading({ index, label, title, description, id }) {
  return (
    <header className="mb-14 md:mb-20">
      <SectionLabel index={index} label={label} />

      <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h2 id={id} className="display text-balance text-[2.5rem] leading-[1.02] sm:text-5xl lg:col-span-8 lg:text-[4.25rem]">
          <RevealWords text={title} />
        </h2>
        {description && (
          <Reveal delay={0.2} className="lg:col-span-4 lg:pb-2">
            <p className="max-w-md text-base leading-relaxed text-muted sm:text-[17px]">{description}</p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
