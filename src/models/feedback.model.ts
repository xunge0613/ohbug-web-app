import { ModelConfig, ModelReducers, ModelEffects } from '@rematch/core'
import { RootState } from '../store'
import { Event } from './event.model'
import api from '../api'

export interface FeedbackState {
  data?: Event<any>[]
  count?: number
  hasMore?: boolean
}
export interface FeedbackModel extends ModelConfig<FeedbackState> {
  reducers: ModelReducers<FeedbackState>
  effects: ModelEffects<any>
}

interface GetFeedbacksPayload {
  page: number
}
export interface SearchFeedbacks extends GetFeedbacksPayload {
  issue_id: string
  type?: string
  user?: string
  start?: number | string
  end?: number | string
}

export const feedback: FeedbackModel = {
  state: {},
  reducers: {
    setFeedbacks(state, feedbacks): FeedbackState {
      const data = feedbacks[0]
      const count = feedbacks[1]
      const hasMore = feedbacks[2]
      return {
        ...state,
        data,
        count,
        hasMore
      }
    }
  },
  effects: {
    searchFeedbacks(
      { page = 0, issue_id, type, user, start, end }: SearchFeedbacks,
      rootState: RootState
    ): void {
      if (rootState.project.current) {
        const project_id = rootState.project.current.id

        api.feedback
          .getMany({
            project_id,
            page,
            issue_id,
            type,
            user,
            start,
            end
          })
          .then(data => {
            if (data) {
              this.setFeedbacks(data)
            }
          })
      }
    }
  }
}
