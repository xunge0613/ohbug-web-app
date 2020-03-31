import { request } from '@/utils';

interface Github {
  code: string;
}

const auth = {
  github: async (data: Github): Promise<boolean> => {
    const res = await request.post('/auth/github', data);
    if (res.code === 0) {
      return true;
    }
    return false;
  },
  logout: async (): Promise<boolean> => {
    const res = await request.post('/auth/logout');
    if (res.code === 0) {
      return true;
    }
    return false;
  },
};

export default auth;
