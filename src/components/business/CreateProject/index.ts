import { dynamic } from 'umi';

export default dynamic({
  async loader() {
    const { default: CreateProject } = await import(
      /* webpackChunkName: "CreateProject" */ './CreateProject'
    );
    return CreateProject;
  },
});
