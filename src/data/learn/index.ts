import { enterpriseLinuxJclTrack } from './enterprise-linux-jcl';
import { mainframePipelinesTrack } from './mainframe-pipelines';
import { systemsSecurityTrack } from './systems-security';
import { xploreFoundationsTrack } from './xplore-foundations';
import type { LearnModule } from './types';

export type { LearnModule } from './types';

/**
 * Ordered curriculum tracks rendered in the Learn section (`/learn`).
 * Excludes non-curriculum events (datathons & speaker panels live under `/events`).
 */
export const LEARN_MODULES: LearnModule[] = [
  xploreFoundationsTrack,
  enterpriseLinuxJclTrack,
  mainframePipelinesTrack,
  systemsSecurityTrack,
];
