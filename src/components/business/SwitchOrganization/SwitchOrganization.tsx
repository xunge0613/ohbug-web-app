import React from 'react'
import { Dropdown, Menu, Spin, Typography } from 'antd'
import { useSelector, useDispatch } from 'umi'

import type { RootState, OrganizationModelState } from '@/interfaces'
import { Icon } from '@/components'

import styles from './SwitchOrganization.less'

interface SwitchOrganizationProps {
  desc?: React.ReactNode
  collapsed?: boolean
}
const SwitchOrganization: React.FC<SwitchOrganizationProps> = ({
  desc,
  collapsed,
}) => {
  const dispatch = useDispatch()
  const { data, current } = useSelector<RootState, OrganizationModelState>(
    (state) => state.organization
  )
  const switchOrganizationMenu = React.useMemo(() => {
    return current && data ? (
      <Menu>
        {data.map((org) => (
          <Menu.Item
            key={org.id}
            onClick={() => {
              dispatch({
                type: 'organization/setCurrentOrganization',
                payload: org,
              })
            }}
            disabled={org.id === current.id}
          >
            {org.name}
          </Menu.Item>
        ))}
      </Menu>
    ) : (
      <Spin />
    )
  }, [data, current])
  return current ? (
    <Dropdown overlay={switchOrganizationMenu} trigger={['click']}>
      <div className={styles.root}>
        {!collapsed && (
          <div className={styles.info}>
            <span>
              <Typography.Text
                className={styles.title}
                strong
                ellipsis
                style={{ maxWidth: 112 }}
              >
                {current.name}
              </Typography.Text>
              <Icon type="icon-ohbug-arrow-down-s-fill" />
            </span>
            {(desc || current.introduction) && (
              <Typography.Text type="secondary">
                {desc || current.introduction}
              </Typography.Text>
            )}
          </div>
        )}
      </div>
    </Dropdown>
  ) : (
    <Spin />
  )
}

export default SwitchOrganization
