import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface RelativeTimeProps {
  time: string | undefined;
}
const RelativeTime: React.FC<RelativeTimeProps> = ({ time }) => {
  return time ? <span>{dayjs(time).fromNow()}</span> : null;
};

export default RelativeTime;
