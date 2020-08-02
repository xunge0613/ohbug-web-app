import React from 'react';
import { PageHeader, Button } from 'antd';
import { history, useDispatch, useSelector } from 'umi';

import BasicLayout from '@/layouts/Basic';
import { Icon } from '@/components';
import type { RootState, ProjectModelState, OrganizationModelState } from '@/interfaces';

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
              <Button
                icon={<Icon type="icon-ohbug-add-circle-line" />}
                onClick={handleCreateOrganization}
              >
                创建团队
              </Button>
              <Button
                icon={<Icon type="icon-ohbug-add-circle-line" />}
                onClick={handleCreateProject}
              >
                创建项目
              </Button>
            </div>
          }
          ghost
        />
      }
    >
      {organizations && organization && projects && (
        <OrganizationTree organization={organization} projects={projects} />
      )}
    </BasicLayout>
  );
};

export default OrganizationProject;
