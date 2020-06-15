import React from 'react';
import { useDispatch, useParams, useSelector } from 'umi';
import type { NotificationRule } from 'umi';
import { Table, Tag, Switch, Button, Modal } from 'antd';

import { RootState } from '@/interfaces';
import Zone from '@/components/Zone';
import { useBoolean } from '@/hooks';

import EditRule from './EditRule';

import styles from './Rules.less';

const Rules: React.FC = () => {
  const dispatch = useDispatch();
  const { project_id } = useParams();
  const { state: modalVisible, setTrue: modalShow, setFalse: modalOnCancel } = useBoolean(false);
  const [currentRule, setCurrentRule] = React.useState<NotificationRule | undefined>(undefined);

  React.useEffect(() => {
    dispatch({
      type: 'notification/rules/get',
      payload: {
        project_id,
      },
    });
  }, [project_id]);
  const rules = useSelector<RootState, NotificationRule[]>((state) => state.notification?.ruleData);

  return (
    <section className={styles.root}>
      <EditRule
        project_id={project_id}
        visible={modalVisible}
        onCancel={modalOnCancel}
        initialValues={currentRule}
      />
      <Zone
        title="通知规则"
        extra={
          <Button
            onClick={() => {
              setCurrentRule(undefined);
              modalShow();
            }}
          >
            新建通知规则
          </Button>
        }
      >
        <Table<NotificationRule> dataSource={rules} rowKey={(record) => record.id!}>
          <Table.Column<NotificationRule>
            title="名称/规则"
            render={(item: NotificationRule) => (
              <span>
                {item?.name}
                {JSON.stringify(item?.data)}
              </span>
            )}
          />
          <Table.Column<NotificationRule>
            title="通知类型"
            render={(item: NotificationRule) => <Tag>{item?.level}</Tag>}
          />
          <Table.Column<NotificationRule>
            title="最近通知"
            render={(item: NotificationRule) => (
              <span>{item?.recently || '还没有触发过通知哟~'}</span>
            )}
          />
          <Table.Column<NotificationRule>
            title="启用"
            render={(item: NotificationRule) => <Switch checked={item?.open} />}
          />
          <Table.Column<NotificationRule>
            title="操作"
            render={(item: NotificationRule) => (
              <span>
                <Button
                  className={styles.editButton}
                  type="text"
                  size="small"
                  onClick={() => {
                    setCurrentRule(item);
                    modalShow();
                  }}
                >
                  编辑
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
                          type: 'notification/rules/delete',
                          payload: {
                            rule_id: item?.id,
                          },
                        });
                      },
                    });
                  }}
                >
                  删除
                </Button>
              </span>
            )}
          />
        </Table>
      </Zone>
    </section>
  );
};

export default Rules;
