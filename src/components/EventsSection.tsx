import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, CalendarClock, MapPin } from 'lucide-react';
import { DISCORD_URL, JOIN_FORM_URL } from '../config';
import {
  EVENTS,
  type EventAccent,
  type EventItem,
  type EventTimeline,
} from '../data/events';
import {
  filterEvents,
  formatEventDateBlock,
  type EventFilterCategory,
} from '../utils/filters';
import { SectionHeader } from './SectionHeader';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

const FILTER_OPTIONS: EventFilterCategory[] = ['All', 'Labs', 'Competitions', 'Talks'];

const ACCENT_CYCLE: EventAccent[] = ['pink', 'cobalt', 'indigo', 'turquoise'];

/**
 * Brand accent classes tuned specifically for AA contrast on light `#fffff0` beige surfaces.
 */
function getEventAccentClasses(accent: EventAccent) {
  switch (accent) {
    case 'pink':
      return {
        rail: 'bg-pink',
        badge: 'border-pink/40 bg-pink/10 text-[#9c006b]',
      };
    case 'cobalt':
      return {
        rail: 'bg-cobalt',
        badge: 'border-cobalt-dark/35 bg-cobalt/10 text-cobalt-dark',
      };
    case 'indigo':
      return {
        rail: 'bg-indigo',
        badge: 'border-[#4c3fc7]/35 bg-indigo/15 text-[#372ba8]',
      };
    case 'turquoise':
      return {
        rail: 'bg-turquoise',
        badge: 'border-[#0d7675]/35 bg-turquoise/20 text-[#0d5857]',
      };
  }
}

export function EventsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [category, setCategory] = React.useState<EventFilterCategory>('All');
  const [timeline, setTimeline] = React.useState<EventTimeline>('upcoming');
  const [selectedEvent, setSelectedEvent] = React.useState<EventItem | null>(null);

  const filteredEvents = React.useMemo(
    () => filterEvents(EVENTS, category, timeline),
    [category, timeline]
  );

  return (
    <section
      id="events"
      aria-labelledby="events-heading"
      className="beige-surface bg-beige py-16 text-navy-900 md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <SectionHeader
          index="02"
          tag="// 02 EVENTS"
          title="Events"
          intro="Labs, competitions and talks. Schedule announcements and RSVPs post directly in Discord."
          titleId="events-heading"
          variant="beige"
        />

        {/* Controls Bar: Filter Chips + Upcoming/Past Tabs */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="group"
            aria-label="Filter events by category"
            className="flex flex-wrap items-center gap-2"
          >
            {FILTER_OPTIONS.map((option) => {
              const isSelected = category === option;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setCategory(option)}
                  className={`min-h-[44px] rounded-[6px] border px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.12em] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'border-navy-900 bg-navy-900 text-beige'
                      : 'border-navy-900/25 bg-transparent text-navy-900 hover:border-navy-900 hover:bg-navy-900/5'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <Tabs
            value={timeline}
            onValueChange={(value) => setTimeline(value as EventTimeline)}
          >
            <TabsList
              aria-label="Event timeline"
              className="border border-navy-900/20 bg-navy-900/5"
            >
              <TabsTrigger
                value="upcoming"
                className="bg-transparent text-navy-900 data-[state=active]:bg-navy-900 data-[state=active]:text-beige"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="bg-transparent text-navy-900 data-[state=active]:bg-navy-900 data-[state=active]:text-beige"
              >
                Past
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Single Event Rows with Alternating Brand Accent Rails */}
        <div className="mt-8 border-t border-navy-900/20" data-testid="events-list">
          {filteredEvents.length === 0 ? (
            <div className="border-b border-navy-900/20 py-14 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-cobalt-dark">
                STATUS: ARCHIVE EMPTY
              </p>
              <p className="mt-2 font-sans text-lg font-medium text-navy-900">
                Our first events are coming soon.
              </p>
              <p className="mt-1 text-sm text-navy-900/75">
                {timeline === 'past'
                  ? 'Switch to Upcoming to see our launch labs and datathon.'
                  : 'No events match this filter yet.'}
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event, idx) => {
                const dateBlock = formatEventDateBlock(event.date);
                const accentKey = event.accent ?? ACCENT_CYCLE[idx % ACCENT_CYCLE.length];
                const accentStyle = getEventAccentClasses(accentKey);

                return (
                  <motion.article
                    key={event.id}
                    layout={!prefersReducedMotion}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative border-b border-navy-900/20 py-6 pl-4 transition-all duration-200 hover:bg-navy-900/[0.03] sm:py-7 sm:pl-5"
                  >
                    {/* Alternating brand-color vertical bar */}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full transition-all duration-200 group-hover:top-0 group-hover:bottom-0 group-hover:w-[4px] group-hover:rounded-none ${accentStyle.rail}`}
                    />

                    <div className="grid grid-cols-1 gap-4 pl-0 transition-all duration-200 group-hover:pl-2 md:grid-cols-12 md:items-center md:gap-6">
                      {/* Left Date Block */}
                      <div className="flex items-baseline gap-3 md:col-span-2 md:block">
                        <span className="block font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-navy-900/70">
                          {dateBlock.month}
                        </span>
                        <span className="block font-display text-3xl sm:text-4xl font-extrabold leading-none tracking-tight text-navy-900 tabular-nums">
                          {dateBlock.day}
                        </span>
                      </div>

                      {/* Middle Info */}
                      <div className="md:col-span-8">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span
                            className={`inline-flex items-center rounded-[6px] border px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] leading-none whitespace-nowrap ${accentStyle.badge}`}
                          >
                            {event.tag}
                          </span>
                          <span className="font-mono text-xs text-navy-900/75">
                            {event.format} · {event.location} · {event.durationLabel}
                          </span>
                        </div>
                        <h3 className="mt-2 font-sans text-xl font-medium text-navy-900">
                          {event.title}
                        </h3>
                        <p className="mt-1.5 max-w-[65ch] text-sm sm:text-base leading-relaxed text-navy-900/75">
                          {event.description}
                        </p>
                      </div>

                      {/* Right Ghost Details CTA */}
                      <div className="flex md:col-span-2 md:justify-end">
                        <Button
                          type="button"
                          variant="ghostBeige"
                          onClick={() => setSelectedEvent(event)}
                          aria-label={`Details for ${event.title}`}
                        >
                          <span>Details</span>
                          <ArrowRight
                            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                            strokeWidth={1.75}
                          />
                        </Button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          )}
        </div>

        {/* CTA Row */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-navy-900/20 pt-8">
          <p className="text-sm sm:text-base text-navy-900/80">
            Dates and room confirmations post first in Discord and our member mailing list.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="secondaryBeige">
              <a href={JOIN_FORM_URL} target="_blank" rel="noopener noreferrer">
                <span>Membership form</span>
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </Button>
            <Button asChild variant="primaryBlue">
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                <span>Join our Discord</span>
                <ArrowUpRight className="h-5 w-5" strokeWidth={1.75} />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      <Dialog
        open={selectedEvent !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedEvent(null);
        }}
      >
        <DialogContent>
          {selectedEvent && (
            <>
              <div className="pr-10">
                <Badge variant="turquoise">{selectedEvent.tag}</Badge>
                <DialogTitle className="mt-3">{selectedEvent.title}</DialogTitle>
                <DialogDescription className="mt-2">
                  {selectedEvent.description}
                </DialogDescription>
              </div>

              <div className="mt-5 space-y-2.5 rounded-[8px] border border-navy-700 bg-navy-800/70 p-4 font-mono text-xs text-beige-dim">
                <div className="flex items-center gap-2.5">
                  <CalendarClock className="h-4 w-4 text-turquoise shrink-0" strokeWidth={1.5} />
                  <span>
                    Date: {selectedEvent.date ?? 'TBD'} · Duration:{' '}
                    {selectedEvent.durationLabel}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-sky shrink-0" strokeWidth={1.5} />
                  <span>
                    {selectedEvent.format} · {selectedEvent.location}
                  </span>
                </div>
              </div>

              {selectedEvent.isConfirmed === false && (
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-sky">
                  DATE, TIME &amp; LOCATION TBD · UPDATES WILL POST IN DISCORD
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                <Button asChild variant="primaryCompact">
                  <a href={selectedEvent.url} target="_blank" rel="noopener noreferrer">
                    <span>Get updates in Discord</span>
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                  </a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
