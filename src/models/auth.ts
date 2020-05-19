import { history } from 'umi';

import type { Model } from '@/interfaces';
import api from '@/api';

export interface AuthModel extends Model {
  namespace: 'auth';
}

const auth: AuthModel = {
  namespace: 'auth',
  effects: {
    *captcha({ payload: { mobile } }, { call }) {
      yield call(api.auth.captcha, {
        mobile,
      });
    },

    *signup({ payload: { mobile, captcha } }, { call }) {
      const data = yield call(api.auth.signup, {
        mobile,
        captcha,
      });
      if (data) {
        history.push('/project');
      }
    },

    *login({ payload: { mobile, captcha } }, { call }) {
      const data = yield call(api.auth.login, {
        mobile,
        captcha,
      });
      if (data) {
        history.push('/project');
      }
    },

    *logout(_, { call }) {
      const data = yield call(api.auth.logout);
      if (data) {
        history.push('/');
      }
    },
  },
};

export default auth;
