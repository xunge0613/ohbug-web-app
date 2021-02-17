import React from 'react'
import { Card, Typography } from 'antd'
import { useDispatch, useSelector } from 'umi'
import dayjs from 'dayjs'

import type { RootState, IssueModelState } from '@/interfaces'
import { MiniChart } from '@/components'

import HoverCard from '../HoverCard'

import styles from './Trend.less'

interface TrendProps {
  issue: IssueModelState['current']
}
const Trend: React.FC<TrendProps> = ({ issue }) => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (issue) {
      const ids = [issue.id]
      dispatch({
        type: 'issue/getCurrentTrend',
        payload: { ids, period: 'all' },
      })
    }
  }, [issue])

  const trend = useSelector<RootState, IssueModelState['trend']>(
    (state) => state.issue.trend
  )
  const loading = useSelector<RootState, boolean>(
    (state) => state.loading.effects['issue/getCurrentTrend']!
  )
  const data_14d = React.useMemo(() => trend?.current?.['14d']?.buckets, [
    trend,
  ])
  const data_24h = React.useMemo(() => trend?.current?.['24h']?.buckets, [
    trend,
  ])

  return (
    <div className={styles.root}>
      <Card className={styles.card} loading={loading}>
        {data_14d && <MiniChart data={data_14d} trend="14d" title="过去14天" />}
      </Card>
      <Card className={styles.card} loading={loading}>
        {data_24h && (
          <MiniChart data={data_24h} trend="24h" title="过去24小时" />
        )}
      </Card>

      <HoverCard className={styles.card}>
        <p>
          <Typography.Text strong>首次发生</Typography.Text>
        </p>
        <div>
          <Typography.Text>{dayjs(issue?.createdAt).fromNow()}</Typography.Text>
        </div>
        <div>
          <Typography.Text>
            {dayjs(issue?.createdAt).format(`YYYY-MM-DD HH:mm:ss A`)}
          </Typography.Text>
        </div>
      </HoverCard>
      <HoverCard className={styles.card}>
        <p>
          <Typography.Text strong>最近发生</Typography.Text>
        </p>
        <div>
          <Typography.Text>{dayjs(issue?.updatedAt).fromNow()}</Typography.Text>
        </div>
        <div>
          <Typography.Text>
            {dayjs(issue?.updatedAt).format(`YYYY-MM-DD HH:mm:ss A`)}
          </Typography.Text>
        </div>
      </HoverCard>
    </div>
  )
}

export default Trend
