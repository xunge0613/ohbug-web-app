import React from 'react';
import { Tooltip, Tag } from 'antd';
import type { Event } from 'umi';
import dayjs from 'dayjs';

import Icon from '@/components/Icon';
import RelativeTime from '@/components/RelativeTime';
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
  event: Event<any>;
}
const Profile: React.FC<ProfileProps> = ({ event }) => {
  const tagsInfo = React.useMemo(() => getTagsInfoByTags(event?.tags), [event]);

  const tooltipTagsList = React.useMemo(
    () => [
      {
        key: 'time',
        title: `发生时间: ${dayjs(event.timestamp).format(`YYYY-MM-DD HH:mm:ss`)}`,
        value: <RelativeTime time={event.timestamp} />,
        icon: <Icon type="ohbug-time-line" />,
      },
      {
        key: 'uuid',
        title: `UUID: ${event.user.uuid}`,
        value: event.user.uuid,
        icon: <Icon type="ohbug-id-line" />,
      },
      {
        key: 'ip',
        title: `IP: ${event.user.ip_address}`,
        value: event.user.ip_address,
        icon: <Icon type="ohbug-ip-line" />,
      },
      {
        key: 'title',
        title: `标题: ${event.tags.title}`,
        value: event.tags.title,
        icon: <Icon type="ohbug-title-fill" />,
      },
      {
        key: 'url',
        title: `URL: ${event.tags.url}`,
        value: event.tags.url,
        icon: <Icon type="ohbug-links-line" />,
      },
      {
        key: 'language',
        title: `Language: ${event.tags.language}`,
        value: event.tags.language,
        icon: <Icon type="ohbug-global-line" />,
      },
    ],
    [event],
  );

  return (
    <div className={styles.root}>
      <div className={styles.progressBox}>
        {/* 浏览器 */}
        <ProgressCard
          icon={<Icon type="ohbug-chrome-line" style={{ fontSize: 20 }} />}
          title={tagsInfo?.browser?.name}
          description={tagsInfo?.browser?.version?.original}
        />
        {/* 系统 */}
        <ProgressCard
          icon={<Icon type="ohbug-apple-fill" style={{ fontSize: 20 }} />}
          title={tagsInfo?.os?.name}
          description={tagsInfo?.os?.version?.original}
        />
      </div>

      <div className={styles.tagsBox}>
        {tooltipTagsList.map((item) => (
          <TooltipTags key={item.key} title={item.title} value={item.value} icon={item.icon} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
