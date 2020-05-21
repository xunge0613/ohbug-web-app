import React from 'react';
import type { OhbugAction } from '@ohbug/types';
import {
  UserOutlined,
  LinkOutlined,
  RocketOutlined,
  WarningOutlined,
  CodeOutlined,
} from '@ant-design/icons';

export function getMessageAndIconByActionType(
  action: OhbugAction,
): {
  message: React.ReactNode;
  icon: React.ReactNode;
  color?: string;
} {
  const status = action.data?.res?.status;
  switch (action.type) {
    case 'click':
      return {
        message: action.data?.selector,
        icon: <UserOutlined />,
      };
    case 'navigation':
      return {
        message: (
          <>
            <strong>From:</strong> <em>{action.data?.from}</em> <strong>To:</strong>{' '}
            <em>{action.data?.to}</em>
          </>
        ),
        icon: <LinkOutlined />,
      };
    case 'ajax':
      return {
        message: (
          <>
            <strong>{action.data?.req?.method}</strong> <em>{action.data?.req?.url}</em>{' '}
            <strong>[{action.data?.res?.status}]</strong>
          </>
        ),
        icon: <RocketOutlined />,
        color: status > 400 ? 'red' : status <= 200 ? 'green' : 'grey',
      };
    case 'fetch':
      return {
        message: (
          <>
            <strong>{action.data?.req?.method}</strong> <em>{action.data?.req?.url}</em>{' '}
            <strong>[{action.data?.res?.status}]</strong>
          </>
        ),
        icon: <RocketOutlined />,
        color: status > 400 ? 'red' : status <= 200 ? 'green' : 'grey',
      };
    case 'console':
      return {
        message: `[${action.message}] ${action.data}`,
        icon: <CodeOutlined />,
      };
    default:
      return {
        message: '',
        icon: <WarningOutlined />,
        color: 'ref',
      };
  }
}
