import { request } from '../utils';
import { GetPV, GetUV } from '../models';

const view = {
  getPV: async (data: GetPV): Promise<number | void> => {
    const res = await request.get('/view/pv', {
      params: data,
    });
    if (res.code === 0) {
      return res.data;
    }
    return undefined;
  },
  getUV: async (data: GetUV): Promise<number | void> => {
    const res = await request.get('/view/uv', {
      params: data,
    });
    if (res.code === 0) {
      return res.data;
    }
    return undefined;
  },
};

export default view;
