import { request } from 'umi';

interface Captcha {
  mobile: string;
}
interface SignUp {
  mobile: string;
  captcha: number;
}
type Login = SignUp;
interface Github {
  code: string;
}
interface BindUser {
  mobile: string;
  captcha: number;
  oauthType: 'github';
  oauthUserDetail: any;
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
  login: async (data: Login): Promise<number> => {
    const res = await request('/auth/login', { method: 'post', data });
    return res;
  },
  github: async (data: Github): Promise<boolean> => {
    const res = await request('/auth/github', { method: 'post', data });
    return res;
  },
  bindUser: async (data: BindUser): Promise<boolean> => {
    const res = await request('/auth/bindUser', { method: 'post', data });
    return res;
  },
  logout: async (): Promise<boolean> => {
    const res = await request('/auth/logout', { method: 'post' });
    return res;
  },
};

export default auth;
