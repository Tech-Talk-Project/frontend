import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Common/Logo";
import Button from "../Common/Button";
import { Typography } from "@material-tailwind/react";

export default function LoginErrorFallback({ error }) {
  const status = error.response?.status;
  const navigate = useNavigate();

  if (status === 409) {
    return (
      <>
        <Logo size="lg" />
        <section className="text-center mt-8 w-60">
          <Typography variant="h6" className="mx-[-100%] whitespace-nowrap">
            이미 해당 이메일의 아이디가 존재합니다.
          </Typography>
          <Typography variant="h6">
            다른 소셜 서비스로 로그인해주세요.
          </Typography>
        </section>
        <Button
          onClick={() => navigate("/login")}
          className="text-base text-black bg-white hover:bg-brand hover:text-white duration-150"
        >
          로그인 페이지로 이동
        </Button>
      </>
    );
  }

  throw error;
}
