import * as UA from 'ua-device';
import type { OhbugTags } from '@ohbug/types';

export function getTagsInfoByTags(tags?: OhbugTags) {
  if (tags) {
    const { uuid, url, title, version, language, platform, userAgent } = tags;
    const { browser, engine, os, device } = new UA(userAgent);
    return {
      uuid,
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
