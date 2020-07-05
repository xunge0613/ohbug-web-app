import React from 'react';

import { UserBlock } from '@/components';

import styles from './headerRender.less';

function headerRender() {
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
