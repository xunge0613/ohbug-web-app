import { request } from 'umi';
import type { Issue } from 'umi';

interface GetMany {
  project_id: number;
  page: number;
  start?: number | string;
  end?: number | string;
}

const issue = {
  getMany: async (data: GetMany): Promise<Issue[] | void> => {
    const res = await request('/issue', {
      method: 'get',
      params: data,
    });
    return res;
  },
};

export default issue;
