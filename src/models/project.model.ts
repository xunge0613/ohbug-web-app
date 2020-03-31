import { ModelConfig, ModelReducers, ModelEffects } from '@rematch/core';
import { history } from 'umi';
import { RootState } from '../store';
import api from '../api';
import { ProjectType } from '../interfaces';

export interface Project {
  app_id: string;
  id: number;
  name: string;
  type: ProjectType;
}
export interface ProjectState {
  createProjectVisible: boolean;
  current?: Project;
  data: Project[];
}
export interface ProjectModel extends ModelConfig<ProjectState> {
  state: ProjectState;
  reducers: ModelReducers<ProjectState>;
  effects: ModelEffects<any>;
}
interface NewPayload {
  name: string;
  type: ProjectType;
}

export const project: ProjectModel = {
  state: {
    createProjectVisible: false,
    data: [],
  },
  reducers: {
    setCreateProjectVisible(state, payload): ProjectState {
      return {
        ...state,
        createProjectVisible: payload,
      };
    },
    setProject(state, payload): ProjectState {
      return {
        ...state,
        data: payload,
      };
    },
    setCurrentProject(state, payload): ProjectState {
      return {
        ...state,
        current: payload,
      };
    },
  },
  effects: {
    handleCreateProjectVisible(payload: boolean, rootState: RootState): void {
      const hasAuth = Boolean(Object.keys(rootState.user).length);
      if (hasAuth) this.setCreateProjectVisible(payload);
    },

    create(payload: NewPayload, rootState: RootState): void {
      const { name, type } = payload;
      const admin_id = rootState.user.id;
      const organization_id = rootState.organization.id;

      if (name && type && admin_id && organization_id) {
        api.project
          .create({
            name,
            type,
            admin_id,
            organization_id,
          })
          .then(data => {
            if (data) {
              history.push('/');
            }
          });
      }
    },

    getAllProjectByOrganizationId(_, rootState: RootState): void {
      if (Object.keys(rootState.organization).length) {
        const organization_id = rootState.organization.id;

        if (organization_id) {
          api.project
            .getAll({
              organization_id,
            })
            .then(data => {
              if (data) {
                this.setProject(data);
                // 默认取第一项为当前 project
                this.setCurrentProject(data[0]);
              }
            });
        }
      }
    },
  },
};
