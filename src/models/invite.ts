import type { User, Organization } from 'umi'
import type { Model } from '@/interfaces'
import api from '@/api'
import { RootState } from '@/interfaces'
import { getAuth } from '@/utils'

export interface Invite {
  uuid: string
  auth: string
  inviter: User
  organization: Organization
}
export interface InviteModelState {
  current?: Invite
}
export interface InviteModel extends Model<InviteModelState> {
  namespace: 'invite'
}

const invite: InviteModel = {
  namespace: 'invite',
  state: {},
  reducers: {
    setCurrentInvite(state, action) {
      return {
        ...state,
        current: action.payload,
      }
    },
  },
  effects: {
    *get({ payload: { uuid } }, { call, put }) {
      const data = yield call(api.invite.get, {
        uuid,
      })
      if (data) {
        yield put({ type: 'setCurrentInvite', payload: data })
      }
    },

    *bind(_, { select, call }) {
      const { uuid } = yield select((state: RootState) => state.invite.current)
      const user = yield select((state: RootState) => state.user.current)
      const auth = getAuth()

      if (uuid && (user?.user_id || auth?.id)) {
        yield call(api.invite.bind, {
          uuid,
          user_id: user?.user_id || auth?.id,
        })
      }
    },
  },
}

export default invite
