import type { OhbugEvent, OhbugPlatform } from '@ohbug/types';
import type { SourceMapTraceCode } from 'source-map-trace/dist/source-map-trace';

import type { Model, RootState } from '@/interfaces';
import api from '@/api';

interface EventUser {
  ip_address: string;
}
export interface Event<T> extends OhbugEvent<T> {
  id: string;
  time: Date;
  user: EventUser;
  // tags
  url?: string;
  title?: string;
  version: string;
  language?: string;
  platform: OhbugPlatform;
  browser: string;
  browser_version: string;
  engine: string;
  engine_version: string;
  os: string;
  os_version: string;
  device?: string;
  device_type: string;
  device_manufacturer?: string;
  // replay
  replay?: {
    data: any;
  };
  // source
  source?: SourceMapTraceCode[];
}

export interface EventModelState {
  current?: Event<any>;
  data?: Event<any>[];
  count?: number;
  hasMore?: boolean;
}
export interface EventModel extends Model<EventModelState> {
  namespace: 'event';
}

export interface SearchEvents {
  page: number;
  issue_id: string;
  type?: string;
  user?: string;
  start?: number | string;
  end?: number | string;
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
    setEvents(state, action) {
      const events = action.payload;
      const data = events[0];
      const count = events[1];
      const hasMore = events[2];
      return {
        ...state,
        data,
        count,
        hasMore,
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

    *searchEvents(
      { payload: { page = 0, issue_id, type, user, start, end } },
      { select, call, put },
    ) {
      const project = yield select((state: RootState) => state.project);
      if (project.current) {
        const project_id = project.current.id;

        const data = yield call(api.event.getMany, {
          project_id,
          page,
          issue_id,
          type,
          user,
          start,
          end,
        });
        if (data) {
          yield put({ type: 'setEvents', payload: data });
        }
      }
    },
  },
};

export default event;
