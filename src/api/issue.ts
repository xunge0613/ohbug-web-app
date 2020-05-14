import { request } from 'umi';
import type { Issue } from 'umi';

interface GetMany {
  project_id: number;
  page: number;
  start?: number | string;
  end?: number | string;
}
type Period = '24h' | '14d';
interface GetTrend {
  ids: string[];
  period: Period;
}

const issue = {
  getMany: async (data: GetMany): Promise<Issue[] | void> => {
    const res = await request('/issue', {
      method: 'get',
      params: data,
    });
    return res;
  },
  getTrend: async (data: GetTrend): Promise<Issue[] | void> => {
    const res = await request('/issue/trend', {
      method: 'get',
      params: data,
    });
    return res;
  },
};

export default issue;
