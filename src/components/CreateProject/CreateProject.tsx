import React from 'react';
import { Drawer, Form, Input, Button, Select } from 'antd';
import { useDispatch, useSelector } from 'umi';
import type { ProjectModelState } from 'umi';

import type { RootState } from '@/interfaces';

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
      title="Create Project"
      placement="right"
      closable
      width={340}
      visible={visible}
      onClose={handleClose}
    >
      <Form onFinish={handleFinish} hideRequiredMark>
        <Form.Item
          label="Project Name"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入 Project Name！',
            },
          ]}
        >
          <Input placeholder="例如：Project1" />
        </Form.Item>

        <Form.Item
          label="Project Type"
          name="type"
          rules={[
            {
              required: true,
              message: '请选择 Project Type！',
            },
          ]}
        >
          <Select placeholder="请选择 Project Type">
            <Select.Option value="JavaScript">JavaScript</Select.Option>
            <Select.Option value="NodeJS">NodeJS</Select.Option>
          </Select>
        </Form.Item>

        <Button htmlType="submit">创建 Project</Button>
      </Form>
    </Drawer>
  );
};

export default CreateProject;
