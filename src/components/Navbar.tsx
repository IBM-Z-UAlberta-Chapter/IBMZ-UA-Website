import * as React from 'react';
import { Menu } from 'lucide-react';
import type { PageRoute } from '../utils/filters';
import { ClubLogoMark } from './TrussMotifs';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

export interface NavItem {
  id: string;
  label: string;
  path: PageRoute;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About', path: '/about' },
  { id: 'events', label: 'Events', path: '/events' },
  { id: 'learn', label: 'Learn', path: '/learn' },
  { id: 'projects', label: 'Projects', path: '/projects' },
  { id: 'talks', label: 'Talks', path: '/talks' },
  { id: 'team', label: 'Team', path: '/team' },
  { id: 'sponsors', label: 'Sponsors', path: '/sponsors' },
];

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export function Navbar({ currentRoute, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: PageRoute,
    closeSheet = false
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    if (closeSheet) {
      setMobileOpen(false);
    }
    onNavigate(path);
  };

  const isJoinActive = currentRoute === '/join';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-navy-700 bg-navy-900/90 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between gap-4 px-5 lg:gap-6 lg:px-8">
        {/* Left: Logo mark (36px) + Chapter Name in Plex Mono -> Home (/) */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          aria-current={currentRoute === '/' ? 'page' : undefined}
          className="inline-flex shrink-0 items-center gap-3 rounded-[6px] py-1 text-beige hover:text-turquoise transition-colors whitespace-nowrap"
        >
          <ClubLogoMark size={36} />
          <span className="font-mono text-sm sm:text-[15px] font-semibold tracking-tight whitespace-nowrap">
            IBM Z UAlberta Chapter
          </span>
        </a>

        {/* Center/Right: Desktop Navigation */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-4 xl:gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = currentRoute === item.path;
            return (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                  isActive ? 'text-beige' : 'text-beige-dim hover:text-beige'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0.5 left-0 h-[2px] bg-pink transition-all duration-200 ${
                    isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Far Right: Join CTA + Mobile Hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            asChild
            variant="primaryCompact"
            className={`hidden lg:inline-flex ${
              isJoinActive ? 'ring-2 ring-turquoise ring-offset-2 ring-offset-navy-900' : ''
            }`}
          >
            <a
              href="/join"
              onClick={(e) => handleLinkClick(e, '/join')}
              aria-current={isJoinActive ? 'page' : undefined}
            >
              Join
            </a>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                className="inline-flex h-11 w-11 items-center justify-center rounded-[6px] border border-navy-700 bg-navy-800 text-beige hover:border-turquoise/60 hover:text-turquoise lg:hidden cursor-pointer"
              >
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </SheetTrigger>
            <SheetContent>
              <div className="pr-12">
                <SheetTitle className="flex items-center gap-2.5 text-xs">
                  <ClubLogoMark size={28} />
                  <span>IBM Z UAlberta Navigation</span>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Navigate to pages of the IBM Z UAlberta Chapter website.
                </SheetDescription>
              </div>

              <nav aria-label="Mobile sections" className="mt-6 flex flex-1 flex-col gap-1 overflow-y-auto">
                <a
                  href="/"
                  onClick={(e) => handleLinkClick(e, '/', true)}
                  aria-current={currentRoute === '/' ? 'page' : undefined}
                  className={`flex min-h-[44px] items-center justify-between rounded-[6px] px-3 text-base font-medium transition-colors ${
                    currentRoute === '/'
                      ? 'bg-navy-800 text-beige border-l-2 border-pink'
                      : 'text-beige-dim hover:bg-navy-800/60 hover:text-beige'
                  }`}
                >
                  <span>Home</span>
                  {currentRoute === '/' && (
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-pink">
                      Active
                    </span>
                  )}
                </a>

                {NAV_ITEMS.map((item) => {
                  const isActive = currentRoute === item.path;
                  return (
                    <a
                      key={item.id}
                      href={item.path}
                      onClick={(e) => handleLinkClick(e, item.path, true)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex min-h-[44px] items-center justify-between rounded-[6px] px-3 text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-navy-800 text-beige border-l-2 border-pink'
                          : 'text-beige-dim hover:bg-navy-800/60 hover:text-beige'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-pink">
                          Active
                        </span>
                      )}
                    </a>
                  );
                })}
              </nav>

              <div className="mt-auto border-t border-navy-700 pt-5">
                <Button asChild variant="primary" className="w-full">
                  <a
                    href="/join"
                    onClick={(e) => handleLinkClick(e, '/join', true)}
                    aria-current={isJoinActive ? 'page' : undefined}
                  >
                    Join the club
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
