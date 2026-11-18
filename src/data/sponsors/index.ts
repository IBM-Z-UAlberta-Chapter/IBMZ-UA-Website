import { bronzeSponsorTier } from './bronze';
import { goldSponsorTier } from './gold';
import { silverSponsorTier } from './silver';
import type { SponsorTier } from './types';

export type { SponsorTier, SponsorTierId } from './types';

/** Ordered list of benefit rows rendered inside each sponsorship card. */
export const SPONSOR_PERK_LABELS: Array<{
  key: keyof SponsorTier['perks'];
  label: string;
}> = [
  { key: 'logoPlacement', label: 'Logo placement' },
  { key: 'resumeAccess', label: 'Resume access' },
  { key: 'socialMedia', label: 'Social media' },
  { key: 'eventPresence', label: 'Event presence' },
  { key: 'hackathonBranding', label: 'Hackathon branding' },
  { key: 'judgesMentors', label: 'Judges & mentors' },
];

/** Ordered sponsorship packages ($500+ Bronze, $1,050+ Silver, $1,450+ Gold CAD). */
export const SPONSOR_TIERS: SponsorTier[] = [
  bronzeSponsorTier,
  silverSponsorTier,
  goldSponsorTier,
];

/** Number of open partner logo placeholder slots rendered below the tier matrix. */
export const PARTNER_SLOTS_COUNT = 4;
