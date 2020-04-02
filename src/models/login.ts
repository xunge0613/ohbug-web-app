import { history } from 'umi';

import { Model } from '@/interfaces';
import api from '@/api';

export interface LoginModel extends Model {
  namespace: 'login';
}

const login: LoginModel = {
  namespace: 'login',
  effects: {
    *login({ payload: { query } }, { call }) {
      const data = yield call(api.auth.github, {
        code: query.code,
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

export default login;
