import { history } from 'umi';

import type { Model, Organization, RootState } from '@/interfaces';
import api from '@/api';

export interface User {
  id?: number;
  name?: string;
  mobile?: '15563685309';
  email?: string;
  avatar?: string;
  createdAt?: '2020-06-02T01:13:38.629Z';
  organizations?: Organization[];
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
    userSettingVisible: false,
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
    *get({ payload: { id } }, { select, call, put }) {
      try {
        if (id) {
          const currentUser = yield select((state: RootState) => state.user.current);
          // user 数据为空时才发送请求
          if (!currentUser || !Object.keys(currentUser).length) {
            const data = yield call(api.user.get, id);
            if (data) {
              yield put({
                type: 'setState',
                payload: {
                  current: data,
                },
              });
              const currentOrganization = yield select(
                (state: RootState) => state.organization.current,
              );
              const organizations = yield select((state: RootState) => state.organization.data);
              if (!currentOrganization && !organizations) {
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
        } else {
          throw new Error('没有找到用户id，请重新登录');
        }
      } catch (error) {
        if (error) {
          history.push('/login');
        }
      }
    },
  },
};

export default user;
