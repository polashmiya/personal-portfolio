import { LuCodeXml, LuServer, LuMonitorSmartphone, LuDatabase, LuWrench } from 'react-icons/lu';
import { skillGroups } from '../data/portfolio';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { trackSpotlight } from './ui/spotlight';

const GROUP_ICONS = {
  frontend: LuCodeXml,
  backend: LuServer,
  mobile: LuMonitorSmartphone,
  data: LuDatabase,
  tools: LuWrench,
};

// Bento placement on large screens
const SPAN = { frontend: 'lg:col-span-2', backend: '', mobile: '', data: '', tools: '' };

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container-site">
        <SectionHeading
          id="skills-title"
          index="03"
          eyebrow="Skills"
          title="The toolkit behind"
          accent="the work."
          description="A full-stack toolbox I use every day — from pixel-perfect interfaces to APIs, databases, mobile apps and the tooling that keeps them reliable."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => {
            const Icon = GROUP_ICONS[group.key];
            return (
              <Reveal
                key={group.key}
                delay={0.06 * gi}
                className={`card spotlight p-6 sm:p-7 ${SPAN[group.key]} ${group.key === 'tools' ? 'md:col-span-2 lg:col-span-1' : ''}`}
                onMouseMove={trackSpotlight}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface-2 text-accent">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <h3 className="text-lg font-semibold text-fg">{group.title}</h3>
                  </div>
                  <span className="font-mono text-xs text-subtle">{String(group.skills.length).padStart(2, '0')}</span>
                </div>
                <p className="mt-3 text-sm text-muted">{group.blurb}</p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.skills.map(({ name, icon: SkillIcon, color }) => (
                    <li
                      key={name}
                      style={{ '--c': color ?? 'rgb(var(--fg))' }}
                      className="group/skill flex items-center gap-2 rounded-xl border border-line/80 bg-surface-2/50 px-3 py-2 text-sm font-medium text-fg/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--c)] hover:bg-surface hover:shadow-[0_6px_20px_-8px_var(--c)]"
                    >
                      <SkillIcon
                        className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/skill:scale-110"
                        style={{ color: color ?? undefined }}
                        aria-hidden="true"
                      />
                      {name}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
