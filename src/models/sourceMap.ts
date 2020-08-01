import type { Model } from '@/interfaces';
import api from '@/api';

export interface SourceMap {
  id?: number;
  apiKey?: string;
  appVersion?: string;
  appType?: string;
  data?: {
    path: string;
    size: number;
    encoding: string;
    filename: string;
    mimetype: string;
    fieldname: string;
    destination: string;
    originalname: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
export interface SourceMapModelState {
  data?: SourceMap[];
}
export interface SourceMapModel extends Model<SourceMapModelState> {
  namespace: 'sourceMap';
}

const sourceMap: SourceMapModel = {
  namespace: 'sourceMap',
  state: {
    data: undefined,
  },
  reducers: {
    setState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  effects: {
    *get({ payload: { project } }, { call, put }) {
      if (project) {
        const data = yield call(api.sourceMap.get, project.apiKey);
        if (data) {
          yield put({
            type: 'setState',
            payload: {
              data,
            },
          });
        }
      }
    },

    *delete({ payload: { sourceMap_id, project } }, { call, put }) {
      if (sourceMap_id) {
        const result = yield call(api.sourceMap.delete, sourceMap_id);
        if (result) {
          yield put({
            type: 'sourceMap/get',
            payload: {
              project,
            },
          });
        }
      }
    },
  },
};

export default sourceMap;
