import { Model, RootState } from '@/interfaces';
import api from '@/api';

export interface ViewModelState {
  PV?: number;
  UV?: number;
}
export interface ViewModel extends Model<ViewModelState> {
  namespace: 'view';
}

export interface GetPV {
  project_id: number;
  start?: number | string;
  end?: number | string;
}
export type GetUV = GetPV;

const view: ViewModel = {
  namespace: 'view',
  state: {},
  reducers: {
    setPV(state, action) {
      return {
        ...state,
        PV: action.payload,
      };
    },
    setUV(state, action) {
      return {
        ...state,
        UV: action.payload,
      };
    },
  },
  effects: {
    *getPV({ payload: { start, end } }, { select, call, put }) {
      const project = yield select((state: RootState) => state.project);
      if (project.current) {
        const project_id = project.current.id;

        const data = yield call(api.view.getPV, {
          project_id,
          start,
          end,
        });

        if (typeof data !== 'undefined') {
          yield put({
            type: 'setPV',
            payload: data,
          });
        }
      }
    },
    *getUV({ payload: { start, end } }, { select, call, put }) {
      const project = yield select((state: RootState) => state.project);
      if (project.current) {
        const project_id = project.current.id;

        const data = yield call(api.view.getUV, {
          project_id,
          start,
          end,
        });

        if (typeof data !== 'undefined') {
          yield put({
            type: 'setUV',
            payload: data,
          });
        }
      }
    },
  },
};

export default view;
