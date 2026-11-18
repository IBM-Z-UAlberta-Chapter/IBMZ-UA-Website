import { careerPanelEvent } from './career-panel';
import { introToJclEvent } from './intro-to-jcl';
import { miniDatathonEvent } from './mini-datathon';
import { xploreBootcampEvent } from './xplore-bootcamp';
import type { EventItem } from './types';

export type { EventAccent, EventFormat, EventItem, EventTag, EventTimeline } from './types';

/**
 * Ordered list of chapter events shown on `/events`.
 * To add an event, create a new file in `src/data/events/` and append it here.
 */
export const EVENTS: EventItem[] = [
  xploreBootcampEvent,
  introToJclEvent,
  miniDatathonEvent,
  careerPanelEvent,
];
