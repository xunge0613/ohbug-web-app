import { request } from 'umi';
import type { OrganizationModelState } from 'umi';

interface Create {
  name: string;
  introduction?: string;
  admin_id: number;
}
interface Update {
  name?: string;
  introduction?: string;
  avatar?: string;
  organization_id: number;
}

const organization = {
  create: async (data: Create): Promise<OrganizationModelState | void> => {
    const res = await request('/organization/create', { method: 'post', data });
    return res;
  },
  update: async (data: Update): Promise<OrganizationModelState | void> => {
    const res = await request('/organization/update', { method: 'post', data });
    return res;
  },
  delete: async (data: number): Promise<OrganizationModelState | void> => {
    const res = await request('/organization/delete', { method: 'post', data });
    return res;
  },
};

export default organization;
