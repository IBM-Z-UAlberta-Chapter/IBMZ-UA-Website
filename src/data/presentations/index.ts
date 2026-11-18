import { chapterKickoffDeck } from './chapter-kickoff';
import { jclIn30MinutesDeck } from './jcl-in-30-minutes';
import { mainframesVsCloudDeck } from './mainframes-vs-cloud';
import type { PresentationItem } from './types';

export type { PresentationItem } from './types';

/**
 * Workshop decks and speaker slides rendered in `/talks`.
 * To add a deck, create a file in `src/data/presentations/` and append it here.
 */
export const PRESENTATIONS: PresentationItem[] = [
  mainframesVsCloudDeck,
  jclIn30MinutesDeck,
  chapterKickoffDeck,
];
