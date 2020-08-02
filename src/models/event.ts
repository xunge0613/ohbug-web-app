import type { OhbugEvent } from '@ohbug/types';
import type { SourceMapTraceCode } from 'source-map-trace/dist/interfaces';

import type { Model } from '@/interfaces';
import api from '@/api';

export interface Event<T> extends OhbugEvent<T> {
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
    *get({ payload: { event_id } }, { call, put }) {
      const data = yield call(api.event.get, {
        event_id,
      });
      if (data) {
        yield put({ type: 'setCurrentEvent', payload: data });
      }
    },

    *getLatestEvent({ payload: { issue_id } }, { call, put }) {
      const data = yield call(api.event.getLatest, {
        issue_id,
      });
      if (data) {
        yield put({ type: 'setCurrentEvent', payload: data });
      }
    },
  },
};

export default event;
