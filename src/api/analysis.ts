import { AnalysisItem } from 'umi';
import { request } from '@/utils';

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
    const res = await request.get(`/analysis/${type}`, {
      params: {
        project_id,
        start,
        end,
        type: performanceType,
      },
    });

    if (res.success) {
      return res.data;
    }
    return undefined;
  },
};

export default analysis;
