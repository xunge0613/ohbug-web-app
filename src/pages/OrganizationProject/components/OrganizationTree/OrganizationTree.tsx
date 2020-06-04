import React from 'react';
import { Card, Avatar } from 'antd';
import { history, useDispatch } from 'umi';
import type { Organization, Project } from 'umi';

import Tree from '@/components/Tree';
import type { TreeDataSource } from '@/components/Tree';
import Icon from '@/components/Icon';
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
}
const OrganizationTree: React.FC<OrganizationTreeProps> = ({ organization, projects }) => {
  const dispatch = useDispatch();

  const dataSource = React.useMemo<TreeDataSource<DataSourceValue>>(() => {
    return {
      key: '0',
      value: {
        title: organization.name!,
        avatar: organization.avatar!,
        desc: '我是团队简介',
      },
      render: (value) => {
        return (
          <Card
            className={styles.head}
            title={
              <span>
                <Avatar src={value.avatar} alt="Org" />
                {value.title}
                <Icon type="icon-ohbug-arrow-down-s-line" />
              </span>
            }
          >
            {value.desc}
          </Card>
        );
      },
      children: projects.map((project) => ({
        key: project.id,
        value: {
          title: project.name,
          avatar: getPlatformLogo(project.type),
          desc: project.type,
        },
        render: (value, { rowNumber }) => {
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
              title={
                <span className={styles.title} onClick={handleClick}>
                  <Avatar src={value.avatar} alt={value.desc} />
                  {value.title}
                </span>
              }
            >
              {value.desc}
              {rowNumber}
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
