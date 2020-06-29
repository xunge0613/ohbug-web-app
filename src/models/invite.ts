import type { User, Organization } from 'umi';
import type { Model } from '@/interfaces';
import api from '@/api';
import { RootState } from '@/interfaces';

export interface Invite {
  uuid: string;
  auth: string;
  inviter: User;
  organization: Organization;
}
export interface InviteModelState {
  current?: Invite;
}
export interface InviteModel extends Model<InviteModelState> {
  namespace: 'invite';
}

const invite: InviteModel = {
  namespace: 'invite',
  state: {},
  reducers: {
    setCurrentInvite(state, action) {
      return {
        ...state,
        current: action.payload,
      };
    },
  },
  effects: {
    *get({ payload: { uuid } }, { call, put }) {
      const data = yield call(api.invite.get, {
        uuid,
      });
      if (data) {
        yield put({ type: 'setCurrentInvite', payload: data });
      }
    },

    *bind(_, { select, call }) {
      const { uuid } = yield select((state: RootState) => state.invite.current);
      const { id: user_id } = yield select((state: RootState) => state.user);

      if (uuid && user_id) {
        yield call(api.invite.bind, {
          uuid,
          user_id,
        });
      }
    },
  },
};

export default invite;
