import * as UA from 'ua-device';
import type { OhbugDevice } from '@ohbug/types';

export function getTagsInfo(data?: OhbugDevice) {
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
