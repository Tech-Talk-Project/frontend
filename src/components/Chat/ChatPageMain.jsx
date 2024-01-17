import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CHAT_QUERY_KEYS } from "../../constants/queryKeys";
import { getFakeChatList } from "../../apis/chat";
import ChatRoomList from "./ChatRoomList";

export default function ChatPageMain() {
  const { data, error } = useQuery({
    queryKey: CHAT_QUERY_KEYS.chatList,
    queryFn: getFakeChatList,
  });

  if (error) {
    return <div>{error.message}</div>;
  }
  console.log(data);
  return (
    <>
      <ChatRoomList chatRoomList={data.chatRoomList} />
    </>
  );
}
