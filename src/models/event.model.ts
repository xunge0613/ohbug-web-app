import { ModelConfig, ModelReducers, ModelEffects } from '@rematch/core';
import { Event as EventBase, Platform } from '@ohbug/types';
import { SourceMapTraceCode } from 'source-map-trace/dist/source-map-trace';

import { RootState } from '@/store';
import api from '@/api';

interface User {
  ip_address: string;
}
export interface Event<T> extends EventBase<T> {
  id: string;
  time: Date;
  user: User;
  // tags
  url?: string;
  title?: string;
  version: string;
  language?: string;
  platform: Platform;
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

export interface EventState {
  current?: Event<any>;
  data?: Event<any>[];
  count?: number;
  hasMore?: boolean;
}
export interface EventModel extends ModelConfig<EventState> {
  reducers: ModelReducers<EventState>;
  effects: ModelEffects<any>;
}

interface GetPayload {
  event_id: string;
}
interface GetLatestEventPayload {
  issue_id: string;
}
interface GetEventsPayload {
  page: number;
}
export interface SearchEvents extends GetEventsPayload {
  issue_id: string;
  type?: string;
  user?: string;
  start?: number | string;
  end?: number | string;
}

export const event: EventModel = {
  state: {},
  reducers: {
    setCurrentEvent(state, payload): EventState {
      return {
        ...state,
        current: payload,
      };
    },
    setEvents(state, events): EventState {
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
    get({ event_id }: GetPayload, rootState: RootState): void {
      if (rootState.project.current) {
        const project_id = rootState.project.current.id;

        api.event
          .get({
            event_id,
            project_id,
          })
          .then(data => {
            if (data) {
              this.setCurrentEvent(data);
            }
          });
      }
    },

    getLatestEvent({ issue_id }: GetLatestEventPayload, rootState: RootState): void {
      if (rootState.project.current) {
        const project_id = rootState.project.current.id;

        api.event
          .getLatest({
            issue_id,
            project_id,
          })
          .then(data => {
            if (data) {
              this.setCurrentEvent(data);
            }
          });
      }
    },

    searchEvents(
      { page = 0, issue_id, type, user, start, end }: SearchEvents,
      rootState: RootState,
    ): void {
      if (rootState.project.current) {
        const project_id = rootState.project.current.id;

        api.event
          .getMany({
            project_id,
            page,
            issue_id,
            type,
            user,
            start,
            end,
          })
          .then(data => {
            if (data) {
              this.setEvents(data);
            }
          });
      }
    },
  },
};
