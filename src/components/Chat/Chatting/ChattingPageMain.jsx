import React, { useState } from "react";
import ChattingColumn from "./ChattingColumn";

export default function ChattingPageMain({ chatRoomId }) {
  const [chatList, setChatList] = useState([]);

  return (
    <div>
      <ChattingColumn
        chatRoomId={chatRoomId}
        chatList={chatList}
        setChatList={setChatList}
      />
    </div>
  );
}
