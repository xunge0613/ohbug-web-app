import { request } from 'umi';
import type { Project } from 'umi';

import type { ProjectType } from '@/interfaces';

interface Create {
  name: string;
  type: ProjectType;
  admin_id: number;
  organization_id: number;
}
interface Update {
  name: string;
  type: string;
  project_id: number;
}
interface GetAll {
  organization_id: number;
}
interface Trend {
  project_id: number;
  start: Date;
  end: Date;
}

const project = {
  create: async (data: Create): Promise<Project | void> => {
    const res = await request('/project/create', { method: 'post', data });
    return res;
  },
  update: async (data: Update): Promise<Project | void> => {
    const res = await request('/project/update', { method: 'post', data });
    return res;
  },
  getAll: async (data: GetAll): Promise<Project[] | void> => {
    const res = await request('/project', { method: 'get', params: data });
    return res;
  },
  trend: async (data: Trend): Promise<any> => {
    const res = await request('/project/trend', { method: 'get', params: data });
    return res;
  },
};

export default project;
