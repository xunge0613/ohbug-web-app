import React from 'react';
import { PageHeader } from 'antd';

import BasicLayout from '@/layouts/Basic';
import Search from './components/Search';
import List from './components/List';

const Event: React.FC = () => {
  return (
    <BasicLayout pageHeader={<PageHeader title="" ghost extra={<Search />} />}>
      <List />
    </BasicLayout>
  );
};

export default Event;
