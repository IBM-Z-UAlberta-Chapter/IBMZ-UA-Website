import { GITHUB_URL } from '../../config';
import type { ProjectItem } from './types';

/** Sample working-group project: evaluation harnesses and templates for chapter datathons. */
export const datathonStarterKit: ProjectItem = {
  id: 'proj-datathon',
  title: 'Datathon Starter Kit',
  description:
    'Notebook baselines, evaluation scripts, and GitHub Classroom templates for our 48-hour semester mini-datathon.',
  tags: ['Jupyter', 'PyTorch', 'GitHub Classroom'],
  status: 'Planned',
  workingGroup: 'Competitions Working Group',
  githubUrl: `${GITHUB_URL}/datathon-starter-kit`,
  confirmed: false,
};
