/**
 * Project thumbnail. Everything inside is sized in `em`, and the root font-size
 * is 1% of the card width (container query units), so the artwork scales with any card size.
 * A screenshot is shown inside a window frame on a calm neutral stage; projects without one
 * get an illustrated mockup that uses a single project color.
 */

const WINDOW_BG = '#12152e';
const bars = [42, 68, 52, 80, 61, 92, 70, 96, 74, 88];
const TOP_BAR = bars.indexOf(Math.max(...bars));

// A darker step of the same hue, for tone shifts inside one color.
const deep = (c, amount = 40) => `color-mix(in srgb, ${c} ${amount}%, ${WINDOW_BG})`;

function Window({ children }) {
  return (
    <div
      className="absolute -bottom-[4%] left-[8%] right-[8%] top-[12%] overflow-hidden rounded-t-[1.4em] border border-white/10 shadow-[0_1.6em_4em_-1.6em_rgb(0_0_0/0.45)] transition-transform duration-700 ease-out group-hover:-translate-y-2"
      style={{ background: WINDOW_BG }}
    >
      <div className="flex h-[4em] items-center gap-[0.8em] border-b border-white/10 px-[1.6em]">
        <span className="h-[1em] w-[1em] rounded-full bg-white/20" />
        <span className="h-[1em] w-[1em] rounded-full bg-white/20" />
        <span className="h-[1em] w-[1em] rounded-full bg-white/20" />
        <span className="ml-[2em] h-[1.8em] w-[34%] rounded-[0.6em] bg-white/[0.07]" />
      </div>
      <div className="relative h-[calc(100%-4em)]">{children}</div>
    </div>
  );
}

const L = ({ w = '100%', h = '1.1em', c = 'bg-white/10', className = '' }) => (
  <span className={`block rounded-full ${c} ${className}`} style={{ width: w, height: h }} />
);

function Dashboard({ a }) {
  return (
    <div className="flex h-full gap-[2em] p-[2em]">
      <div className="w-[18%] space-y-[1.3em]">
        <span className="block h-[2.4em] w-[70%] rounded-[0.6em]" style={{ background: a }} />
        {[85, 70, 80, 60, 75, 65].map((w, i) => (
          <L key={i} w={`${w}%`} c={i === 1 ? 'bg-white/30' : 'bg-white/10'} />
        ))}
      </div>
      <div className="flex-1 space-y-[1.8em]">
        <div className="grid grid-cols-3 gap-[1.4em]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-[1em] rounded-[1em] border border-white/10 bg-white/[0.04] p-[1.3em]">
              <L w="50%" h="0.9em" />
              {i === 0 ? (
                <span className="block h-[1.8em] w-[70%] rounded-full" style={{ background: a }} />
              ) : (
                <L w="70%" h="1.8em" c="bg-white/25" />
              )}
            </div>
          ))}
        </div>
        <div className="flex h-[17em] items-end gap-[1.1em] rounded-[1em] border border-white/10 bg-white/[0.03] p-[1.6em]">
          {bars.map((h, i) => (
            <span
              key={i}
              className={`flex-1 rounded-t-[0.4em] ${i === TOP_BAR ? '' : 'bg-white/15'}`}
              style={{ height: `${h}%`, background: i === TOP_BAR ? a : undefined }}
            />
          ))}
        </div>
        {[0, 1, 2].map((r) => (
          <div key={r} className="flex items-center gap-[1.4em]">
            <L w="22%" />
            <L w="38%" c="bg-white/[0.06]" />
            <L w="16%" c="bg-white/[0.06]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Store({ a }) {
  return (
    <div className="space-y-[1.8em] p-[2em]">
      <div className="flex items-center justify-between">
        <span className="h-[2.2em] w-[13%] rounded-[0.6em]" style={{ background: a }} />
        <span className="h-[2.4em] w-[42%] rounded-[0.8em] bg-white/10" />
        <div className="flex gap-[0.8em]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-[2.2em] w-[2.2em] rounded-full bg-white/10" />
          ))}
        </div>
      </div>
      <div
        className="flex h-[11em] flex-col justify-center gap-[1em] rounded-[1.2em] px-[3em]"
        style={{ background: deep(a, 70) }}
      >
        <L w="38%" h="1.8em" c="bg-white/80" />
        <L w="26%" c="bg-white/50" />
        <span className="mt-[0.6em] block h-[2.2em] w-[13%] rounded-[0.6em] bg-white" />
      </div>
      <div className="grid grid-cols-4 gap-[1.4em]">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="space-y-[0.9em]">
            <div className="grid aspect-square place-items-center rounded-[1em] bg-white/[0.06]">
              <span className="h-[45%] w-[45%] rounded-full" style={{ background: deep(a, i % 2 ? 55 : 85) }} />
            </div>
            <L w="80%" />
            <L w="45%" c="bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Pos({ a }) {
  return (
    <div className="flex h-full gap-[1.6em] p-[1.8em]">
      <div className="flex-1 space-y-[1.4em]">
        <span className="block h-[2.6em] w-full rounded-[0.8em] border-[0.15em] border-white/15" />
        <div className="flex gap-[0.8em]">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`h-[2em] flex-1 rounded-[0.6em] ${i ? 'bg-white/10' : ''}`}
              style={i ? undefined : { background: a }}
            />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-[1.2em]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-[0.7em] rounded-[1em] border border-white/10 bg-white/[0.04] p-[1em]">
              <span className="mx-auto block h-[3.4em] w-[3.4em] rounded-[0.8em]" style={{ background: deep(a, i % 3 ? 45 : 80) }} />
              <L w="85%" h="0.9em" />
              <L w="45%" h="0.9em" c="bg-white/25" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-[32%] flex-col rounded-[1em] border border-white/10 bg-white/[0.04] p-[1.4em]">
        <L w="50%" h="1.3em" c="bg-white/30" />
        <div className="mt-[1.6em] space-y-[1.4em]">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-[1em]">
              <span className="h-[2.6em] w-[2.6em] shrink-0 rounded-[0.6em] bg-white/10" />
              <div className="flex-1 space-y-[0.6em]">
                <L w="80%" h="0.9em" />
                <L w="40%" h="0.9em" c="bg-white/[0.06]" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto space-y-[1em]">
          <div className="flex justify-between">
            <L w="30%" />
            <L w="25%" c="bg-white/40" />
          </div>
          <span className="block h-[3.4em] rounded-[0.9em]" style={{ background: a }} />
        </div>
      </div>
    </div>
  );
}

function Blog({ a }) {
  return (
    <div className="space-y-[1.8em] p-[2.4em]">
      <div className="flex items-center justify-between">
        <span className="h-[2em] w-[18%] rounded-[0.6em]" style={{ background: a }} />
        <div className="flex gap-[1em]">
          <span className="h-[2.2em] w-[6em] rounded-[0.6em] bg-white/80" />
          <span className="h-[2.2em] w-[6em] rounded-[0.6em] border border-white/20" />
        </div>
      </div>
      <L w="40%" h="2.6em" c="bg-white/80" />
      <div className="flex gap-[1em]">
        <span className="h-[2.4em] flex-1 rounded-[0.6em] bg-white/[0.06]" />
        {[0, 1, 2].map((i) => (
          <span key={i} className={`h-[2.4em] w-[7em] rounded-[0.6em] ${i ? 'border border-white/15' : 'bg-white/80'}`} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-[1.6em]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="overflow-hidden rounded-[1em] border border-white/10 bg-white/[0.04]">
            <span className="block h-[9em]" style={{ background: deep(a, i === 1 ? 45 : 75) }} />
            <div className="space-y-[0.8em] p-[1.2em]">
              <L w="40%" h="0.9em" c="bg-white/20" />
              <L w="90%" />
              <L w="70%" c="bg-white/[0.06]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Code / terminal mockup for APIs and CLI tools. Each row is a list of [kind, width%] segments.
const TERMINAL_ROWS = [
  [['p', 3], ['w', 30], ['a', 12]],
  [['m', 20], ['a', 12], ['m', 24]],
  [['i', 4], ['b', 16], ['m', 30]],
  [['i', 4], ['a', 9], ['w', 20], ['b', 14]],
  [['i', 8], ['m', 38]],
  [['i', 4], ['m', 14], ['b', 22]],
  [['m', 10]],
  [],
  [['p', 3], ['w', 24], ['b', 10]],
  [['ok', 3], ['m', 34]],
  [['ok', 3], ['m', 28]],
  [['ok', 3], ['m', 40]],
];

function Terminal({ a }) {
  const style = (kind) =>
    ({
      p: { background: a },
      ok: { background: '#4cc38a', opacity: 0.8 },
      a: { background: a },
      b: { background: 'rgb(255 255 255 / 0.4)' },
      w: { background: 'rgb(255 255 255 / 0.7)' },
      m: { background: 'rgb(255 255 255 / 0.14)' },
      i: { background: 'transparent' },
    })[kind];
  return (
    <div className="space-y-[1.5em] p-[2.6em] font-mono">
      {TERMINAL_ROWS.map((row, r) => (
        <div key={r} className="flex h-[1.3em] gap-[1em]">
          {row.map(([kind, w], s) => (
            <span key={s} className="block h-full rounded-full" style={{ width: `${w}%`, ...style(kind) }} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Phone({ a, game, className = '' }) {
  return (
    <div
      className={`absolute aspect-[9/19] w-[27em] overflow-hidden rounded-[4em] border-[0.7em] border-[#262a4d] shadow-[0_1.6em_4em_-1.6em_rgb(0_0_0/0.45)] ${className}`}
      style={{ background: '#0c0e22' }}
    >
      <span className="absolute left-1/2 top-[1.2em] z-10 h-[1.8em] w-[30%] -translate-x-1/2 rounded-full bg-black" />
      {game ? (
        <div className="relative h-full" style={{ background: `linear-gradient(to bottom, ${a}, ${deep(a, 30)} 75%)` }}>
          <span className="absolute right-[18%] top-[18%] h-[6em] w-[6em] rounded-full bg-white/70" />
          <div className="absolute inset-x-[1.6em] top-[4.4em] space-y-[0.7em]">
            {[78, 52, 64].map((w, i) => (
              <div key={i} className="h-[0.9em] overflow-hidden rounded-full bg-black/30">
                <span className="block h-full rounded-full bg-white/80" style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-[34%] flex items-end gap-[0.4em] px-[0.8em]">
            {[40, 70, 55, 90, 62, 80, 48].map((h, i) => (
              <span key={i} className="flex-1 rounded-t-[0.3em] bg-black/55" style={{ height: `${h / 6}em` }} />
            ))}
          </div>
          <div className="absolute inset-x-[1.4em] bottom-[2.2em] space-y-[0.9em] rounded-[1.6em] border border-white/10 bg-black/60 p-[1.4em]">
            <L w="85%" c="bg-white/50" />
            <L w="60%" c="bg-white/25" />
            <div className="grid grid-cols-2 gap-[0.8em] pt-[0.4em]">
              <span className="h-[2.6em] rounded-[0.8em] bg-white/85" />
              <span className="h-[2.6em] rounded-[0.8em] border border-white/30" />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-[1.4em] p-[1.6em] pt-[4.4em]">
          <div className="flex h-[12em] flex-col justify-end gap-[0.8em] rounded-[2em] p-[1.6em]" style={{ background: deep(a, 75) }}>
            <L w="40%" h="0.9em" c="bg-white/60" />
            <L w="70%" h="1.8em" c="bg-white/90" />
          </div>
          <div className="grid grid-cols-3 gap-[1em]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="grid aspect-square place-items-center rounded-[1.4em] bg-white/[0.06]">
                <span className="h-[40%] w-[40%] rounded-full" style={{ background: deep(a, i === 1 ? 50 : 85) }} />
              </span>
            ))}
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-[1em] rounded-[1.4em] bg-white/[0.05] p-[1.1em]">
              <span className="h-[3em] w-[3em] shrink-0 rounded-full" style={{ background: deep(a, i % 2 ? 50 : 80) }} />
              <div className="flex-1 space-y-[0.6em]">
                <L w="75%" h="0.9em" />
                <L w="45%" h="0.9em" c="bg-white/[0.06]" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectCover({ project, className = '' }) {
  const { cover = {}, image, title } = project;
  const a = cover.hue ?? '#f5b63a';
  const variant = cover.variant ?? 'dashboard';
  const isPhone = variant === 'phone' || variant === 'game';

  return (
    <div className={`relative overflow-hidden bg-surface-2 [container-type:inline-size] ${className}`}>
      <div className="absolute inset-0" style={{ fontSize: '1cqw' }} aria-hidden={image ? undefined : 'true'}>
        {isPhone ? (
          <>
            <Phone a={a} game={variant === 'game'} className="left-[20%] top-[22%] rotate-[-9deg] opacity-50" />
            <Phone
              a={a}
              game={variant === 'game'}
              className="left-[46%] top-[9%] rotate-[4deg] transition-transform duration-700 ease-out group-hover:-translate-y-2"
            />
          </>
        ) : (
          <Window>
            {image ? (
              <img
                src={image}
                alt={`Screenshot of ${title}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-left-top"
              />
            ) : variant === 'store' ? (
              <Store a={a} />
            ) : variant === 'pos' ? (
              <Pos a={a} />
            ) : variant === 'blog' ? (
              <Blog a={a} />
            ) : variant === 'terminal' ? (
              <Terminal a={a} />
            ) : (
              <Dashboard a={a} />
            )}
          </Window>
        )}
      </div>
    </div>
  );
}
