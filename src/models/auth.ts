import { history } from 'umi';

import type { Model } from '@/interfaces';
import api from '@/api';
import { setAuth, clearAuth } from '@/utils';

export interface AuthModelState {
  oauth?: {
    oauthType: 'github';
    oauthUserDetail: any;
  };
}
export interface AuthModel extends Model<AuthModelState> {
  namespace: 'auth';
}

const auth: AuthModel = {
  namespace: 'auth',
  state: {},
  reducers: {
    setOauth(state, action) {
      return {
        ...state,
        oauth: action.payload,
      };
    },
  },
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
        history.push('/organization-project');
      }
    },

    *login({ payload: { mobile, captcha } }, { call }) {
      const data = yield call(api.auth.login, {
        mobile,
        captcha,
      });

      if (data) {
        setAuth(data);
        history.push('/organization-project');
      }
    },

    *github({ payload }, { call, put }) {
      const data = yield call(api.auth.github, payload);
      if (data === true) {
        history.push('/organization-project');
      } else if (data instanceof Object) {
        // 约定 data 为 object 即为 oauth 登录成功但是没有绑定用户
        yield put({
          type: 'setOauth',
          payload: {
            oauthType: 'github',
            oauthUserDetail: data,
          },
        });
        history.push('/bindUser');
      }
    },

    *bindUser({ payload: { mobile, captcha, oauthType, oauthUserDetail } }, { call }) {
      const data = yield call(api.auth.bindUser, {
        mobile,
        captcha,
        oauthType,
        oauthUserDetail,
      });
      if (data) {
        history.push('/organization-project');
      }
    },

    logout() {
      clearAuth();
      history.push('/');
    },
  },
};

export default auth;
