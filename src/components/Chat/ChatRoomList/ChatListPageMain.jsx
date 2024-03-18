import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Card, List } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import { CHAT_QUERY_KEYS } from "../../../constants/queryKeys";
import { getChatList } from "../../../apis/chat";
import ChatRoom from "./ChatRoom";
import NullChatList from "./NullChatList";
import useChatNotification from "../../../hooks/useChatNotification";
import { useRecoilValue } from "recoil";
import { memberIdState } from "../../../recoil/atoms/auth";

export default function ChatListPageMain() {
  const { chatRoomId: nowChatRoomId } = useParams();
  const [chatRooms, setChatRooms] = useState([]);
  const memberId = useRecoilValue(memberIdState);
  const {
    data: { chatRoomList },
    error,
  } = useQuery({
    queryKey: CHAT_QUERY_KEYS.chatList,
    queryFn: getChatList,
  });
  const { connect, disconnect } = useChatNotification(
    "NEW_CHAT_NOTIFICATION",
    memberId,
    (newChatRoom) => {
      setChatRooms((prev) => [JSON.parse(newChatRoom), ...prev]);
    }
  );

  useEffect(() => {
    if (chatRoomList.length === 0) return;

    setChatRooms(chatRoomList);
  }, [chatRoomList]);

  useEffect(() => {
    if (nowChatRoomId) {
      setChatRooms((prev) =>
        prev.map((chatRoom) =>
          chatRoom.chatRoomId === nowChatRoomId
            ? { ...chatRoom, unreadCount: 0 }
            : chatRoom
        )
      );
    }
  }, [nowChatRoomId, chatRoomList]);

  useEffect(() => {
    connect();

    return () => disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <div>{error.message}</div>;
  }
  return chatRooms.length === 0 ? (
    <NullChatList />
  ) : (
    <Card className="my-4 w-full max-w-2xl max-h-full h-full bg-light_black overflow-y-auto">
      <List>
        {chatRooms.map((chatRoom) => (
          <ChatRoom
            key={uuidv4()}
            chatRoom={chatRoom}
            nowChatRoomId={nowChatRoomId}
            chatRooms={chatRooms}
            setChatRooms={setChatRooms}
          />
        ))}
      </List>
    </Card>
  );
}
