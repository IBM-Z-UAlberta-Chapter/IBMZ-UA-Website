import { DISCORD_URL } from '../../config';
import type { EventItem } from './types';

/** Asynchronous enterprise predictive-modeling competition for UAlberta students. */
export const miniDatathonEvent: EventItem = {
  id: 'evt-mini-datathon',
  title: 'Mini-Datathon',
  date: null,
  format: 'Online',
  location: 'Platform TBD',
  durationLabel: 'Time TBD',
  tag: 'Competition',
  timeline: 'upcoming',
  description:
    'Asynchronous enterprise predictive-modeling sprint using Python, Pandas, and mainframe-hosted datasets. Free to enter.',
  url: DISCORD_URL,
  accent: 'indigo',
  isConfirmed: false,
};
