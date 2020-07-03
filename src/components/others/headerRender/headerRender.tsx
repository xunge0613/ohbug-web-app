import React from 'react';
import type { BasicLayoutProps } from '@ant-design/pro-layout/lib/BasicLayout';

import { UserBlock } from '@/components';

import styles from './headerRender.less';

function headerRender(props: BasicLayoutProps) {
  console.log(props);
  return (
    <header className={styles.root}>
      <div className={styles.left} />
      <div className={styles.right}>
        <UserBlock />
      </div>
    </header>
  );
}

export default headerRender;
