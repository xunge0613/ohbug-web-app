import { history } from 'umi';

import type { Model, RootState } from '@/interfaces';
import api from '@/api';

export interface OrganizationModelState {
  id?: number;
  name?: string;
  avatar?: string;
}
export interface OrganizationModel extends Model<OrganizationModelState> {
  namespace: 'organization';
}

const organization: OrganizationModel = {
  namespace: 'organization',
  state: {},
  reducers: {
    setState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  effects: {
    *create({ payload: { name } }, { select, call }) {
      const admin_id = yield select((state: RootState) => state.user.id);

      if (name && admin_id) {
        const data = yield call(api.organization.create, {
          name,
          admin_id,
        });
        if (data) {
          history.push('/');
        }
      }
    },
  },
};

export default organization;
