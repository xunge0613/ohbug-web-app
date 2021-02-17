import React from 'react'
import { Row, Col, Form, Input, Button } from 'antd'
import { useDispatch, useSelector, useParams, history } from 'umi'

import { RootState, Organization, User } from '@/interfaces'
import { Zone } from '@/components'
import { useAccess } from '@/hooks'
import { isAdmin } from '@/utils'

import DangerZone from './DangerZone'

import styles from './Profile.less'

const Profile: React.FC = () => {
  const dispatch = useDispatch()

  // @ts-ignore
  const { organization_id } = useParams()
  if (!organization_id) history.push('/404')
  const organization = useSelector<RootState, Organization>(
    (state) =>
      // eslint-disable-next-line eqeqeq
      state.organization?.data?.find((org) => org.id == organization_id)!
  )
  const user = useSelector<RootState, User>((state) => state?.user?.current!)
  if (!organization) history.push('/404')
  useAccess(isAdmin(organization?.admin?.id, user?.id))

  const [form] = Form.useForm()
  const handleFinish = React.useCallback(
    (values) => {
      dispatch({
        type: 'organization/update',
        payload: { ...values, organization_id },
      })
    },
    [dispatch]
  )

  return (
    <section className={styles.root}>
      <Zone title="团队基本信息">
        <Row gutter={16}>
          <Col span={12}>
            <Form
              layout="vertical"
              form={form}
              hideRequiredMark
              onFinish={handleFinish}
            >
              <Form.Item
                className={styles.formItem}
                name="name"
                label="团队名称"
                initialValue={organization?.name}
                rules={[
                  {
                    required: true,
                    message: '请输入团队名称！',
                  },
                  {
                    max: 12,
                    message: '团队名称最大为12个字符',
                  },
                ]}
              >
                <Input placeholder="例如：抓BUG小分队" maxLength={12} />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                name="introduction"
                label="团队简介"
                initialValue={organization?.introduction}
                rules={[
                  {
                    max: 140,
                    message: '团队简介最大为140个字符',
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="非必填项"
                  maxLength={140}
                  autoSize
                />
              </Form.Item>

              <Form.Item className={styles.formItem}>
                <Button type="primary" htmlType="submit">
                  更新基本信息
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Zone>

      <Zone type="danger" title="危险区域">
        <DangerZone organization={organization} />
      </Zone>
    </section>
  )
}

export default Profile
