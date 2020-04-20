import { request } from 'umi';
import type { SearchEvents, Event } from 'umi';

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
    const res = await request(`/event/${event_id}`, {
      method: 'get',
      params: {
        project_id,
      },
    });
    return res;
  },
  getLatest: async (data: GetLatest): Promise<Event<any> | void> => {
    const { issue_id, project_id } = data;
    const res = await request('/event/latest', {
      method: 'get',
      params: {
        issue_id,
        project_id,
      },
    });
    return res;
  },
  getMany: async (data: GetMany): Promise<Event<any>[] | void> => {
    const res = await request('/event', {
      method: 'get',
      params: data,
    });
    return res;
  },
};

export default event;
