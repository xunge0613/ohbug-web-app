import * as UA from 'ua-device'
import type { OhbugEvent } from '@ohbug/types'

export function getDeviceInfo(event?: OhbugEvent<any>) {
  if (event) {
    if (event.device && event.sdk.platform === 'ohbug-browser') {
      const {
        url,
        title,
        version,
        language,
        platform,
        userAgent,
      } = event.device
      if (userAgent) {
        const { browser, engine, os, device } = new UA(userAgent)
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
        }
      }
    }

    if (event.device && event?.sdk?.platform === 'ohbug-miniapp') {
      const {
        app,
        version,
        platform,
        device,
        system,
        SDKVersion,
      } = event.device
      return {
        app,
        version,
        platform,
        device,
        system,
        SDKVersion,
      }
    }
  }

  return null
}

export const isAdmin = (admin_id: any, user_id: any) =>
  Number(admin_id) === Number(user_id)
