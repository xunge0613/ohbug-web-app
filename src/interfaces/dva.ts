import type {
  Reducer,
  Effect,
  Subscription,
  Loading,
  AnalysisModelState,
  EventModelState,
  FeedbackModelState,
  IssueModelState,
  OrganizationModelState,
  ProjectModelState,
  UserModelState,
  ViewModelState,
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
  analysis: AnalysisModelState;
  event: EventModelState;
  feedback: FeedbackModelState;
  issue: IssueModelState;
  organization: OrganizationModelState;
  project: ProjectModelState;
  user: UserModelState;
  view: ViewModelState;
} & {
  loading: Loading;
};
