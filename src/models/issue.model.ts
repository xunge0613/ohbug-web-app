import { ModelConfig, ModelReducers, ModelEffects } from '@rematch/core';
import { Platform, Event } from '@ohbug/types';
import { RootState } from '../store';
import api from '../api';

interface Intro {
  type: string;
  platform: Platform;
  message?: string;
  name?: string;
  filename?: string;
  selector?: string;
  url?: string;
  method?: string;
}
export interface Issue {
  id: number;
  type: string;
  intro: Intro;
  first_seen: Date;
  last_seen: Date;
  count: number;
}
interface OriginalIssue {
  id: number;
  type: string;
  intro: string;
  first_seen: Date;
  last_seen: Date;
  count: number;
}

export interface IssueState {
  current?: Event<any>;
  data?: Issue[];
  count?: number;
}
export interface IssueModel extends ModelConfig<IssueState> {
  reducers: ModelReducers<IssueState>;
  effects: ModelEffects<any>;
}

interface SearchIssuesPayload {
  page: number;
  start?: number | string;
  end?: number | string;
}

export const issue: IssueModel = {
  state: {},
  reducers: {
    setCurrentIssue(state, payload): IssueState {
      return {
        ...state,
        current: payload,
      };
    },
    setIssues(
      state,
      payload: {
        data: OriginalIssue[];
        count: number;
      },
    ): IssueState {
      const data = payload.data.map(p => {
        const intro: Intro = JSON.parse(p.intro);
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
    searchIssues({ page = 0, start, end }: SearchIssuesPayload, rootState: RootState): void {
      if (rootState.project.current) {
        const project_id = rootState.project.current.id;

        api.issue
          .getMany({
            project_id,
            page,
            start,
            end,
          })
          .then(res => {
            if (res) {
              const [data, count] = res;
              this.setIssues({
                data,
                count,
              });
            }
          });
      }
    },
  },
};
