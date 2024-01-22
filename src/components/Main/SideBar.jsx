import React from "react";
import { useRecoilState } from "recoil";
import { BsFillChatDotsFill } from "react-icons/bs";
import createNewChatState from "../../recoil/atoms/createNewChat";
import Button from "../Common/Button";
import newChatMemberState from "../../recoil/atoms/newChatMember";
import SideBarCategoryList from "./SideBarCategoryList";
import SideBarNewChatMemberList from "./SideBarNewChatMemberList";
import { Typography } from "@material-tailwind/react";
import NewChatTitleModal from "../Common/NewChatTitleModal";
import useModal from "../../hooks/useModal";

export default function SideBar() {
  const [isOpen, handleModalClick] = useModal();
  const [newChatMembers, setNewChatMembers] =
    useRecoilState(newChatMemberState);
  const [createNewChat, setCreateNewChat] = useRecoilState(createNewChatState);

  const handleNewChatClick = () => {
    setCreateNewChat((prev) => !prev);
  };
  const handleCancelClick = () => {
    handleNewChatClick();
    setNewChatMembers([]);
  };
  return (
    <section className="hidden md:block fixed top-20 left-0 max-w-[16rem] w-full h-main p-4 bg-light_black border-r border-blue-gray-800 rounded-none">
      <SideBarCategoryList createNewChat={createNewChat} />
      {createNewChat ? (
        <article
          className={`mt-4 w-full ${
            createNewChat ? "h-1/2 flex flex-col justify-between" : ""
          } border-t border-white overflow-auto`}
        >
          {newChatMembers.length === 0 ? (
            <Typography
              variant="paragraph"
              className="pt-4 text-gray-600 font-normal"
            >
              체크박스를 클릭해 멤버를 추가할 수 있습니다.
            </Typography>
          ) : (
            <SideBarNewChatMemberList newChatMembers={newChatMembers} />
          )}
          <div className="flex gap-2 mb-4">
            <Button
              className="py-2 w-full text-sm font-semibold hover:bg-white hover:text-black"
              onClick={handleCancelClick}
            >
              취소
            </Button>
            <Button
              disabled={newChatMembers.length === 0}
              className="py-2 w-full bg-brand text-sm font-semibold hover:bg-white hover:text-brand"
              onClick={handleModalClick}
            >
              채팅하기
            </Button>
          </div>
        </article>
      ) : (
        <Button
          variant="text"
          className="absolute bottom-8 left-7 p-3 text-white bg-brand hover:bg-white hover:text-brand rounded-full"
          onClick={handleNewChatClick}
        >
          <BsFillChatDotsFill size={24} />
        </Button>
      )}
      <NewChatTitleModal isOpen={isOpen} onClick={handleModalClick} />
    </section>
  );
}
