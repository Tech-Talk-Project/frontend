import React from "react";
import ErrorMessage from "../Error/ErrorMessage";
import { getErrorMessage } from "../../utils/getErrorMessage";

export default function GlobalErrorFallback({ error, reset }) {
  const { title, content, buttonMessage, path } = getErrorMessage(error);

  return (
    <ErrorMessage
      title={title}
      content={content}
      buttonMessage={buttonMessage}
      path={path}
      onRetry={reset}
    />
  );
}
