import type {
  Reducer,
  Effect,
  Subscription,
  Loading,
  AuthModelState,
  AnalysisModelState,
  EventModelState,
  FeedbackModelState,
  IssueModelState,
  OrganizationModelState,
  ProjectModelState,
  UserModelState,
  ViewModelState,
  NotificationModelState,
} from 'umi';

export interface Model<S = any> {
  namespace: string;
  state?: S;
  reducers?: {
    [key: string]: Reducer<S>;
  };
  effects?: {
    [key: string]: Effect;
  };
  subscriptions?: {
    [key: string]: Subscription;
  };
}

export type RootState = {
  auth: AuthModelState;
  analysis: AnalysisModelState;
  event: EventModelState;
  feedback: FeedbackModelState;
  issue: IssueModelState;
  organization: OrganizationModelState;
  project: ProjectModelState;
  user: UserModelState;
  view: ViewModelState;
  notification: NotificationModelState;
} & {
  loading: Loading;
};
