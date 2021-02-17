import React from 'react'
import { Card, Descriptions, Timeline, Tooltip } from 'antd'
import dayjs from 'dayjs'

import type { EventModelState } from '@/interfaces'
import { Icon } from '@/components'

import StackInfo from '../StackInfo'
import { getMessageAndIconByActionType } from './core'

import styles from './Detail.less'

interface DetailProps {
  event: EventModelState['current']
}
const Detail: React.FC<DetailProps> = ({ event }) => {
  const loading = !event

  return (
    <div className={styles.root}>
      {/* all */}
      {event?.detail.message && (
        <Card
          className={styles.descriptions}
          title="错误信息"
          loading={loading}
        >
          {event.detail.message}
        </Card>
      )}
      {/* unhandledrejectionError */}
      {/* uncaughtError */}
      {event?.detail.stack && (
        <Card
          className={styles.descriptions}
          title="堆栈信息"
          loading={loading}
        >
          <StackInfo stack={event.detail.stack} source={event?.source} />
        </Card>
      )}
      {/* resourceError */}
      {event?.detail.selector && (
        <Card className={styles.descriptions} loading={loading}>
          <Descriptions title="DOM 信息" column={1} size="small" bordered>
            <Descriptions.Item label="HTML">
              {event.detail.outerHTML}
            </Descriptions.Item>
            <Descriptions.Item label="selector">
              {event.detail.selector}
            </Descriptions.Item>
            <Descriptions.Item label="nodeType">
              {event.detail.nodeType}
            </Descriptions.Item>
            <Descriptions.Item label="tagName">
              {event.detail.tagName}
            </Descriptions.Item>
            <Descriptions.Item label="id">{event.detail.id}</Descriptions.Item>
            <Descriptions.Item label="className">
              {event.detail.className}
            </Descriptions.Item>
            <Descriptions.Item label="name">
              {event.detail.name}
            </Descriptions.Item>
            <Descriptions.Item label="src">
              {event.detail.src}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
      {/* ajaxError */}
      {/* fetchError */}
      {event?.type === 'ajaxError' && (
        <Card className={styles.descriptions} loading={loading}>
          <Descriptions title="HTTP 信息" column={1} size="small" bordered>
            <Descriptions.Item label="method">
              {event.detail.req.method}
            </Descriptions.Item>
            <Descriptions.Item label="url">
              {event.detail.req.url}
            </Descriptions.Item>
            <Descriptions.Item label="data">
              {JSON.stringify(event.detail.req.data)}
            </Descriptions.Item>

            <Descriptions.Item label="status">
              {event.detail.res.status}
            </Descriptions.Item>
            <Descriptions.Item label="statusText">
              {event.detail.res.statusText}
            </Descriptions.Item>
            <Descriptions.Item label="response">
              {event.detail.res.response}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
      {/* websocketError */}
      {event?.type === 'websocketError' && (
        <Card className={styles.descriptions} loading={loading}>
          <Descriptions title="WebSocket 信息" column={1} size="small" bordered>
            <Descriptions.Item label="url">
              {event.detail.url}
            </Descriptions.Item>
            <Descriptions.Item label="timeStamp">
              {event.detail.timeStamp}
            </Descriptions.Item>
            <Descriptions.Item label="readyState">
              {event.detail.readyState}
            </Descriptions.Item>
            <Descriptions.Item label="protocol">
              {event.detail.protocol}
            </Descriptions.Item>
            <Descriptions.Item label="extensions">
              {event.detail.extensions}
            </Descriptions.Item>
            <Descriptions.Item label="binaryType">
              {event.detail.binaryType}
            </Descriptions.Item>
            <Descriptions.Item label="bufferedAmount">
              {event.detail.bufferedAmount}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}

      {/* actions */}
      <Card
        className={styles.descriptions}
        title="Actions 信息"
        loading={loading}
      >
        <Timeline className={styles.actions}>
          {event?.actions?.map((action, index) => {
            const { message, icon } = getMessageAndIconByActionType(action)
            return (
              <Timeline.Item key={action.timestamp + index} dot={icon}>
                <div className={styles.action}>
                  <div className={styles.type}>{action.type}</div>
                  <div className={styles.data}>{message}</div>
                  <Tooltip
                    title={dayjs(event.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                  >
                    <div className={styles.time}>
                      {dayjs(event.timestamp).format('HH:mm:ss')}
                    </div>
                  </Tooltip>
                </div>
              </Timeline.Item>
            )
          })}
          {event && (
            <Timeline.Item
              dot={<Icon type="icon-ohbug-error-warning-line" />}
              color="red"
            >
              <div className={styles.action}>
                <div className={styles.type}>exception</div>
                <div className={styles.data}>{event.detail.message}</div>
                <Tooltip
                  title={dayjs(event.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                >
                  <div className={styles.time}>
                    {dayjs(event.timestamp).format('HH:mm:ss')}
                  </div>
                </Tooltip>
              </div>
            </Timeline.Item>
          )}
        </Timeline>
      </Card>
    </div>
  )
}

export default Detail
