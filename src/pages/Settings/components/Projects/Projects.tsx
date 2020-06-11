import React from 'react';
import { Button, List, Avatar } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector, history } from 'umi';
import type { ProjectModelState } from 'umi';

import { RootState } from '@/interfaces';
import Zone from '@/components/Zone';
import { getPlatformLogo } from '@/utils';
import IconButton from '@/components/IconButton';

import styles from './Projects.less';

const Projects: React.FC = () => {
  const dispatch = useDispatch();
  const handleCreateProject = React.useCallback(() => {
    dispatch({ type: 'project/handleCreateProjectVisible', payload: true });
  }, [dispatch]);

  const projects = useSelector<RootState, ProjectModelState['data']>((state) => state.project.data);
  const handleJump = React.useCallback(() => {
    history.push(`/`);
  }, []);

  return (
    <section className={styles.root}>
      <Zone
        title="项目列表"
        extra={
          <Button icon={<PlusCircleOutlined />} onClick={handleCreateProject}>
            创建项目
          </Button>
        }
      >
        <List
          className={styles.list}
          dataSource={projects}
          itemLayout="horizontal"
          renderItem={(item) => (
            <List.Item
              extra={<IconButton icon="icon-ohbug-settings-3-line" onClick={handleJump} />}
            >
              <div className={styles.item}>
                <Avatar className={styles.avatar} src={getPlatformLogo(item.type)} />
                <span className={styles.title} onClick={handleJump}>
                  {item.name}
                </span>
              </div>
            </List.Item>
          )}
        />
      </Zone>
    </section>
  );
};

export default Projects;
