import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import ChattingPageMain from "../components/Chat/Chatting/ChattingPageMain";
import Loader from "../components/Common/Loader";

export default function ChattingPage() {
  const { chatRoomId } = useParams();

  return (
    <main>
      <Suspense fallback={<Loader />}>
        <ChattingPageMain chatRoomId={chatRoomId} />
      </Suspense>
    </main>
  );
}
