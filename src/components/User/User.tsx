import React from 'react';
import { Popover, Avatar } from 'antd';
import type { User } from 'umi';
import dayjs from 'dayjs';

import styles from './User.less';

interface UserProps {
  data: User;
}
const UserComponent: React.FC<UserProps> = ({ data }) => {
  const content = React.useMemo(() => {
    return (
      <div className={styles.userContent}>
        <div className={styles.info}>
          <div className={styles.name}>{data.name}</div>
          <div className={styles.time}>{dayjs(data.createdAt).fromNow()}加入</div>
        </div>
        <Avatar className={styles.avatar} src={data.avatar} size="large">
          {data.name?.[0]}
        </Avatar>
      </div>
    );
  }, [data]);

  return (
    <Popover content={content} trigger="hover">
      <Avatar className={styles.root} src={data.avatar}>
        {data.name?.[0]}
      </Avatar>
    </Popover>
  );
};

export default UserComponent;
