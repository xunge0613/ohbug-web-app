import React from 'react';
import { useDispatch } from 'umi';

import styles from './Logout.less';

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const handleLogout = React.useCallback(() => {
    dispatch({ type: 'auth/logout' });
  }, [dispatch]);

  return (
    <div className={styles.root} onClick={handleLogout}>
      Logout
    </div>
  );
};

export default Logout;
