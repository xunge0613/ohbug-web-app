import React from 'react'

import { UserBlock } from '@/components'

import styles from './rightContentRender.less'

function RightContentRender(): React.ReactElement {
  return (
    <div className={styles.root}>
      <UserBlock />
    </div>
  )
}

export default RightContentRender
