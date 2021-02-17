import { history } from 'umi'
import type { User } from 'umi'

import type { Model, RootState, ProjectType } from '@/interfaces'
import api from '@/api'

export interface ProjectTrend {
  'event.apiKey': string
  buckets: {
    timestamp: number
    count: number
  }[]
}
export interface Project {
  id: number
  apiKey: string
  name: string
  type: ProjectType
  createdAt: string
  users: User[]
  admin: User
}
export interface ProjectModelState {
  data: Project[]
  current?: Project
  currentTrend?: ProjectTrend
}
export interface ProjectModel extends Model<ProjectModelState> {
  namespace: 'project'
}

const project: ProjectModel = {
  namespace: 'project',
  state: {
    data: [],
    current: undefined,
  },
  reducers: {
    setState(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
  effects: {
    *create({ payload: { name, type } }, { select, call, put }) {
      const admin_id = yield select(
        (state: RootState) => state.user.current?.id
      )
      const organization_id = yield select(
        (state: RootState) => state.organization?.current?.id
      )

      if (name && type && admin_id && organization_id) {
        const data = yield call(api.project.create, {
          name,
          type,
          admin_id,
          organization_id,
        })
        if (data) {
          yield put({
            type: 'getAllProjectByOrganizationId',
          })
          history.push('/getting-started')
        }
      }
    },

    *update({ payload: { name, type, project_id } }, { call, put }) {
      if (name && type && project_id) {
        const data = yield call(api.project.update, {
          name,
          type,
          project_id,
        })
        if (data) {
          window.location.reload()
        } else {
          yield put({
            type: 'app/error',
            payload: '更新项目信息失败',
          })
        }
      }
    },

    *getAllProjectByOrganizationId(_, { select, call, put }) {
      const organization = yield select(
        (state: RootState) => state.organization.current
      )
      const user = yield select((state: RootState) => state.user.current)
      if (organization) {
        const organization_id = organization.id
        if (organization_id) {
          const data = yield call(api.project.getAll, {
            organization_id,
            user_id: user.id,
          })
          if (data) {
            yield put({
              type: 'setState',
              payload: {
                data,
              },
            })
            yield put({
              type: 'setState',
              payload: {
                // 默认取第一项为当前 project
                current: data[0],
              },
            })
          }
        }
      }
    },

    *trend({ payload: { start, end } }, { select, call, put }) {
      const current = yield select((state: RootState) => state.project.current)
      if (current) {
        const project_id = current.id
        const data = yield call(api.project.trend, {
          project_id,
          start,
          end,
        })
        if (data) {
          yield put({
            type: 'setState',
            payload: {
              currentTrend: data,
            },
          })
        }
      }
    },
  },
}

export default project
