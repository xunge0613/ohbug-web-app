import React from 'react'
import { useDispatch, useParams, useSelector } from 'umi'
import { Form, Switch, Input, Space, Button, Table, Modal } from 'antd'

import type {
  RootState,
  NotificationSetting,
  NotificationSettingWebHook,
} from '@/interfaces'
import { Zone, IconButton } from '@/components'
import { useUpdateEffect, useBoolean } from '@/hooks'
import { registerServiceWorker, askNotificationPermission } from '@/utils'

import EditWebhook from './EditWebhook'

import styles from './Setting.less'

const Setting: React.FC = () => {
  const dispatch = useDispatch()
  // @ts-ignore
  const { project_id } = useParams()
  const [form] = Form.useForm()
  const [currentRule, setCurrentRule] = React.useState<
    NotificationSettingWebHook | undefined
  >(undefined)
  const [currentSwitch, setCurrentSwitch] = React.useState<number>()
  const [browserDisabled] = React.useState<boolean>(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      return false
    }
    return true
  })

  React.useEffect(() => {
    dispatch({
      type: 'notification/setting/get',
      payload: {
        project_id,
      },
    })
  }, [project_id])
  const setting = useSelector<RootState, NotificationSetting>(
    (state) => state.notification?.settingData!
  )
  const browserSwitchLoading = useSelector<RootState, boolean>(
    (state) => state.loading.effects['notification/setting/update']!
  )
  const switchLoading = useSelector<RootState, boolean>(
    (state) => state.loading.effects['notification/setting/webhooks/update']!
  )

  useUpdateEffect(() => {
    if (setting) {
      form.setFieldsValue({
        ...setting,
        browser: setting?.browser?.open,
      })
    }
  }, [setting])

  const [
    webhookModalVisible,
    { setTrue: webhookModalShow, setFalse: webhookModalOnCancel },
  ] = useBoolean(false)

  const handleBrowserChange = React.useCallback((checked: boolean) => {
    if (checked === true) {
      // 获取浏览器通知权限
      askNotificationPermission()
        .then(() => {
          registerServiceWorker().then((subscribeOptions) => {
            if (subscribeOptions) {
              dispatch({
                type: 'notification/setting/update',
                payload: {
                  project_id,
                  browser: {
                    open: checked,
                    data: JSON.parse(JSON.stringify(subscribeOptions)),
                  },
                },
              })
            }
          })
        })
        .catch((err) => {
          dispatch({
            type: 'app/error',
            payload: err.message,
          })
          form.setFieldsValue({
            browser: false,
          })
        })
    } else {
      dispatch({
        type: 'notification/setting/update',
        payload: {
          project_id,
          browser: {
            open: checked,
            data: null,
          },
        },
      })
    }
  }, [])
  const handleFinish = React.useCallback(
    (values) => {
      const payload: NotificationSetting = {}
      if (form.isFieldTouched('emails')) {
        payload.emails = values.emails
        dispatch({
          type: 'notification/setting/update',
          payload: {
            project_id,
            ...payload,
          },
        })
      }
    },
    [project_id]
  )

  return (
    <section className={styles.root}>
      <EditWebhook
        project_id={project_id}
        visible={webhookModalVisible}
        onCancel={webhookModalOnCancel}
        initialValues={currentRule}
      />
      <Form form={form} onFinish={handleFinish}>
        <Zone title="邮件通知">
          <Form.List name="emails">
            {(fields, operation) => (
              <Space direction="vertical">
                {fields.map((field, index) => (
                  <div className={styles.emailLine} key={field.key}>
                    <Space
                      style={{ width: 500 }}
                      align="center"
                      key={field.key}
                    >
                      <Form.Item
                        name={[field.name, 'email']}
                        hasFeedback
                        rules={[
                          { required: true, message: '请输入正确的邮箱格式' },
                          { type: 'email', message: '请输入正确的邮箱格式' },
                          { max: 100, message: '请输入正确的邮箱格式' },
                        ]}
                      >
                        <Input
                          maxLength={100}
                          onBlur={() => {
                            form.submit()
                          }}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <IconButton
                          style={{ marginBottom: 16 }}
                          onClick={() => {
                            const emails = form.getFieldValue('emails')
                            // 判断当前行是否输入内容
                            if (!emails[index].email) {
                              // 没有内容 直接删除行
                              operation.remove(field.name)
                            } else {
                              Modal.confirm({
                                title: '请确认是否删除?',
                                okText: '删除',
                                okType: 'danger',
                                cancelText: '取消',
                                onOk() {
                                  operation.remove(field.name)
                                  setTimeout(form.submit, 0)
                                },
                              })
                            }
                          }}
                          icon="icon-ohbug-indeterminate-circle-line"
                          size="small"
                        />
                      ) : null}
                      {fields.length < 3 && index === fields.length - 1 && (
                        <IconButton
                          style={{ marginBottom: 16 }}
                          onClick={() => {
                            operation.add()
                          }}
                          icon="icon-ohbug-add-circle-line"
                          size="small"
                        />
                      )}
                    </Space>
                    <Form.Item
                      className={styles.emailSwitch}
                      name={[field.name, 'open']}
                      valuePropName="checked"
                      initialValue
                    >
                      <Switch
                        onChange={() => {
                          form.submit()
                        }}
                      />
                    </Form.Item>
                  </div>
                ))}
                {fields.length === 0 && (
                  <IconButton
                    style={{ marginBottom: 16 }}
                    onClick={() => {
                      operation.add()
                    }}
                    icon="icon-ohbug-add-circle-line"
                    size="small"
                  />
                )}
              </Space>
            )}
          </Form.List>
        </Zone>

        <Zone
          title={
            <div className={styles.browserLine}>
              <div style={{ width: 500 }}>浏览器通知</div>
              <Form.Item
                className={styles.browserSwitch}
                name="browser"
                initialValue={false}
                valuePropName="checked"
              >
                <Switch
                  loading={browserSwitchLoading}
                  onChange={handleBrowserChange}
                  disabled={browserDisabled}
                />
              </Form.Item>
            </div>
          }
        >
          <span>{browserDisabled ? `当前浏览器不支持浏览器通知` : ''}</span>
        </Zone>

        <Zone
          title="第三方通知"
          extra={
            <IconButton
              className={styles.addWebhook}
              icon="icon-ohbug-add-circle-line"
              onClick={() => {
                setCurrentRule(undefined)
                webhookModalShow()
              }}
            >
              +
            </IconButton>
          }
        >
          <Form.Item name="webhooks" valuePropName="dataSource">
            <Table pagination={false} rowKey={(record) => record.id!}>
              <Table.Column
                title="名称"
                width={500}
                render={(item) => {
                  return (
                    <span>
                      {/* <Avatar></Avatar> */}
                      <span>{item.name}</span>
                    </span>
                  )
                }}
              />
              <Table.Column
                title="开关"
                render={(item) => {
                  return (
                    <Switch
                      checked={item.open}
                      loading={switchLoading && currentSwitch === item?.id}
                      onChange={(checked) => {
                        setCurrentSwitch(item?.id)
                        dispatch({
                          type: 'notification/setting/webhooks/update',
                          payload: {
                            project_id,
                            id: item.id,
                            open: checked,
                          },
                        })
                      }}
                    />
                  )
                }}
              />
              <Table.Column
                title="操作"
                render={(item) => {
                  return (
                    <span>
                      <Button
                        className={styles.editButton}
                        type="text"
                        size="small"
                        onClick={() => {
                          setCurrentRule(item)
                          webhookModalShow()
                        }}
                      >
                        修改
                      </Button>
                      <Button
                        className={styles.deleteButton}
                        type="text"
                        size="small"
                        onClick={() => {
                          Modal.confirm({
                            title: '请确认是否删除?',
                            content: item?.name,
                            okText: '删除',
                            okType: 'danger',
                            cancelText: '取消',
                            onOk() {
                              dispatch({
                                type: 'notification/setting/webhooks/delete',
                                payload: {
                                  id: item?.id,
                                  project_id,
                                },
                              })
                            },
                          })
                        }}
                      >
                        删除
                      </Button>
                    </span>
                  )
                }}
              />
            </Table>
          </Form.Item>
        </Zone>
      </Form>
    </section>
  )
}

export default Setting
