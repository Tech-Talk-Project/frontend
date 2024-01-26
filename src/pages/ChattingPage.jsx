import { Spinner } from "@material-tailwind/react";
import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import ChattingPageMain from "../components/Chat/Chatting/ChattingPageMain";

export default function ChattingPage() {
  const { chatRoomId } = useParams();

  return (
    <main>
      <Suspense fallback={<Spinner />}>
        <ChattingPageMain chatRoomId={chatRoomId} />
      </Suspense>
    </main>
  );
}
