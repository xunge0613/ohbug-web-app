import React from 'react'

import { useAuth } from '@/hooks'
import { Loading } from '@/components'

// @ts-ignore
const Auth: React.FC = ({ children }) => {
  const { isLogin } = useAuth()
  if (isLogin) {
    return children
  }
  return <Loading />
}

export default Auth
