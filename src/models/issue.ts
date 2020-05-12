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
  events: number;
  users: number;
  metadata: MetaData;
}

export interface IssueModelState {
  current?: OhbugEvent<any>;
  data?: Issue[];
  count?: number;
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
        }
      }
    },
  },
};

export default issue;
