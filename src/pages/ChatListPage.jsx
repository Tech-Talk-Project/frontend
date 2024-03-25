import React, { Suspense } from "react";
import ChatListPageMain from "../components/Chat/ChatRoomList/ChatListPageMain";
import Loader from "../components/Common/Loader";

export default function ChatListPage() {
  return (
    <main className="flex justify-center w-full h-full">
      <Suspense fallback={<Loader />}>
        <ChatListPageMain />
      </Suspense>
    </main>
  );
}
