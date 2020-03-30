import React from 'react'

import BasicLayout from '../../layouts/Basic'
import Header from '../../components/Header'
import Search from './components/Search'
import List from './components/List'
import { PageHeader } from 'antd'

interface EventPageProps {
  children?: React.ReactNode
}

const Event: React.FC<EventPageProps> = () => {
  return (
    <BasicLayout
      header={<Header title="Event" />}
      pageHeader={<PageHeader title="" ghost={true} extra={<Search />} />}
    >
      <List />
    </BasicLayout>
  )
}

export default Event
