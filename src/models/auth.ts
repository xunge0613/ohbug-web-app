import { history } from 'umi';

import type { Model, RootState } from '@/interfaces';
import api from '@/api';
import { setAuth, clearAuth, getAuth } from '@/utils';

export interface AuthModelState {
  oauth?: {
    oauthType: 'github';
    oauthUserDetail: any;
  };
}
export interface AuthModel extends Model<AuthModelState> {
  namespace: 'auth';
}

function login(data: any) {
  setAuth(data);
  const hasAuth = getAuth();
  if (hasAuth) {
    sessionStorage.removeItem('persist:root');
    history.push('/organization-project');
  }
  window.location.reload();
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
    *signup({ payload: { email, name, password } }, { call }) {
      const data = yield call(api.auth.signup, {
        email,
        name,
        password,
      });

      if (data) {
        login(data);
      }
    },

    *sendActivationEmail({ payload: { email } }, { call, put }) {
      const data = yield call(api.auth.sendActivationEmail, {
        email,
      });

      if (data) {
        yield put({
          type: 'app/info',
          payload: '发送激活邮件成功，请前往邮箱检查邮件',
        });
      }
    },

    *login({ payload: { email, password } }, { select, call, put }) {
      const invite = yield select((state: RootState) => state.invite.current);
      if (invite) {
        yield put({
          type: 'invite/bind',
        });
      }

      const data = yield call(api.auth.login, {
        email,
        password,
      });

      if (data) {
        login(data);
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
      }
    },

    *bindUser({ payload: { email, captcha, oauthType, oauthUserDetail } }, { call }) {
      const data = yield call(api.auth.bindUser, {
        email,
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
