import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Provider as ReduxProvider } from 'react-redux';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/integration/react';

import UserBlock from '@/components/UserBlock';

import store from './store';
import './styles';

const persistor = getPersistor();
const Loading = <Spin indicator={<LoadingOutlined spin />} />;

export function rootContainer(container: React.ReactNode) {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={Loading} persistor={persistor}>
        {container}
      </PersistGate>
    </ReduxProvider>
  );
}

export const layout = {
  rightContentRender: () => <UserBlock />,
  footerRender: () => <footer>footer</footer>,
};
