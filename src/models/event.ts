import type { OhbugEvent } from '@ohbug/types';
import type { SourceMapTraceCode } from 'source-map-trace/dist/source-map-trace';

import type { Model, RootState } from '@/interfaces';
import api from '@/api';

interface EventUser {
  ip_address: string;
}
export interface Event<T> extends OhbugEvent<T> {
  user: EventUser;
  // replay
  replay?: {
    data: any;
  };
  // source
  source?: SourceMapTraceCode[];
}

export interface EventModelState {
  current?: Event<any>;
}
export interface EventModel extends Model<EventModelState> {
  namespace: 'event';
}

const event: EventModel = {
  namespace: 'event',
  state: {},
  reducers: {
    setCurrentEvent(state, action) {
      return {
        ...state,
        current: action.payload,
      };
    },
  },
  effects: {
    *get({ payload: { event_id } }, { select, call, put }) {
      const project = yield select((state: RootState) => state.project);
      if (project.current) {
        const project_id = project.current.id;

        const data = yield call(api.event.get, {
          event_id,
          project_id,
        });
        if (data) {
          yield put({ type: 'setCurrentEvent', payload: data });
        }
      }
    },

    *getLatestEvent({ payload: { issue_id } }, { select, call, put }) {
      const project = yield select((state: RootState) => state.project);
      if (project.current) {
        const project_id = project.current.id;

        const data = yield call(api.event.getLatest, {
          issue_id,
          project_id,
        });
        if (data) {
          yield put({ type: 'setCurrentEvent', payload: data });
        }
      }
    },
  },
};

export default event;
