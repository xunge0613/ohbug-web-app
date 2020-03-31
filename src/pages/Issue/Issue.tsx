import React from 'react';
import { Card, Table, Button, Typography } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { TableRowSelection } from 'antd/lib/table/interface';
import { Link } from 'umi';
import TimeAgo from 'react-timeago';

import { useDispatch, useSelector } from '@/hooks';
import BasicLayout from '@/layouts/Basic';
import Header from '@/components/Header';
import { RootState } from '@/store';
import { IssueState, Issue as IssueType } from '@/models';

import styles from './Issue.less';

interface IssueDashPageProps {
  children?: React.ReactNode;
}

// const switchItem = (type: string) => {
//   switch(type){
//     case 'uncaughtError':
//     case 'resourceError':
//     case 'unhandledrejectionError':
//     case 'ajaxError':
//     case 'fetchError':
//     case 'websocketError':
//     case 'unknownError':
//     case 'message':
//     default:
//       return;
//   }
// }

const Issue: React.FC<IssueDashPageProps> = () => {
  const dispatch = useDispatch();
  const issue = useSelector<RootState, IssueState['data']>(state => state.issue.data);
  const count = useSelector<RootState, IssueState['count']>(state => state.issue.count);

  React.useEffect(() => {
    dispatch({
      type: 'issue/searchIssues',
      payload: {
        page: 0,
      },
    });
  }, [dispatch]);

  const handleTablePaginationChange = React.useCallback(
    current => {
      dispatch({
        type: 'issue/searchIssues',
        payload: { page: current - 1 },
      });
    },
    [dispatch],
  );

  const loading = typeof issue === 'undefined';

  const rowSelection: TableRowSelection<IssueType> = {
    onChange: () => {},
    getCheckboxProps: () => ({}),
  };

  return (
    <BasicLayout className={styles.root} header={<Header title="Issue" />}>
      <Card bordered={false}>
        Count: {Array.isArray(issue) && issue.length}
        <Table<IssueType>
          className={styles.table}
          tableLayout="fixed"
          rowSelection={rowSelection}
          dataSource={issue}
          loading={loading}
          rowKey={(record): string => record.id.toString()}
          pagination={{
            onChange: handleTablePaginationChange,
            pageSize: 20,
            total: count,
          }}
        >
          <Table.Column<IssueType>
            ellipsis
            width={400}
            dataIndex="latest"
            title={<Button icon={<EllipsisOutlined />} />}
            render={(_, record: IssueType): React.ReactElement => (
              <div className={styles.desc}>
                {/* 获取此 issue 所对应的最新 event */}
                <Link to={`/event/latest?issue_id=${record.id}`}>
                  <Typography.Text className={styles.type} strong>
                    {record.type}
                  </Typography.Text>
                  {record.intro.filename && (
                    <Typography.Text type="secondary">{record.intro.filename}</Typography.Text>
                  )}
                </Link>
                <Typography.Paragraph className={styles.message} ellipsis>
                  {record.intro.message && (
                    <Typography.Text>{record.intro.message}</Typography.Text>
                  )}
                  {record.intro.selector && (
                    <Typography.Text>{record.intro.selector}</Typography.Text>
                  )}
                  {record.intro.url && (
                    <Typography.Text>{`${record.intro.method} ${record.intro.url}`}</Typography.Text>
                  )}
                </Typography.Paragraph>
              </div>
            )}
          />
          <Table.Column
            dataIndex="events"
            title="EVENTS"
            render={(text, record: IssueType): React.ReactElement => (
              <Link to={`/event?issue_id=${record.id}`}>{text}</Link>
            )}
          />
          <Table.Column dataIndex="users" title="USERS" />
          <Table.Column
            title="TIME"
            render={(_, record: IssueType): React.ReactElement => (
              <TimeAgo date={record.last_seen} />
            )}
          />
        </Table>
      </Card>
    </BasicLayout>
  );
};

export default Issue;
