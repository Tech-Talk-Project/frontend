import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CHAT_QUERY_KEYS } from "../../../constants/queryKeys";
import { getChattingData } from "../../../apis/chat";

export default function ChattingPageMain({ chatRoomId }) {
  const { error, data } = useQuery({
    queryKey: CHAT_QUERY_KEYS.chatData(chatRoomId),
    queryFn: () => getChattingData({ chatRoomId }),
  });

  if (error) {
    return <div>{error.message}</div>;
  }
  return <div>{chatRoomId}</div>;
}
