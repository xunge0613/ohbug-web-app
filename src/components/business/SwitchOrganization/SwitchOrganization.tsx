import React from 'react';
import { Avatar, Dropdown, Menu, Spin, Typography } from 'antd';
import { useSelector, useDispatch } from 'umi';

import type { RootState, OrganizationModelState } from '@/interfaces';
import { Icon } from '@/components';

import styles from './SwitchOrganization.less';

interface SwitchOrganizationProps {
  desc?: React.ReactNode;
  collapsed?: boolean;
}
const SwitchOrganization: React.FC<SwitchOrganizationProps> = ({ desc, collapsed }) => {
  const dispatch = useDispatch();
  const { data, current } = useSelector<RootState, OrganizationModelState>(
    (state) => state.organization,
  );
  const switchOrganizationMenu = React.useMemo(() => {
    return current && data ? (
      <Menu>
        {data.map((org) => (
          <Menu.Item
            key={org.id}
            icon={
              <Avatar src={org.avatar} style={{ marginRight: 8 }}>
                {org.name?.[0]}
              </Avatar>
            }
            onClick={() => {
              dispatch({
                type: 'organization/setCurrentOrganization',
                payload: org,
              });
            }}
            disabled={org.id === current.id}
          >
            {org.name}
          </Menu.Item>
        ))}
      </Menu>
    ) : (
      <Spin />
    );
  }, [data, current]);
  return current ? (
    <div className={styles.root}>
      <Avatar className={styles.avatar} src={current.avatar} size="large">
        {current.name?.[0]}
      </Avatar>
      {!collapsed && (
        <div className={styles.content}>
          <Dropdown overlay={switchOrganizationMenu} trigger={['click']}>
            <Typography.Text className={styles.title} strong>
              {current.name} <Icon type="icon-ohbug-arrow-down-s-line" />
            </Typography.Text>
          </Dropdown>
          {(desc || current.introduction) && (
            <Typography.Text type="secondary">{desc || current.introduction}</Typography.Text>
          )}
        </div>
      )}
    </div>
  ) : (
    <Spin />
  );
};

export default SwitchOrganization;
