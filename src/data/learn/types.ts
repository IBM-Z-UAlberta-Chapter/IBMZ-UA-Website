/**
 * Single hands-on curriculum track shown in the Learn section (`/learn`).
 */
export interface LearnModule {
  /** Stable identifier used for ARIA tab/panel bindings. */
  id: string;
  /** Short stage label displayed above the track title (e.g., `'TRACK 01'`). */
  code: string;
  /** Human-readable curriculum track title. */
  title: string;
  /** Delivery mode badge text. */
  format: 'In-person lab' | 'Hybrid' | 'Online';
  /** Expected workshop duration. */
  duration: string;
  /** Concise summary of technical skills practiced in the track. */
  description: string;
  /** Key technologies covered (3–4 short chip labels). */
  topics: string[];
}
