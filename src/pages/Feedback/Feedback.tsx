import React from 'react'

import BasicLayout from '../../layouts/Basic'
import Header from '../../components/Header'
import Search from './components/Search'
import List from './components/List'
import { PageHeader } from 'antd'

interface FeedbackPageProps {
  children?: React.ReactNode
}

const Feedback: React.FC<FeedbackPageProps> = () => {
  return (
    <BasicLayout
      header={<Header title="Feedback" />}
      pageHeader={<PageHeader title="" ghost={true} extra={<Search />} />}
    >
      <List />
    </BasicLayout>
  )
}

export default Feedback
