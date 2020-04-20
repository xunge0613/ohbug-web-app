import { history } from 'umi';

import { getGithub } from '@/utils';
import type { Model, RootState } from '@/interfaces';
import api from '@/api';

export interface UserModelState {
  id?: number;
  name?: string;
  email?: string;
  avatar?: string;
  from?: string;
}
export interface UserModel extends Model<UserModelState> {
  namespace: 'user';
}

const user: UserModel = {
  namespace: 'user',
  state: {},
  reducers: {
    setState(state, action) {
      const { id, name, email, avatar, from } = action.payload;
      return {
        ...state,
        id,
        name,
        email,
        avatar,
        from,
      };
    },
  },
  effects: {
    *get(_, { select, call, put }) {
      // eslint-disable-next-line no-underscore-dangle
      const _user = yield select((state: RootState) => state.user);
      // user 数据为空时才发送请求
      if (!Object.keys(_user).length) {
        const github = getGithub();

        const data = yield call(api.user.get, github.id);
        if (data) {
          yield put({
            type: 'setState',
            payload: data,
          });
          // 若用户没有 Organization 则跳至 new 页面
          if (!data.organization) {
            history.push('/create-organization');
          } else {
            // 得到 Organization 信息
            yield put({
              type: 'organization/setState',
              payload: data.organization,
            });
          }
        }
      }
    },
  },
};

export default user;
