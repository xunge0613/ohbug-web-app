import { history } from 'umi';

import type { Model, Organization, RootState } from '@/interfaces';
import api from '@/api';
import { getCurrentOrganization, activationNotification } from '@/utils';

export interface User {
  id?: number;
  email?: string;
  name?: string;
  mobile?: string;
  avatar?: string;
  activated?: boolean;
  createdAt?: string;
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
              yield put({
                type: 'organization/setOrganizations',
                payload: data.organizations,
              });
              if (!currentOrganization) {
                const cachedID = getCurrentOrganization();
                if (cachedID) {
                  yield put({
                    type: 'organization/setCurrentOrganization',
                    payload:
                      data.organizations.find(
                        ({ id: org_id }: Organization) => org_id === parseInt(cachedID, 10),
                      ) || data.organizations[0],
                  });
                } else {
                  yield put({
                    type: 'organization/setCurrentOrganization',
                    payload: data.organizations[0],
                  });
                }
              }
              // 未激活状态
              if (!data.activated) {
                activationNotification(data.email);
              }
            } else {
              throw new Error('没有找到用户id，请重新登录');
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
