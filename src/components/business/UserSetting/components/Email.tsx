import React from 'react';
import { Form, Input, Button } from 'antd';

import type { User } from '@/interfaces';
import { useRequest, useVerify } from '@/hooks';
import api from '@/api';

interface Props {
  user: User;
}
const Email: React.FC<Props> = ({ user }) => {
  const { verified, dom } = useVerify();
  const { run } = useRequest(api.user.update, { manual: true });
  const handleFinish = React.useCallback(async (values) => {
    if (values) {
      const result = await run({ id: user.id, ...values });
      if (result) {
        window.location.reload();
      }
    }
  }, []);

  return verified ? (
    <Form layout="vertical" hideRequiredMark onFinish={handleFinish}>
      <Form.Item label="原邮箱">
        <span>{user.email}</span>
      </Form.Item>
      <Form.Item
        label="新邮箱"
        name="email"
        rules={[
          { required: true, message: '请输入邮箱！' },
          {
            validator(rule, value) {
              if (
                !value ||
                /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/.test(value)
              ) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('手机号格式不合法'));
            },
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="再次输入邮箱"
        name="confirm"
        dependencies={['email']}
        rules={[
          { required: true, message: '请输入邮箱！' },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('email') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('您输入的两个邮箱不匹配！'));
            },
          }),
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary">
          确认修改
        </Button>
      </Form.Item>
    </Form>
  ) : (
    dom
  );
};

export default Email;
