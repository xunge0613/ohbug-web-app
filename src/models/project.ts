import { history } from 'umi';

import type { Model, RootState, ProjectType } from '@/interfaces';
import api from '@/api';

export interface Project {
  app_id: string;
  id: number;
  name: string;
  type: ProjectType;
}
export interface ProjectModelState {
  createProjectVisible: boolean;
  current?: Project;
  data: Project[];
}
export interface ProjectModel extends Model<ProjectModelState> {
  namespace: 'project';
}

const project: ProjectModel = {
  namespace: 'project',
  state: {
    createProjectVisible: false,
    data: [],
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
    *handleCreateProjectVisible({ payload }, { select, put }) {
      const user = yield select((state: RootState) => state.user);
      const hasAuth = Boolean(Object.keys(user).length);
      if (hasAuth) {
        yield put({
          type: 'setState',
          payload: {
            createProjectVisible: payload,
          },
        });
      }
    },

    *create({ payload: { name, type } }, { select, call }) {
      const admin_id = yield select((state: RootState) => state.user.id);
      const organization_id = yield select((state: RootState) => state.organization.id);

      if (name && type && admin_id && organization_id) {
        const data = yield call(api.project.create, {
          name,
          type,
          admin_id,
          organization_id,
        });
        if (data) {
          history.push('/');
        }
      }
    },

    *getAllProjectByOrganizationId(_, { select, call, put }) {
      const organization = yield select((state: RootState) => state.organization);
      if (Object.keys(organization).length) {
        const organization_id = organization.id;
        if (organization_id) {
          const data = yield call(api.project.getAll, {
            organization_id,
          });
          if (data) {
            yield put({
              type: 'setState',
              payload: {
                data,
              },
            });
            yield put({
              type: 'setState',
              payload: {
                // 默认取第一项为当前 project
                current: data[0],
              },
            });
          }
        }
      }
    },
  },
};

export default project;
