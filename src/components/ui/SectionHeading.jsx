import Reveal from './Reveal';

/**
 * Consistent section header: numbered eyebrow, a title with an optional italic serif accent,
 * and a short description.
 */
export default function SectionHeading({ index, eyebrow, title, accent, description, align = 'left', id }) {
  const centered = align === 'center';
  return (
    <Reveal className={`mb-12 md:mb-14 ${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
      <span className="eyebrow">
        {index && <span className="text-subtle">{index}</span>}
        <span className="h-px w-6 bg-accent/60" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 id={id} className="mt-4 text-balance text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
        {title}{' '}
        {accent && (
          <span className="whitespace-nowrap pr-1 font-serif text-[1.08em] font-normal italic text-gradient">{accent}</span>
        )}
      </h2>
      {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </Reveal>
  );
}
