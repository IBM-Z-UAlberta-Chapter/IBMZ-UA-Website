import { DISCORD_URL } from '../../config';
import type { EventItem } from './types';

/** Launch lab event introducing UAlberta students to IBM Z Xplore & VS Code Zowe tooling. */
export const xploreBootcampEvent: EventItem = {
  id: 'evt-xplore-bootcamp',
  title: 'IBM Z Xplore Bootcamp (Launch Event)',
  date: null,
  format: 'In person',
  location: 'UAlberta Campus · Room Not Confirmed',
  durationLabel: '90 min',
  tag: 'Lab',
  timeline: 'upcoming',
  description:
    'Get set up on a real IBM Z mainframe environment, connect via VS Code, and complete your first datasets and JCL exercises.',
  url: DISCORD_URL,
  accent: 'pink',
  isConfirmed: false,
};
