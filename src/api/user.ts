import { request } from 'umi'
import type { OrganizationModelState } from 'umi'

interface User {
  id?: number
  name?: string
  email?: string
  avatar?: string
  from?: string
  organization?: OrganizationModelState
}
interface Update {
  id?: number
  name?: string
  email?: string
  avatar?: string
}

const user = {
  get: async (id: string): Promise<User | void> => {
    const res = await request(`/users/${id}`, { method: 'get' })
    return res
  },
  update: async (data: Update): Promise<User | void> => {
    const res = await request(`/users/${data.id}`, { method: 'patch', data })
    return res
  },
}

export default user
