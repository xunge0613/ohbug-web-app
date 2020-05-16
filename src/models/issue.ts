import type { OhbugEvent } from '@ohbug/types';

import type { RootState, Model } from '@/interfaces';
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
  created_at: Date;
  updated_at: Date;
  events_count: number;
  users_count: number;
  metadata: MetaData;
}

export interface IssueModelState {
  current?: OhbugEvent<any>;
  data?: Issue[];
  count?: number;
  trend?: {
    issue_id: string;
    buckets: {
      timestamp: number;
      count: number;
    }[];
  }[];
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
    setTrend(state, action) {
      const { payload } = action;
      return {
        ...state,
        trend: payload,
      };
    },
  },
  effects: {
    *searchIssues({ payload: { page = 0, start, end } }, { select, call, put }) {
      const project = yield select((state: RootState) => state.project);
      if (project.current) {
        const project_id = project.current.id;

        const res = yield call(api.issue.getMany, {
          project_id,
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
            type: 'getTrend',
            payload: {
              ids,
              period: '24h',
            },
          });
        }
      }
    },
    *getTrend({ payload: { ids, period } }, { call, put }) {
      const res = yield call(api.issue.getTrend, {
        ids,
        period,
      });
      yield put({
        type: 'setTrend',
        payload: res,
      });
    },
  },
};

export default issue;
