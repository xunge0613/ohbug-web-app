import { ProjectModelState, Project, request } from 'umi';

import { ProjectType } from '@/interfaces';

interface Create {
  name: string;
  type: ProjectType;
  admin_id: number;
  organization_id: number;
}
interface GetAll {
  organization_id: number;
}

const project = {
  create: async (data: Create): Promise<Project | void> => {
    const res = await request('/project/create', { method: 'post', data });
    return res;
  },
  getAll: async (data: GetAll): Promise<ProjectModelState['data'] | void> => {
    const res = await request('/project', { method: 'get', params: data });
    return res;
  },
};

export default project;
