import React from 'react';
import { Card, Table } from 'antd';
import Timeago from 'react-timeago';
import { useLocation, useSelector, useDispatch, Event as EventType, FeedbackModelState } from 'umi';

import { useMount } from '@/hooks';
import { RootState } from '@/interfaces';

import styles from './List.less';

const List: React.FC = () => {
  const dispatch = useDispatch();
  const feedbacks = useSelector<RootState, FeedbackModelState['data']>(
    (state) => state.feedback.data,
  );
  const count = useSelector<RootState, FeedbackModelState['count']>(
    (state) => state.feedback.count,
  );
  const { query } = useLocation() as any;

  const loading = useSelector<RootState, boolean>(
    (state) => state.loading.effects['feedback/searchFeedbacks']!,
  );

  const handleTablePaginationChange = React.useCallback(
    (current) => {
      dispatch({
        type: 'feedback/searchFeedbacks',
        payload: { page: current - 1 },
      });
    },
    [dispatch],
  );

  useMount(() => {
    const { issue_id } = query;
    dispatch({
      type: 'feedback/searchFeedbacks',
      payload: { page: 0, issue_id },
    });
  });

  return (
    <Card className={styles.root}>
      {feedbacks && (
        <Table<EventType<any>>
          className={styles.table}
          dataSource={feedbacks}
          rowKey={(record): string => record.id}
          pagination={{
            onChange: handleTablePaginationChange,
            pageSize: 20,
            total: count,
          }}
          loading={loading}
        >
          <Table.Column<EventType<any>> title="name" dataIndex={['detail', 'name']} />
          <Table.Column<EventType<any>> title="email" dataIndex={['detail', 'email']} />
          <Table.Column<EventType<any>> title="comments" dataIndex={['detail', 'comments']} />
          <Table.Column<EventType<any>>
            title="time"
            key="time"
            render={(item): React.ReactElement => <Timeago date={item.time} />}
          />
          <Table.Column<EventType<any>> title="user" dataIndex={['user', 'ip_address']} />
          <Table.Column<EventType<any>> title="platform" dataIndex="platform" />
          <Table.Column<EventType<any>> title="language" dataIndex="language" />
        </Table>
      )}
    </Card>
  );
};

export default List;
