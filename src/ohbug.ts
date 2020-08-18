import Ohbug from '@ohbug/browser';
import OhbugReact from '@ohbug/react';
import React from 'react';

const client = Ohbug.init({
  // ohbugApiKey,ohbugEndpoint 从 config/define 中定义
  // @ts-ignore
  apiKey: ohbugApiKey,
  // @ts-ignore
  endpoint: ohbugEndpoint,
  created: (event) => {
    if (process.env.NODE_ENV === 'development') {
      return false;
    }
    return event;
  },
});
const OhbugErrorBoundary = client.use(OhbugReact, React);

export default OhbugErrorBoundary;
