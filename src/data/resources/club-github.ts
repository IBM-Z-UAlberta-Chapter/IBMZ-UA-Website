import { GITHUB_URL } from '../../config';
import type { ResourceItem } from './types';

/** Chapter GitHub organization hosting workshop guides and working-group code. */
export const clubGithubResource: ResourceItem = {
  id: 'res-github',
  title: 'Club GitHub',
  description: 'Workshop starter kits, lab guides, and working-group repos.',
  iconName: 'git-branch',
  url: GITHUB_URL,
};
