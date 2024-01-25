import React from "react";
import Logo from "../Common/Image/Logo";
import { Typography, Spinner } from "@material-tailwind/react";

export default function LoginLoading() {
  return (
    <>
      <Logo size="lg" />
      <section className="text-center mt-8 w-60">
        <Typography variant="h6">로그인 중입니다.</Typography>
        <Typography variant="h6">잠시만 기다려주세요.</Typography>
      </section>
      <Spinner className="mb-12 h-10 w-10 text-brand" />
    </>
  );
}
