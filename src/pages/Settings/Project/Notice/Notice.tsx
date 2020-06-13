import React from 'react';

import Zone from '@/components/Zone';

import styles from './Notice.less';

const Notice: React.FC = () => {
  return (
    <section className={styles.root}>
      <Zone title="项目基本信息" />
    </section>
  );
};

export default Notice;
