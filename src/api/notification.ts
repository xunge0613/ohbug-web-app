import { request } from 'umi';
import type { NotificationRule } from 'umi';

type Level = 'serious' | 'warning' | 'default';
interface CreateRule {
  project_id: number;
  name: string;
  data: string;
  whiteList: string;
  blackList: string;
  level: Level;
  interval: number;
  open: boolean;
}
interface GetRules {
  project_id: number;
}
interface UpdateRule {
  rule_id: number;
  name: string;
  data: string;
  whiteList: string;
  blackList: string;
  level: Level;
  interval: number;
  open: boolean;
}
interface DeleteRule {
  rule_id: number;
}
interface GetSetting {
  project_id: number;
}
interface UpdateSetting {
  project_id: number;
  emails: string[];
  browser: boolean;
  webhooks: string[];
}

const notification = {
  createRule: async (data: CreateRule): Promise<NotificationRule | void> => {
    const res = await request('/notification/rules', { method: 'post', data });
    return res;
  },
  getRules: async (data: GetRules): Promise<NotificationRule[] | void> => {
    const res = await request('/notification/rules', { method: 'get', params: data });
    return res;
  },
  updateRule: async ({
    rule_id,
    name,
    data,
    whiteList,
    blackList,
    level,
    interval,
    open,
  }: UpdateRule): Promise<NotificationRule | void> => {
    const res = await request(`/notification/rules/${rule_id}`, {
      method: 'patch',
      data: { name, data, whiteList, blackList, level, interval, open },
    });
    return res;
  },
  deleteRule: async ({ rule_id }: DeleteRule): Promise<NotificationRule | void> => {
    const res = await request(`/notification/rules/${rule_id}`, { method: 'delete' });
    return res;
  },
  getSetting: async (data: GetSetting): Promise<NotificationRule | void> => {
    const res = await request('/notification/setting', { method: 'get', params: data });
    return res;
  },
  updateSetting: async ({
    project_id,
    emails,
    browser,
    webhooks,
  }: UpdateSetting): Promise<NotificationRule | void> => {
    const res = await request('/notification/setting', {
      method: 'patch',
      params: { project_id },
      data: {
        emails,
        browser,
        webhooks,
      },
    });
    return res;
  },
};

export default notification;
