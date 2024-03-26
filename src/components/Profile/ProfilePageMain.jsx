import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../Common/Image/ProfileImage";
import Information from "./Information/Information";
import Introduction from "./Introduction/Introduction";
import Links from "./Link/Links";
import Skills from "./Skill/Skills";
import Description from "./Description/Description";
import useProfiles from "../../hooks/useProfiles";
import Button from "../Common/Button";
import { quit } from "../../apis/user";
import { useSetRecoilState } from "recoil";
import { isLoggedInState, memberIdState } from "../../recoil/atoms/auth";
import { removeCookie } from "../../utils/cookie";
import newChatMemberState from "../../recoil/atoms/newChatMember";
import useModal from "../../hooks/useModal";
import QuitModal from "./Common/QuitModal";

export default function ProfilePageMain() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useModal();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setMemberId = useSetRecoilState(memberIdState);
  const setNewChatMembers = useSetRecoilState(newChatMemberState);
  const {
    profileQuery: {
      data: {
        imageUrl,
        detailedDescription,
        info,
        introduction,
        links,
        skills,
      },
      error,
    },
  } = useProfiles();
  const quitMutate = useMutation({
    mutationFn: quit,
    onSuccess: () => {
      setIsLoggedIn(false);
      setMemberId(null);
      setNewChatMembers([]);
      removeCookie("accessToken", { path: "/" });
      navigate("/");
    },
  });

  const handleQuitButtonClick = () => {
    setIsOpen();
  };
  const handleQuitClick = () => {
    quitMutate.mutate();
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <section className="flex flex-col items-center gap-2 p-4 w-full md:w-[320px] shrink-0">
        <ProfileImage size="lg" imageUrl={imageUrl} />
        <Information info={info} />
        <Introduction introduction={introduction} />
        <Links links={links} />
      </section>
      <section className="flex flex-col items-end gap-4 p-4 md:p-0 md:pr-4 min-h-full grow">
        <Skills skills={skills} />
        <Description description={detailedDescription} />
        <Button
          variant="text"
          className="p-2 text-red-700 text-xs sm:text-sm"
          onClick={handleQuitButtonClick}
        >
          탈퇴하기
        </Button>
        <QuitModal
          isOpen={isOpen}
          onOpenClick={setIsOpen}
          onQuitClick={handleQuitClick}
        />
      </section>
    </>
  );
}
