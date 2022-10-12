
import { Logger } from './logger';

export interface ErrorData {
  type: string;
  message: string;
  stack: any;
}

export type Callback = (error: ErrorData) => void;

export function browserErrorHandle(logger: Logger, error: any, callback: Callback = () => undefined) {
  let err_data: ErrorData | null = null;

  let { type, reason = {}, error: errorStack } = error;
  const { message, stack } = errorStack || reason;
  
  console.log('[Police]', error, '<-- ');
  if (error instanceof Error) {
    err_data = {
      type,
      message,
      stack,
    };
  } else {
    err_data = {
      type: type || "other",
      message,
      stack,
    };
  }

  if (err_data) {
    callback(err_data);
    logger.error(err_data);
  };
}

export function watchGlobalError(logger: Logger, callback: Callback) {
  window.addEventListener(
    "error",
    (error) => {
      browserErrorHandle(logger, error, callback);
    },
    true
  );

  window.addEventListener("unhandledrejection", (error) => {
    browserErrorHandle(logger, error, callback);

    error.preventDefault();
  });
}
