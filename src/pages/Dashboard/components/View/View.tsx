import React from 'react'
import { Statistic, Tooltip, Skeleton } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../store'

import styles from './View.less'
import moment from 'moment'

type Type = 'PV' | 'UV'
interface ViewProps {
  title: React.ReactNode
  type: Type
}

const View: React.FC<ViewProps> = ({ title, type }) => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    const start = moment()
      .subtract(1, 'days')
      .toISOString()
    const end = moment()
      .startOf('hour')
      .toISOString()
    dispatch({ type: `view/get${type}`, payload: { start, end } })
  }, [dispatch, type])

  const data = useSelector<RootState, number | undefined>(
    state => state.view[type],
  )
  const loading = typeof data === 'undefined'

  return (
    <div className={styles.root}>
      <Skeleton loading={loading}>
        <Statistic
          title={
            <div className={styles.title}>
              <span>今日 {title}</span>
              <Tooltip title={`当前 Project 下今日 ${title} 总数`}>
                <InfoCircleOutlined className={styles.icon} />
              </Tooltip>
            </div>
          }
          value={data}
          valueStyle={{ fontSize: 30 }}
        />
      </Skeleton>
    </div>
  )
}

export default View
