import React from 'react'
import { Row, Col, Skeleton, Typography, Card, Statistic } from 'antd'
// import clsx from 'clsx';

import type { EventModelState, IssueModelState } from '@/interfaces'
import { Image } from '@/components'

import styles from './Title.less'

// interface TrendProps {
//   data: number;
// }
// const Trend: React.FC<TrendProps> = ({ data }) => {
//   const type = data <= 0 ? 'down' : 'up';
//   const classes = clsx(styles.trend, {
//     [styles.up]: type === 'up',
//     [styles.down]: type === 'down',
//   });
//   const value = `${type === 'up' ? '+' : ''}${data * 100}%`;
//   return <div className={classes}>{value}</div>;
// };

interface TitleProps {
  event: EventModelState['current']
  issue: IssueModelState['current']
}
const Title: React.FC<TitleProps> = ({ event, issue }) => {
  const leftLoading = !event
  const rightLoading = !issue
  return (
    <Row className={styles.root} gutter={24}>
      <Col className={styles.left} xs={24} sm={24} md={18}>
        <Skeleton loading={leftLoading}>
          <Typography className={styles.content}>
            <Typography.Title>{event?.type}</Typography.Title>
            {event?.detail?.message && (
              <Typography.Text ellipsis strong style={{ fontSize: 16 }}>
                {event.detail.message}
              </Typography.Text>
            )}
            {event?.detail?.filename && (
              <Typography.Paragraph ellipsis strong style={{ fontSize: 16 }}>
                {event.detail.filename}
              </Typography.Paragraph>
            )}
          </Typography>
          <Image
            className={styles.figure}
            src={require('@/static/images/issue_title_figure.png')}
            alt="issue_title_figure"
          />
        </Skeleton>
      </Col>

      <Col className={styles.right} xs={24} sm={24} md={6}>
        <Skeleton loading={rightLoading}>
          <Card size="small" style={{ width: '100%' }}>
            <div className={styles.countCard}>
              <Statistic title="EVENTS" value={issue?.eventsCount} />
              {/* <Trend data={0.15} /> */}
            </div>
          </Card>
        </Skeleton>
        <Skeleton loading={rightLoading}>
          <Card size="small" style={{ width: '100%' }}>
            <div className={styles.countCard}>
              <Statistic title="USERS" value={issue?.usersCount} />
              {/* <Trend data={-0.04} /> */}
            </div>
          </Card>
        </Skeleton>
      </Col>
    </Row>
  )
}

export default Title
