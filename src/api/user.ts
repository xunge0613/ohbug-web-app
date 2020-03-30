import { request } from '../utils'
import { UserState, OrganizationState } from '../models'

interface User extends UserState {
  organization?: OrganizationState
}

const user = {
  get: async (id: string): Promise<User | void> => {
    const res = await request.get(`/user/${id}`)
    if (res.code === 0) {
      return res.data
    }
  }
}

export default user
