import React, { Suspense } from "react";
import LoginPageMain from "../components/Login/LoginPageMain";
import LoginLoading from "../components/Login/LoginLoading";
import ErrorBoundary from "../components/Error/ErrorBoundary";
import LoginErrorFallback from "../components/Login/LoginErrorFallback";
import { Typography } from "@material-tailwind/react";

export default function LoginCallbackPage() {
  return (
    <main className="relative flex flex-col justify-center items-center gap-8 sm:border px-20 py-12 border-line rounded-lg">
      <Suspense fallback={<LoginLoading />}>
        <ErrorBoundary fallback={LoginErrorFallback}>
          <LoginPageMain />
        </ErrorBoundary>
      </Suspense>
      <Typography className="hidden md:block absolute -left-40 my-auto text-8xl font-bold blur-sm">
        <span className="text-brand">T</span>ech
      </Typography>
      <Typography className="hidden md:block absolute -right-32 my-auto text-8xl font-bold blur-sm">
        <span className="text-brand">T</span>alk
      </Typography>
    </main>
  );
}
