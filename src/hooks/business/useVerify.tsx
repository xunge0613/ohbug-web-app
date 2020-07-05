import React from 'react';
import { Form, Input, Button } from 'antd';

import { useBoolean } from '@/hooks';

export function useVerify() {
  const [verified, { setTrue, setFalse }] = useBoolean(false);
  const dom = React.useMemo(() => {
    function handleFinish(values: any) {
      // TODO
      if (values) {
        setTrue();
      } else {
        setFalse();
      }
    }
    return (
      <Form layout="vertical" hideRequiredMark onFinish={handleFinish}>
        <Form.Item label="登录密码验证">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" block>
            验证
          </Button>
        </Form.Item>
      </Form>
    );
  }, []);
  return {
    verified,
    dom,
  };
}
