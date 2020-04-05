import { OrganizationModelState, request } from 'umi';

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
    const res = await request(`/user/${id}`, { method: 'get' });
    return res;
  },
};

export default user;
