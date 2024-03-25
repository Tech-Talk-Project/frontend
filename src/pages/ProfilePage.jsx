import React, { Suspense } from "react";
import ProfilePageMain from "../components/Profile/ProfilePageMain";
import Loader from "../components/Common/Loader";

export default function ProfilePage() {
  return (
    <main className="flex flex-col md:flex-row gap-6 px-5 py-8">
      <Suspense fallback={<Loader />}>
        <ProfilePageMain />
      </Suspense>
    </main>
  );
}
