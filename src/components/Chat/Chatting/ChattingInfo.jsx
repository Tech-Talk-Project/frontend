import React from "react";
import { Typography } from "@material-tailwind/react";
import { MdPeopleAlt } from "react-icons/md";
import Button from "../../Common/Button";
import ChatRoomSettingButton from "../ChatRoomList/ChatRoomSettingButton";
import useModal from "../../../hooks/useModal";
import ChatRoomMembersModal from "./ChatRoomMembersModal";

export default function ChattingInfo({ title, members }) {
  const [isOpen, setIsOpen] = useModal();

  return (
    <div className="flex items-center justify-between gap-6 px-2 pb-1 border-b border-blue-gray-800">
      <Typography variant="h5" className="w-full max-w-full truncate">
        {title}
      </Typography>
      <div className="flex gap-2">
        <Button
          variant="text"
          className="p-1 text-white hover:text-brand duration-150"
          onClick={setIsOpen}
        >
          <MdPeopleAlt size={24} />
        </Button>
        <ChatRoomMembersModal
          isOpen={isOpen}
          onClick={setIsOpen}
          members={members}
        />
        <ChatRoomSettingButton />
      </div>
    </div>
  );
}
