import React from 'react'
import { Spin } from 'antd'

import styles from './Loading.less'

const Loading: React.FC = () => {
  return (
    <div className={styles.root}>
      <Spin />
    </div>
  )
}

export default Loading
