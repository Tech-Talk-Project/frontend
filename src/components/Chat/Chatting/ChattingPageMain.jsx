import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CHAT_QUERY_KEYS } from "../../../constants/queryKeys";
import { getChattingData } from "../../../apis/chat";
import useChat from "./useChat";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../../../utils/cookie";

export default function ChattingPageMain({ chatRoomId }) {
  const [chat, setChat] = useState("");
  const [chatList, setChatList] = useState([]);
  const { error, data } = useQuery({
    queryKey: CHAT_QUERY_KEYS.chatData(chatRoomId),
    queryFn: () => getChattingData({ chatRoomId }),
  });
  const { connect, disconnect, sendMessage } = useChat(
    chatRoomId,
    jwtDecode(getCookie("accessToken")).memberId,
    setChatList,
    setChat
  );

  const handleChange = (e) => {
    setChat(e.target.value);
  };
  const handleClick = () => {
    sendMessage(chat);
  };

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  useEffect(() => {
    if (data) {
      setChatList(data.messages.map((chat) => chat.content));
    }
  }, [data]);

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <ul>
        {chatList.map((chat, index) => (
          <li key={index}>{chat}</li>
        ))}
      </ul>
      <input
        className="text-black"
        type="text"
        value={chat}
        onChange={handleChange}
      />
      <button onClick={handleClick}>submit</button>
    </div>
  );
}
