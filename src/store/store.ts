import { init, RematchRootState, Models } from '@rematch/core';
import logger from 'redux-logger';
import createRematchPersist from '@rematch/persist';
import storageSession from 'redux-persist/lib/storage/session';

import {
  AppModel,
  LoginModel,
  OrganizationModel,
  ProjectModel,
  UserModel,
  EventModel,
  IssueModel,
  AnalysisModel,
  ViewModel,
} from '@/models';
import * as models from '@/models';

const persistPlugin = createRematchPersist({
  key: 'root',
  storage: storageSession,
  blacklist: ['event'],
});
const plugins = [persistPlugin];

const middlewares = [];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = init({
  models,
  plugins,
  redux: {
    middlewares,
  },
});

interface RootModels extends Models {
  app: AppModel;
  login: LoginModel;
  user: UserModel;
  organization: OrganizationModel;
  project: ProjectModel;
  event: EventModel;
  issue: IssueModel;
  analysis: AnalysisModel;
  view: ViewModel;
}
export type RootState = RematchRootState<RootModels>;

export default store;
