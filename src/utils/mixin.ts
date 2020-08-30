import * as UA from 'ua-device';
import type { OhbugDevice } from '@ohbug/types';

export function getDeviceInfo(data?: OhbugDevice) {
  if (data) {
    const { url, title, version, language, platform, userAgent } = data;
    const { browser, engine, os, device } = new UA(userAgent);
    return {
      url,
      title,
      version,
      language,
      platform,
      browser,
      engine,
      os,
      device,
    };
  }
  return null;
}

export const isAdmin = (admin_id: any, user_id: any) => Number(admin_id) === Number(user_id);
