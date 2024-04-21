import React, { Suspense } from "react";
import Loader from "../components/Common/Loader";
import PostPageMain from "../components/Board/Post/PostPageMain";

export default function PostPage() {
  return (
    <main className="flex justify-center h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-5rem)]">
      <Suspense fallback={<Loader />}>
        <PostPageMain />
      </Suspense>
    </main>
  );
}
