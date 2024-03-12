import React from "react";
import ChattingColumn from "./ChattingColumn";
import ChatListPageMain from "../ChatRoomList/ChatListPageMain";

export default function ChattingPageMain() {
  return (
    <>
      <section className="max-w-xs w-full w-">
        <ChatListPageMain />
      </section>
      <ChattingColumn />
    </>
  );
}
