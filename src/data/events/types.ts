/** Event delivery mode shown in event list metadata and modal dialogs. */
export type EventFormat = 'In person' | 'Online' | 'Hybrid';

/** Filter category tag assigned to each chapter event entry. */
export type EventTag = 'Lab' | 'Competition' | 'Talk' | 'Flagship';

/** Timeline bucket controlling whether the event appears under Upcoming or Past tabs. */
export type EventTimeline = 'upcoming' | 'past';

/** Alternating brand accent palette tokens supported on light (beige) event rows. */
export type EventAccent = 'pink' | 'cobalt' | 'indigo' | 'turquoise';

/**
 * Single chapter event entry rendered on the Events page (`/events`).
 */
export interface EventItem {
  /** Stable unique identifier (used as React key and unit-test anchor). */
  id: string;
  /** Event title displayed in the schedule list and modal header. */
  title: string;
  /** ISO date string (`YYYY-MM-DD`) or `null` when schedule timing is not yet confirmed. */
  date: string | null;
  /** Format label (`In person`, `Online`, or `Hybrid`). */
  format: EventFormat;
  /** Campus room or virtual platform details. */
  location: string;
  /** Short duration string (e.g., `'90 min'`, `'48 hours'`). */
  durationLabel: string;
  /** Primary classification tag used for filter chips. */
  tag: EventTag;
  /** Timeline placement (`upcoming` or `past`). */
  timeline: EventTimeline;
  /** Concise 1–2 sentence overview of what students will do or learn. */
  description: string;
  /** External RSVP or announcement link (defaults to the chapter Discord). */
  url: string;
  /** Optional subtle visual brand accent applied to the event row on the Events page. */
  accent?: EventAccent;
  /** Indicates the entry date/room is sample/unconfirmed pending term scheduling. */
  isConfirmed?: boolean;
}
