import React from 'react';
import { Row, Col, Card } from 'antd';

import BasicLayout from '@/layouts/Basic';
import Pie from './components/Pie';
import EventOrIssueStatistic from './components/EventOrIssueStatistic';
import View from './components/View';
import PerformanceStatistic from './components/PerformanceStatistic';

const Dashboard: React.FC = () => {
  return (
    <BasicLayout>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={6}>
          <Card>
            <EventOrIssueStatistic title="Event" type="event" />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <EventOrIssueStatistic title="Issue" type="issue" />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <View title="PV" type="PV" />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <View title="UV" type="UV" />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12}>
          <Pie title="Error 类型占比" type="type" />
        </Col>
        <Col xs={24} sm={12}>
          <Pie title="设备占比" type="device" />
        </Col>
        <Col xs={24} sm={12}>
          <Pie title="操作系统占比" type="os" />
        </Col>
        <Col xs={24} sm={12}>
          <Pie title="浏览器占比" type="browser" />
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col span={24}>
          <PerformanceStatistic />
        </Col>
      </Row>
    </BasicLayout>
  );
};

export default Dashboard;
