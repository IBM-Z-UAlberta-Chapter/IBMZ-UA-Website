import type { SponsorTier } from './types';

/** Gold flagship sponsorship package ($1,450+ CAD). */
export const goldSponsorTier: SponsorTier = {
  id: 'gold',
  name: 'Gold',
  price: '$1,450+',
  currency: 'CAD',
  badge: 'FLAGSHIP',
  highlighted: true,
  perks: {
    logoPlacement: 'Hero placement on all marketing',
    resumeAccess: 'Student resume database (opt-in)',
    socialMedia: 'Dedicated sponsor spotlight campaign',
    eventPresence: 'Custom workshop or keynote session',
    hackathonBranding: 'Named flagship category + mainstage branding',
    judgesMentors: 'Judge/mentor slots + opening remarks',
  },
};
