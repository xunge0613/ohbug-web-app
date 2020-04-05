import { request } from 'umi';

interface Github {
  code: string;
}

const auth = {
  github: async (data: Github): Promise<boolean> => {
    const res = await request('/auth/github', { method: 'post', data });
    return res;
  },
  logout: async (): Promise<boolean> => {
    const res = await request('/auth/logout', { method: 'post' });
    return res;
  },
};

export default auth;
