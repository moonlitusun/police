import React from "react";
import { ErrorBoundary } from "react-error-boundary";

const data = { username: "example" };

function postData(data) {
  fetch("http://localhost:6001/log", {
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

const myErrorHandler = (error, info) => {
  postData({
    message: { message: error.message, stack: info.componentStack },
    level: "error",
  });
  console.log(typeof error, JSON.stringify(error), info);
  // Do something with the error
  // E.g. log to an error logging client here
};

export function ErrorBoundaryWithLogger(props) {
  const { children } = props;

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={myErrorHandler}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
