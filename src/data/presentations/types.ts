/**
 * Single workshop slide deck or talk entry shown in the Presentations gallery (`/talks`).
 */
export interface PresentationItem {
  /** Stable unique identifier. */
  id: string;
  /** Short archival code rendered on the slide card header (e.g., `'DECK-01'`). */
  code: string;
  /** Talk or slide deck title. */
  title: string;
  /** Concise subtitle displayed beneath the deck title on the 16:9 card. */
  subtitle: string;
  /** Sample or confirmed session date label (e.g., `'Oct 2026 · Not confirmed'`). */
  dateLabel: string;
  /** Sample or confirmed presenter name/role. */
  speaker: string;
  /** Published Google Slides or PDF URL, or `null` before the workshop runs. */
  slidesUrl: string | null;
  /** Summary displayed in the deck preview modal dialog. */
  summary: string;
  /** Whether speaker/date/deck details are confirmed (`false` displays a "Not confirmed" badge). */
  confirmed: boolean;
}
