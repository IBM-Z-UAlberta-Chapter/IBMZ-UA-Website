import { GITHUB_URL } from '../../config';
import type { ProjectItem } from './types';

/** Active chapter hub web repository maintained by the Technology portfolio. */
export const chapterWebsiteProject: ProjectItem = {
  id: 'proj-website',
  title: 'Chapter Website',
  description:
    'Open-source hub for events, curriculum tracks, and sponsor packages built by the UAlberta technology working group.',
  tags: ['React', 'TypeScript', 'Tailwind'],
  status: 'In progress',
  workingGroup: 'Web & Platform Group',
  githubUrl: `${GITHUB_URL}/chapter-website`,
  confirmed: false,
};
