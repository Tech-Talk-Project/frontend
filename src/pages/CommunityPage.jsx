import React, { Suspense, useState } from "react";
import SideBar from "../components/Community/SideBar/SideBar";
import CommunityPageMain from "../components/Community/CommunityPageMain";
import Loader from "../components/Common/Loader";

export default function CommunityPage() {
  const [type, setType] = useState("project");

  return (
    <main className="flex w-full h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-5rem)]">
      <SideBar type={type} onTypeClick={setType} />
      <div className="p-4 ml-64 w-full">
        <Suspense fallback={<Loader />}>
          <CommunityPageMain />
        </Suspense>
      </div>
    </main>
  );
}
