import { request } from 'umi';
import type { OrganizationModelState } from 'umi';

interface Create {
  name: string;
  admin_id: number;
}

const organization = {
  create: async (data: Create): Promise<OrganizationModelState | void> => {
    const res = await request('/organization/create', { method: 'post', data });
    return res;
  },
};

export default organization;
