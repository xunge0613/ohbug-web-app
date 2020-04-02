import { message } from 'antd';

import { Model } from '@/interfaces';

export interface AppModel extends Model {
  namespace: 'app';
}

const app: AppModel = {
  namespace: 'app',
  effects: {
    error({ payload }) {
      message.error(payload);
    },
  },
};

export default app;
