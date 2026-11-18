import { chapterWebsiteProject } from './chapter-website';
import { datathonStarterKit } from './datathon-starter-kit';
import { mainframePipelineStarter } from './mainframe-pipeline-starter';
import type { ProjectItem } from './types';

export type { ProjectItem, ProjectStatus } from './types';

/**
 * Student working-group projects displayed on `/projects`.
 * To add a project, create a file in `src/data/projects/` and append it here.
 */
export const PROJECTS: ProjectItem[] = [
  mainframePipelineStarter,
  datathonStarterKit,
  chapterWebsiteProject,
];
