import type { SponsorTier } from './types';

/** Silver campus sponsorship package ($1,050+ CAD). */
export const silverSponsorTier: SponsorTier = {
  id: 'silver',
  name: 'Silver',
  price: '$1,050+',
  currency: 'CAD',
  perks: {
    logoPlacement: 'Dedicated workshop slide',
    resumeAccess: 'End-of-semester resume book (opt-in)',
    socialMedia: '2 social posts + newsletter',
    eventPresence: 'Dedicated information table',
    hackathonBranding: 'Named track sponsor',
    judgesMentors: 'Up to 2 judge/mentor slots',
  },
};
