import React from "react";
import ErrorMessage from "../Error/ErrorMessage";

export default function MainErrorFallback({ error, reset }) {
  const status = error.response?.status;

  if (status === 400) {
    return (
      <ErrorMessage
        title="요청을 처리하는데 문제가 발생했습니다."
        content="잠시 후 다시 시도해주세요."
        buttonMessage="다시 시도"
        onRetry={reset}
      />
    );
  }

  throw error;
}
