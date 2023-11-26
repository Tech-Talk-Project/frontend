import React from "react";
import { getErrorMessage } from "../../utils/getErrorMessage";
import ErrorMessage from "../Error/ErrorMessage";

export default function LoginErrorFallback({ error }) {
  const status = error.response?.status;
  const { title, content, buttonMessage } = getErrorMessage(error);

  if (status === 409) {
    return (
      <ErrorMessage
        title={title}
        content={content}
        buttonMessage={buttonMessage}
        path="/login"
      />
    );
  }

  throw error;
}
