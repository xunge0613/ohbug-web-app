import React from 'react';
import { Statistic, Tooltip, Skeleton } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector, AnalysisModelState } from 'umi';

import { RootState } from '@/interfaces';

import styles from './EventOrIssueStatistic.less';

type Type = 'event' | 'issue';
interface EventOrIssueStatisticProps {
  title: React.ReactNode;
  type: Type;
}

const EventOrIssueStatistic: React.FC<EventOrIssueStatisticProps> = ({ title, type }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: 'analysis/getEventOrIssueStatistics', payload: { type } });
  }, [dispatch, type]);

  const data = useSelector<RootState, AnalysisModelState['event']>((state) => state.analysis[type]);
  const loading = typeof data === 'undefined';

  return (
    <div className={styles.root}>
      <Skeleton loading={loading}>
        <Statistic
          title={
            <div className={styles.title}>
              <span>今日 {title} 数</span>
              <Tooltip title={`当前 Project 下今日 ${title} 总数`}>
                <InfoCircleOutlined className={styles.icon} />
              </Tooltip>
            </div>
          }
          value={data}
          valueStyle={{ fontSize: 30 }}
        />
      </Skeleton>
    </div>
  );
};

export default EventOrIssueStatistic;
