import React from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'umi';
import type { AuthModelState } from 'umi';

import { useUpdateEffect } from '@/hooks';
import { RootState } from '@/interfaces';
import { Icon } from '@/components';

import styles from './MobileLoginForm.less';

const COUNTDOWN = 90;

type FormType = 'login' | 'bindUser';
interface MobileLoginFormFormProps {
  // 倒计时时间
  countDown?: number;
  type: FormType;
}

const MobileLoginForm: React.FC<MobileLoginFormFormProps> = ({ countDown = COUNTDOWN, type }) => {
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

  const oauth = useSelector<RootState, AuthModelState['oauth']>((state) => state.auth.oauth);
  const handleFinish = React.useCallback((values) => {
    setCheckCaptcha(true);

    const payload = {
      ...values,
      captcha: values.captcha,
    };
    if (oauth) {
      payload.oauthType = oauth.oauthType;
      payload.oauthUserDetail = oauth.oauthUserDetail;
    }

    dispatch({
      type: `auth/${type}`,
      payload,
    });

    setTiming(false);
    setCount(countDown);
  }, []);

  const SubmitButtonText = React.useMemo(() => {
    switch (type) {
      case 'login':
        return '登录';
      case 'bindUser':
        return '绑定用户';
      default:
        return '';
    }
  }, [type]);

  return (
    <Form className={styles.root} form={form} onFinish={handleFinish}>
      <Form.Item
        name="mobile"
        rules={[
          { required: true, message: '请输入手机号码' },
          {
            validator(rule, value) {
              if (!value || /^1[3456789]\d{9}$/.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('手机号格式不合法'));
            },
          },
        ]}
      >
        <Input
          prefix={<Icon className={styles.inputPrefixIcon} type="icon-ohbug-smartphone-line" />}
          size="large"
          placeholder="请输入手机号码"
        />
      </Form.Item>
      <Form.Item
        name="captcha"
        rules={[
          { required: checkCaptcha, message: '请输入验证码' },
          {
            transform: (value) => parseInt(value, 10),
            validator(rule, value) {
              // 验证 6 位数字
              if (!value || /^\d{6}$/.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('验证码格式不合法'));
            },
          },
        ]}
      >
        <Input
          prefix={<Icon className={styles.inputPrefixIcon} type="icon-ohbug-lock-line" />}
          size="large"
          placeholder="请输入验证码"
          suffix={
            <Button disabled={timing} onClick={handleGetCaptcha} type="link" size="small">
              {timing ? `${count} 秒` : '获取验证码'}
            </Button>
          }
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          {SubmitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MobileLoginForm;
