import { history } from 'umi';
import type { User, Project } from 'umi';

import type { Model, RootState } from '@/interfaces';
import api from '@/api';

export interface Organization {
  id?: number;
  name?: string;
  introduction?: string;
  createdAt?: string;
  admin?: User;
  users?: User[];
  projects?: Project[];
}
export interface OrganizationModelState {
  current?: Organization;
  data?: Organization[];
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
    *create({ payload: { name, introduction } }, { select, call, put }) {
      const admin_id = yield select((state: RootState) => state.user.current?.id);
      const organizations = yield select((state: RootState) => state.organization.data);

      if (name && admin_id) {
        const data = yield call(api.organization.create, {
          name,
          introduction,
          admin_id,
        });
        if (data) {
          yield put({
            type: 'setOrganizations',
            payload: [...(organizations || []), data],
          });
          yield put({
            type: 'setCurrentOrganization',
            payload: data,
          });
          history.push('/');
        }
      }
    },

    *update({ payload: { name, introduction, avatar, organization_id } }, { select, call, put }) {
      const organizations = yield select((state: RootState) => state.organization.data);
      const { name: old_name, introduction: old_introduction } = organizations?.find(
        // eslint-disable-next-line eqeqeq
        (org: Organization) => org.id == organization_id,
      );
      if (old_name !== name || old_introduction !== introduction) {
        const data = yield call(api.organization.update, {
          organization_id,
          name,
          introduction,
          avatar,
        });
        if (data) {
          yield put({
            type: 'setOrganizations',
            payload: [...organizations, data],
          });
          yield put({
            type: 'setCurrentOrganization',
            payload: data,
          });
          yield put({
            type: 'app/info',
            payload: '更新团队信息成功',
          });
        } else {
          yield put({
            type: 'app/error',
            payload: '更新团队信息失败',
          });
        }
      } else {
        yield put({
          type: 'app/error',
          payload: '没有更改就请不要点更新啦~',
        });
      }
    },

    *delete({ payload }, { select, call, put }) {
      const organizations = yield select((state: RootState) => state.organization.data) || [];
      if (payload !== undefined) {
        const data = yield call(api.organization.delete, {
          organization_id: payload,
        });
        if (data) {
          const new_organizations = organizations.filter((org: Organization) => org.id !== payload);
          yield put({
            type: 'setOrganizations',
            payload: new_organizations,
          });
          yield put({
            type: 'setCurrentOrganization',
            payload: new_organizations[0],
          });
          if (!new_organizations.length) {
            history.goBack();
          } else {
            history.replace('/');
          }
        }
      }
    },

    *setOrganizations({ payload }, { put }) {
      yield put({
        type: 'setState',
        payload: {
          data: payload,
        },
      });
    },

    *setCurrentOrganization({ payload }, { put }) {
      yield put({
        type: 'setState',
        payload: {
          current: payload,
        },
      });
      yield put({
        type: 'project/getAllProjectByOrganizationId',
      });
    },
  },
};

export default organization;
