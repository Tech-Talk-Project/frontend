import React from "react";
import { useParams } from "react-router-dom";
import { Spinner, Typography } from "@material-tailwind/react";
import Logo from "../components/Common/Logo";

export default function LoginCallbackPage() {
  const { provider } = useParams();
  console.log(provider);
  return (
    <div className="flex justify-center items-center">
      <main className="flex flex-col justify-center items-center gap-8 border px-20 py-12 border-line rounded-lg">
        <Logo size="lg" />
        <section className="text-center mt-8 w-60">
          <Typography variant="h6">로그인 중입니다.</Typography>
          <Typography variant="h6">잠시만 기다려주세요.</Typography>
        </section>
        <Spinner className="mb-12 h-10 w-10 text-brand" />
      </main>
    </div>
  );
}
