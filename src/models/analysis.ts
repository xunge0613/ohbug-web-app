import dayjs from 'dayjs';

import type { Model, RootState } from '@/interfaces';
import api from '@/api';

export interface AnalysisItem {
  item: string;
  count: number;
}
export interface AnalysisModelState {
  type?: AnalysisItem[];
  device?: AnalysisItem[];
  os?: AnalysisItem[];
  browser?: AnalysisItem[];
  event?: number;
  issue?: number;
  performance?: {
    [key: string]: number;
  }[];
}
export interface AnalysisModel extends Model<AnalysisModelState> {
  namespace: 'analysis';
}

const analysis: AnalysisModel = {
  namespace: 'analysis',
  state: {},
  reducers: {
    setState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  effects: {
    *getStatistics({ payload: { type } }, { select, call, put }) {
      const project = yield select((state: RootState) => state.project);
      if (project.current) {
        const project_id = project.current.id;

        const data = yield call(api.analysis.get, {
          type,
          project_id,
        });

        if (typeof data !== 'undefined') {
          yield put({
            type: 'setState',
            payload: {
              [type]: data,
            },
          });
        }
      }
    },

    *getEventOrIssueStatistics({ payload: { type } }, { select, call, put }) {
      const project = yield select((state: RootState) => state.project);

      if (project.current) {
        const project_id = project.current.id;

        // 取当天 event 总数
        const start = dayjs(dayjs().format('YYYY-MM-DD')).toISOString();
        const end = dayjs().toISOString();

        const data = yield call(api.analysis.get, {
          type,
          project_id,
          start,
          end,
        });

        if (typeof data !== 'undefined') {
          yield put({
            type: 'setState',
            payload: {
              [type]: data,
            },
          });
        }
      }
    },

    *getPerformanceStatistics({ payload: { type } }, { select, call, put }) {
      const project = yield select((state: RootState) => state.project);
      if (project.current) {
        const project_id = project.current.id;

        // 取当天 event 总数
        const start = dayjs(dayjs().format('YYYY-MM-DD')).toISOString();
        const end = dayjs().toISOString();

        const data = yield call(api.analysis.get, {
          project_id,
          start,
          end,
          type: 'performance',
          performanceType: type,
        });

        if (typeof data !== 'undefined') {
          yield put({
            type: 'setState',
            payload: {
              performance: data,
            },
          });
        }
      }
    },
  },
};

export default analysis;
