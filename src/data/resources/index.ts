import { clubGithubResource } from './club-github';
import { cobolResource } from './cobol';
import { enterpriseLinuxUssResource } from './enterprise-linux-uss';
import { ibmZXploreResource } from './ibm-z-xplore';
import { jclResource } from './jcl';
import { zosResource } from './zos';
import type { ResourceItem } from './types';

export type { ResourceItem } from './types';

/** Curated reference links rendered in the Learn page Resources grid. */
export const RESOURCES: ResourceItem[] = [
  ibmZXploreResource,
  cobolResource,
  zosResource,
  jclResource,
  enterpriseLinuxUssResource,
  clubGithubResource,
];
