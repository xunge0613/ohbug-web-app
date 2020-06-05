import React from 'react';
import { Card, Avatar, Typography } from 'antd';
import { history, useDispatch } from 'umi';
import type { Organization, Project } from 'umi';

import Tree from '@/components/Tree';
import type { TreeDataSource } from '@/components/Tree';
import Image from '@/components/Image';
import Icon from '@/components/Icon';
import IconButton from '@/components/IconButton';
import User from '@/components/User';
import { getPlatformLogo } from '@/utils';

import styles from './OrganizationTree.less';

interface OrganizationTreeProps {
  organization: Organization;
  projects: Project[];
}
interface DataSourceValue {
  title: string;
  avatar: string;
  desc?: string;
  others?: any;
}
const OrganizationTree: React.FC<OrganizationTreeProps> = ({ organization, projects }) => {
  const dispatch = useDispatch();

  const dataSource = React.useMemo<TreeDataSource<DataSourceValue>>(() => {
    return {
      key: '0',
      value: {
        title: organization.name!,
        avatar: organization.avatar!,
        desc: `团队共${organization.users?.length}人`,
        others: organization.introduction,
      },
      render: (value) => {
        return (
          <Card
            className={styles.head}
            title={
              <div className={styles.headTitle}>
                <Avatar className={styles.avatar} src={value.avatar} size="large">
                  {value.title[0]}
                </Avatar>
                <div className={styles.content}>
                  <Typography.Text strong>
                    {value.title} <Icon type="icon-ohbug-arrow-down-s-line" />
                  </Typography.Text>
                  <Typography.Text type="secondary">{value.desc}</Typography.Text>
                </div>
              </div>
            }
            extra={
              <div className={styles.extra}>
                <IconButton icon="icon-ohbug-settings-3-line" />
              </div>
            }
          >
            <Typography.Text type="secondary">{value.others}</Typography.Text>
          </Card>
        );
      },
      children: projects.map((project) => ({
        key: project.id,
        value: {
          title: project.name,
          avatar: getPlatformLogo(project.type),
          desc: `项目共${project.users.length}人`,
          others: project,
        },
        render: (value) => {
          function handleClick() {
            dispatch({
              type: 'project/setState',
              payload: {
                current: project,
              },
            });
            history.push('/issue');
          }

          return (
            <Card
              className={styles.project}
              cover={
                <Image
                  src={value.avatar}
                  alt={value.desc || ''}
                  onClick={handleClick}
                  style={{ cursor: 'pointer' }}
                />
              }
            >
              <div className={styles.info}>
                <Card.Meta
                  title={
                    <span className={styles.title} onClick={handleClick}>
                      {value.title}
                    </span>
                  }
                  description={value.desc}
                />
                <IconButton icon="icon-ohbug-settings-3-line" />
              </div>
              <div className={styles.users}>
                {project.users.map((user) => (
                  <User data={user} key={user.id} />
                ))}
              </div>
            </Card>
          );
        },
      })),
    };
  }, [organization, projects]);

  const [value, setValue] = React.useState();
  const handleChange = React.useCallback((key) => {
    setValue(key);
  }, []);

  return (
    <Tree
      className={styles.root}
      dataSource={dataSource}
      value={value}
      onChange={handleChange}
      selectedNodeClassName={styles.selectedNode}
      nodeClassName={styles.node}
      selectedLineClassName={styles.selectedLine}
      lineClassName={styles.line}
    />
  );
};

export default OrganizationTree;
