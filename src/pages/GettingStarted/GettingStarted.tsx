import React from 'react';
import { useSelector } from 'umi';

import { OrganizationModelState, ProjectModelState, RootState } from '@/interfaces';

const GettingStarted: React.FC = () => {
  const organization = useSelector<RootState, OrganizationModelState['current']>(
    (state) => state.organization.current,
  );
  const project = useSelector<RootState, ProjectModelState['current']>(
    (state) => state.project.current,
  );
  // eslint-disable-next-line no-console
  console.log(organization, project);

  return <div>1</div>;
};

export default GettingStarted;
