import React from 'react';

import Zone from '@/components/Zone';

import styles from './Setting.less';

const Setting: React.FC = () => {
  return (
    <section className={styles.root}>
      <Zone title="通知设置" />
    </section>
  );
};

export default Setting;
