import { request } from 'umi'
import type { Issue } from 'umi'

interface Get {
  issue_id: number
}
interface GetMany {
  project_id: number
  page: number
  start?: number | string
  end?: number | string
}
type Period = '24h' | '14d' | 'all'
interface GetTrend {
  ids: string[]
  period: Period
}

const issue = {
  get: async (data: Get): Promise<Issue | void> => {
    const { issue_id } = data
    const res = await request(`/issues/${issue_id}`, {
      method: 'get',
    })
    return res
  },
  getMany: async (data: GetMany): Promise<Issue[] | void> => {
    const res = await request('/issues', {
      method: 'get',
      params: data,
    })
    return res
  },
  getTrend: async (data: GetTrend): Promise<Issue[] | void> => {
    const res = await request('/issues/trend', {
      method: 'post',
      data,
    })
    return res
  },
}

export default issue
