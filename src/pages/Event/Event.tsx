import React from 'react';
import { useDispatch, useLocation, useParams, useSelector } from 'umi';
import type { EventModelState } from 'umi';
import { Spin, Tag, Tooltip } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { useMount } from '@/hooks';
import BasicLayout from '@/layouts/Basic';
import type { RootState } from '@/interfaces';
import { getTagsInfoByTags } from '@/utils';

import RelativeTime from '@/components/RelativeTime';

import Title from './components/Title';
import ProgressCard from './components/ProgressCard';
// import Description from './components/Description';

import styles from './Event.less';

const Event: React.FC = () => {
  const dispatch = useDispatch();
  const { query } = useLocation() as any;
  const { target } = useParams();

  useMount(() => {
    const { issue_id } = query;

    if (target === 'latest' && issue_id) {
      dispatch({ type: 'event/getLatestEvent', payload: { issue_id } });
    } else {
      dispatch({
        type: 'event/get',
        payload: {
          event_id: target,
        },
      });
    }
  });

  const event = useSelector<RootState, EventModelState['current']>((state) => state.event.current);
  const loading = useSelector<RootState, boolean>(
    (state) => state.loading.effects['event/getLatestEvent']!,
  );
  const tagsInfo = React.useMemo(() => getTagsInfoByTags(event?.tags), [event]);

  return (
    <BasicLayout className={styles.root}>
      <Spin spinning={loading} delay={500}>
        {event && (
          <>
            <Title event={event} />
            {/* 概要信息 */}
            <div className={styles.profile}>
              <div className={styles.progressBox}>
                {/* 浏览器 */}
                <ProgressCard
                  icon={1}
                  title={tagsInfo?.browser?.name}
                  description={tagsInfo?.browser?.version?.original}
                  percent={50}
                />
                {/* 系统 */}
                <ProgressCard
                  icon={2}
                  title={tagsInfo?.os?.name}
                  description={tagsInfo?.os?.version?.original}
                  percent={60}
                />
              </div>
              <div className={styles.tagsBox}>
                {/* 时间 */}
                <Tooltip title={dayjs(event.timestamp).format(`YYYY-MM-DD HH:mm:ss`)}>
                  <Tag icon={<ClockCircleOutlined />} color="default">
                    <RelativeTime time={event.timestamp} />
                  </Tag>
                </Tooltip>
                {/* 标题 */}
                <Tag icon={<ClockCircleOutlined />} color="default">
                  {event.tags.title}
                </Tag>
                {/* UUID */}
                <Tag icon={<ClockCircleOutlined />} color="default">
                  UUID: {event.user.uuid}
                </Tag>
                {/* IP */}
                <Tag icon={<ClockCircleOutlined />} color="default">
                  IP: {event.user.ip_address}
                </Tag>
                {/* URL */}
                <Tag icon={<ClockCircleOutlined />} color="default">
                  URL: {event.tags.url}
                </Tag>
                {/* 语言 */}
                <Tag icon={<ClockCircleOutlined />} color="default">
                  language: {event.tags.language}
                </Tag>
              </div>
            </div>

            {/* <Description /> */}
          </>
        )}
      </Spin>
    </BasicLayout>
  );
};

export default Event;
