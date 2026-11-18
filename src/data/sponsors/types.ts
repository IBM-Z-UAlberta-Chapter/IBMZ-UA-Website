/** Tier identifier used as key and mobile tab value on `/sponsors`. */
export type SponsorTierId = 'bronze' | 'silver' | 'gold';

/**
 * Single sponsorship tier definition rendered in the tier matrix on `/sponsors`.
 */
export interface SponsorTier {
  /** Stable identifier (`'bronze' | 'silver' | 'gold'`). */
  id: SponsorTierId;
  /** Human-readable tier title. */
  name: string;
  /** Formatted tier minimum contribution string (e.g., `'$500+'`). */
  price: string;
  /** Currency unit shown beside the contribution figure. */
  currency: 'CAD';
  /** Optional flagship pill badge displayed at top right of the card. */
  badge?: string;
  /** Highlights the card with dark navy elevation and focal pink accent stripe. */
  highlighted?: boolean;
  /** Feature matrix benefits included in this tier. */
  perks: {
    logoPlacement: string;
    resumeAccess: string;
    socialMedia: string;
    eventPresence: string;
    hackathonBranding: string;
    judgesMentors: string;
  };
}
