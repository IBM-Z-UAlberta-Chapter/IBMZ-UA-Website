import { motion, useReducedMotion } from 'motion/react';
import { Layers, Terminal, Users } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

const PILLARS = [
  {
    numeral: '01',
    title: 'LEARN',
    icon: Terminal,
    copy: 'Bi-weekly hands-on labs take you from your first z/OS session to JCL, enterprise Linux and data pipelines. No lecture-only sessions.',
  },
  {
    numeral: '02',
    title: 'BUILD',
    icon: Layers,
    copy: 'Join project working groups, enter our datathons and hackathon, and put real work in a GitHub portfolio.',
  },
  {
    numeral: '03',
    title: 'CONNECT',
    icon: Users,
    copy: 'Meet IBM engineers, architects and recruiters at speaker panels, and a community of UAlberta students who share your curiosity.',
  },
];

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-navy-900 py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left 5/12 Sticky */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <SectionHeader
                index="01"
                tag="// 01 ABOUT"
                title="About the chapter"
                intro="IBM Z mainframes quietly run the systems the world depends on. We're the UAlberta community learning how they work, building on them, and meeting the people who do."
                titleId="about-heading"
              />
            </div>
          </div>

          {/* Right 7/12 Stacked Pillar Rows */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-navy-700 border-y border-navy-700">
              {PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.numeral}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.35,
                      delay: idx * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-12 sm:items-start sm:gap-6"
                  >
                    <div className="flex items-center justify-between sm:col-span-3 sm:block">
                      <span
                        className={`font-mono text-3xl sm:text-4xl font-semibold tracking-tight tabular-nums ${
                          idx === 0
                            ? 'text-sky'
                            : idx === 1
                            ? 'text-indigo'
                            : 'text-turquoise'
                        }`}
                      >
                        {pillar.numeral}
                      </span>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-navy-700 bg-navy-800 sm:hidden">
                        <Icon className="h-5 w-5 text-turquoise" strokeWidth={1.5} />
                      </span>
                    </div>

                    <div className="sm:col-span-7">
                      <h3 className="font-sans text-xl font-medium tracking-tight text-beige">
                        {pillar.title}
                      </h3>
                      <p className="mt-2.5 max-w-[60ch] text-base leading-[1.7] text-beige-dim">
                        {pillar.copy}
                      </p>
                    </div>

                    <div className="hidden sm:col-span-2 sm:flex sm:justify-end">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-[6px] border border-navy-700 bg-navy-800">
                        <Icon className="h-5 w-5 text-turquoise" strokeWidth={1.5} />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Slim eligibility strip */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-[10px] border border-navy-700 bg-navy-800/70 px-5 py-4">
              <p className="text-sm sm:text-base text-beige">
                Open to all currently enrolled UAlberta undergraduate and graduate students.
              </p>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-turquoise">
                NO PRIOR MAINFRAME EXPERIENCE NEEDED
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
