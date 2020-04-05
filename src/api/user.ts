import { request } from '@/utils';
import { OrganizationModelState } from 'umi';

interface User {
  id?: number;
  name?: string;
  email?: string;
  avatar?: string;
  from?: string;
  organization?: OrganizationModelState;
}

const user = {
  get: async (id: string): Promise<User | void> => {
    const res = await request.get(`/user/${id}`);
    if (res.success) {
      return res.data;
    }
    return undefined;
  },
};

export default user;
