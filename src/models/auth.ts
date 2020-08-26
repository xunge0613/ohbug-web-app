import { history } from 'umi';

import type { Model } from '@/interfaces';
import api from '@/api';
import { setAuth, clearAuth, getAuth } from '@/utils';
import { RootState } from '@/interfaces';

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

    *login({ payload: { mobile, captcha } }, { select, call, put }) {
      const invite = yield select((state: RootState) => state.invite.current);
      if (invite) {
        yield put({
          type: 'invite/bind',
        });
      }

      const data = yield call(api.auth.login, {
        mobile,
        captcha,
      });

      if (data) {
        setAuth(data);
        const hasAuth = getAuth();
        if (hasAuth) {
          sessionStorage.removeItem('persist:root');
          history.push('/organization-project');
        }
        window.location.reload();
      }
    },

    *github({ payload }, { call, put }) {
      const data = yield call(api.auth.github, payload);
      if (data === true) {
        sessionStorage.removeItem('persist:root');
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
      sessionStorage.removeItem('persist:root');
      setTimeout(() => {
        history.push('/');
      }, 0);
    },
  },
};

export default auth;
