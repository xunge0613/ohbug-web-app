import React from 'react';
import { PageHeader } from 'antd';

import BasicLayout from '../../layouts/Basic';
import Header from '../../components/Header';
import Search from './components/Search';
import List from './components/List';

interface FeedbackPageProps {
  children?: React.ReactNode;
}

const Feedback: React.FC<FeedbackPageProps> = () => {
  return (
    <BasicLayout
      header={<Header title="Feedback" />}
      pageHeader={<PageHeader title="" ghost extra={<Search />} />}
    >
      <List />
    </BasicLayout>
  );
};

export default Feedback;
