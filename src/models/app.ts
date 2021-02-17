import { message, notification } from 'antd'

import type { Model } from '@/interfaces'

export interface AppModel extends Model {
  namespace: 'app'
}

const app: AppModel = {
  namespace: 'app',
  effects: {
    error({ payload }) {
      message.error(payload, 5)
    },
    info({ payload }) {
      message.info(payload)
    },
    notification({ payload: { type, config } }) {
      // @ts-ignore
      notification?.[type]?.(config)
    },
  },
}

export default app
