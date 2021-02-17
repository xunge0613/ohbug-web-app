import React from 'react'
import { Button } from 'antd'
import { getDvaApp } from 'umi'

export function activationNotification(email: string) {
  const dva = getDvaApp()
  const dispatch = dva?._store?.dispatch
  dispatch({
    type: 'app/notification',
    payload: {
      type: 'warn',
      config: {
        message: '用户激活',
        description: (
          <div>
            <span>
              已经将激活邮件发至您的邮箱，未激活账号可能导致部分功能无法使用
            </span>
            <Button
              type="primary"
              onClick={() => {
                dispatch({
                  type: 'auth/sendActivationEmail',
                  payload: {
                    email,
                  },
                })
              }}
            >
              重新发送激活邮件
            </Button>
          </div>
        ),
        duration: null,
      },
    },
  })
}
