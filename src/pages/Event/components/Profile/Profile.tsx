import React from 'react';
import { Skeleton, Tooltip, Tag } from 'antd';
import dayjs from 'dayjs';

import type { EventModelState } from '@/interfaces';
import { Icon, RelativeTime } from '@/components';
import { getDeviceInfo } from '@/utils';

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
  const deviceInfo = React.useMemo(() => getDeviceInfo(event?.device), [event]);

  const tooltipTagsList = React.useMemo(() => {
    const result = [];
    if (event?.timestamp) {
      result.push({
        key: 'time',
        title: `发生时间: ${dayjs(event.timestamp).format(`YYYY-MM-DD HH:mm:ss`)}`,
        value: <RelativeTime time={event.timestamp} />,
        icon: <Icon type="icon-ohbug-time-line" />,
      });
    }
    if (event?.user?.uuid) {
      result.push({
        key: 'uuid',
        title: `UUID: ${event?.user?.uuid}`,
        value: event?.user?.uuid,
        icon: <Icon type="icon-ohbug-id-line" />,
      });
    }
    if (event?.user?.ip_address) {
      result.push({
        key: 'ip',
        title: `IP: ${event?.user?.ip_address}`,
        value: event?.user?.ip_address,
        icon: <Icon type="icon-ohbug-ip-line" />,
      });
    }
    if (event?.device?.title) {
      result.push({
        key: 'title',
        title: `标题: ${event.device.title}`,
        value: event.device.title,
        icon: <Icon type="icon-ohbug-title-fill" />,
      });
    }
    if (event?.device?.url) {
      result.push({
        key: 'url',
        title: `URL: ${event.device.url}`,
        value: event.device.url,
        icon: <Icon type="icon-ohbug-links-line" />,
      });
    }
    if (event?.device?.language) {
      result.push({
        key: 'language',
        title: `Language: ${event.device.language}`,
        value: event.device.language,
        icon: <Icon type="icon-ohbug-global-line" />,
      });
    }
    if (event?.releaseStage) {
      result.push({
        key: 'releaseStage',
        title: `ReleaseStage: ${event.releaseStage}`,
        value: event.releaseStage,
        icon: <Icon type="icon-ohbug-leaf-line" />,
      });
    }

    return result;
  }, [event]);

  const loading = !event;

  return (
    <div className={styles.root}>
      <div className={styles.progressBox}>
        <Skeleton loading={loading}>
          {/* 浏览器 */}
          <ProgressCard
            title={deviceInfo?.browser?.name}
            description={deviceInfo?.browser?.version?.original}
          />
          {/* 系统 */}
          <ProgressCard
            title={deviceInfo?.os?.name}
            description={deviceInfo?.os?.version?.original}
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
