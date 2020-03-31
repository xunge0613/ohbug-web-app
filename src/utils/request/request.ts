import axios from 'axios';

import store from '@/store';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 100000,
});

instance.interceptors.request.use(
  response => response,
  error => {
    store.dispatch({ type: 'app/error', payload: error.message });
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    if (response.data) return response.data;

    const message = 'unknown error';
    store.dispatch({ type: 'app/error', payload: message });
    return {
      code: 50000,
      message,
    };
  },
  error => {
    store.dispatch({ type: 'app/error', payload: error.message });
    return Promise.reject(error);
  },
);

export default instance;
