import React from "react";
import ErrorMessage from "../Error/ErrorMessage";

export default function LoginErrorFallback({ error }) {
  const status = error.response?.status;

  if (status === 409) {
    return (
      <ErrorMessage
        title="이미 해당 이메일의 아이디가 존재합니다."
        content="다른 소셜 서비스로 로그인해주세요."
        buttonMessage="로그인 페이지로 이동"
        path="/login"
      />
    );
  }

  if (status === 422) {
    return (
      <ErrorMessage
        title="소셜 서비스에 이메일이 존재하지 않습니다."
        content="다른 소셜 서비스로 로그인해주세요."
        buttonMessage="로그인 페이지로 이동"
        path="/login"
      />
    );
  }

  throw error;
}
