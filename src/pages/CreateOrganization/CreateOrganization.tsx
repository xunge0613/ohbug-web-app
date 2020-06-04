import React from 'react';
import { useDispatch } from 'umi';
import { Form, Input, Button, Divider } from 'antd';

import LoginTemplate from '@/components/LoginTemplate';
import styles from './CreateOrganization.less';

const CreateOrganization: React.FC = () => {
  const dispatch = useDispatch();

  const [verified, setVerified] = React.useState(false);

  const [form] = Form.useForm();

  const handleFinish = React.useCallback(
    (values) => {
      dispatch({ type: 'organization/create', payload: values });
      setVerified(true);
    },
    [dispatch, setVerified],
  );
  const handleFinishFailed = React.useCallback(() => {
    setVerified(false);
  }, [setVerified]);

  const handleInputChange = React.useCallback(
    (e) => {
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
    <LoginTemplate
      className={styles.root}
      title="创建团队"
      subTitle="您将能够组织一个团队，管理 OrganizationProject、Issue 和 团队成员等。"
      figure={require('@/static/images/create_organization_figure.svg')}
    >
      <Form
        className={styles.form}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        hideRequiredMark
      >
        <Form.Item
          label="团队名称"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入团队名称！',
            },
          ]}
        >
          <Input placeholder="例如：抓BUG小分队" onChange={handleInputChange} />
        </Form.Item>

        <Divider dashed />

        <Button className={styles.submit} htmlType="submit" disabled={!verified}>
          创建团队
        </Button>
      </Form>
    </LoginTemplate>
  );
};

export default CreateOrganization;
