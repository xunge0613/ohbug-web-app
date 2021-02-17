import { request } from 'umi'
import type { Event } from 'umi'

interface Get {
  event_id: string
  issue_id: string | number
}
interface GetLatest {
  issue_id: string | number
}

const event = {
  get: async (data: Get): Promise<Event<any> | void> => {
    const { event_id, issue_id } = data
    const res = await request(`/events/${event_id}`, {
      method: 'get',
      params: {
        issue_id,
      },
    })
    return res
  },
  getLatest: async (data: GetLatest): Promise<Event<any> | void> => {
    const { issue_id } = data
    const res = await request('/events/latest', {
      method: 'get',
      params: {
        issue_id,
      },
    })
    return res
  },
}

export default event
