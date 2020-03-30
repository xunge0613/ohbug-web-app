import React from 'react'
import { Drawer } from 'antd'
import { useMedia } from '@fluent-windows/hooks'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { AppState } from '../../models'
import SideMenu from './SideMenu'

const Sider: React.FC = () => {
  const dispatch = useDispatch()

  const isMobile = useMedia('(max-width: 575.98px)')
  const siderVisible = useSelector<RootState, AppState['siderVisible']>(
    state => state.app.siderVisible,
  )
  const handleClose = React.useCallback(() => {
    dispatch({ type: 'app/siderTrigger', payload: false })
  }, [dispatch])

  return isMobile ? (
    <Drawer
      visible={siderVisible}
      onClose={handleClose}
      placement="left"
      width={240}
      closable={false}
      maskClosable={true}
      bodyStyle={{
        padding: 0,
        height: '100vh',
      }}
    >
      <SideMenu collapsed={!siderVisible} />
    </Drawer>
  ) : (
    <SideMenu collapsed={!siderVisible} />
  )
}

export default Sider
