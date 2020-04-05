import { ProjectModelState, Project } from 'umi';
import { request } from '@/utils';
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
    const res = await request.post('/project/create', data);
    if (res.success) {
      return res.data;
    }
    return undefined;
  },
  getAll: async (data: GetAll): Promise<ProjectModelState['data'] | void> => {
    const res = await request.get('/project', { params: data });
    if (res.success) {
      return res.data;
    }
    return undefined;
  },
};

export default project;
