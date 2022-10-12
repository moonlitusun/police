import React, { useCallback } from 'react';
import { ErrorBoundary, ErrorBoundaryPropsWithFallback, FallbackProps } from "react-error-boundary";

function ErrorFallback(info: FallbackProps) {
  const { error, resetErrorBoundary } = info;

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export interface IErrorBoundaryProps extends ErrorBoundaryPropsWithFallback {
  children: React.ReactElement;
  logger: any;
  onError?: (error: Error, info: {
    componentStack: string;
  }) => void;
}

export function ErrorBoundaryWithLogger(props: IErrorBoundaryProps) {
  const { children, logger, onError = () => undefined, ...rest } = props;

  const errorHandler = useCallback<typeof onError>((error, info) => {
    onError(error, info);

    if (logger) {
      logger.error({ message: error.message, stack: info.componentStack });

      console.log(typeof error, JSON.stringify(error), info);
    };
  }, []);

  return (
    // @ts-ignore
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      {...rest}
      onError={errorHandler}
    >
      {children}
    </ErrorBoundary>
  );
}
