import { message, notification } from 'antd';
import { history, ErrorShowType } from 'umi';
// eslint-disable-next-line import/no-extraneous-dependencies
import type { Context } from 'umi-request';

interface ErrorInfoStructure {
  success: boolean;
  data?: any;
  errorCode?: string;
  errorMessage?: string;
  showType?: ErrorShowType;
  traceId?: string;
  host?: string;
  [key: string]: any;
}
interface RequestError extends Error {
  data?: any;
  info?: ErrorInfoStructure;
  request?: Context['req'];
  response?: Context['res'];
}

const DEFAULT_ERROR_PAGE = '/exception';

const errorHandler = (error: RequestError) => {
  let errorInfo: ErrorInfoStructure | undefined;
  if (error.name === 'ResponseError' && error.data && error.request) {
    errorInfo = error.data;
    // eslint-disable-next-line no-param-reassign
    error.message = errorInfo?.errorMessage || error.message;
    // eslint-disable-next-line no-param-reassign
    error.info = errorInfo;
  }
  errorInfo = error.info;

  if (errorInfo) {
    const errorMessage = errorInfo?.errorMessage;
    const errorCode = errorInfo?.errorCode;

    switch (errorInfo?.showType) {
      case ErrorShowType.SILENT:
        // do nothing
        break;
      case ErrorShowType.WARN_MESSAGE:
        message.warn(errorMessage);
        break;
      case ErrorShowType.ERROR_MESSAGE:
        message.error(errorMessage);
        break;
      case ErrorShowType.NOTIFICATION:
        notification.open({
          message: errorMessage,
        });
        break;
      case ErrorShowType.REDIRECT:
        // @ts-ignore
        history.push({
          pathname: DEFAULT_ERROR_PAGE,
          query: { errorCode, errorMessage },
        });
        // redirect to error page
        break;
      default:
        message.error(errorMessage);
        break;
    }
  } else {
    message.error(error.message || 'Request error, please retry.');
  }
};

export default errorHandler;
