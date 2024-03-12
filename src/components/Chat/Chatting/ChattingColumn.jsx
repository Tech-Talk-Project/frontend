import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { jwtDecode } from "jwt-decode";
import { CHAT_QUERY_KEYS } from "../../../constants/queryKeys";
import useChat from "../../../hooks/useChat";
import { getCookie } from "../../../utils/cookie";
import { getChattingData } from "../../../apis/chat";

export default function ChattingColumn({ chatRoomId, chatList, setChatList }) {
  // const [chat, setChat] = useState("");
  const { error, data } = useQuery({
    queryKey: CHAT_QUERY_KEYS.chatData(chatRoomId),
    queryFn: () => getChattingData({ chatRoomId }),
  });

  const handleChatList = (newChat) => {
    setChatList((prev) => [...prev, JSON.parse(newChat).content]);
  };
  const { connect, disconnect, sendMessage } = useChat(
    "CHAT_ROOM",
    chatRoomId,
    jwtDecode(getCookie("accessToken")).memberId,
    handleChatList
  );
  // const handleChange = (e) => {
  //   setChat(e.target.value);
  // };

  useEffect(() => {
    setChatList(data.messages);
  }, [data]);

  useEffect(() => {
    connect();

    return () => disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <ul>
      {chatList.map((chat) => (
        <li key={uuidv4()}>{chat.content}</li>
      ))}
    </ul>
  );
}
