import React from 'react'
import { DatePicker } from 'antd'
import { useDispatch } from 'react-redux'
import moment from 'moment'

import styles from './Search.less'

const Search: React.FC = () => {
  const dispatch = useDispatch()

  const handleDatePickerChange = React.useCallback((_, dateStrings) => {
    const start = moment(dateStrings[0]).toISOString()
    const end = moment(dateStrings[1]).toISOString()
    dispatch({
      type: 'event/searchEvents',
      payload: { page: 0, start, end },
    })
  }, []) //eslint-disable-line

  return (
    <div className={styles.root}>
      <DatePicker.RangePicker
        showTime
        ranges={{
          '1小时': [moment().subtract(1, 'hours'), moment()],
          '1天': [moment().subtract(1, 'days'), moment().startOf('hour')],
          '7天': [moment().subtract(7, 'days'), moment().startOf('hour')],
          '30天': [moment().subtract(30, 'days'), moment().startOf('hour')],
        }}
        onChange={handleDatePickerChange}
      />
    </div>
  )
}

export default Search
