import React from 'react'
import { Typography, Button } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { useLocation } from 'umi'

import BasicLayout from '../../layouts/Basic'

import styles from './Login.less'

interface LoginPageProps {
  children?: React.ReactNode
}

const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID
const href = `https://github.com/login/oauth/authorize?client_id=${clientId}`

function useLoginRedirect(): void {
  const dispatch = useDispatch()
  const { query } = useLocation() as any

  React.useEffect(() => {
    if (query) {
      dispatch({ type: 'login/login', payload: { query } })
    }
  }, [location, dispatch])
}

const Login: React.FC<LoginPageProps> = ({ children }) => {
  useLoginRedirect()

  return (
    <BasicLayout className={styles.root} enableSider={false}>
      <div>
        <Typography.Title>Join in</Typography.Title>
        <Button type="primary" size="large" shape="round" href={href}>
          <GithubOutlined />
          Continue with Github
        </Button>
        {children}
      </div>
    </BasicLayout>
  )
}

export default Login
