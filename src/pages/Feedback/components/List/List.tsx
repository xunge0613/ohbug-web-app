import React from 'react'
import { Card, Table } from 'antd'
import { useLocation, useSelector, useDispatch } from 'umi'

import { useMount } from '@/hooks'
import type { RootState, Event, FeedbackModelState } from '@/interfaces'
import { RelativeTime } from '@/components'

import styles from './List.less'

const List: React.FC = () => {
  const dispatch = useDispatch()
  const feedbacks = useSelector<RootState, FeedbackModelState['data']>(
    (state) => state.feedback.data
  )
  const count = useSelector<RootState, FeedbackModelState['count']>(
    (state) => state.feedback.count
  )
  const { query } = useLocation() as any

  const loading = useSelector<RootState, boolean>(
    (state) => state.loading.effects['feedback/searchFeedbacks']!
  )

  const handleTablePaginationChange = React.useCallback(
    (current) => {
      dispatch({
        type: 'feedback/searchFeedbacks',
        payload: { page: current - 1 },
      })
    },
    [dispatch]
  )

  useMount(() => {
    const { issue_id } = query
    dispatch({
      type: 'feedback/searchFeedbacks',
      payload: { page: 0, issue_id },
    })
  })

  return (
    <Card className={styles.root}>
      {feedbacks && (
        <Table<Event<any>>
          className={styles.table}
          dataSource={feedbacks}
          rowKey={(record): string => record.timestamp}
          pagination={{
            onChange: handleTablePaginationChange,
            pageSize: 20,
            total: count,
          }}
          loading={loading}
        >
          <Table.Column<Event<any>>
            title="name"
            dataIndex={['detail', 'name']}
          />
          <Table.Column<Event<any>>
            title="email"
            dataIndex={['detail', 'email']}
          />
          <Table.Column<Event<any>>
            title="comments"
            dataIndex={['detail', 'comments']}
          />
          <Table.Column<Event<any>>
            title="time"
            key="time"
            render={(item): React.ReactNode => (
              <RelativeTime time={item.time} />
            )}
          />
          <Table.Column<Event<any>>
            title="user"
            dataIndex={['user', 'ip_address']}
          />
          <Table.Column<Event<any>> title="platform" dataIndex="platform" />
          <Table.Column<Event<any>> title="language" dataIndex="language" />
        </Table>
      )}
    </Card>
  )
}

export default List
