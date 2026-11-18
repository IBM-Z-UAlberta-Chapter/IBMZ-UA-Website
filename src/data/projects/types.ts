/** Lifecycle state of a chapter student working group project. */
export type ProjectStatus = 'Planned' | 'In progress' | 'Shipped';

/**
 * Single chapter working-group project card shown on `/projects`.
 */
export interface ProjectItem {
  /** Stable unique identifier. */
  id: string;
  /** Project repository or initiative title. */
  title: string;
  /** Concise overview of the project's technical goal and deliverables. */
  description: string;
  /** Technology stack tags (3–4 short chip labels). */
  tags: string[];
  /** Current working-group stage. */
  status: ProjectStatus;
  /** Sample working group or lead owner label. */
  workingGroup: string;
  /** Link to the repository under the chapter GitHub organization. */
  githubUrl: string;
  /** Highlights the entry in the wider featured slot on desktop. */
  featured?: boolean;
  /** Whether scope/timeline is confirmed for the current semester (`false` renders a "Not confirmed" badge). */
  confirmed: boolean;
}
