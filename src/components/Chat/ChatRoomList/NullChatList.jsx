import React from "react";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { BsFillChatDotsFill } from "@react-icons/all-files/bs/BsFillChatDotsFill";
import Button from "../../Common/Button";
import { useSetRecoilState } from "recoil";
import { createNewChatState } from "../../../recoil/atoms/newChat";
import { PATH } from "../../../constants/path";

export default function NullChatList() {
  const navigate = useNavigate();
  const setCreateNewChat = useSetRecoilState(createNewChatState);

  const handleNewChatClick = () => {
    navigate(PATH.home);
    setCreateNewChat(true);
  };
  return (
    <section className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center gap-4 p-4">
      <BsFillChatDotsFill size={40} />
      <Typography
        variant="paragraph"
        className="text-center font-normal text-gray-600"
      >
        버튼을 클릭해 채팅방을 생성하고 유저를 초대해 보세요!
      </Typography>
      <Button
        className="mt-4 py-2 bg-brand text-sm font-semibold hover:bg-white hover:text-brand"
        onClick={handleNewChatClick}
      >
        채팅하기
      </Button>
    </section>
  );
}
