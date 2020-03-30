import { ModelConfig, ModelEffects } from '@rematch/core'
import { history } from 'umi'
import api from '../api'

export interface LoginModel extends ModelConfig {
  effects: ModelEffects<any>
}

export interface LoginPayload {
  query: {
    code: string
  }
}

export const login: LoginModel = {
  state: null,
  effects: {
    login({ query }: LoginPayload): void {
      api.auth
        .github({
          code: query.code,
        })
        .then(data => {
          if (data) {
            history.push('/project')
          }
        })
    },

    logout(): void {
      api.auth.logout().then(data => {
        if (data) {
          history.push('/')
        }
      })
    },
  },
}
