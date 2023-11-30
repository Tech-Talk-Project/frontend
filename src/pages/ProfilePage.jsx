import React, { Suspense } from "react";
import ProfilePageMain from "../components/Profile/ProfilePageMain";
import { Spinner } from "@material-tailwind/react";

export default function ProfilePage() {
  return (
    <main className="flex gap-6 px-5 py-8">
      <Suspense fallback={<Spinner />}>
        <ProfilePageMain />
      </Suspense>
    </main>
  );
}
