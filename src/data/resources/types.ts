/**
 * External documentation or starter-kit link displayed under Resources on `/learn`.
 */
export interface ResourceItem {
  /** Unique resource key. */
  id: string;
  /** Short resource title. */
  title: string;
  /** One-sentence overview of what the resource covers. */
  description: string;
  /** Lucide icon identifier mapped in `LearnSection.tsx`. */
  iconName: 'compass' | 'code' | 'server' | 'terminal' | 'layers' | 'git-branch';
  /** Destination URL opened in a new browser tab. */
  url: string;
}
