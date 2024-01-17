import React, { Suspense } from "react";
import { Spinner } from "@material-tailwind/react";
import ChatPageMain from "../components/Chat/ChatPageMain";

export default function ChattingPage() {
  return (
    <main className="flex w-full h-full">
      <Suspense fallback={<Spinner />}>
        <ChatPageMain />
      </Suspense>
    </main>
  );
}
