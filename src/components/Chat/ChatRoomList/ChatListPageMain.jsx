import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, List } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import { CHAT_QUERY_KEYS } from "../../../constants/queryKeys";
import { getChatList } from "../../../apis/chat";
import ChatRoom from "./ChatRoom";
import NullChatList from "./NullChatList";
import useChatNotification from "../../../hooks/useChatNotification";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../../../utils/cookie";

export default function ChatListPageMain() {
  const [chatRooms, setChatRooms] = useState([]);
  const {
    data: { chatRoomList },
    error,
  } = useQuery({
    queryKey: CHAT_QUERY_KEYS.chatList,
    queryFn: getChatList,
  });
  const { connect, disconnect } = useChatNotification(
    "NEW_CHAT_NOTIFICATION",
    jwtDecode(getCookie("accessToken")).memberId,
    (newChatRoom) => {
      setChatRooms((prev) => [JSON.parse(newChatRoom), ...prev]);
    }
  );

  useEffect(() => {
    if (chatRoomList) {
      setChatRooms(chatRoomList);
    }
  }, [chatRoomList]);

  useEffect(() => {
    connect();

    return () => disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <div>{error.message}</div>;
  }
  return chatRoomList.length === 0 ? (
    <NullChatList />
  ) : (
    <Card className="my-4 w-full max-w-2xl bg-light_black">
      <List>
        {chatRooms.map((chatRoom) => (
          <ChatRoom
            key={uuidv4()}
            chatRoom={chatRoom}
            chatRooms={chatRooms}
            setChatRooms={setChatRooms}
          />
        ))}
      </List>
    </Card>
  );
}
