import { Event } from 'umi';

import { request } from '@/utils';

interface GetMany {
  project_id: number;
  page: number;
  issue_id: string;
  type?: string;
  user?: string;
  start?: number | string;
  end?: number | string;
}

const feedback = {
  getMany: async (data: GetMany): Promise<[Event<any>[], number] | void> => {
    const res = await request.get('/feedback', {
      params: data,
    });
    if (res.code === 0 && res.data) {
      return res.data;
    }
    return undefined;
  },
};

export default feedback;
