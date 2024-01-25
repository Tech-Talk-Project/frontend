import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Client } from "@stomp/stompjs";
// import { WebSocket } from "ws";
import { jwtDecode } from "jwt-decode";
import { CHAT_QUERY_KEYS } from "../../../constants/queryKeys";
import { getChattingData } from "../../../apis/chat";
import { getCookie } from "../../../utils/cookie";
import useChat from "./useChat";
import { Input } from "@material-tailwind/react";

// Object.assign(global, { WebSocket });

export default function ChattingPageMain({ chatRoomId }) {
  // const chatClient = useRef();
  const { error, data } = useQuery({
    queryKey: CHAT_QUERY_KEYS.chatData(chatRoomId),
    queryFn: () => getChattingData({ chatRoomId }),
  });
  const [chat, setChat] = useState("");
  const [chattingList, setChattingList] = useState([]);
  const { connect, disconnect, sendMessage } = useChat(
    chatRoomId,
    setChattingList,
    setChat
  );

  const handleChange = (e) => {
    // console.log(e.target.value);
    setChat(e.target.value);
  };
  const handleClick = () => {
    sendMessage(chat);
  };
  // const connect = () => {
  //   chatClient.current = new Client({
  //     brokerURL: "ws://localhost:8080/ws",
  //     connectHeaders: {
  //       memberId: jwtDecode(getCookie("accessToken")).memberId,
  //       chatRoomId,
  //     },
  //     debug: function (str) {
  //       console.log(str);
  //     },
  //     onConnect: () => {
  //       subscribe();
  //     },
  //     onStompError: (frame) => {
  //       console.error(frame);
  //     },
  //     // reconnectDelay: 5000, // 자동 재 연결
  //     heartbeatIncoming: 4000,
  //     heartbeatOutgoing: 4000,
  //   });

  //   chatClient.current.activate();
  // };
  // const disconnect = () => {
  //   chatClient.current.deactivate();
  // };
  // const subscribe = () => {
  //   chatClient.current.subscribe(
  //     `/topic/${chatRoomId}`,
  //     ({ body }) => {
  //       setChattingList((prev) => [...prev, JSON.parse(body)]);
  //     },
  //     { "auto-delete": true, durable: false, exclusive: false }
  //   );
  // };
  // const publish = (chat) => {
  //   if (!chatClient.current.connected) {
  //     return;
  //   }

  //   chatClient.current.publish({
  //     destination: `/pub/chat/message/${chatRoomId}`,
  //     body: JSON.stringify({
  //       content: chat,
  //       memberId: jwtDecode(getCookie("accessToken")).memberId,
  //     }),
  //   });

  //   setChat("");
  // };

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);
  useEffect(() => {
    if (data) {
      setChattingList(data.messages.map((chat) => chat.content));
    }
  }, [data]);
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <ul>
        {chattingList.map((chat, index) => (
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
