import React from 'react';
import { useDispatch, useSelector } from 'umi';
import type { NotificationSettingWebHook } from 'umi';
import { Modal, Form, Radio, Input, Space } from 'antd';

import { useUpdateEffect } from '@/hooks';
import IconButton from '@/components/IconButton';
import { RootState } from '@/interfaces';

const typeList = [
  {
    label: '钉钉',
    value: 'dingtalk',
  },
  {
    label: '企业微信',
    value: 'wechat_work',
  },
  {
    label: '自定义',
    value: 'others',
  },
];
interface EditWebhookProps {
  project_id: number | string;
  visible: boolean;
  onCancel: () => void;
  initialValues?: NotificationSettingWebHook;
}
const EditWebhook: React.FC<EditWebhookProps> = ({
  project_id,
  visible,
  onCancel,
  initialValues,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [type, setType] = React.useState(() => (initialValues ? 'update' : 'create'));
  const confirmLoading = useSelector<RootState, boolean>(
    (state) => state.loading.effects[`notification/setting/webhooks/${type}`]!,
  );

  useUpdateEffect(() => {
    setType(initialValues ? 'update' : 'create');

    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues]);

  const handleOk = React.useCallback(() => {
    form.submit();
  }, []);
  const handleFinish = React.useCallback(
    (value) => {
      const payload = {
        project_id,
        open: true,
        ...value,
      };
      if (type === 'update') {
        payload.id = initialValues?.id;
      }
      dispatch({
        type: `notification/setting/webhooks/${type}`,
        payload,
      });
      // eslint-disable-next-line no-unused-expressions
      onCancel?.();
    },
    [type, initialValues?.id],
  );

  return (
    <Modal
      title="编辑第三方通知"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      width={600}
      okText="保存"
      cancelText="取消"
    >
      <Form
        form={form}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 21 }}
        onFinish={handleFinish}
        hideRequiredMark
      >
        <Form.Item name="type" rules={[{ required: true, message: '请选择第三方通知类型' }]}>
          <Radio.Group>
            {typeList.map((item) => (
              <Radio key={item.value} value={item.value}>
                {item.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入通知名称' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="链接"
          name="link"
          rules={[
            { required: true, message: '请输入通知链接' },
            {
              type: 'url',
              message: '链接格式错误 请重新输入',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.List name="at">
          {(fields, operation) => (
            <Form.Item label="@的人">
              <Space direction="vertical">
                {fields.map((field: any, index: number) => (
                  <Space key={field.key}>
                    <Form.Item name={[field.name, 'value']} noStyle>
                      <Input />
                    </Form.Item>
                    {fields.length > 0 ? (
                      <IconButton
                        onClick={() => {
                          operation.remove(field.name);
                        }}
                        icon="icon-ohbug-subtract-line"
                        size="small"
                      />
                    ) : null}
                    {fields.length < 3 && index === fields.length - 1 && (
                      <IconButton
                        onClick={() => {
                          operation.add();
                        }}
                        icon="icon-ohbug-add-line"
                        size="small"
                      />
                    )}
                  </Space>
                ))}
              </Space>
              {fields.length === 0 && (
                <IconButton
                  onClick={() => {
                    operation.add();
                  }}
                  icon="icon-ohbug-add-line"
                  size="small"
                />
              )}
            </Form.Item>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default EditWebhook;
