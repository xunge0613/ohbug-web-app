import React from 'react';
import { Drawer, Typography, Divider, Skeleton, Avatar } from 'antd';
import { useDispatch, useSelector } from 'umi';

import { RootState, ProjectModelState, OrganizationModelState, history } from '@/interfaces';
import { Icon, IconButton, SwitchOrganization } from '@/components';
import { useBoolean } from '@/hooks';
import { getPlatformLogo } from '@/utils';

import styles from './menuHeaderRender.less';

function MenuHeaderRender(): React.ReactElement {
  const dispatch = useDispatch();
  const [visible, { setTrue, setFalse }] = useBoolean(false);
  const organization = useSelector<RootState, OrganizationModelState['current']>(
    (state) => state.organization.current,
  );
  const project = useSelector<RootState, ProjectModelState['current']>(
    (state) => state.project.current,
  );
  const projects = useSelector<RootState, ProjectModelState['data']>((state) => state.project.data);

  return (
    <>
      <div className={styles.root} onClick={setTrue}>
        <Icon type="icon-ohbug-menu-line" style={{ fontSize: 22 }} />

        {organization && project && (
          <div className={styles.current}>
            <Typography.Text className={styles.organization} ellipsis>
              {organization.name}
            </Typography.Text>
            <Typography.Text className={styles.project}>{project.name}</Typography.Text>
          </div>
        )}
      </div>
      <Drawer
        className={styles.drawer}
        title={
          <div className={styles.title}>
            <IconButton icon="icon-ohbug-close-line" onClick={setFalse} />
            <span>Ohbug</span>
          </div>
        }
        width={360}
        placement="left"
        closable={false}
        visible={visible}
        onClose={setFalse}
      >
        <div className={styles.organizations}>
          <h3>团队</h3>
          <SwitchOrganization />
        </div>

        <Divider />

        <div className={styles.projects}>
          <h3>项目</h3>
          <Skeleton loading={!projects}>
            <div className={styles.list}>
              {projects.map((item) => (
                <div
                  className={styles.item}
                  key={item.id}
                  onClick={() => {
                    dispatch({
                      type: 'project/setState',
                      payload: {
                        current: project,
                      },
                    });
                    setFalse();
                    history.push(`/issue?project_id=${item.id}`);
                  }}
                >
                  <Avatar className={styles.avatar} src={getPlatformLogo(item.type)} />
                  {item.name}
                </div>
              ))}
            </div>
          </Skeleton>
        </div>
      </Drawer>
    </>
  );
}

export default MenuHeaderRender;
