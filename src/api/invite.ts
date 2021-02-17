import { request } from 'umi'

export interface Invite {
  auth: string
  projects: number[]
  organization_id: number | string
  inviter_id: number
}
interface Get {
  uuid: string
}
interface Bind {
  uuid: string
  user_id: number
}
interface BindProject {
  users: number[]
  project_id: number
}

const invite = {
  url: async (data: Invite): Promise<string | void> => {
    const res = await request(`/invite/url`, { method: 'post', data })
    return res
  },
  get: async (data: Get): Promise<any | void> => {
    const res = await request(`/invite`, { method: 'get', params: data })
    return res
  },
  bind: async (data: Bind): Promise<any | void> => {
    const res = await request(`/invite/bind`, { method: 'post', data })
    return res
  },
  bindProject: async (data: BindProject): Promise<any | void> => {
    const res = await request(`/invite/bindProject`, { method: 'post', data })
    return res
  },
}

export default invite
