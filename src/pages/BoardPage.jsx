import React, { Suspense } from "react";
import SideBar from "../components/Board/Board/SideBar/SideBar";
import BoardPageMain from "../components/Board/Board/BoardPageMain";
import Loader from "../components/Common/Loader";

export default function BoardPage() {
  return (
    <main className="flex w-full h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-5rem)]">
      <SideBar />
      <div className="p-4 md:ml-64 w-full overflow-x-hidden">
        <Suspense fallback={<Loader />}>
          <BoardPageMain />
        </Suspense>
      </div>
    </main>
  );
}
