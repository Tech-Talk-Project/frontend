import React, { Suspense } from "react";
import ChattingPageMain from "../components/Chat/Chatting/ChattingPageMain";
import Loader from "../components/Common/Loader";

export default function ChattingPage() {
  return (
    <main className="block md:flex h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-5rem)]">
      <Suspense fallback={<Loader />}>
        <ChattingPageMain />
      </Suspense>
    </main>
  );
}
