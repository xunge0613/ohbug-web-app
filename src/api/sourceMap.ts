import { request } from 'umi';

import type { SourceMap } from '@/interfaces';

const sourceMap = {
  get: async (apiKey: string): Promise<SourceMap | void> => {
    const res = await request(`/sourceMap/${apiKey}`, { method: 'get' });
    return res;
  },
  delete: async (sourceMap_id: number): Promise<SourceMap | void> => {
    const res = await request(`/sourceMap/${sourceMap_id}`, { method: 'delete' });
    return res;
  },
};

export default sourceMap;
