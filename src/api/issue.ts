import { Issue } from 'umi';
import { request } from '@/utils';

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

    if (res.success && res.data) {
      return res.data;
    }
    return undefined;
  },
};

export default issue;
