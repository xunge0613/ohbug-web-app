import React from 'react';
import { Drawer, Form, Input, Button, Select } from 'antd';
import { useDispatch, useSelector } from 'umi';

import type { RootState, ProjectModelState } from '@/interfaces';

import styles from './CreateProject.less';

const CreateProject: React.FC = () => {
  const dispatch = useDispatch();

  const handleFinish = React.useCallback(
    async (values) => {
      dispatch({ type: 'project/create', payload: values });
    },
    [dispatch],
  );

  const project = useSelector<RootState, ProjectModelState>((state) => state.project);
  const visible = project.createProjectVisible;
  const handleClose = React.useCallback(() => {
    dispatch({ type: 'project/handleCreateProjectVisible', payload: false });
  }, [dispatch]);

  return (
    <Drawer
      className={styles.root}
      title="创建项目"
      placement="right"
      closable
      width={340}
      visible={visible}
      onClose={handleClose}
    >
      <Form onFinish={handleFinish} hideRequiredMark>
        <Form.Item
          label="项目名称"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入项目名称！',
            },
            {
              max: 12,
              message: '项目名称最大为12个字符',
            },
          ]}
        >
          <Input placeholder="例如：Project1" maxLength={12} />
        </Form.Item>

        <Form.Item
          label="项目类型"
          name="type"
          rules={[
            {
              required: true,
              message: '请选择项目类型！',
            },
          ]}
        >
          <Select placeholder="请选择项目类型">
            <Select.Option value="JavaScript">JavaScript</Select.Option>
            <Select.Option value="NodeJS">NodeJS</Select.Option>
          </Select>
        </Form.Item>

        <Button htmlType="submit" type="primary">
          创建项目
        </Button>
      </Form>
    </Drawer>
  );
};

export default CreateProject;
