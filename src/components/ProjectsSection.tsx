import type * as React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, GitBranch } from 'lucide-react';
import { PROJECTS, type ProjectStatus } from '../data/projects';
import type { PageRoute } from '../utils/filters';
import { SectionHeader } from './SectionHeader';
import { TrussCorner } from './TrussMotifs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

function statusBadgeVariant(status: ProjectStatus) {
  switch (status) {
    case 'Planned':
      return 'sky';
    case 'In progress':
      return 'turquoise';
    case 'Shipped':
      return 'pink';
  }
}

interface ProjectsSectionProps {
  onNavigate?: (route: PageRoute) => void;
}

export function ProjectsSection({ onNavigate }: ProjectsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [featuredProject, ...secondaryProjects] = PROJECTS;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-navy-950/60 py-16 md:py-24 border-t border-navy-700/70"
    >
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <SectionHeader
          index="04"
          tag="// 04 PROJECTS"
          title="Projects"
          intro="Working groups building on IBM Z. Join one or start one."
          titleId="projects-heading"
        />

        {/* Asymmetric Bento Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Large Featured Card */}
          {featuredProject && (
            <motion.article
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="z-card relative flex flex-col justify-between p-6 sm:p-7 lg:col-span-7"
            >
              <TrussCorner position="top-right" className="absolute right-3 top-3" />

              <div>
                <div className="flex flex-wrap items-center gap-2.5 pr-10">
                  <Badge variant={statusBadgeVariant(featuredProject.status)}>
                    {featuredProject.status}
                  </Badge>
                  {!featuredProject.confirmed && (
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-sky">
                      NOT CONFIRMED
                    </span>
                  )}
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-beige-dim">
                    · {featuredProject.workingGroup}
                  </span>
                </div>

                <h3 className="mt-5 font-sans text-2xl font-medium text-beige">
                  {featuredProject.title}
                </h3>
                <p className="mt-3 max-w-[60ch] text-base leading-[1.7] text-beige-dim">
                  {featuredProject.description}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-navy-700 pt-5">
                <div className="flex flex-wrap gap-2">
                  {featuredProject.tags.map((tag) => (
                    <Badge key={tag} variant="turquoise">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <a
                  href={featuredProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${featuredProject.title} on GitHub`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-[6px] border border-navy-700 bg-navy-900 px-3.5 py-2 font-mono text-xs text-turquoise hover:border-turquoise/60 transition-colors"
                >
                  <GitBranch className="h-4 w-4" strokeWidth={1.5} />
                  <span>GitHub</span>
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
              </div>
            </motion.article>
          )}

          {/* Two Stacked Smaller Cards */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            {secondaryProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.35,
                  delay: (idx + 1) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="z-card relative flex flex-1 flex-col justify-between p-6"
              >
                <TrussCorner position="top-right" className="absolute right-3 top-3" />

                <div>
                  <div className="flex flex-wrap items-center gap-2.5 pr-10">
                    <Badge variant={statusBadgeVariant(project.status)}>
                      {project.status}
                    </Badge>
                    {!project.confirmed && (
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-sky">
                        NOT CONFIRMED
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 font-sans text-xl font-medium text-beige">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-beige-dim">
                    {project.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-navy-700 pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="turquoise">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} on GitHub`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-navy-700 bg-navy-900 text-turquoise hover:border-turquoise/60 transition-colors"
                  >
                    <GitBranch className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Wide Working-Group CTA Card */}
        <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-[10px] border border-navy-700 bg-navy-800/75 p-6 sm:flex-row sm:items-center sm:px-7">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-indigo">
              WORKING GROUPS
            </p>
            <h3 className="mt-1 font-sans text-xl font-medium text-beige">
              Have an idea? Start a working group.
            </h3>
          </div>
          <Button asChild variant="ghost">
            <a
              href="/join"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                if (
                  !onNavigate ||
                  e.metaKey ||
                  e.ctrlKey ||
                  e.shiftKey ||
                  e.altKey ||
                  e.button !== 0
                ) {
                  return;
                }
                e.preventDefault();
                onNavigate('/join');
              }}
            >
              <span>Propose via join form</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                strokeWidth={1.75}
              />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
