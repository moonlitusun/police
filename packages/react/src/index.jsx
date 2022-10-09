import { useCallback } from 'react';
import { ErrorBoundary } from "react-error-boundary";

function postData(url, data) {
  fetch(`${url}/log`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function ErrorFallback(info) {
  const { error, resetErrorBoundary } = info;

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export function ErrorBoundaryWithLogger(props) {
  const { children, url, onError = () => undefined } = props;

  const errorHandler = useCallback((error, info) => {
    customErrorHandler();

    if (url) {
      postData(url, {
        message: { message: error.message, stack: info.componentStack },
        level: "error",
      });

      onError();
      console.log(typeof error, JSON.stringify(error), info)
    };
  }, [url]);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={errorHandler}
    >
      {children}
    </ErrorBoundary>
  );
}
