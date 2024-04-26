import React from "react";
import ErrorMessage from "../../Error/ErrorMessage";

export default function PostErrorFallback({ error }) {
  const status = error.response?.status;

  if (status === 400) {
    return (
      <ErrorMessage
        title="POST 아이디를 확인해주세요."
        content="존재하지 않는 게시물입니다."
        buttonMessage="돌아가기"
        path={-1}
      />
    );
  }
  throw error;
}
