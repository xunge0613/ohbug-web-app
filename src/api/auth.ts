import { request } from 'umi';

interface Base {
  email: string;
}
interface Signup extends Base {
  name: string;
  password: string;
}
interface Activate {
  captcha: string;
}
interface Login extends Base {
  password: string;
}
interface Github {
  code: string;
}
interface BindUser {
  mobile: string;
  captcha: string;
  oauthType: 'github';
  oauthUserDetail: any;
}

const auth = {
  signup: async (data: Signup) => {
    const res = await request('/auth/signup', { method: 'post', data });
    return res;
  },
  activate: async (data: Activate) => {
    const res = await request('/auth/activate', { method: 'post', data });
    return res;
  },
  sendActivationEmail: async (data: Base) => {
    const res = await request('/auth/sendActivationEmail', { method: 'post', data });
    return res;
  },
  login: async (data: Login) => {
    const res = await request('/auth/login', { method: 'post', data });
    return res;
  },
  github: async (data: Github) => {
    const res = await request('/auth/github', { method: 'post', data });
    return res;
  },
  bindUser: async (data: BindUser) => {
    const res = await request('/auth/bindUser', { method: 'post', data });
    return res;
  },
};

export default auth;
