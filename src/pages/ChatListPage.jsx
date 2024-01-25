import React, { Suspense } from "react";
import { Spinner } from "@material-tailwind/react";
import ChatListPageMain from "../components/Chat/ChatRoomList/ChatListPageMain";

export default function ChatListPage() {
  return (
    <main className="flex justify-center w-full h-full">
      <Suspense fallback={<Spinner />}>
        <ChatListPageMain />
      </Suspense>
    </main>
  );
}
