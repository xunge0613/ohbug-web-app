import React from 'react'
import { Input } from 'antd'
import { types } from '@ohbug/browser'

import styles from './Search.less'

const SEARCH_OPTIONS = [
  {
    value: 'type',
    label: '问题类型',
    children: Object.keys(types),
  },
  {
    value: 'ip',
    label: 'IP',
    children: [],
  },
  {
    value: 'url',
    label: 'URL',
    children: [],
  },
  {
    value: 'browser',
    label: '浏览器',
    children: [],
  },
  {
    value: 'os',
    label: '操作系统',
    children: [],
  },
  {
    value: 'device',
    label: '设备',
    children: [],
  },
]

interface SearchProps {}
const Search: React.FC<SearchProps> = () => {
  const handleSearch = React.useCallback((value) => {
    // eslint-disable-next-line no-console
    console.log(SEARCH_OPTIONS, value)
  }, [])

  return (
    <Input.Search
      className={styles.root}
      enterButton
      placeholder="输入 $ 搜索"
      onSearch={handleSearch}
    />
  )
}

export default Search
