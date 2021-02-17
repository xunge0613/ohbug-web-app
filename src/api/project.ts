import { request } from 'umi'
import type { Project } from 'umi'

import type { ProjectType } from '@/interfaces'

interface Create {
  admin_id: number
  organization_id: number
  name: string
  type: ProjectType
}
interface Update {
  project_id: number
  name: string
  type: string
}
interface GetAll {
  organization_id: number
  user_id: number
}
interface Trend {
  project_id: number
  start: Date
  end: Date
}

const project = {
  create: async (data: Create): Promise<Project | void> => {
    const res = await request('/projects', { method: 'post', data })
    return res
  },
  update: async ({
    project_id,
    name,
    type,
  }: Update): Promise<Project | void> => {
    const res = await request(`/projects/${project_id}`, {
      method: 'put',
      data: {
        name,
        type,
      },
    })
    return res
  },
  getAll: async (data: GetAll): Promise<Project[] | void> => {
    const res = await request('/projects', { method: 'get', params: data })
    return res
  },
  trend: async ({ project_id, start, end }: Trend): Promise<any> => {
    const res = await request(`/projects/${project_id}/trend`, {
      method: 'get',
      params: {
        start,
        end,
      },
    })
    return res
  },
}

export default project
