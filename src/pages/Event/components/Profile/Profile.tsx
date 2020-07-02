import React from 'react';
import { Skeleton, Tooltip, Tag } from 'antd';
import dayjs from 'dayjs';

import type { EventModelState } from '@/interfaces';
import { Icon, RelativeTime } from '@/components';
import { getTagsInfoByTags } from '@/utils';

import ProgressCard from '../ProgressCard';

import styles from './Profile.less';

interface TooltipTags {
  title: React.ReactChild;
  value: any;
  icon: React.ReactNode;
}
const TooltipTags: React.FC<TooltipTags> = ({ title, value, icon }) => (
  <Tooltip title={title}>
    <Tag icon={icon} color="default">
      {value}
    </Tag>
  </Tooltip>
);

interface ProfileProps {
  event: EventModelState['current'];
}
const Profile: React.FC<ProfileProps> = ({ event }) => {
  const tagsInfo = React.useMemo(() => getTagsInfoByTags(event?.tags), [event]);

  const tooltipTagsList = React.useMemo(
    () =>
      event
        ? [
            {
              key: 'time',
              title: `发生时间: ${dayjs(event.timestamp).format(`YYYY-MM-DD HH:mm:ss`)}`,
              value: <RelativeTime time={event.timestamp} />,
              icon: <Icon type="icon-ohbug-time-line" />,
            },
            {
              key: 'uuid',
              title: `UUID: ${event.user.uuid}`,
              value: event.user.uuid,
              icon: <Icon type="icon-ohbug-id-line" />,
            },
            {
              key: 'ip',
              title: `IP: ${event.user.ip_address}`,
              value: event.user.ip_address,
              icon: <Icon type="icon-ohbug-ip-line" />,
            },
            {
              key: 'title',
              title: `标题: ${event.tags.title}`,
              value: event.tags.title,
              icon: <Icon type="icon-ohbug-title-fill" />,
            },
            {
              key: 'url',
              title: `URL: ${event.tags.url}`,
              value: event.tags.url,
              icon: <Icon type="icon-ohbug-links-line" />,
            },
            {
              key: 'language',
              title: `Language: ${event.tags.language}`,
              value: event.tags.language,
              icon: <Icon type="icon-ohbug-global-line" />,
            },
          ]
        : [],
    [event],
  );

  const loading = !event;

  return (
    <div className={styles.root}>
      <div className={styles.progressBox}>
        <Skeleton loading={loading}>
          {/* 浏览器 */}
          <ProgressCard
            icon={<Icon type="icon-ohbug-chrome-line" style={{ fontSize: 20 }} />}
            title={tagsInfo?.browser?.name}
            description={tagsInfo?.browser?.version?.original}
          />
          {/* 系统 */}
          <ProgressCard
            icon={<Icon type="icon-ohbug-apple-fill" style={{ fontSize: 20 }} />}
            title={tagsInfo?.os?.name}
            description={tagsInfo?.os?.version?.original}
          />
        </Skeleton>
      </div>

      <div className={styles.tagsBox}>
        <Skeleton loading={loading}>
          {tooltipTagsList.map((item) => (
            <TooltipTags key={item.key} title={item.title} value={item.value} icon={item.icon} />
          ))}
        </Skeleton>
      </div>
    </div>
  );
};

export default Profile;
