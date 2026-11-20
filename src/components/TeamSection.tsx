import { motion, useReducedMotion } from 'motion/react';
import { Linkedin } from 'lucide-react';
import { LEADERSHIP_TEAM, VP_TEAM, type TeamMember } from '../data/team';
import { SectionHeader } from './SectionHeader';

function TeamCard({
  member,
  large = false,
  delay = 0,
}: {
  member: TeamMember;
  large?: boolean;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.32, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`z-card flex flex-col justify-between ${large ? 'p-7' : 'p-6'}`}
    >
      <div className="flex items-start gap-4">
        {/* Square Monogram / Photo Slot */}
        <div
          className={`relative shrink-0 overflow-hidden rounded-[8px] border border-turquoise bg-navy-700 ${
            large ? 'h-16 w-16' : 'h-14 w-14'
          }`}
        >
          {member.photoUrl ? (
            <img
              src={member.photoUrl}
              alt={`${member.name}, ${member.role}`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-mono text-sm font-semibold tracking-wider text-beige">
                {member.initials}
              </span>
            </div>
          )}
          {/* Pink corner notch */}
          <span
            aria-hidden="true"
            className="absolute right-0 top-0 h-2.5 w-2.5 bg-pink"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-sky">
            {member.role}
          </p>
          <h3 className="mt-1 font-sans text-lg sm:text-xl font-medium text-beige truncate">
            {member.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-beige-dim">
            {member.responsibility}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-navy-700 pt-3.5">
        <span
          className={`font-mono text-[11px] uppercase tracking-[0.12em] ${
            member.confirmed ? 'text-turquoise' : 'text-beige-dim'
          }`}
        >
          {member.confirmed ? 'CONFIRMED' : 'OPEN POSITION'}
        </span>
        {member.linkedinUrl ? (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-navy-700 text-turquoise hover:border-turquoise/60 transition-colors"
          >
            <Linkedin className="h-4 w-4" strokeWidth={1.5} />
          </a>
        ) : (
          <span
            aria-hidden="true"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-navy-700/60 text-navy-600"
          >
            <Linkedin className="h-4 w-4" strokeWidth={1.5} />
          </span>
        )}
      </div>
    </motion.article>
  );
}

export function TeamSection() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="bg-navy-950/60 py-16 md:py-24 border-t border-navy-700/70"
    >
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <SectionHeader
          index="06"
          tag="// 06 TEAM"
          title="Team"
          intro="Meet our IBM Z Ambassadors and Co-Presidents. Open VP roles are currently recruiting for the upcoming term."
          titleId="team-heading"
        />

        {/* Row 1: Larger cards for IBM Z Ambassador & Co-Presidents */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {LEADERSHIP_TEAM.map((member, idx) => (
            <TeamCard key={member.id} member={member} large delay={idx * 0.05} />
          ))}
        </div>

        {/* Row 2: 3-column grid for the seven VPs */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VP_TEAM.map((member, idx) => (
            <TeamCard key={member.id} member={member} delay={(idx % 3) * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}
