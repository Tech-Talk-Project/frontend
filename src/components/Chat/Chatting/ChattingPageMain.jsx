import React, { useState } from "react";
import ChattingColumn from "./ChattingColumn";
import ChatListPageMain from "../ChatRoomList/ChatListPageMain";

export default function ChattingPageMain({ chatRoomId }) {
  const [chatList, setChatList] = useState([]);

  return (
    <>
      <section className="w-80">
        <ChatListPageMain />
      </section>
      <ChattingColumn
        chatRoomId={chatRoomId}
        chatList={chatList}
        setChatList={setChatList}
      />
    </>
  );
}
