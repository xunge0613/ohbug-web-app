import { history } from 'umi';

import type { Model, RootState, ProjectType } from '@/interfaces';
import api from '@/api';

export interface ProjectTrend {
  'event.apiKey': string;
  buckets: {
    timestamp: number;
    count: number;
  }[];
}
export interface Project {
  app_id: string;
  id: number;
  name: string;
  type: ProjectType;
}
export interface ProjectModelState {
  createProjectVisible: boolean;
  data: Project[];
  current?: Project;
  currentTrend?: ProjectTrend;
}
export interface ProjectModel extends Model<ProjectModelState> {
  namespace: 'project';
}

const project: ProjectModel = {
  namespace: 'project',
  state: {
    createProjectVisible: false,
    data: [],
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

    *create({ payload: { name, type } }, { select, call, put }) {
      const admin_id = yield select((state: RootState) => state.user.id);
      const organization_id = yield select((state: RootState) => state.organization?.current?.id);

      if (name && type && admin_id && organization_id) {
        const data = yield call(api.project.create, {
          name,
          type,
          admin_id,
          organization_id,
        });
        yield put({ type: 'project/handleCreateProjectVisible', payload: false });
        if (data) {
          history.push('/');
        }
      }
    },

    *getAllProjectByOrganizationId(_, { select, call, put }) {
      const organization = yield select((state: RootState) => state.organization.current);
      if (organization) {
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
            const current = yield select((state: RootState) => state.project.current);
            if (!current) {
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
      }
    },

    *trend({ payload: { start, end } }, { select, call, put }) {
      const current = yield select((state: RootState) => state.project.current);
      if (current) {
        const project_id = current.id;
        const data = yield call(api.project.trend, {
          project_id,
          start,
          end,
        });
        if (data) {
          yield put({
            type: 'setState',
            payload: {
              currentTrend: data,
            },
          });
        }
      }
    },
  },
};

export default project;
