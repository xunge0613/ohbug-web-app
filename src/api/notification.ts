import { request } from 'umi'
import type {
  NotificationRule,
  NotificationSettingWebHook,
  NotificationSettingBrowser,
  NotificationSettingEmails,
  NotificationSettingWebHookType,
} from 'umi'
import { NotificationSetting } from '@/models/notification'

type Level = 'serious' | 'warning' | 'default'
interface CreateRule {
  project_id: number
  name: string
  data: string
  whiteList: string
  blackList: string
  level: Level
  interval: number
  open: boolean
}
interface GetRules {
  project_id: number
}
interface UpdateRule {
  rule_id: number
  name: string
  data: string
  whiteList: string
  blackList: string
  level: Level
  interval: number
  open: boolean
}
interface DeleteRule {
  rule_id: number
}
interface GetSetting {
  project_id: number
}
interface UpdateSetting {
  project_id: number
  emails: NotificationSettingEmails[]
  browser: NotificationSettingBrowser
  webhooks: NotificationSettingWebHook[]
}
interface CreateSettingWebhook {
  project_id: number
  type: NotificationSettingWebHookType
  name: string
  link: string
  open?: boolean
  at?: { value: string }[]
}
interface UpdateSettingWebhook extends CreateSettingWebhook {
  id: string
}
interface DeleteSettingWebhook {
  project_id: number
  id: string
}

const notification = {
  createRule: async (data: CreateRule): Promise<NotificationRule | void> => {
    const res = await request('/notification/rules', { method: 'post', data })
    return res
  },
  getRules: async (data: GetRules): Promise<NotificationRule[] | void> => {
    const res = await request('/notification/rules', {
      method: 'get',
      params: data,
    })
    return res
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
    })
    return res
  },
  deleteRule: async ({
    rule_id,
  }: DeleteRule): Promise<NotificationRule | void> => {
    const res = await request(`/notification/rules/${rule_id}`, {
      method: 'delete',
    })
    return res
  },
  getSetting: async (data: GetSetting): Promise<NotificationSetting | void> => {
    const res = await request('/notification/setting', {
      method: 'get',
      params: data,
    })
    return res
  },
  updateSetting: async ({
    project_id,
    emails,
    browser,
    webhooks,
  }: UpdateSetting): Promise<NotificationSetting | void> => {
    const res = await request('/notification/setting', {
      method: 'patch',
      params: { project_id },
      data: {
        emails,
        browser,
        webhooks,
      },
    })
    return res
  },
  createSettingWebhook: async ({
    project_id,
    type,
    name,
    link,
    open,
    at,
  }: CreateSettingWebhook): Promise<NotificationSettingWebHook | void> => {
    const res = await request('/notification/setting/webhooks', {
      method: 'post',
      params: { project_id },
      data: {
        type,
        name,
        link,
        open,
        at,
      },
    })
    return res
  },
  updateSettingWebhook: async ({
    project_id,
    id,
    type,
    name,
    link,
    open,
    at,
  }: UpdateSettingWebhook): Promise<NotificationSettingWebHook | void> => {
    const res = await request(`/notification/setting/webhooks/${id}`, {
      method: 'patch',
      params: { project_id },
      data: {
        type,
        name,
        link,
        open,
        at,
      },
    })
    return res
  },
  deleteSettingWebhook: async ({
    project_id,
    id,
  }: DeleteSettingWebhook): Promise<boolean | void> => {
    const res = await request(`/notification/setting/webhooks/${id}`, {
      method: 'delete',
      params: { project_id },
    })
    return res
  },
}

export default notification
