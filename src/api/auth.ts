import { request } from 'umi';

interface Captcha {
  mobile: string;
}
interface SignUp {
  mobile: string;
  captcha: number;
}
interface Github {
  code: string;
}

const auth = {
  captcha: async (data: Captcha): Promise<number> => {
    const res = await request('/auth/captcha', { method: 'get', params: data });
    return res;
  },
  signup: async (data: Captcha): Promise<number> => {
    const res = await request('/auth/signup', { method: 'post', data });
    return res;
  },
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
