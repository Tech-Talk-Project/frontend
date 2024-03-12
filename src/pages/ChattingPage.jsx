import React, { Suspense } from "react";
import ChattingPageMain from "../components/Chat/Chatting/ChattingPageMain";
import Loader from "../components/Common/Loader";

export default function ChattingPage() {
  return (
    <main className="flex">
      <Suspense fallback={<Loader />}>
        <ChattingPageMain />
      </Suspense>
    </main>
  );
}
