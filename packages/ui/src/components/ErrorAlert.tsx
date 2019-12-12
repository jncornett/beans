import * as React from "react";
import Alert from "react-bootstrap/Alert";

export const ErrorAlert = ({ error }: { error: Error }): JSX.Element => {
  const message = (() => {
    if ((error as any).networkError) {
      const { statusCode, bodyText } = (error as any).networkError as any;
      if (statusCode) {
        return `${statusCode}: ${bodyText}`;
      }
    }
    return error.message;
  })();
  return (
    <Alert variant="danger">
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      {message}
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </Alert>
  );
};
