import { history } from 'umi';

import { getGithub } from '@/utils';
import type { Model, RootState } from '@/interfaces';
import api from '@/api';

export interface User {
  id?: number;
  name?: string;
  mobile?: '15563685309';
  email?: string;
  avatar?: string;
  createdAt?: '2020-06-02T01:13:38.629Z';
}
export interface UserModelState {
  userSettingVisible: boolean;
  current?: User;
}
export interface UserModel extends Model<UserModelState> {
  namespace: 'user';
}

const user: UserModel = {
  namespace: 'user',
  state: {
    userSettingVisible: true,
    current: undefined,
  },
  reducers: {
    setState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  effects: {
    *get(_, { select, call, put }) {
      // eslint-disable-next-line no-underscore-dangle
      const _user = yield select((state: RootState) => state.user.current);
      // user 数据为空时才发送请求
      if (!_user || !Object.keys(_user).length) {
        const github = getGithub();

        const data = yield call(api.user.get, github.id);
        if (data) {
          yield put({
            type: 'setState',
            payload: {
              current: data,
            },
          });
          // 若用户没有 Organization 则跳至 new 页面
          if (!data.organizations || !data.organizations.length) {
            history.replace('/create-organization');
          } else {
            // 得到 Organization 信息
            yield put({
              type: 'organization/setOrganizations',
              payload: data.organizations,
            });
            yield put({
              type: 'organization/setCurrentOrganization',
              payload: data.organizations[0],
            });
          }
        }
      }
    },
  },
};

export default user;
