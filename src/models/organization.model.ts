import { ModelConfig, ModelReducers, ModelEffects } from '@rematch/core';
import { history } from 'umi';

import { RootState } from '@/store';
import api from '@/api';

export interface OrganizationState {
  id?: number;
  name?: string;
  avatar?: string;
}
export interface OrganizationModel extends ModelConfig<OrganizationState> {
  reducers: ModelReducers<OrganizationState>;
  effects: ModelEffects<any>;
}

interface NewPayload {
  name: string;
}

export const organization: OrganizationModel = {
  state: {},
  reducers: {
    set(state, payload): OrganizationState {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    create(payload: NewPayload, rootState: RootState): void {
      const { name } = payload;
      const admin_id = rootState.user.id;

      if (name && admin_id) {
        api.organization
          .create({
            name,
            admin_id,
          })
          .then(data => {
            if (data) {
              history.push('/');
            }
          });
      }
    },
  },
};
