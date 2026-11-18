import { DISCORD_URL } from '../../config';
import type { EventItem } from './types';

/** Industry Q&A and campus networking evening with IBM Z engineers and recruiters. */
export const careerPanelEvent: EventItem = {
  id: 'evt-career-panel',
  title: 'IBM Industry Career Panel & Networking Night',
  date: null,
  format: 'In person',
  location: 'UAlberta Auditorium · Not Confirmed',
  durationLabel: '2 hours',
  tag: 'Talk',
  timeline: 'upcoming',
  description:
    'Moderated Q&A with IBM engineers, enterprise architects, and technical recruiters, followed by open student networking.',
  url: DISCORD_URL,
  accent: 'turquoise',
  isConfirmed: false,
};
