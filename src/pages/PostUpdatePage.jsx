import React, { Suspense } from "react";
import Loader from "../components/Common/Loader";
import PostUpdatePageMain from "../components/Board/PostUpdate/PostUpdatePageMain";

export default function PostUpdatePage() {
  return (
    <main className="flex justify-center w-full h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-5rem)]">
      <Suspense fallback={<Loader />}>
        <PostUpdatePageMain />
      </Suspense>
    </main>
  );
}
