import { Event } from '@ohbug/types';
import { request } from '../utils';
import { SearchEvents } from '../models';

interface Get {
  event_id: string | number;
  project_id: string | number;
}
interface GetLatest {
  issue_id: string | number;
  project_id: string | number;
}
interface GetMany extends SearchEvents {
  project_id: string | number;
}

const event = {
  get: async (data: Get): Promise<Event<any> | void> => {
    const { event_id, project_id } = data;
    const res = await request.get(`/event/${event_id}`, {
      params: {
        project_id,
      },
    });
    if (res.code === 0 && res.data) {
      return res.data;
    }
    return undefined;
  },
  getLatest: async (data: GetLatest): Promise<Event<any> | void> => {
    const { issue_id, project_id } = data;
    const res = await request.get('/event/latest', {
      params: {
        issue_id,
        project_id,
      },
    });
    if (res.code === 0 && res.data) {
      return res.data;
    }
    return undefined;
  },
  getMany: async (data: GetMany): Promise<Event<any>[] | void> => {
    const res = await request.get('/event', {
      params: data,
    });
    if (res.code === 0 && res.data) {
      return res.data;
    }
    return undefined;
  },
};

export default event;
