import { ModelConfig, ModelReducers } from '@rematch/core';
import dayjs from 'dayjs';

import { RootState } from '@/store';
import api from '@/api';

export interface Item {
  item: string;
  count: number;
}

export interface AnalysisState {
  type?: Item[];
  device?: Item[];
  os?: Item[];
  browser?: Item[];
  event?: number;
  issue?: number;
  performance?: {
    [key: string]: number;
  }[];
}
export interface AnalysisModel extends ModelConfig {
  reducers: ModelReducers<AnalysisState>;
}

interface GetStatisticsPayload {
  type: string;
}

export const analysis: AnalysisModel = {
  state: {},
  reducers: {
    setData(state, payload): AnalysisState {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    getStatistics({ type }: GetStatisticsPayload, rootState: RootState): void {
      if (rootState.project.current) {
        const project_id = rootState.project.current.id;

        api.analysis
          .get({
            type,
            project_id,
          })
          .then(data => {
            if (typeof data !== 'undefined') {
              this.setData({
                [type]: data,
              });
            }
          });
      }
    },

    async getEventOrIssueStatistics(
      { type }: GetStatisticsPayload,
      rootState: RootState,
    ): Promise<void> {
      if (rootState.project.current) {
        const project_id = rootState.project.current.id;
        // 取当天 event 总数
        const start = dayjs(dayjs().format('YYYY-MM-DD')).toISOString();
        const end = dayjs().toISOString();

        const data = await api.analysis.get({
          type,
          project_id,
          start,
          end,
        });

        if (typeof data !== 'undefined') {
          this.setData({
            [type]: data,
          });
        }
      }
    },

    getPerformanceStatistics({ type }: GetStatisticsPayload, rootState: RootState): void {
      if (rootState.project.current) {
        const project_id = rootState.project.current.id;
        // 取当天 event 总数
        const start = dayjs(dayjs().format('YYYY-MM-DD')).toISOString();
        const end = dayjs().toISOString();

        api.analysis
          .get({
            project_id,
            start,
            end,
            type: 'performance',
            performanceType: type,
          })
          .then(data => {
            if (data) {
              this.setData({
                performance: data,
              });
            }
          });
      }
    },
  },
};
