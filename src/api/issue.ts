import { request } from '../utils';
import { Issue } from '../models';

interface GetMany {
  project_id: number;
  page: number;
  start?: number | string;
  end?: number | string;
}

const issue = {
  getMany: async (data: GetMany): Promise<Issue[] | void> => {
    const res = await request.get('/issue', {
      params: data,
    });

    if (res.code === 0 && res.data) {
      return res.data;
    }
    return undefined;
  },
};

export default issue;
