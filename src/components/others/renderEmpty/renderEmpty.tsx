import React from 'react';
import { Typography } from 'antd';

import { Image } from '@/components';

import styles from './renderEmpty.less';

const renderEmpty = () => (
  <div className={styles.root}>
    <Typography.Text type="secondary">没有数据啦</Typography.Text>
    <div className={styles.img}>
      <Image src={require('@/static/images/data_not_found.svg')} alt="Data Not Found" />
    </div>
  </div>
);

export default renderEmpty;
