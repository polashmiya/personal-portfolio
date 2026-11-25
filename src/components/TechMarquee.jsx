import { marquee } from '../data/portfolio';

function Row({ items, reverse = false }) {
  // The list is rendered twice so the -50% translate loops seamlessly.
  const loop = [...items, ...items];
  return (
    <div className="group mask-fade-x flex overflow-hidden">
      <ul
        className={`flex w-max shrink-0 gap-3 pr-3 group-hover:[animation-play-state:paused] ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        {loop.map(({ name, icon: Icon, color }, i) => (
          <li
            key={`${name}-${i}`}
            aria-hidden={i >= items.length ? 'true' : undefined}
            className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line/80 bg-surface/70 px-4 py-2.5 text-sm font-medium text-muted"
          >
            <Icon className="h-[18px] w-[18px]" style={color ? { color } : undefined} />
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TechMarquee() {
  const half = Math.ceil(marquee.length / 2);
  return (
    <section aria-label="Technologies I work with" className="relative border-y border-line/60 bg-surface/30 py-10">
      <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-subtle">
        Technologies I work with
      </p>
      <div className="flex flex-col gap-3">
        <Row items={marquee.slice(0, half)} />
        <Row items={marquee.slice(half)} reverse />
      </div>
    </section>
  );
}
