import { request } from '@/utils';
import { OrganizationState } from '@/models';

interface Create {
  name: string;
  admin_id: number;
}

const organization = {
  create: async (data: Create): Promise<OrganizationState | void> => {
    const res = await request.post('/organization/create', data);
    if (res.code === 0) {
      return res.data;
    }
    return undefined;
  },
};

export default organization;
