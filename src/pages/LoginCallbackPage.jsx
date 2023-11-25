import React, { Suspense } from "react";
import LoginPageMain from "../components/Auth/LoginPageMain";
import LoginLoading from "../components/Auth/LoginLoading";

export default function LoginCallbackPage() {
  return (
    <main className="flex flex-col justify-center items-center gap-8 border px-20 py-12 border-line rounded-lg">
      <Suspense fallback={<LoginLoading />}>
        <LoginPageMain />
      </Suspense>
    </main>
  );
}
