import type { RootState, Model, Project } from '@/interfaces';
import api from '@/api';

interface MetaData {
  type: string;
  message: string;
  filename?: string;
  others?: string;
}
export interface Issue {
  id: number;
  type: string;
  intro: string;
  createdAt: Date;
  updatedAt: Date;
  eventsCount: number;
  usersCount: number;
  metadata: MetaData;
}
export interface Trend {
  issue_id: string;
  buckets: {
    timestamp: number;
    count: number;
  }[];
}
export interface IssueModelState {
  current?: Issue;
  data?: Issue[];
  count?: number;
  trend?: {
    data?: Trend[];
    current?: {
      '24h': Trend;
      '14d': Trend;
    };
  };
}

export interface IssueModel extends Model<IssueModelState> {
  namespace: 'issue';
}

const issue: IssueModel = {
  namespace: 'issue',
  state: {},
  reducers: {
    setIssues(state, action) {
      const { payload } = action;
      return {
        ...state,
        data: payload.data,
        count: payload.count,
      };
    },
    setTrends(state, action) {
      const { payload } = action;
      return {
        ...state,
        trend: {
          ...state?.trend,
          data: payload,
        },
      };
    },
    setCurrentTrend(state, action) {
      const { payload } = action;
      return {
        ...state,
        trend: {
          ...state?.trend,
          current: payload,
        },
      };
    },
    setCurrentIssue(state, action) {
      return {
        ...state,
        current: action.payload,
      };
    },
  },
  effects: {
    *get({ payload: { issue_id } }, { call, put }) {
      const data = yield call(api.issue.get, {
        issue_id,
      });
      if (data) {
        yield put({ type: 'setCurrentIssue', payload: data });
      }
    },

    *searchIssues({ payload: { page = 0, start, end, project_id } }, { select, call, put }) {
      const project: Project = yield select((state: RootState) => state.project.current);
      if (project_id) {
        yield put({
          type: 'project/trend',
          payload: {
            start,
            end,
          },
        });

        const res = yield call(api.issue.getMany, {
          project_id: project_id === 'current' ? project?.id : project_id,
          page,
          start,
          end,
        });
        if (res) {
          const [data, count] = res;
          yield put({
            type: 'setIssues',
            payload: {
              data,
              count,
            },
          });
          const ids = data.map((v: Issue) => v.id);
          yield put({
            type: 'getTrends',
            payload: {
              ids,
              period: '24h',
            },
          });
        }
      }
    },
    *getTrends({ payload: { ids, period } }, { call, put }) {
      const res = yield call(api.issue.getTrend, {
        ids,
        period,
      });
      yield put({
        type: 'setTrends',
        payload: res,
      });
    },
    *getCurrentTrend({ payload: { ids, period } }, { call, put }) {
      const [result] = yield call(api.issue.getTrend, {
        ids,
        period,
      });
      yield put({
        type: 'setCurrentTrend',
        payload: result,
      });
    },
  },
};

export default issue;
