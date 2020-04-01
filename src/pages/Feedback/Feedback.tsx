import React from 'react';
import { PageHeader } from 'antd';

import BasicLayout from '@/layouts/Basic';
import Search from './components/Search';
import List from './components/List';

interface FeedbackPageProps {
  children?: React.ReactNode;
}

const Feedback: React.FC<FeedbackPageProps> = () => {
  return (
    <BasicLayout pageHeader={<PageHeader title="" ghost extra={<Search />} />}>
      <List />
    </BasicLayout>
  );
};

export default Feedback;
