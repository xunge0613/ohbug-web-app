import { ModelConfig, ModelReducers, ModelEffects } from '@rematch/core'
import { RootState } from '../store'
import api from '../api'

export interface ViewState {
  PV?: number
  UV?: number
}
export interface ViewModel extends ModelConfig<ViewState> {
  reducers: ModelReducers<ViewState>
  effects: ModelEffects<any>
}

export interface GetPV {
  project_id: number
  start?: number | string
  end?: number | string
}
export type GetUV = GetPV
export interface GetPayload {
  start?: number | string
  end?: number | string
}

export const view: ViewModel = {
  state: {},
  reducers: {
    setPV(state, payload): ViewState {
      return {
        ...state,
        PV: payload
      }
    },
    setUV(state, payload): ViewState {
      return {
        ...state,
        UV: payload
      }
    }
  },
  effects: {
    getPV({ start, end }: GetPayload, rootState: RootState): void {
      if (rootState.project.current) {
        const project_id = rootState.project.current.id

        api.view
          .getPV({
            project_id,
            start,
            end
          })
          .then(data => {
            if (typeof data !== 'undefined') {
              this.setPV(data)
            }
          })
      }
    },
    getUV({ start, end }: GetPayload, rootState: RootState): void {
      if (rootState.project.current) {
        const project_id = rootState.project.current.id

        api.view
          .getUV({
            project_id,
            start,
            end
          })
          .then(data => {
            if (typeof data !== 'undefined') {
              this.setUV(data)
            }
          })
      }
    }
  }
}
