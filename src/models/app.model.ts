import { ModelConfig, ModelReducers } from '@rematch/core';
import { message } from 'antd';

export interface AppState {
  loading: boolean;
}
export interface AppModel extends ModelConfig {
  reducers: ModelReducers<AppState>;
}

export const app: AppModel = {
  state: {
    loading: false,
  },
  reducers: {
    setState(state, payload): AppState {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    error(payload: string): void {
      message.error(payload);
    },
  },
};
