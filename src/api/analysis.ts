import { request } from 'umi';
import type { AnalysisItem } from 'umi';

interface Get {
  project_id: string | number;
  type: string;
  start?: Date | string;
  end?: Date | string;
  performanceType?: string;
}

const analysis = {
  get: async (data: Get): Promise<AnalysisItem[] | void> => {
    const { type, project_id, start, end, performanceType } = data;
    const res = await request(`/analysis/${type}`, {
      method: 'get',
      params: {
        project_id,
        start,
        end,
        type: performanceType,
      },
    });
    return res;
  },
};

export default analysis;
