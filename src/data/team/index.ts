import { coPresidentOne } from './leadership/co-president-1';
import { coPresidentTwo } from './leadership/co-president-2';
import { ibmZAmbassador } from './leadership/ibm-z-ambassador';
import { vpAcademics } from './vp/vp-academics';
import { vpAdministration } from './vp/vp-administration';
import { vpExternal } from './vp/vp-external';
import { vpFinance } from './vp/vp-finance';
import { vpMarketing } from './vp/vp-marketing';
import { vpOutreach } from './vp/vp-outreach';
import { vpTechnology } from './vp/vp-technology';
import type { TeamMember } from './types';

export type { TeamMember } from './types';

/** Core leadership officers (IBM Z Ambassador and Co-Presidents). */
export const LEADERSHIP_TEAM: TeamMember[] = [
  ibmZAmbassador,
  coPresidentOne,
  coPresidentTwo,
];

/** Seven operational Vice President portfolios running chapter execution. */
export const VP_TEAM: TeamMember[] = [
  vpTechnology,
  vpAcademics,
  vpFinance,
  vpAdministration,
  vpOutreach,
  vpExternal,
  vpMarketing,
];
