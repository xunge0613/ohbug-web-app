import { Event } from '@ohbug/types';
import { request } from '../utils';
import { SearchFeedbacks } from '../models';

interface GetMany extends SearchFeedbacks {
  project_id: number;
}

const feedback = {
  getMany: async (data: GetMany): Promise<[Event<any>[], number] | void> => {
    const res = await request.get('/feedback', {
      params: data,
    });
    if (res.code === 0 && res.data) {
      return res.data;
    }
  },
};

export default feedback;
