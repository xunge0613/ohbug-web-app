import React from 'react';
import { List, Avatar } from 'antd';
import { useSelector, history, useParams } from 'umi';
import type { Project } from 'umi';

import { RootState } from '@/interfaces';
import Zone from '@/components/Zone';
import { getPlatformLogo } from '@/utils';
import IconButton from '@/components/IconButton';

import styles from './Projects.less';

const Projects: React.FC = () => {
  const { organization_id } = useParams();
  if (!organization_id) history.push('/404');

  const projects = useSelector<RootState, Project[]>(
    // eslint-disable-next-line eqeqeq
    (state) => state.organization?.data?.find((org) => org.id == organization_id)?.projects!,
  );
  if (!projects) history.push('/404');

  const handleJump = React.useCallback(() => {
    history.push(`/`);
  }, []);

  return (
    <section className={styles.root}>
      <Zone title="项目列表">
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
