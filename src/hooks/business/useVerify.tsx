import React from 'react';
import { Form, Alert, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'umi';

import { RootState, UserModelState } from '@/interfaces';
import { useBoolean, useUpdateEffect, useRequest } from '@/hooks';
import api from '@/api';

const COUNTDOWN = 90;
export function useVerify() {
  const dispatch = useDispatch();

  const user = useSelector<RootState, UserModelState['current']>((state) => state.user.current);
  const [verified, { setTrue, setFalse }] = useBoolean(false);
  const [count, setCount] = React.useState<number>(COUNTDOWN);
  const [timing, { setTrue: setTimingTrue, setFalse: setTimingFalse }] = useBoolean(false);
  const [
    submitLoading,
    { setTrue: setSubmitLoadingTrue, setFalse: setSubmitLoadingFalse },
  ] = useBoolean(false);

  useUpdateEffect(() => {
    let interval: number = 0;
    if (timing) {
      interval = window.setInterval(() => {
        setCount((preSecond) => {
          if (preSecond <= 1) {
            setTimingFalse();
            clearInterval(interval);
            // 重置秒数
            return COUNTDOWN;
          }
          return preSecond - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing]);
  // 发送获取验证码的请求，然后开始倒计时
  const handleGetCaptcha = React.useCallback(async () => {
    if (user?.mobile) {
      dispatch({
        type: 'auth/captcha',
        payload: {
          mobile: user.mobile,
        },
      });
      // 开始倒计时
      setTimingTrue();
    }
  }, [user]);

  const { run } = useRequest(api.auth.verify, { manual: true });
  const dom = React.useMemo(() => {
    async function handleFinish(values: any) {
      if (values) {
        setSubmitLoadingTrue();
        const result = await run({ mobile: user?.mobile!, captcha: values.captcha });
        if (result) {
          setSubmitLoadingFalse();
          setTrue();
        } else {
          setFalse();
        }
      }
    }
    return (
      <Form layout="vertical" hideRequiredMark onFinish={handleFinish}>
        <Form.Item>
          <Alert message="你正在使用手机短信验证身份" type="info" showIcon />
        </Form.Item>

        <Form.Item label="手机号码">
          {user?.mobile?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}
        </Form.Item>

        <Form.Item
          label="验证码"
          name="captcha"
          rules={[
            { required: true, message: '请输入验证码' },
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
            size="large"
            placeholder="请输入验证码"
            maxLength={6}
            suffix={
              <Button disabled={timing} onClick={handleGetCaptcha} type="link" size="small">
                {timing ? `${count} 秒` : '获取验证码'}
              </Button>
            }
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" block loading={submitLoading}>
            验证
          </Button>
        </Form.Item>
      </Form>
    );
  }, [user?.mobile, timing, count, handleGetCaptcha]);

  return {
    verified,
    dom,
  };
}
