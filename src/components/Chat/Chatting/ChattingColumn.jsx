import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { jwtDecode } from "jwt-decode";
import { CHAT_QUERY_KEYS } from "../../../constants/queryKeys";
import useChat from "../../../hooks/useChat";
import { getCookie } from "../../../utils/cookie";
import { getChattingData } from "../../../apis/chat";
import ChatForm from "./ChatForm";

export default function ChattingColumn() {
  const { chatRoomId } = useParams();
  const [chatList, setChatList] = useState([]);
  const { error, data } = useQuery({
    queryKey: CHAT_QUERY_KEYS.chatData(chatRoomId),
    queryFn: () => getChattingData({ chatRoomId }),
  });

  const handleChatList = (newChat) => {
    setChatList((prev) => [...prev, JSON.parse(newChat)]);
  };
  const { connect, disconnect, sendMessage } = useChat(
    "CHAT_ROOM",
    chatRoomId,
    jwtDecode(getCookie("accessToken")).memberId,
    handleChatList
  );

  useEffect(() => {
    setChatList(data.messages);
  }, [data, setChatList]);

  useEffect(() => {
    connect();

    return () => disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomId]);

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <article>
      <ul className="grow">
        {chatList.map((chat) => (
          <li key={uuidv4()}>{chat.content}</li>
        ))}
      </ul>
      <ChatForm sendMessage={sendMessage} />
    </article>
  );
}
