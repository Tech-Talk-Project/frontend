import React, { Suspense } from "react";
import ChattingPageMain from "../components/Chat/Chatting/ChattingPageMain";
import Loader from "../components/Common/Loader";
import ErrorBoundary from "../components/Error/ErrorBoundary";
import ChatErrorFallback from "../components/Chat/ChatErrorFallback";

export default function ChattingPage() {
  return (
    <main className="block md:flex h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-5rem)]">
      <ErrorBoundary fallback={ChatErrorFallback}>
        <Suspense fallback={<Loader />}>
          <ChattingPageMain />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
