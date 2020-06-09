import React from 'react';
import { Typography, Row, Col, Form, Input, Button, Avatar } from 'antd';
import { useDispatch, useSelector } from 'umi';
import type { OrganizationModelState } from 'umi';

import { RootState } from '@/interfaces';
import UploadImage from '@/components/UploadImage';
import Icon from '@/components/Icon';

import styles from './Profile.less';

const Profile: React.FC = () => {
  const dispatch = useDispatch();

  const organization = useSelector<RootState, OrganizationModelState['current']>(
    (state) => state.organization.current,
  );

  const [form] = Form.useForm();
  const handleFinish = React.useCallback(
    (values) => {
      dispatch({ type: 'organization/update', payload: values });
    },
    [dispatch],
  );
  const handleCallback = React.useCallback((url) => {
    dispatch({
      type: 'organization/update',
      payload: {
        avatar: url,
      },
    });
  }, []);

  return (
    <div className={styles.root}>
      <Typography.Title level={3}>团队基本信息</Typography.Title>

      <Row gutter={16}>
        <Col span={10}>
          <Form layout="vertical" form={form} hideRequiredMark onFinish={handleFinish}>
            <Form.Item
              className={styles.formItem}
              name="name"
              label="团队名称"
              initialValue={organization?.name}
              rules={[
                {
                  required: true,
                  message: '请输入团队名称！',
                },
                {
                  max: 12,
                  message: '团队名称最大为12个字符',
                },
              ]}
            >
              <Input placeholder="例如：抓BUG小分队" maxLength={12} />
            </Form.Item>
            <Form.Item
              className={styles.formItem}
              name="introduction"
              label="团队简介"
              initialValue={organization?.introduction}
              rules={[
                {
                  max: 140,
                  message: '团队简介最大为140个字符',
                },
              ]}
            >
              <Input.TextArea placeholder="非必填项" maxLength={140} autoSize />
            </Form.Item>

            <Form.Item className={styles.formItem}>
              <Button type="primary" htmlType="submit">
                更新基本信息
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={14}>
          <UploadImage callback={handleCallback}>
            <Avatar className={styles.avatar} src={organization?.avatar} size={150} shape="square">
              {organization?.name?.[0]}
            </Avatar>
            <Icon className={styles.tips} type="icon-ohbug-upload-cloud-2-line" />
          </UploadImage>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
