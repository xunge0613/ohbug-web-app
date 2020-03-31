import React from 'react';
import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';
import { AppState } from '@/models';
import UserBlock from '../UserBlock';

import styles from './Header.less';

interface HeaderProps {
  title: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const dispatch = useDispatch();

  const siderVisible = useSelector<RootState, AppState['siderVisible']>(
    state => state.app.siderVisible,
  );
  const handleTriggerClick = React.useCallback(() => {
    dispatch({ type: 'app/siderTrigger', payload: !siderVisible });
  }, [dispatch, siderVisible]);

  return (
    <Layout.Header className={styles.root}>
      <div className={styles.title}>
        {siderVisible ? (
          <MenuFoldOutlined className={styles.trigger} onClick={handleTriggerClick} />
        ) : (
          <MenuUnfoldOutlined className={styles.trigger} onClick={handleTriggerClick} />
        )}
        <span>{title}</span>
      </div>
      <div className={styles.extra}>
        <div className={styles.item}>
          <UserBlock />
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
