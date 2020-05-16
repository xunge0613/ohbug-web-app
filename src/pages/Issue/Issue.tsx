import React from 'react';
import { Alert, Card, Radio, Table, Typography } from 'antd';
import TimeAgo from 'react-timeago';
import type { TableRowSelection } from 'antd/lib/table/interface';
import { Link, useDispatch, useSelector } from 'umi';
import type { IssueModelState, Issue as IssueType } from 'umi';

import { useMount } from '@/hooks';
import BasicLayout from '@/layouts/Basic';
import type { RootState } from '@/interfaces';

import MiniChart from './components/MiniChart';

import styles from './Issue.less';

interface IssueDashPageProps {
  children?: React.ReactNode;
}

const Issue: React.FC<IssueDashPageProps> = () => {
  const dispatch = useDispatch();
  const issue = useSelector<RootState, IssueModelState['data']>((state) => state.issue.data);
  const count = useSelector<RootState, IssueModelState['count']>((state) => state.issue.count);
  const trend = useSelector<RootState, IssueModelState['trend']>((state) => state.issue.trend);

  useMount(() => {
    dispatch({
      type: 'issue/searchIssues',
      payload: {
        page: 0,
      },
    });
  });

  const handleTablePaginationChange = React.useCallback(
    (current) => {
      dispatch({
        type: 'issue/searchIssues',
        payload: { page: current - 1 },
      });
    },
    [dispatch],
  );

  const [trendValue, setTrendValue] = React.useState<'24h' | '14d'>('24h');
  const handleTrendChange = React.useCallback(
    (e) => {
      const period = e.target.value;
      setTrendValue(period);

      const ids = issue?.map((v) => v.id);
      dispatch({
        type: 'issue/getTrend',
        payload: { ids, period },
      });
    },
    [issue],
  );

  const loading = useSelector<RootState, boolean>(
    (state) => state.loading.effects['issue/searchIssues']!,
  );

  const rowSelection: TableRowSelection<IssueType> = {
    onChange: () => {},
    getCheckboxProps: () => ({}),
  };

  return (
    <BasicLayout className={styles.root}>
      <Card bordered={false}>
        {Array.isArray(issue) && (
          <Alert
            message={`合计 Issue 数：${issue.length}`}
            type="info"
            showIcon
            closeText="Close Now"
          />
        )}
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
            title="异常信息"
            render={(_, record: IssueType): React.ReactElement => (
              <div className={styles.desc}>
                {/* 获取此 issue 所对应的最新 event */}
                <Link to={`/event/latest?issue_id=${record.id}`}>
                  <Typography.Text className={styles.type} strong>
                    {record.type}
                  </Typography.Text>
                  {record.metadata.filename && (
                    <Typography.Text type="secondary">{record.metadata.filename}</Typography.Text>
                  )}
                </Link>
                <Typography.Paragraph className={styles.message} ellipsis>
                  {record.metadata.message && (
                    <Typography.Text>{record.metadata.message}</Typography.Text>
                  )}
                  {record.metadata.others && (
                    <Typography.Text>{record.metadata.others}</Typography.Text>
                  )}
                </Typography.Paragraph>
                <span>
                  <TimeAgo date={record.created_at} />
                  -
                  <TimeAgo date={record.updated_at} />
                </span>
              </div>
            )}
          />
          <Table.Column
            dataIndex="events_count"
            title="异常数"
            render={(text, record: IssueType): React.ReactElement => (
              <Link to={`/event?issue_id=${record.id}`}>{text}</Link>
            )}
          />
          <Table.Column dataIndex="users_count" title="影响用户数" />
          <Table.Column
            title={(): React.ReactElement => (
              <div>
                <span>趋势</span>
                <span style={{ marginLeft: 4 }}>
                  <Radio.Group
                    value={trendValue}
                    onChange={handleTrendChange}
                    size="small"
                    buttonStyle="solid"
                  >
                    <Radio.Button value="24h">当日</Radio.Button>
                    <Radio.Button value="14d">近两周</Radio.Button>
                  </Radio.Group>
                </span>
              </div>
            )}
            render={(_, record: IssueType) => {
              const data = trend?.find((v) => parseInt(v.issue_id, 10) === record.id)?.buckets;
              return <MiniChart data={data} trend={trendValue} />;
            }}
          />
        </Table>
      </Card>
    </BasicLayout>
  );
};

export default Issue;
