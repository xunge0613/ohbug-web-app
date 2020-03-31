import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Drawer, Form, Input, Button, Select } from 'antd'

import { RootState } from '../../store'
import { ProjectState } from '../../models'

import styles from './CreateProject.module.less'

const CreateProject: React.FC = () => {
  const dispatch = useDispatch()

  const handleFinish = React.useCallback(
    async values => {
      dispatch({ type: 'project/create', payload: values })
      dispatch({ type: 'project/handleCreateProjectVisible', payload: false })
    },
    [dispatch],
  )

  const project = useSelector<RootState, ProjectState>(state => state.project)
  const visible = project.createProjectVisible
  const handleClose = React.useCallback(() => {
    if (project.current && project.current.id) {
      dispatch({ type: 'project/handleCreateProjectVisible', payload: false })
    }
  }, [dispatch, project])

  return (
    <Drawer
      className={styles.root}
      title="Create Project"
      placement="right"
      closable={false}
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
  )
}

export default CreateProject
