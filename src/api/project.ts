import { request } from '../utils'
import { ProjectType } from '../interfaces'
import { ProjectState, Project } from '../models'

interface Create {
  name: string
  type: ProjectType
  admin_id: number
  organization_id: number
}
interface GetAll {
  organization_id: number
}

const project = {
  create: async (data: Create): Promise<Project | void> => {
    const res = await request.post('/project/create', data)
    if (res.code === 0) {
      return res.data
    }
  },
  getAll: async (data: GetAll): Promise<ProjectState['data'] | void> => {
    const res = await request.get('/project', { params: data })
    if (res.code === 0) {
      return res.data
    }
  }
}

export default project
