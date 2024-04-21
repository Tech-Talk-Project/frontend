import React, { Suspense } from "react";
import Loader from "../components/Common/Loader";
import PostPageMain from "../components/Board/Post/PostPageMain";

export default function PostPage() {
  return (
    <main className="flex justify-center h-full min-h-[calc(100vh-5rem)]">
      <Suspense fallback={<Loader />}>
        <PostPageMain />
      </Suspense>
    </main>
  );
}
