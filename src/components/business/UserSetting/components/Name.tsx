import React from 'react';
import { Form, Input, Button } from 'antd';

import type { User } from '@/interfaces';

interface Props {
  user: User;
}
const Name: React.FC<Props> = ({ user }) => {
  const handleFinish = React.useCallback((values) => {
    // TODO
    // eslint-disable-next-line no-console
    console.log(values);
  }, []);

  return (
    <Form layout="vertical" hideRequiredMark onFinish={handleFinish}>
      <Form.Item
        label="昵称"
        name="name"
        rules={[
          { required: true, message: '请输入昵称！' },
          {
            max: 24,
            message: '昵称最多为24个字符！',
          },
        ]}
        hasFeedback
        initialValue={user.name}
      >
        <Input maxLength={24} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          确认修改
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Name;
