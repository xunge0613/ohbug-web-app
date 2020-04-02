import React from 'react';
import { Card, Table } from 'antd';
import Timeago from 'react-timeago';
import { history, useLocation } from 'umi';

import { useSelector, useDispatch, useMount } from '@/hooks';
import { RootState } from '@/store';
import { EventState, Event as EventType } from '@/models';

import styles from './List.less';

const List: React.FC = () => {
  const dispatch = useDispatch();
  const events = useSelector<RootState, EventState['data']>((state) => state.event.data);
  const count = useSelector<RootState, EventState['count']>((state) => state.event.count);
  const { query } = useLocation() as any;

  const eventsLoading = !events;

  const handleTablePaginationChange = React.useCallback(
    (current) => {
      dispatch({
        type: 'event/searchEvents',
        payload: { page: current - 1 },
      });
    },
    [dispatch],
  );

  useMount(() => {
    const { issue_id } = query;
    dispatch({
      type: 'event/searchEvents',
      payload: { page: 0, issue_id },
    });
  });

  return (
    <Card className={styles.root}>
      {events && (
        <Table<EventType<any>>
          className={styles.table}
          rowClassName={(): string => styles.row}
          dataSource={events}
          rowKey={(record): string => record.id}
          pagination={{
            onChange: handleTablePaginationChange,
            pageSize: 20,
            total: count,
          }}
          loading={eventsLoading}
          onRow={(record) => ({
            onClick: (): void => {
              history.push(`/event/${record.id}`);
            },
          })}
        >
          <Table.Column<EventType<any>> title="type" key="type" dataIndex="type" />
          <Table.Column<EventType<any>> title="message" dataIndex={['detail', 'message']} />
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
