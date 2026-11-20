import { DISCORD_URL } from '../../config';
import type { EventItem } from './types';

/** Guided batch-computing lab covering JCL syntax, JES submission, and SDSF return codes. */
export const introToJclEvent: EventItem = {
  id: 'evt-intro-jcl',
  title: 'Hands-on Lab: Intro to JCL',
  date: null,
  format: 'In person',
  location: 'Location TBD',
  durationLabel: 'Time TBD',
  tag: 'Lab',
  timeline: 'upcoming',
  description:
    'Write Job Control Language decks from scratch, submit batch jobs to JES, and inspect return codes in SDSF.',
  url: DISCORD_URL,
  accent: 'cobalt',
  isConfirmed: false,
};
