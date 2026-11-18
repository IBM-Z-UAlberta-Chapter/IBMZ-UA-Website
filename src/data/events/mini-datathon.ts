import { DISCORD_URL } from '../../config';
import type { EventItem } from './types';

/** 48-hour asynchronous enterprise predictive-modeling competition for UAlberta students. */
export const miniDatathonEvent: EventItem = {
  id: 'evt-mini-datathon',
  title: '48-Hour Mini-Datathon',
  date: null,
  format: 'Online',
  location: 'Kaggle & GitHub Classroom',
  durationLabel: '48 hours',
  tag: 'Competition',
  timeline: 'upcoming',
  description:
    'Asynchronous enterprise predictive-modeling sprint using Python, Pandas, and mainframe-hosted datasets. Free to enter.',
  url: DISCORD_URL,
  accent: 'indigo',
  isConfirmed: false,
};
