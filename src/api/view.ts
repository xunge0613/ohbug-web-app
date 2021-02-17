import { request } from 'umi'
import type { GetPV, GetUV } from 'umi'

const view = {
  getPV: async (data: GetPV): Promise<number | void> => {
    const res = await request('/view/pv', {
      method: 'get',
      params: data,
    })
    return res
  },
  getUV: async (data: GetUV): Promise<number | void> => {
    const res = await request('/view/uv', {
      method: 'get',
      params: data,
    })
    return res
  },
}

export default view
