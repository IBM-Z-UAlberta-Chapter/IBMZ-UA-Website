/**
 * Single chapter executive officer profile rendered on `/team`.
 */
export interface TeamMember {
  /** Stable unique identifier. */
  id: string;
  /** Officer full name (mock sample until `confirmed` is `true`). */
  name: string;
  /** Two-letter avatar monogram shown when `photoUrl` is `null`. */
  initials: string;
  /** Official chapter executive title. */
  role: string;
  /** Concise summary of portfolio responsibilities. */
  responsibility: string;
  /** Organizational tier controlling card layout (`leadership` vs `vp`). */
  tier: 'leadership' | 'vp';
  /** Public headshot URL (e.g., `'/team/maya-lin.jpg'`) or `null` to display monogram. */
  photoUrl: string | null;
  /** Officer LinkedIn profile URL or `null` before confirmation. */
  linkedinUrl: string | null;
  /** Whether the roster assignment is finalized (`false` labels the card "Not confirmed"). */
  confirmed: boolean;
}
