import React from 'react';
import { Card, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Timeago from 'react-timeago';
import { useLocation } from 'umi';

import { RootState } from '@/store';
import { FeedbackState, Event as EventType } from '@/models';

import styles from './List.less';

const List: React.FC = () => {
  const dispatch = useDispatch();
  const feedbacks = useSelector<RootState, FeedbackState['data']>(state => state.feedback.data);
  const count = useSelector<RootState, FeedbackState['count']>(state => state.feedback.count);
  const { query } = useLocation() as any;

  const feedbacksLoading = !feedbacks;

  const handleTablePaginationChange = React.useCallback(
    current => {
      dispatch({
        type: 'feedback/searchFeedbacks',
        payload: { page: current - 1 },
      });
    },
    [dispatch],
  );

  React.useEffect(() => {
    const { issue_id } = query;
    dispatch({
      type: 'feedback/searchFeedbacks',
      payload: { page: 0, issue_id },
    });
  }, []); // eslint-disable-line

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
          loading={feedbacksLoading}
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
