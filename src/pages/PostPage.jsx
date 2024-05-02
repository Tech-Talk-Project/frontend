import React, { Suspense } from "react";
import Loader from "../components/Common/Loader";
import PostPageMain from "../components/Board/Post/PostPageMain";
import ErrorBoundary from "../components/Error/ErrorBoundary";
import PostErrorFallback from "../components/Board/Post/PostErrorFallback";

export default function PostPage() {
  return (
    <main className="flex justify-center h-full min-h-[calc(100vh-5rem)]">
      <ErrorBoundary fallback={PostErrorFallback}>
        <Suspense fallback={<Loader />}>
          <PostPageMain />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
