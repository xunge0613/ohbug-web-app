import { OrganizationModelState } from 'umi';
import { request } from '@/utils';

interface Create {
  name: string;
  admin_id: number;
}

const organization = {
  create: async (data: Create): Promise<OrganizationModelState | void> => {
    const res = await request.post('/organization/create', data);
    if (res.success) {
      return res.data;
    }
    return undefined;
  },
};

export default organization;
