import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Typography } from "@material-tailwind/react";
import { getHourAndMinutes } from "../../../utils/date";
import useChat from "../../../hooks/useChat";
import { memberIdState } from "../../../recoil/atoms/auth";
import { disconnectChatRoom } from "../../../apis/chat";
import ChatRoomSettingButton from "./ChatRoomSettingButton";

export default function ChatRoom({
  chatRoom: { chatRoomId, title, unreadCount, lastMessage, memberCount },
  nowChatRoomId,
  chatRooms,
  setChatRooms,
}) {
  const navigate = useNavigate();
  const memberId = useRecoilValue(memberIdState);
  const { connect, disconnect } = useChat(
    "CHAT_ROOM_LIST",
    chatRoomId,
    memberId,
    (newChat) => {
      const parsedChat = JSON.parse(newChat);
      const index = chatRooms.findIndex(
        (room) => room.chatRoomId === chatRoomId
      );

      if (index !== -1) {
        const updatedChatRoom = {
          ...chatRooms[index],
          unreadCount:
            nowChatRoomId === chatRoomId
              ? chatRooms[index].unreadCount
              : chatRooms[index].unreadCount + 1,
          lastMessage: {
            ...chatRooms[index].lastMessage,
            sendTime: parsedChat.sendTime,
            content: parsedChat.content,
          },
        };
        setChatRooms([
          updatedChatRoom,
          ...chatRooms.filter((room) => room.chatRoomId !== chatRoomId),
        ]);
      }
    }
  );

  const handleClick = async () => {
    if (nowChatRoomId) {
      await disconnectChatRoom({ chatRoomId: nowChatRoomId });
    }
    navigate(`/chatting/${chatRoomId}`);
  };

  useEffect(() => {
    connect();

    return () => disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className="flex flex-col gap-2 p-4 border text-white bg-blue-gray-900 border-line rounded-lg hover:border-brand duration-150 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center mr-2 truncate">
          <Typography variant="h5" className="mr-3 truncate">
            {title}
          </Typography>
          <Typography variant="paragraph" className="font-normal text-gray-600">
            {memberCount}
          </Typography>
        </div>
        <div className="relative flex gap-2">
          <Typography variant="small" className="font-normal">
            {getHourAndMinutes(new Date(lastMessage.sendTime))}
          </Typography>
          <ChatRoomSettingButton
            chatRoomId={chatRoomId}
            nowChatRoomId={nowChatRoomId}
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <Typography variant="paragraph" className="mr-2 font-normal truncate">
          {lastMessage.content}
        </Typography>
        {unreadCount !== 0 && (
          <div className="relative grid items-center font-bold uppercase whitespace-nowrap select-none text-white py-1 px-2 text-xs rounded-md bg-brand">
            <span>{unreadCount > 100 ? "100+" : unreadCount}</span>
          </div>
        )}
      </div>
    </div>
  );
}
