import React from 'react';
import { Link } from 'umi';
import { Card, Typography, Form, Input, Button, Divider } from 'antd';

import { useDispatch } from '@/hooks';
import Logout from '@/components/Logout';
import BasicLayout from '@/layouts/Basic';

import styles from './CreateOrganization.less';

const CreateOrganization: React.FC = () => {
  const dispatch = useDispatch();

  const [verified, setVerified] = React.useState(false);

  const [form] = Form.useForm();

  const handleFinish = React.useCallback(
    values => {
      dispatch({ type: 'organization/create', payload: values });
      setVerified(true);
    },
    [dispatch, setVerified],
  );
  const handleFinishFailed = React.useCallback(() => {
    setVerified(false);
  }, [setVerified]);

  const handleInputChange = React.useCallback(
    e => {
      form.setFieldsValue({
        name: e.target.value,
      });
      form
        .validateFields()
        .then(() => {
          setVerified(true);
        })
        .catch(() => {
          setVerified(false);
        });
    },
    [form],
  );

  return (
    <BasicLayout>
      <Card className={styles.root} title={<Link to="/">LOGO</Link>} extra={<Logout />}>
        <Typography.Title level={3}>创建 Organization</Typography.Title>
        <Typography.Paragraph>
          <Typography.Text code>Organization</Typography.Text>
          是层级体系内最高的层级。 您将能够组织一个团队，管理
          <Typography.Text code>Project</Typography.Text>
          <Typography.Text code>Issue</Typography.Text> 和 团队成员等。
        </Typography.Paragraph>

        <Form onFinish={handleFinish} onFinishFailed={handleFinishFailed} hideRequiredMark>
          <Form.Item
            label="Organization Name"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入 Organization Name！',
              },
            ]}
          >
            <Input placeholder="例如：公司" onChange={handleInputChange} />
          </Form.Item>

          <Divider dashed />

          <Button className={styles.submit} htmlType="submit" disabled={!verified}>
            创建 Organization
          </Button>
        </Form>
      </Card>
    </BasicLayout>
  );
};

export default CreateOrganization;
