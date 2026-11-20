import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  Code2,
  Compass,
  GitBranch,
  Layers,
  Server,
  Terminal,
} from 'lucide-react';
import { LEARN_MODULES } from '../data/learn';
import { RESOURCES, type ResourceItem } from '../data/resources';
import { getNextModuleIndex } from '../utils/filters';
import { JclTerminal } from './JclTerminal';
import { SectionHeader } from './SectionHeader';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Badge } from './ui/badge';

function renderResourceIcon(name: ResourceItem['iconName']) {
  const props = { className: 'h-5 w-5 text-turquoise shrink-0', strokeWidth: 1.5 };
  switch (name) {
    case 'compass':
      return <Compass {...props} />;
    case 'code':
      return <Code2 {...props} />;
    case 'server':
      return <Server {...props} />;
    case 'terminal':
      return <Terminal {...props} />;
    case 'layers':
      return <Layers {...props} />;
    case 'git-branch':
      return <GitBranch {...props} />;
  }
}

export function LearnSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const nodeRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const activeModule = LEARN_MODULES[activeIndex];

  const handleRailKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const nextIdx = getNextModuleIndex(idx, e.key, LEARN_MODULES.length);
    if (nextIdx !== null) {
      e.preventDefault();
      setActiveIndex(nextIdx);
      nodeRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <section
      id="learn"
      aria-labelledby="learn-heading"
      className="bg-navy-900 py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <SectionHeader
          index="03"
          tag="// 03 LEARN"
          title="Learn"
          intro="Four structured tracks from first z/OS login to enterprise data pipelines and security."
          titleId="learn-heading"
        />

        {/* Desktop Interactive Module Rail */}
        <div className="mt-12 hidden md:block">
          <div className="relative px-4">
            {/* Horizontal turquoise connector rail */}
            <div
              aria-hidden="true"
              className="absolute left-8 right-8 top-6 h-px bg-turquoise/45"
            />

            <div
              role="tablist"
              aria-label="Curriculum tracks"
              className="relative grid grid-cols-4 gap-4"
            >
              {LEARN_MODULES.map((mod, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <button
                    key={mod.id}
                    ref={(el) => {
                      nodeRefs.current[idx] = el;
                    }}
                    role="tab"
                    id={`tab-${mod.id}`}
                    aria-selected={isSelected}
                    aria-controls={`panel-${mod.id}`}
                    tabIndex={isSelected ? 0 : -1}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onFocus={() => setActiveIndex(idx)}
                    onKeyDown={(e) => handleRailKeyDown(e, idx)}
                    className="group flex flex-col items-start text-left cursor-pointer rounded-[6px] p-1"
                  >
                    {/* Truss-styled node */}
                    <span
                      className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-[6px] border transition-all duration-200 ${
                        isSelected
                          ? 'border-pink bg-navy-800 shadow-[0_0_20px_rgba(232,1,160,0.22)]'
                          : 'border-turquoise/50 bg-navy-950 group-hover:border-turquoise'
                      }`}
                    >
                      <span
                        className={`h-5 w-1 transition-colors ${
                          isSelected ? 'bg-pink' : 'bg-indigo/75'
                        }`}
                        aria-hidden="true"
                      />
                    </span>

                    <span
                      className={`mt-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-colors ${
                        isSelected ? 'text-pink' : 'text-sky'
                      }`}
                    >
                      {mod.code}
                    </span>
                    <span
                      className={`mt-1 font-sans text-sm font-medium leading-snug transition-colors ${
                        isSelected ? 'text-beige' : 'text-beige-dim group-hover:text-beige'
                      }`}
                    >
                      {mod.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel beneath rail */}
          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.id}
                role="tabpanel"
                id={`panel-${activeModule.id}`}
                aria-labelledby={`tab-${activeModule.id}`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="z-card p-7"
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-pink">
                        {activeModule.code}
                      </span>
                      <Badge variant="turquoise">{activeModule.format}</Badge>
                      <span className="font-mono text-xs text-indigo tabular-nums">
                        {activeModule.duration}
                      </span>
                    </div>
                    <h3 className="mt-3 font-sans text-2xl font-medium text-beige">
                      {activeModule.title}
                    </h3>
                    <p className="mt-2.5 max-w-[65ch] text-base leading-[1.7] text-beige-dim">
                      {activeModule.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:col-span-4 lg:justify-end">
                    {activeModule.topics.map((topic) => (
                      <Badge key={topic} variant="sky">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Vertical Timeline + Accordion */}
        <div className="mt-8 md:hidden">
          <Accordion type="single" collapsible defaultValue={LEARN_MODULES[0].id}>
            {LEARN_MODULES.map((mod) => (
              <AccordionItem key={mod.id} value={mod.id} className="border-navy-700">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <span className="font-mono text-xs font-semibold text-sky">
                      {mod.code}
                    </span>
                    <span className="font-sans text-base font-medium text-beige">
                      {mod.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="rounded-[8px] border border-navy-700 bg-navy-800 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="turquoise">{mod.format}</Badge>
                      <span className="font-mono text-xs text-sky">{mod.duration}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-beige-dim">
                      {mod.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {mod.topics.map((topic) => (
                        <Badge key={topic} variant="sky">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Badge Disclaimer Note */}
        <div className="mt-8 rounded-[10px] border border-turquoise/35 bg-navy-800/60 px-5 py-4">
          <p className="text-sm sm:text-base text-beige">
            Our workshops are designed to help you prepare for IBM Z digital badges.
          </p>
        </div>

        {/* Moved JCL Lab Terminal Showcase */}
        <div className="mt-14 grid grid-cols-1 items-center gap-8 rounded-[12px] border border-navy-700 bg-navy-950/50 p-6 sm:p-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-indigo">
              // LAB PREVIEW · TRACK 02
            </p>
            <h2 className="mt-2 font-mono text-xl sm:text-2xl font-semibold text-beige">
              Your first batch job in JCL
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-beige-dim">
              In our hands-on workshops you connect to a real z/OS system via Zowe and VS Code,
              write Job Control Language decks, submit them to JES2, and verify clean{' '}
              <span className="font-mono text-turquoise">MAXCC=0000</span> return codes.
            </p>
          </div>
          <div className="lg:col-span-7">
            <JclTerminal />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="mt-14">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-turquoise">
            RESOURCES
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map((res) => (
              <a
                key={res.id}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="z-card group flex items-start justify-between gap-4 p-5"
              >
                <div className="flex items-start gap-3.5">
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] border border-navy-700 bg-navy-900">
                    {renderResourceIcon(res.iconName)}
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-medium text-beige group-hover:text-turquoise transition-colors">
                      {res.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-beige-dim">
                      {res.description}
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  className="mt-1 h-4 w-4 shrink-0 text-turquoise transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
