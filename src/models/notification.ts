import type { Model } from '@/interfaces';
import api from '@/api';

// 通知规则相关的数据 两种方式
// 1. 指标 每段时间
// 2. 区间 最多4个区间
interface NotificationRuleIndicator {
  interval: number; // 间隔时间
  percentage: number; // 增长百分比
}
type NotificationRuleRange = number[];
export type NotificationRuleData = NotificationRuleIndicator | NotificationRuleRange;

interface NotificationRuleItem {
  type: string;
  message: string;
}
export type NotificationRuleWhiteList = NotificationRuleItem[];
export type NotificationRuleBlackList = NotificationRuleItem[];

export type NotificationRuleLevel = 'serious' | 'warning' | 'default';

interface NotificationSettingEmail {
  email: string;
  open: boolean;
}
export type NotificationSettingEmails = NotificationSettingEmail[];
export type NotificationSettingBrowser = boolean;
type NotificationSettingWebHookType = 'dingtalk' | 'wechat_work' | 'others';
interface NotificationSettingWebHook {
  type: NotificationSettingWebHookType;
  name: string;
  link: string;
  at?: string[];
}
export type NotificationSettingWebHooks = NotificationSettingWebHook[];

export interface NotificationRule {
  id?: number;
  name?: string;
  data?: NotificationRuleData;
  whiteList?: NotificationRuleWhiteList;
  blackList?: NotificationRuleBlackList;
  level?: NotificationRuleLevel;
  interval?: number;
  open?: boolean;
  recently?: Date;
  count?: number;
}

export interface NotificationSetting {
  id?: number;
  emails?: NotificationSettingEmails;
  browser?: NotificationSettingBrowser;
  webhooks?: NotificationSettingWebHooks;
}

export interface NotificationModelState {
  ruleData?: NotificationRule[];
  settingData?: NotificationSetting;
}
export interface NotificationModel extends Model<NotificationModelState> {
  namespace: 'notification';
}

const notification: NotificationModel = {
  namespace: 'notification',
  state: {},
  reducers: {
    setState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  effects: {
    *createRule(
      { payload: { project_id, name, data, whiteList, blackList, level, interval, open } },
      { call },
    ) {
      if (project_id) {
        const result = yield call(api.notification.createRule, {
          project_id,
          name,
          data,
          whiteList,
          blackList,
          level,
          interval,
          open,
        });
        if (result) {
          window.location.reload();
        }
      }
    },

    *getRules({ payload: { project_id } }, { call, put }) {
      if (project_id) {
        const result = yield call(api.notification.getRules, {
          project_id,
        });
        if (result) {
          yield put({
            type: 'setState',
            payload: {
              ruleData: result,
            },
          });
        }
      }
    },

    *updateRule(
      { payload: { rule_id, name, data, whiteList, blackList, level, interval, open } },
      { call },
    ) {
      if (rule_id) {
        const result = yield call(api.notification.updateRule, {
          rule_id,
          name,
          data,
          whiteList,
          blackList,
          level,
          interval,
          open,
        });
        if (result) {
          window.location.reload();
        }
      }
    },

    *deleteRule({ payload: { rule_id } }, { call }) {
      if (rule_id) {
        const result = yield call(api.notification.deleteRule, {
          rule_id,
        });
        if (result) {
          window.location.reload();
        }
      }
    },

    *getSetting({ payload: { project_id } }, { call, put }) {
      if (project_id) {
        const result = yield call(api.notification.getSetting, {
          project_id,
        });
        if (result) {
          yield put({
            type: 'setState',
            payload: {
              settingData: result,
            },
          });
        }
      }
    },

    *updateSetting({ payload: { project_id, emails, browser, webhooks } }, { call }) {
      if (project_id) {
        const result = yield call(api.notification.updateSetting, {
          project_id,
          emails,
          browser,
          webhooks,
        });
        console.log(result);
      }
    },
  },
};

export default notification;
