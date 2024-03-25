import React from "react";
import ChattingColumn from "./ChattingColumn";
import ChatListPageMain from "../ChatRoomList/ChatListPageMain";

export default function ChattingPageMain() {
  return (
    <>
      <section className="hidden md:block max-w-xs w-full">
        <ChatListPageMain />
      </section>
      <ChattingColumn />
    </>
  );
}
