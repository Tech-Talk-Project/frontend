import React, { memo } from "react";
import { Typography } from "@material-tailwind/react";
import { BsPeopleFill } from "@react-icons/all-files/bs/BsPeopleFill";
import Button from "../../Common/Button";
import ChatRoomSettingButton from "../Common/ChatRoomSettingButton";
import useModal from "../../../hooks/useModal";
import ChatRoomMembersModal from "./ChatRoomMembersModal";

const ChattingInfo = ({ title, ownerId, members, chatRoomId }) => {
  const [isOpen, setIsOpen] = useModal();

  return (
    <div className="flex items-center justify-between gap-6 px-2 pb-1 border-b border-blue-gray-800">
      <Typography variant="h5" className="w-full max-w-full truncate">
        {title}
      </Typography>
      <div className="flex gap-2">
        <Button
          aria-label="participants"
          variant="text"
          className="p-1 text-white hover:text-brand duration-150"
          onClick={setIsOpen}
        >
          <BsPeopleFill size={24} />
        </Button>
        <ChatRoomMembersModal
          isOpen={isOpen}
          onClick={setIsOpen}
          ownerId={ownerId}
          members={members}
        />
        <ChatRoomSettingButton
          title={title}
          ownerId={ownerId}
          chatRoomId={chatRoomId}
          nowChatRoomId={chatRoomId}
          invite={true}
        />
      </div>
    </div>
  );
};

export default memo(ChattingInfo);
