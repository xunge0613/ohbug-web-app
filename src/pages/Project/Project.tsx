import React from 'react';
import { history } from 'umi';
import { PageHeader, Row, Col, Button, Skeleton, Card, Avatar } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import BasicLayout from '../../layouts/Basic';
import Header from '../../components/Header';
import { RootState } from '../../store';
import { ProjectState, OrganizationState } from '../../models';
import { getPlatformLogo } from '../../utils';

import styles from './Project.less';

interface ProjectPageProps {
  children?: React.ReactNode;
}

const Project: React.FC<ProjectPageProps> = () => {
  const dispatch = useDispatch();

  const organization = useSelector<RootState, OrganizationState>(state => state.organization);
  const project = useSelector<RootState, ProjectState['data']>(state => state.project.data);
  const loading = !project.length;

  const handleCreateProject = React.useCallback(() => {
    dispatch({ type: 'project/handleCreateProjectVisible', payload: true });
  }, [dispatch]);

  return (
    <BasicLayout
      className={styles.root}
      header={<Header title="Project" />}
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
        {project.map(project => (
          <Col key={project.id} xs={8} sm={8} md={6} lg={6} xl={4}>
            <Card
              hoverable
              cover={
                <img
                  className={styles.cover}
                  src={getPlatformLogo(project.type)}
                  alt={project.type}
                />
              }
              onClick={(): void => {
                dispatch({
                  type: 'project/setCurrentProject',
                  payload: project,
                });
                history.push('/issue');
              }}
            >
              <Skeleton loading={loading}>
                <Card.Meta title={project.name} description={project.type} />
              </Skeleton>
            </Card>
          </Col>
        ))}
      </Row>
    </BasicLayout>
  );
};

export default Project;
