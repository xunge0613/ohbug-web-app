import React from 'react';
import { List, Avatar } from 'antd';
import { useSelector, history, useParams } from 'umi';

import { RootState, Project } from '@/interfaces';
import { Zone, IconButton } from '@/components';
import { getPlatformLogo } from '@/utils';

import styles from './Projects.less';

const Projects: React.FC = () => {
  const { organization_id } = useParams();
  if (!organization_id) history.push('/404');

  const projects = useSelector<RootState, Project[]>(
    // eslint-disable-next-line eqeqeq
    (state) => state.organization?.data?.find((org) => org.id == organization_id)?.projects!,
  );
  if (!projects) history.push('/404');

  return (
    <section className={styles.root}>
      <Zone title="项目列表">
        <List
          className={styles.list}
          dataSource={projects}
          itemLayout="horizontal"
          renderItem={(item) => (
            <List.Item
              extra={
                <IconButton
                  icon="icon-ohbug-settings-3-line"
                  onClick={() => {
                    history.push(`/settings/${organization_id}/project/${item.id}`);
                  }}
                />
              }
            >
              <div className={styles.item}>
                <Avatar className={styles.avatar} src={getPlatformLogo(item.type)} />
                <span
                  className={styles.title}
                  onClick={() => {
                    history.push(`/settings/${organization_id}/project/${item.id}`);
                  }}
                >
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
