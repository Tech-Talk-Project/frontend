import React from "react";
import { MdOutlineMoreVert, MdExitToApp } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { exitChatRoom } from "../../../apis/chat";

export default function ChatRoomSettingButton({
  chatRoomId,
  nowChatRoomId,
  setChatRooms,
}) {
  const navigate = useNavigate();
  const chatRoomSettingMutate = useMutation({
    mutationFn: () => exitChatRoom({ chatRoomId }),
    onSuccess: () => {
      if (chatRoomId === nowChatRoomId) {
        navigate("/chatList", { replace: true });
      }
      setChatRooms((prevChatRooms) =>
        prevChatRooms.filter((room) => room.chatRoomId !== chatRoomId)
      );
    },
  });

  const handleClick = (e) => {
    e.stopPropagation();
    chatRoomSettingMutate.mutate({ chatRoomId });
  };
  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <Button
          ripple={false}
          variant="text"
          className="p-0 text-white hover:text-blue-gray-400 duration-150"
        >
          <MdOutlineMoreVert size={20} />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <MenuItem
          className="flex items-center gap-2 p-2 hover:!text-red-700"
          onClick={handleClick}
        >
          <MdExitToApp size={20} />
          <Typography variant="h6">나가기</Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
