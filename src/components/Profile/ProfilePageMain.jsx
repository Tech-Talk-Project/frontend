import React from "react";
import ProfileImage from "../Common/Image/ProfileImage";
import Information from "./Information/Information";
import Introduction from "./Introduction/Introduction";
import Links from "./Link/Links";
import Skills from "./Skill/Skills";
import Description from "./Description/Description";
import useProfiles from "../../hooks/useProfiles";
import Button from "../Common/Button";
import useModal from "../../hooks/useModal";
import QuitModal from "./Common/QuitModal";

export default function ProfilePageMain() {
  const [isOpen, setIsOpen] = useModal();
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
    quitMutate,
  } = useProfiles();

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
      <section className="flex flex-col items-center gap-2 p-0 sm:p-4 w-full md:w-[320px] shrink-0">
        <ProfileImage size="lg" imageUrl={imageUrl} />
        <Information info={info} />
        <Introduction introduction={introduction} />
        <Links links={links} />
      </section>
      <section className="flex flex-col items-end gap-4 p-0 sm:p-4 md:p-0 md:pr-4 min-h-full grow">
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
