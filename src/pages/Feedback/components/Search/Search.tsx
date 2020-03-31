import React from 'react';
import dayjs from 'dayjs';

import { useDispatch } from '@/hooks';
import DatePicker from '@/components/DatePicker';

import styles from './Search.less';

const Search: React.FC = () => {
  const dispatch = useDispatch();

  const handleDatePickerChange = React.useCallback((_, dateStrings) => {
    const start = dayjs(dateStrings[0]).toISOString();
    const end = dayjs(dateStrings[1]).toISOString();
    dispatch({
      type: 'feedback/searchFeedbacks',
      payload: { page: 0, start, end },
    });
  }, []); //eslint-disable-line

  return (
    <div className={styles.root}>
      <DatePicker.RangePicker
        showTime
        ranges={{
          '1小时': [dayjs().subtract(1, 'hour'), dayjs()],
          '1天': [dayjs().subtract(1, 'day'), dayjs().startOf('hour')],
          '7天': [dayjs().subtract(7, 'day'), dayjs().startOf('hour')],
          '30天': [dayjs().subtract(30, 'day'), dayjs().startOf('hour')],
        }}
        onChange={handleDatePickerChange}
      />
    </div>
  );
};

export default Search;
