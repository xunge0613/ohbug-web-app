import { request } from 'umi'
import type { OrganizationModelState } from 'umi'

interface Create {
  admin_id: number
  name: string
  introduction?: string
}
interface Update {
  organization_id: number
  name?: string
  introduction?: string
  avatar?: string
}
interface Delete {
  organization_id: number
}

const organization = {
  create: async (data: Create): Promise<OrganizationModelState | void> => {
    const res = await request('/organizations', { method: 'post', data })
    return res
  },
  update: async ({
    organization_id,
    name,
    introduction,
    avatar,
  }: Update): Promise<OrganizationModelState | void> => {
    const res = await request(`/organizations/${organization_id}`, {
      method: 'put',
      data: { name, introduction, avatar },
    })
    return res
  },
  delete: async ({
    organization_id,
  }: Delete): Promise<OrganizationModelState | void> => {
    const res = await request(`/organizations/${organization_id}`, {
      method: 'delete',
    })
    return res
  },
}

export default organization
