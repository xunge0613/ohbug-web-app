import type { Event } from 'umi'
import type { RootState, Model } from '@/interfaces'
import api from '@/api'

export interface FeedbackModelState {
  data?: Event<any>[]
  count?: number
  hasMore?: boolean
}
export interface FeedbackModel extends Model<FeedbackModelState> {
  namespace: 'feedback'
}

const feedback: FeedbackModel = {
  namespace: 'feedback',
  state: {},
  reducers: {
    setFeedbacks(state, action) {
      const feedbacks = action.payload
      const data = feedbacks[0]
      const count = feedbacks[1]
      const hasMore = feedbacks[2]
      return {
        ...state,
        data,
        count,
        hasMore,
      }
    },
  },
  effects: {
    *searchFeedbacks(
      { payload: { page = 0, issue_id, type, user, start, end } },
      { select, call, put }
    ) {
      const project = yield select((state: RootState) => state.project)
      if (project.current) {
        const project_id = project.current.id

        const data = yield call(api.feedback.getMany, {
          project_id,
          page,
          issue_id,
          type,
          user,
          start,
          end,
        })
        if (data) {
          yield put({ type: 'setFeedbacks', payload: data })
        }
      }
    },
  },
}

export default feedback
