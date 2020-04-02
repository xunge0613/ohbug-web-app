/* eslint-disable no-underscore-dangle */

import axios from 'axios';
import { getDvaApp } from 'umi';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 100000,
});

instance.interceptors.request.use(
  (response) => response,
  (error) => {
    const store = getDvaApp()._store;
    store.dispatch({ type: 'app/error', payload: error.message });
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    if (response.data) return response.data;
    const store = getDvaApp()._store;
    const message = 'unknown error';
    store.dispatch({ type: 'app/error', payload: message });
    return {
      code: 50000,
      message,
    };
  },
  (error) => {
    const store = getDvaApp()._store;
    store.dispatch({ type: 'app/error', payload: error.message });
    return Promise.reject(error);
  },
);

export default instance;
