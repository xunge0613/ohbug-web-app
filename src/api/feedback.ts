import { request } from 'umi'
import type { Event } from 'umi'

interface GetMany {
  project_id: number
  page: number
  issue_id: string
  type?: string
  user?: string
  start?: number | string
  end?: number | string
}

const feedback = {
  getMany: async (data: GetMany): Promise<[Event<any>[], number] | void> => {
    const res = await request('/feedback', {
      method: 'get',
      params: data,
    })
    return res
  },
}

export default feedback
