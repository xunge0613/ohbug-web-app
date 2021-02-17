import React from 'react'
import { Radio } from 'antd'
import { RadioGroupProps } from 'antd/lib/radio'
import clsx from 'clsx'

import { Icon } from '@/components'

import styles from './RadioIconButton.less'

interface Data {
  label: string
  value: string | number
  icon: string | React.ReactNode
}
interface RadioIconButtonProps extends RadioGroupProps {
  dataSource: Data[]
}
const RadioIconButton: React.FC<RadioIconButtonProps> = ({
  className,
  dataSource,
  ...args
}) => {
  const classes = React.useMemo(() => clsx(className, styles.root), [className])
  return (
    <Radio.Group className={classes} {...args}>
      {dataSource.map((item) => {
        const icon =
          typeof item.icon === 'string' ? (
            <Icon type={item.icon} style={{ fontSize: 48 }} />
          ) : (
            item.icon
          )
        return (
          <Radio.Button value={item.value} key={item.value}>
            <div className={styles.button}>
              {icon}
              {item.label && (
                <span className={styles.buttonLabel}>{item.label}</span>
              )}
            </div>
          </Radio.Button>
        )
      })}
    </Radio.Group>
  )
}

export default RadioIconButton
