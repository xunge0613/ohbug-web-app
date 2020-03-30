import React from 'react'
import { Layout } from 'antd'
import clsx from 'clsx'

import Sider from '../../components/Sider'

import styles from './Basic.module.less'

const { Content, Footer } = Layout

interface BasicLayoutProps {
  className?: string
  header?: React.ReactNode
  pageHeader?: React.ReactNode
  enableSider?: boolean
}

const BasicLayout: React.FC<BasicLayoutProps> = ({
  children,
  header,
  pageHeader,
  enableSider = true,
  className
}) => {
  const classes = clsx(styles.content, className)
  return (
    <Layout className={styles.root}>
      {enableSider && <Sider />}
      <Layout className={styles.container}>
        {header}
        {pageHeader}
        <Content className={classes}>{children}</Content>
        <Footer>Footer LOGO</Footer>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
