import { ModelConfig, ModelReducers, ModelEffects } from '@rematch/core'
import { history } from 'umi'

import { getGithub } from '../utils'
import store, { RootState } from '../store'
import api from '../api'

export interface UserState {
  id?: number
  name?: string
  email?: string
  avatar?: string
  from?: string
}
export interface UserModel extends ModelConfig<UserState> {
  reducers: ModelReducers<UserState>
  effects: ModelEffects<any>
}

export const user: UserModel = {
  state: {},
  reducers: {
    set(state, payload): UserState {
      const { id, name, email, avatar, from } = payload
      return {
        ...state,
        id,
        name,
        email,
        avatar,
        from,
      }
    },
  },
  effects: {
    get(_, rootState: RootState): void {
      // user 数据为空时才发送请求
      if (!Object.keys(rootState.user).length) {
        const github = getGithub()

        api.user.get(github.id).then(data => {
          if (data) {
            this.set(data)

            // 若用户没有 Organization 则跳至 new 页面
            if (!data.organization) {
              history.push('/create-organization')
            } else {
              // 得到 Organization 信息
              store.dispatch({
                type: 'organization/set',
                payload: data.organization,
              })
            }
          }
        })
      }
    },
  },
}
