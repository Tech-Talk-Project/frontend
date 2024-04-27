import React, { Suspense } from "react";
import Loader from "../components/Common/Loader";
import PostCreatePageMain from "../components/Board/PostCreate/PostCreatePageMain";

export default function PostCreatePage() {
  return (
    <main className="flex justify-center w-full h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-5rem)]">
      <Suspense fallback={<Loader />}>
        <PostCreatePageMain />
      </Suspense>
    </main>
  );
}
