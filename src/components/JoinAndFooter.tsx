import type * as React from 'react';
import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import {
  CLUB_EMAILS,
  DISCORD_URL,
  GITHUB_URL,
  INSTAGRAM_URL,
  JOIN_FORM_URL,
  LINKEDIN_URL,
} from '../config';
import type { PageRoute } from '../utils/filters';
import { NAV_ITEMS } from './Navbar';
import { ClubLogoMark, TrussGrid } from './TrussMotifs';
import { Button } from './ui/button';

function DiscordIcon({
  className = 'h-4 w-4',
  strokeWidth = 1.5,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M8.5 6.3 7.8 5C6.2 5.4 4.8 6.1 4 6.9 2.4 9.9 2 13.1 2.3 16.4c1.3 1.1 2.9 1.8 4.4 2.2l1.1-1.8c-.8-.3-1.5-.7-2.2-1.2M15.5 6.3 16.2 5c1.6.4 3 1.1 3.8 1.9 1.6 3 2 6.2 1.7 9.5-1.3 1.1-2.9 1.8-4.4 2.2l-1.1-1.8c.8-.3 1.5-.7 2.2-1.2" />
      <path d="M7.8 15.6c2.7 1.1 5.7 1.1 8.4 0" />
      <path d="M8.5 6.3c2.3-.5 4.7-.5 7 0" />
      <circle cx="9.2" cy="12" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="14.8" cy="12" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

const JOIN_STEPS = [
  { num: '01', text: 'Fill out the form' },
  { num: '02', text: 'Join the Discord' },
  { num: '03', text: 'Show up to a lab' },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: INSTAGRAM_URL, icon: Instagram },
  { label: 'LinkedIn', href: LINKEDIN_URL, icon: Linkedin },
  { label: 'Discord', href: DISCORD_URL, icon: DiscordIcon },
  { label: 'GitHub', href: GITHUB_URL, icon: Github },
];

export function JoinSection() {
  return (
    <section
      id="join"
      aria-labelledby="join-heading"
      className="relative overflow-hidden bg-navy-900 py-20 md:py-28"
    >
      <TrussGrid
        opacityClass="opacity-[0.09]"
        className="absolute -right-12 top-1/2 h-[540px] w-[420px] -translate-y-1/2"
      />

      <div className="relative mx-auto max-w-[1200px] px-5 lg:px-8">
        <p className="font-mono text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.14em] text-turquoise">
          // 08 JOIN
        </p>

        <h1
          id="join-heading"
          className="mt-4 max-w-[14ch] font-display font-extrabold text-[clamp(2.75rem,7.5vw,6rem)] leading-[0.95] tracking-[-0.03em] text-beige"
        >
          JOIN THE <span className="text-pink">CHAPTER.</span>
        </h1>

        <p className="mt-5 max-w-[60ch] text-base sm:text-lg leading-[1.7] text-beige-dim">
          Open to all currently enrolled UAlberta undergraduate and graduate students.
        </p>

        {/* 3 Mono Steps */}
        <ol className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {JOIN_STEPS.map((step, idx) => (
            <li
              key={step.num}
              className="flex items-center gap-4 rounded-[10px] border border-navy-700 bg-navy-800/80 px-5 py-4"
            >
              <span
                className={`font-mono text-lg font-semibold tabular-nums ${
                  idx === 0
                    ? 'text-sky'
                    : idx === 1
                    ? 'text-indigo'
                    : 'text-turquoise'
                }`}
              >
                {step.num}
              </span>
              <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.1em] text-beige">
                {step.text}
              </span>
            </li>
          ))}
        </ol>

        {/* Primary Google Form + Secondary Discord / LinkedIn */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button asChild variant="primary">
            <a href={JOIN_FORM_URL} target="_blank" rel="noopener noreferrer">
              <span>Join via Google Form</span>
              <ArrowUpRight className="h-5 w-5" strokeWidth={1.75} />
            </a>
          </Button>

          <Button asChild variant="secondary">
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              <span>Discord</span>
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </Button>

          <Button asChild variant="secondary">
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              <span>LinkedIn</span>
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

interface SiteFooterProps {
  onNavigate: (route: PageRoute) => void;
}

export function SiteFooter({ onNavigate }: SiteFooterProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: PageRoute) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-navy-950 py-14 text-beige">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-start">
          {/* Brand + Email */}
          <div className="md:col-span-5">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="inline-flex items-center gap-3 rounded-[6px]"
            >
              <ClubLogoMark size={36} />
              <span className="font-mono text-base font-semibold text-beige">
                IBM Z UAlberta Chapter
              </span>
            </a>

            <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-beige-dim">
              Official IBM Z student community at the University of Alberta. Edmonton, AB.
            </p>

            <ul aria-label="Chapter contact emails" className="mt-4 space-y-1">
              {CLUB_EMAILS.map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex min-h-[38px] items-center gap-2 font-mono text-sm text-turquoise hover:text-beige transition-colors"
                  >
                    <Mail className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    <span>{email}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Short Nav */}
          <nav aria-label="Footer navigation" className="md:col-span-4">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-beige-dim">
              PAGES
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleLinkClick(e, '/')}
                  className="inline-flex min-h-[36px] items-center text-beige-dim hover:text-turquoise transition-colors"
                >
                  Home
                </a>
              </li>
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.path}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className="inline-flex min-h-[36px] items-center text-beige-dim hover:text-turquoise transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/join"
                  onClick={(e) => handleLinkClick(e, '/join')}
                  className="inline-flex min-h-[36px] items-center text-beige-dim hover:text-turquoise transition-colors"
                >
                  Join
                </a>
              </li>
            </ul>
          </nav>

          {/* Social Icons */}
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-beige-dim">
              COMMUNITY
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {SOCIAL_LINKS.map((soc) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.label}
                    title={soc.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-[6px] border border-navy-700 bg-navy-900 text-turquoise hover:border-turquoise/60 hover:text-beige transition-colors"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-navy-700/80 pt-6">
          <p className="text-xs leading-relaxed text-beige-dim">
            IBM and IBM Z are trademarks of International Business Machines Corporation. IBM Z
            UAlberta Chapter is a student-run community.
          </p>
        </div>
      </div>
    </footer>
  );
}
