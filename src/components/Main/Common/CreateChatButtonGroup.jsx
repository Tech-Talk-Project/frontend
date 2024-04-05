import React from "react";
import Button from "../../Common/Button";
import { useRecoilState, useSetRecoilState } from "recoil";
import { newChatMemberState } from "../../../recoil/atoms/newChat";
import { createNewChatState } from "../../../recoil/atoms/newChat";

export default function CreateChatButtonGroup({ onModalClick, mobile }) {
  const [newChatMembers, setNewChatMembers] =
    useRecoilState(newChatMemberState);
  const setCreateNewChat = useSetRecoilState(createNewChatState);

  const handleCancelClick = () => {
    setCreateNewChat((prev) => !prev);
    setNewChatMembers([]);
  };
  return (
    <div
      className={`flex gap-2 mb-4 ${
        mobile ? "" : "md:hidden fixed bottom-0 right-0 left-0 mx-4"
      }`}
    >
      <Button
        className="py-2 w-full text-sm font-semibold hover:bg-white hover:text-black"
        onClick={handleCancelClick}
      >
        취소
      </Button>
      <Button
        disabled={newChatMembers.length === 0}
        className="py-2 w-full bg-brand text-sm font-semibold hover:bg-white hover:text-brand disabled:opacity-100 disabled:bg-dark_brand disabled:text-blue-gray-100"
        onClick={onModalClick}
      >
        채팅하기
      </Button>
    </div>
  );
}
