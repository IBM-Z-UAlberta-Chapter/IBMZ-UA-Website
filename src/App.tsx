import * as React from 'react';
import { AboutSection } from './components/AboutSection';
import { EventsSection } from './components/EventsSection';
import { HeroSection } from './components/HeroSection';
import { JoinSection, SiteFooter } from './components/JoinAndFooter';
import { LearnSection } from './components/LearnSection';
import { Navbar } from './components/Navbar';
import { NotFoundPage } from './components/NotFoundPage';
import { PresentationsSection } from './components/PresentationsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SponsorsSection } from './components/SponsorsSection';
import { TeamSection } from './components/TeamSection';
import { TrussDivider } from './components/TrussMotifs';
import { getPageTitle, normalizeRoute, resolveRoute, type PageRoute } from './utils/filters';

export default function App() {
  const [pathname, setPathname] = React.useState<string>(() => window.location.pathname);

  React.useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const currentRoute = resolveRoute(pathname);

  React.useEffect(() => {
    if (currentRoute) {
      document.title = getPageTitle(currentRoute);
    } else {
      document.title = '404 Not Found | IBM Z UAlberta Chapter';
    }
  }, [currentRoute]);

  const navigate = React.useCallback((nextRoute: PageRoute) => {
    if (normalizeRoute(window.location.pathname) !== nextRoute) {
      window.history.pushState({}, '', nextRoute);
    }
    setPathname(nextRoute);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  if (!currentRoute) {
    return <NotFoundPage onGoHome={() => navigate('/')} />;
  }

  const isBeigePage = currentRoute === '/events' || currentRoute === '/sponsors';

  const renderPage = () => {
    switch (currentRoute) {
      case '/':
        return <HeroSection onNavigate={navigate} />;
      case '/about':
        return <AboutSection />;
      case '/events':
        return <EventsSection />;
      case '/learn':
        return <LearnSection />;
      case '/projects':
        return <ProjectsSection onNavigate={navigate} />;
      case '/talks':
        return <PresentationsSection />;
      case '/team':
        return <TeamSection />;
      case '/sponsors':
        return <SponsorsSection />;
      case '/join':
        return <JoinSection />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-navy-900 text-beige">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[6px] focus:bg-pink focus:px-4 focus:py-2.5 focus:font-mono focus:text-sm focus:font-semibold focus:text-beige"
      >
        Skip to content
      </a>

      <Navbar currentRoute={currentRoute} onNavigate={navigate} />

      <main id="main-content" className="flex-1">
        {renderPage()}
      </main>

      <TrussDivider tone={isBeigePage ? 'beige-top' : 'beige-bottom'} />
      <SiteFooter onNavigate={navigate} />
    </div>
  );
}
