import React from 'react';
import { Form, Input, Row, Col, Button } from 'antd';
import { MobileOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'umi';

import { useUpdateEffect } from '@umijs/hooks';
import styles from './MobileLoginForm.less';

const COUNTDOWN = 90;

interface MobileLoginFormFormProps {
  // 倒计时时间
  countDown?: number;
}

const MobileLoginForm: React.FC<MobileLoginFormFormProps> = ({ countDown = COUNTDOWN }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [checkCaptcha, setCheckCaptcha] = React.useState<boolean>(false);
  useUpdateEffect(() => {
    if (checkCaptcha) {
      form.validateFields(['captcha']);
    }
  }, [checkCaptcha]);

  const [count, setCount] = React.useState<number>(countDown);
  const [timing, setTiming] = React.useState<boolean>(false);
  useUpdateEffect(() => {
    let interval: number = 0;
    if (timing) {
      interval = window.setInterval(() => {
        setCount((preSecond) => {
          if (preSecond <= 1) {
            setTiming(false);
            clearInterval(interval);
            // 重置秒数
            return countDown;
          }
          return preSecond - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing]);

  // 发送获取验证码的请求，然后开始倒计时
  const handleGetCaptcha = React.useCallback(async () => {
    const { mobile } = await form.validateFields(['mobile']);
    if (mobile) {
      dispatch({
        type: 'auth/captcha',
        payload: {
          mobile,
        },
      });
      // 开始倒计时
      setTiming(true);
    }
  }, []);

  const handleFinish = React.useCallback((values) => {
    setCheckCaptcha(true);

    dispatch({
      type: 'auth/signup',
      payload: {
        mobile: values.mobile,
        captcha: parseInt(values.captcha, 10),
      },
    });
  }, []);

  return (
    <Form className={styles.root} form={form} onFinish={handleFinish}>
      <Form.Item name="mobile" rules={[{ required: true, message: '请输入手机号码' }]}>
        <Input
          prefix={<MobileOutlined className={styles.inputPrefixIcon} />}
          size="large"
          placeholder="请输入手机号码"
        />
      </Form.Item>
      <Form.Item>
        <Row gutter={8}>
          <Col span={16}>
            <Form.Item name="captcha" rules={[{ required: checkCaptcha, message: '请输入验证码' }]}>
              <Input
                prefix={<LockOutlined className={styles.inputPrefixIcon} />}
                size="large"
                placeholder="请输入验证码"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Button size="large" block disabled={timing} onClick={handleGetCaptcha}>
              {timing ? `${count} 秒` : '获取验证码'}
            </Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MobileLoginForm;
