import type { OhbugPlatform, OhbugEvent } from '@ohbug/types';

import type { RootState, Model } from '@/interfaces';
import api from '@/api';

interface IssueIntro {
  type: string;
  platform: OhbugPlatform;
  message?: string;
  name?: string;
  filename?: string;
  selector?: string;
  url?: string;
  method?: string;
}
export interface Issue<T = IssueIntro> {
  id: number;
  type: string;
  intro: T;
  first_seen: Date;
  last_seen: Date;
  count: number;
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
      const data = payload.data.map((p: Issue<string>) => {
        const intro: IssueIntro = JSON.parse(p.intro);
        return {
          ...p,
          intro,
        };
      });
      return {
        ...state,
        data,
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
