import React from 'react'
import { Skeleton } from 'antd'
import type { OhbugEvent } from '@ohbug/types'

import { getDeviceInfo } from '@/utils'
import ProgressCard from '@/pages/Event/components/ProgressCard'

interface CardsProps {
  event?: OhbugEvent<any>
}

const Cards: React.FC<CardsProps> = ({ event }) => {
  const deviceInfo = React.useMemo(() => getDeviceInfo(event), [event])
  const loading = !event

  return (
    <Skeleton loading={loading}>
      {/* 浏览器 */}
      {deviceInfo?.browser && (
        <ProgressCard
          title={deviceInfo?.browser?.name}
          description={deviceInfo?.browser?.version?.original}
        />
      )}
      {/* 系统 */}
      {deviceInfo?.os && (
        <ProgressCard
          title={deviceInfo?.os?.name}
          description={deviceInfo?.os?.version?.original}
        />
      )}
      {/* App */}
      {deviceInfo?.app && (
        <ProgressCard
          title={deviceInfo?.app}
          description={`${deviceInfo?.version} / ${deviceInfo?.SDKVersion}`}
        />
      )}
      {/* 品牌 */}
      {deviceInfo?.device && deviceInfo?.device?.brand && (
        <ProgressCard
          title={deviceInfo?.device?.brand}
          description={deviceInfo?.device?.model}
        />
      )}
      {/* 平台 */}
      {deviceInfo?.platform && (
        <ProgressCard
          title={deviceInfo?.platform}
          description={deviceInfo?.system}
        />
      )}
      {/* SDK */}
      {deviceInfo?.sdk && (
        <ProgressCard
          title={deviceInfo?.sdk.platform}
          description={deviceInfo?.sdk.version}
        />
      )}
    </Skeleton>
  )
}

export default Cards
