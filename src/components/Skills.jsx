import { motion } from 'framer-motion';
import { skillGroups } from '../data/portfolio';
import { EASE } from '../lib/motion';
import SectionHeading from './ui/SectionHeading';

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container-site">
        <SectionHeading
          id="skills-title"
          index="03"
          label="Skills"
          title="What I build with"
          description="React and TypeScript on the front end, ASP.NET Core and Node.js on the back end, and React Native, Flutter and Electron for mobile and desktop"
        />

        <ul className="border-b border-line">
          {skillGroups.map((group, gi) => (
            <li key={group.key} className="group relative grid gap-6 py-10 lg:grid-cols-12 lg:gap-8 lg:py-12">
              {/* Hairline that draws in, and a flame line over it on hover */}
              <motion.span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left bg-line"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 1.1, ease: EASE }}
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out group-hover:scale-x-100"
              />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.8, ease: EASE }}
                className="flex items-start gap-4 lg:col-span-4"
              >
                <span className="label w-8 shrink-0 pt-2.5">{String(gi + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="display text-[2rem] leading-tight sm:text-[2.5rem]">
                    {group.title}
                    <sup className="label ml-2 align-top text-xs">{group.skills.length}</sup>
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{group.blurb}</p>
                </div>
              </motion.div>

              <ul className="flex flex-wrap content-start gap-2 pl-12 lg:col-span-8 lg:pl-0 lg:pt-2">
                {group.skills.map(({ name, icon: Icon }, i) => (
                  <motion.li
                    key={name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.03, ease: EASE }}
                    className="flex h-11 items-center gap-2.5 rounded-[10px] border border-line px-4 text-[15px] text-fg transition-colors duration-200 hover:border-fg/30 hover:bg-surface"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-subtle" aria-hidden="true" />
                    {name}
                  </motion.li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
