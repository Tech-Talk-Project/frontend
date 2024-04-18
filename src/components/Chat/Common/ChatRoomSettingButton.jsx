import React from "react";
import {
  MdOutlineMoreVert,
  MdExitToApp,
  MdSubtitles,
  MdGroupAdd,
} from "react-icons/md";
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
import { useRecoilValue } from "recoil";
import { memberIdState } from "../../../recoil/atoms/auth";
import useModal from "../../../hooks/useModal";
import TitleChangeComfirmModal from "../Modal/TitleChangeComfirmModal";
import InviteModal from "../Modal/InviteModal/InviteModal";

export default function ChatRoomSettingButton({
  title,
  chatRoomId,
  ownerId,
  nowChatRoomId,
  setChatRooms,
  invite,
}) {
  const navigate = useNavigate();
  const [isTitleChangeModalOpen, setIsTitleChangeModalOpen] = useModal();
  const [isInviteModalOpen, setIsInviteModalOpen] = useModal();
  const memberId = useRecoilValue(memberIdState);
  const chatRoomExitMutate = useMutation({
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

  const handleTitleChangeClick = (e) => {
    e.stopPropagation();
    setIsTitleChangeModalOpen();
  };
  const handleInviteClick = (e) => {
    e.stopPropagation();
    setIsInviteModalOpen();
  };
  const handleExitClick = (e) => {
    e.stopPropagation();
    chatRoomExitMutate.mutate({ chatRoomId });
  };
  return (
    <>
      <Menu placement="bottom-end">
        <MenuHandler>
          <Button
            ripple={false}
            variant="text"
            className="p-1 text-white hover:text-blue-gray-400 duration-150"
          >
            <MdOutlineMoreVert size={20} />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {ownerId === memberId && (
            <MenuItem
              className="flex items-center gap-2 p-2"
              onClick={handleTitleChangeClick}
            >
              <MdSubtitles size={20} />
              <Typography variant="h6">채팅방 이름 변경</Typography>
            </MenuItem>
          )}
          {invite && (
            <MenuItem
              className="flex items-center gap-2 p-2"
              onClick={handleInviteClick}
            >
              <MdGroupAdd size={20} />
              <Typography variant="h6">유저 초대</Typography>
            </MenuItem>
          )}
          <MenuItem
            className="flex items-center gap-2 p-2 hover:!text-red-700"
            onClick={handleExitClick}
          >
            <MdExitToApp size={20} />
            <Typography variant="h6">나가기</Typography>
          </MenuItem>
        </MenuList>
      </Menu>
      <TitleChangeComfirmModal
        isOpen={isTitleChangeModalOpen}
        setIsOpen={setIsTitleChangeModalOpen}
        chatRoomId={chatRoomId}
        title={title}
        onTitleChangeClick={handleTitleChangeClick}
      />
      <InviteModal
        isOpen={isInviteModalOpen}
        setIsOpen={setIsInviteModalOpen}
      />
    </>
  );
}
