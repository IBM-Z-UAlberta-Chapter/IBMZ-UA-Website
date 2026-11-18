import { GITHUB_URL } from '../../config';
import type { ProjectItem } from './types';

/** Featured sample working-group project: Python ETL & PyTorch inference template for mainframe APIs. */
export const mainframePipelineStarter: ProjectItem = {
  id: 'proj-pipeline',
  title: 'Mainframe Data Pipeline Starter',
  description:
    'Sample template connecting Python ETL scripts and PyTorch inference jobs to mainframe-backed APIs with reproducible local mocks.',
  tags: ['Python', 'z/OSMF', 'REST API', 'Pandas'],
  status: 'Planned',
  workingGroup: 'Data & AI Working Group',
  githubUrl: `${GITHUB_URL}/mainframe-data-pipeline-starter`,
  featured: true,
  confirmed: false,
};
