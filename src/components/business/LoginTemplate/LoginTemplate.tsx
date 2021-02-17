import React from 'react'
import { Spin, Row, Col, Space, Typography } from 'antd'
import clsx from 'clsx'

import BasicLayout from '@/layouts/Basic'
import { Image } from '@/components'

import styles from './LoginTemplate.less'

interface LoginTemplateProps {
  className?: string
  children: React.ReactNode
  loading?: boolean
  title: string
  subTitle?: string
  figure?: string
}
const LoginTemplate: React.FC<LoginTemplateProps> = ({
  className,
  children,
  loading = false,
  title,
  subTitle,
  figure = require('@/static/images/login_figure.svg'),
}) => {
  const classes = clsx(className, styles.root)
  return (
    <BasicLayout className={classes}>
      <Row className={styles.container} gutter={8}>
        <Col className={styles.left} xs={0} sm={0} md={0} lg={12} xl={14}>
          <Image
            src={figure}
            alt="login_figure"
            style={{ width: '80%', margin: '0 auto' }}
          />
        </Col>

        <Col className={styles.right} xs={24} sm={24} md={24} lg={12} xl={10}>
          {loading ? (
            <Spin />
          ) : (
            <Space direction="vertical" size="middle">
              <Typography className={styles.titleBox}>
                <Typography.Title level={3}>{title}</Typography.Title>
                <Typography.Paragraph type="secondary">
                  {subTitle}
                </Typography.Paragraph>
              </Typography>

              {children}
            </Space>
          )}
        </Col>
      </Row>
    </BasicLayout>
  )
}

export default LoginTemplate
