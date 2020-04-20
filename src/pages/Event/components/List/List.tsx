import React from 'react';
import { Card, Table } from 'antd';
import Timeago from 'react-timeago';
import { history, useLocation, useSelector, useDispatch } from 'umi';
import type { EventModelState, Event } from 'umi';

import { useMount } from '@/hooks';
import type { RootState } from '@/interfaces';

import styles from './List.less';

const List: React.FC = () => {
  const dispatch = useDispatch();
  const events = useSelector<RootState, EventModelState['data']>((state) => state.event.data);
  const count = useSelector<RootState, EventModelState['count']>((state) => state.event.count);
  const { query } = useLocation() as any;

  const loading = useSelector<RootState, boolean>(
    (state) => state.loading.effects['event/searchEvents']!,
  );

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
        <Table<Event<any>>
          className={styles.table}
          rowClassName={(): string => styles.row}
          dataSource={events}
          rowKey={(record): string => record.id}
          pagination={{
            onChange: handleTablePaginationChange,
            pageSize: 20,
            total: count,
          }}
          loading={loading}
          onRow={(record) => ({
            onClick: (): void => {
              history.push(`/event/${record.id}`);
            },
          })}
        >
          <Table.Column<Event<any>> title="type" key="type" dataIndex="type" />
          <Table.Column<Event<any>> title="message" dataIndex={['detail', 'message']} />
          <Table.Column<Event<any>>
            title="time"
            key="time"
            render={(item): React.ReactElement => <Timeago date={item.time} />}
          />
          <Table.Column<Event<any>> title="user" dataIndex={['user', 'ip_address']} />
          <Table.Column<Event<any>> title="platform" dataIndex="platform" />
          <Table.Column<Event<any>> title="language" dataIndex="language" />
        </Table>
      )}
    </Card>
  );
};

export default List;
