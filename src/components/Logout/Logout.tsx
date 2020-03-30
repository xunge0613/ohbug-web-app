import React from 'react'
import { useDispatch } from 'react-redux'

import styles from './Logout.module.less'

const Logout: React.FC = () => {
  const dispatch = useDispatch()
  const handleLogout = React.useCallback(() => {
    dispatch({ type: 'login/logout' })
  }, [dispatch])
  return (
    <div className={styles.root} onClick={handleLogout}>
      Logout
    </div>
  )
}

export default Logout
