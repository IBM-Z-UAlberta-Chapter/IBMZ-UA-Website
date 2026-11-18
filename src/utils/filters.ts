import type { EventItem, EventTag, EventTimeline } from '../data/events';

/** Category chip options rendered in the Events page filter toolbar. */
export type EventFilterCategory = 'All' | 'Labs' | 'Competitions' | 'Talks';

const CATEGORY_TO_TAGS: Record<Exclude<EventFilterCategory, 'All'>, EventTag[]> = {
  Labs: ['Lab'],
  Competitions: ['Competition', 'Flagship'],
  Talks: ['Talk'],
};

/**
 * Filters chapter events by selected category chip and active timeline tab (`upcoming` vs `past`).
 */
export function filterEvents(
  events: EventItem[],
  category: EventFilterCategory,
  timeline: EventTimeline
): EventItem[] {
  return events.filter((event) => {
    if (event.timeline !== timeline) {
      return false;
    }
    if (category === 'All') {
      return true;
    }
    const allowedTags = CATEGORY_TO_TAGS[category];
    return allowedTags.includes(event.tag);
  });
}

const MONTH_ABBR = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

/**
 * Formats an ISO date (`YYYY-MM-DD`) into stacked month/day labels for event cards.
 * Returns `{ month: 'DATE', day: 'TBA' }` when unconfirmed (`null`) or malformed.
 */
export function formatEventDateBlock(isoDate: string | null): { month: string; day: string } {
  if (!isoDate) {
    return { month: 'DATE', day: 'TBA' };
  }
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim());
  if (!match) {
    return { month: 'DATE', day: 'TBA' };
  }
  const monthIdx = Number(match[2]) - 1;
  const dayNum = Number(match[3]);
  if (monthIdx < 0 || monthIdx > 11 || dayNum < 1 || dayNum > 31) {
    return { month: 'DATE', day: 'TBA' };
  }
  return {
    month: MONTH_ABBR[monthIdx],
    day: String(dayNum).padStart(2, '0'),
  };
}

/**
 * Computes the next curriculum track index during ARIA tablist keyboard navigation.
 * Supports ArrowRight/ArrowDown (next), ArrowLeft/ArrowUp (prev), Home, and End.
 */
export function getNextModuleIndex(currentIndex: number, key: string, total: number): number | null {
  if (total <= 0) return null;
  switch (key) {
    case 'ArrowRight':
    case 'ArrowDown':
      return (currentIndex + 1) % total;
    case 'ArrowLeft':
    case 'ArrowUp':
      return (currentIndex - 1 + total) % total;
    case 'Home':
      return 0;
    case 'End':
      return total - 1;
    default:
      return null;
  }
}

/** Supported client-side page routes in the chapter application. */
export type PageRoute =
  | '/'
  | '/about'
  | '/events'
  | '/learn'
  | '/projects'
  | '/talks'
  | '/team'
  | '/sponsors'
  | '/join';

/** Ordered list of all valid chapter page paths. */
export const PAGE_ROUTES: readonly PageRoute[] = [
  '/',
  '/about',
  '/events',
  '/learn',
  '/projects',
  '/talks',
  '/team',
  '/sponsors',
  '/join',
] as const;

const ROUTE_TITLES: Record<PageRoute, string> = {
  '/': 'IBM Z UAlberta Chapter | Learn the mainframe at the University of Alberta',
  '/about': 'About | IBM Z UAlberta Chapter',
  '/events': 'Events | IBM Z UAlberta Chapter',
  '/learn': 'Learn | IBM Z UAlberta Chapter',
  '/projects': 'Projects | IBM Z UAlberta Chapter',
  '/talks': 'Presentations & Talks | IBM Z UAlberta Chapter',
  '/team': 'Team | IBM Z UAlberta Chapter',
  '/sponsors': 'Sponsors | IBM Z UAlberta Chapter',
  '/join': 'Join | IBM Z UAlberta Chapter',
};

/**
 * Strips query parameters, hashes, trailing slashes, and `/index.html` into a canonical path.
 */
export function normalizeRoute(pathname: string): string {
  const cleaned = pathname.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  if (cleaned === '/index.html') {
    return '/';
  }
  return cleaned;
}

/**
 * Resolves a raw browser pathname to a valid `PageRoute`, or `null` for 404 routes.
 */
export function resolveRoute(pathname: string): PageRoute | null {
  const normalized = normalizeRoute(pathname);
  return (PAGE_ROUTES as readonly string[]).includes(normalized)
    ? (normalized as PageRoute)
    : null;
}

/** Returns `true` when `pathname` corresponds to a supported chapter route. */
export function isKnownRootRoute(pathname: string): boolean {
  return resolveRoute(pathname) !== null;
}

/** Returns the `<title>` string corresponding to the resolved `PageRoute`. */
export function getPageTitle(route: PageRoute): string {
  return ROUTE_TITLES[route];
}
