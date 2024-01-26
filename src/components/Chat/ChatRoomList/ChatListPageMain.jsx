import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, List } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import { CHAT_QUERY_KEYS } from "../../../constants/queryKeys";
import { getChatList } from "../../../apis/chat";
import ChatRoom from "./ChatRoom";

export default function ChatListPageMain() {
  const {
    data: { chatRoomList },
    error,
  } = useQuery({
    queryKey: CHAT_QUERY_KEYS.chatList,
    queryFn: getChatList,
  });

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <Card className="my-4 w-full max-w-2xl bg-light_black">
      <List>
        {chatRoomList.map((chatRoom) => (
          <ChatRoom key={uuidv4()} chatRoom={chatRoom} />
        ))}
      </List>
    </Card>
  );
}
