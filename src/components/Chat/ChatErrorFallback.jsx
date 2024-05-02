import React from "react";
import ErrorMessage from "../Error/ErrorMessage";

export default function ChatErrorFallback({ error }) {
  const status = error.response?.status;

  if (status === 400) {
    return (
      <ErrorMessage
        title="존재하지 않는 채팅방입니다."
        content=""
        buttonMessage="돌아가기"
        path={-1}
      />
    );
  }

  throw error;
}
