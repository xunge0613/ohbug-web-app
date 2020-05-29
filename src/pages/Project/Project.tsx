import React from 'react';
import { PageHeader, Row, Col, Button, Card, Avatar } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { history, useDispatch, useSelector } from 'umi';
import type { ProjectModelState, OrganizationModelState } from 'umi';

import BasicLayout from '@/layouts/Basic';
import type { RootState } from '@/interfaces';
import { getPlatformLogo } from '@/utils';

import styles from './Project.less';

interface ProjectPageProps {
  children?: React.ReactNode;
}

const Project: React.FC<ProjectPageProps> = () => {
  const dispatch = useDispatch();

  const organization = useSelector<RootState, OrganizationModelState>(
    (state) => state.organization,
  );
  const project = useSelector<RootState, ProjectModelState['data']>((state) => state.project.data);

  const handleCreateProject = React.useCallback(() => {
    dispatch({ type: 'project/handleCreateProjectVisible', payload: true });
  }, [dispatch]);

  return (
    <BasicLayout
      className={styles.root}
      pageHeader={
        <PageHeader
          title={
            <span>
              <Avatar src={organization.avatar} alt="Org" />
              {organization.name}
            </span>
          }
          ghost
          extra={
            <Button icon={<PlusCircleOutlined />} onClick={handleCreateProject}>
              Create Project
            </Button>
          }
        />
      }
    >
      <Row gutter={[16, 16]}>
        {project.map((p) => (
          <Col key={p.id} xs={8} sm={8} md={6} lg={6} xl={4}>
            <Card
              hoverable
              cover={<img className={styles.cover} src={getPlatformLogo(p.type)} alt={p.type} />}
              onClick={(): void => {
                dispatch({
                  type: 'project/setState',
                  payload: {
                    current: p,
                  },
                });
                history.push('/issue');
              }}
            >
              <Card.Meta title={p.name} description={p.type} />
            </Card>
          </Col>
        ))}
      </Row>
    </BasicLayout>
  );
};

export default Project;
