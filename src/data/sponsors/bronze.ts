import type { SponsorTier } from './types';

/** Bronze campus sponsorship package ($500+ CAD). */
export const bronzeSponsorTier: SponsorTier = {
  id: 'bronze',
  name: 'Bronze',
  price: '$500+',
  currency: 'CAD',
  perks: {
    logoPlacement: 'Website and poster footer',
    resumeAccess: 'Not included',
    socialMedia: '1 social post',
    eventPresence: 'Shared information table',
    hackathonBranding: 'Standard sponsor logo',
    judgesMentors: '1 judge slot',
  },
};
