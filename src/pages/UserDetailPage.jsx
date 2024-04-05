import React, { Suspense } from "react";
import Loader from "../components/Common/Loader";
import UserDetailPageMain from "../components/UserDetail/UserDetailPageMain";

export default function UserDetailPage() {
  return (
    <main className="flex flex-col md:flex-row gap-6 px-5 py-8">
      <Suspense fallback={<Loader />}>
        <UserDetailPageMain />
      </Suspense>
    </main>
  );
}
