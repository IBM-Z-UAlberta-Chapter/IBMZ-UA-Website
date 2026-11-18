import * as React from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react';
import { EVENTS } from '../data/events';
import { LEARN_MODULES } from '../data/learn';
import { PRESENTATIONS } from '../data/presentations';
import { PROJECTS } from '../data/projects';
import { SPONSOR_TIERS } from '../data/sponsors';
import { LEADERSHIP_TEAM, VP_TEAM } from '../data/team';
import type { PageRoute } from '../utils/filters';
import { TrussDivider } from './TrussMotifs';
import { Button } from './ui/button';

interface DirectoryCard {
  index: string;
  title: string;
  meta: string;
  description: string;
  path: PageRoute;
  accent: 'sky' | 'indigo' | 'turquoise' | 'pink';
}

const DIRECTORY_CARDS: DirectoryCard[] = [
  {
    index: '01',
    title: 'About',
    meta: '3 PILLARS',
    description: 'How the chapter works: hands-on labs, working groups, and IBM mentorship.',
    path: '/about',
    accent: 'sky',
  },
  {
    index: '02',
    title: 'Events',
    meta: `${EVENTS.length} UPCOMING`,
    description: 'Bootcamps, JCL labs, the 48-hour mini-datathon, and career panels.',
    path: '/events',
    accent: 'turquoise',
  },
  {
    index: '03',
    title: 'Learn',
    meta: `${LEARN_MODULES.length} TRACKS`,
    description: 'Four-track curriculum from z/OS foundations to enterprise security.',
    path: '/learn',
    accent: 'indigo',
  },
  {
    index: '04',
    title: 'Projects',
    meta: `${PROJECTS.length} GROUPS`,
    description: 'Student working groups building tools, pipelines, and datathon kits.',
    path: '/projects',
    accent: 'sky',
  },
  {
    index: '05',
    title: 'Talks',
    meta: `${PRESENTATIONS.length} DECKS`,
    description: 'Workshop slide decks, architecture overviews, and session notes.',
    path: '/talks',
    accent: 'indigo',
  },
  {
    index: '06',
    title: 'Team',
    meta: `${LEADERSHIP_TEAM.length + VP_TEAM.length} ROLES`,
    description: 'The IBM Z Ambassador, Co-Presidents, and seven VP portfolios.',
    path: '/team',
    accent: 'turquoise',
  },
  {
    index: '07',
    title: 'Sponsors',
    meta: `${SPONSOR_TIERS.length} TIERS`,
    description: 'Bronze, Silver, and Gold CAD sponsorship packages for campus partners.',
    path: '/sponsors',
    accent: 'pink',
  },
  {
    index: '08',
    title: 'Join',
    meta: 'OPEN TO UALBERTA',
    description: 'Three quick steps to fill out the form, join Discord, and attend a lab.',
    path: '/join',
    accent: 'pink',
  },
];

interface HeroSectionProps {
  onNavigate: (route: PageRoute) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [canvasReady, setCanvasReady] = React.useState(false);

  const applyCanvasOverrides = React.useCallback(() => {
    try {
      const doc = iframeRef.current?.contentDocument;
      if (!doc || !doc.body) {
        return;
      }

      if (!doc.getElementById('z-chapter-overrides')) {
        const style = doc.createElement('style');
        style.id = 'z-chapter-overrides';
        style.textContent = `
          html, body { background: #11183c !important; }
          #hud { display: none !important; visibility: hidden !important; }
        `;
        doc.head?.appendChild(style);
      }

      doc.documentElement.style.backgroundColor = '#11183c';
      doc.body.style.backgroundColor = '#11183c';

      const hud = doc.getElementById('hud');
      if (hud) {
        hud.style.display = 'none';
        hud.setAttribute('aria-hidden', 'true');
      }
    } finally {
      setCanvasReady(true);
    }
  }, []);

  React.useEffect(() => {
    if (iframeRef.current?.contentDocument?.readyState === 'complete') {
      applyCanvasOverrides();
    }
  }, [applyCanvasOverrides]);

  const handleRouteClick = (e: React.MouseEvent<HTMLAnchorElement>, route: PageRoute) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onNavigate(route);
  };

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-navy-900"
    >
      {/* Full-bleed Hero Stage with Data-into-Z Canvas spanning the entire section */}
      <div className="relative flex min-h-[560px] items-center sm:min-h-[600px] lg:min-h-[640px]">
        <iframe
          ref={iframeRef}
          onLoad={applyCanvasOverrides}
          src="/assets/aistudio/IBM_Z_UAlberta_Chapter___Data_into_Z_9ee50d85.html"
          title="Data into Z — colored cables carrying pixel data into the IBM Z UAlberta Chapter logo"
          className={`absolute inset-y-0 left-0 h-full w-[110%] sm:w-[114%] lg:w-[116%] border-0 transition-opacity duration-300 ${
            canvasReady ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Localized readability scrim behind the headline block in navy-900 (#11183c) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background:
              'radial-gradient(ellipse 48% 68% at 24% 48%, rgba(17, 24, 60, 0.88) 0%, rgba(17, 24, 60, 0.56) 62%, transparent 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 lg:hidden"
          style={{
            background:
              'linear-gradient(to bottom, rgba(17, 24, 60, 0.86) 0%, rgba(17, 24, 60, 0.78) 68%, rgba(17, 24, 60, 0.25) 90%, transparent 100%)',
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-14 sm:py-16 lg:px-8 lg:py-20">
          {/* Left Editorial Display Headline & Actions (right half stays open for the Z logo) */}
          <div className="max-w-[520px] xl:max-w-[560px]">
            <p className="font-mono text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.14em] text-turquoise">
              IBM Z STUDENT COMMUNITY · UNIVERSITY OF ALBERTA
            </p>

            <h1
              id="hero-heading"
              className="mt-3.5 font-display font-extrabold text-[clamp(2.35rem,4.7vw,4.35rem)] leading-[0.95] tracking-[-0.03em] text-beige [text-wrap:balance]"
            >
              THE <span className="text-sky">MACHINES</span> BEHIND THE WORLD&apos;S BIGGEST
              SYSTEMS.
            </h1>

            <p className="mt-5 max-w-[52ch] text-base sm:text-[1.0625rem] leading-[1.7] text-beige">
              Learn z/OS, JCL and enterprise computing with IBM Z UAlberta Chapter. Hands-on labs,
              datathons, industry speakers and real projects.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button asChild variant="primary">
                <a href="/join" onClick={(e) => handleRouteClick(e, '/join')}>
                  <span>Join the club</span>
                  <ArrowUpRight className="h-5 w-5" strokeWidth={1.75} />
                </a>
              </Button>

              <Button asChild variant="secondary">
                <a href="/events" onClick={(e) => handleRouteClick(e, '/events')}>
                  <span>See events</span>
                  <ArrowDownRight className="h-4 w-4" strokeWidth={1.75} />
                </a>
              </Button>
            </div>

            <ul
              aria-label="Program cadence highlights"
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-beige/15 pt-4 font-mono text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.14em] text-beige/85"
            >
              <li className="flex items-center gap-2">
                <span className="h-2 w-0.5 bg-pink" aria-hidden="true" />
                <span>BI-WEEKLY LABS</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-0.5 bg-indigo" aria-hidden="true" />
                <span>48-HOUR DATATHON</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-0.5 bg-turquoise" aria-hidden="true" />
                <span>ANNUAL HACKATHON</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <TrussDivider />

      {/* Home Chapter Directory — Direct Links to Individual Pages */}
      <div className="bg-navy-900 py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-navy-700 pb-5">
            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-turquoise">
                // CHAPTER DIRECTORY
              </p>
              <h2 className="mt-1.5 font-mono text-2xl sm:text-3xl font-semibold tracking-[-0.01em] text-beige">
                Explore the chapter
              </h2>
            </div>
            <p className="max-w-[46ch] text-sm text-beige-dim">
              Jump straight to events, our six-module curriculum, student projects, or sponsorship
              packages.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DIRECTORY_CARDS.map((card) => {
              const accentClass =
                card.accent === 'pink'
                  ? 'text-pink'
                  : card.accent === 'indigo'
                  ? 'text-indigo'
                  : card.accent === 'turquoise'
                  ? 'text-turquoise'
                  : 'text-sky';

              return (
                <a
                  key={card.path}
                  href={card.path}
                  onClick={(e) => handleRouteClick(e, card.path)}
                  className="z-card group flex flex-col justify-between p-5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-mono text-xs font-semibold ${accentClass}`}>
                        {card.index}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-beige-dim">
                        {card.meta}
                      </span>
                    </div>
                    <h3 className="mt-3 font-sans text-lg font-medium text-beige group-hover:text-turquoise transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-beige-dim">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-turquoise">
                    <span>Open page</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      strokeWidth={1.75}
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
