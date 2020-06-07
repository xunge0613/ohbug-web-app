import React from 'react';
import { PageHeader, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { history, useDispatch, useSelector } from 'umi';
import type { ProjectModelState, OrganizationModelState } from 'umi';

import BasicLayout from '@/layouts/Basic';
import type { RootState } from '@/interfaces';

import OrganizationTree from './components/OrganizationTree';

import styles from './OrganizationProject.less';

interface ProjectPageProps {
  children?: React.ReactNode;
}

const OrganizationProject: React.FC<ProjectPageProps> = () => {
  const dispatch = useDispatch();

  const organizations = useSelector<RootState, OrganizationModelState['data']>(
    (state) => state.organization.data,
  );
  const organization = useSelector<RootState, OrganizationModelState['current']>(
    (state) => state.organization.current,
  );
  const projects = useSelector<RootState, ProjectModelState['data']>((state) => state.project.data);

  const handleCreateOrganization = React.useCallback(() => {
    history.push('/create-organization');
  }, [dispatch]);
  const handleCreateProject = React.useCallback(() => {
    dispatch({ type: 'project/handleCreateProjectVisible', payload: true });
  }, [dispatch]);

  return (
    <BasicLayout
      className={styles.root}
      pageHeader={
        <PageHeader
          title={
            <div className={styles.title}>
              <Button icon={<PlusCircleOutlined />} onClick={handleCreateOrganization}>
                创建团队
              </Button>
              <Button icon={<PlusCircleOutlined />} onClick={handleCreateProject}>
                创建项目
              </Button>
            </div>
          }
          ghost
        />
      }
    >
      <OrganizationTree
        organizations={organizations!}
        organization={organization!}
        projects={projects!}
      />
    </BasicLayout>
  );
};

export default OrganizationProject;
