import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import Button from "../../../Common/Button";
import { USERS_QUERY_KEYS } from "../../../../constants/queryKeys";
import { getUserData } from "../../../../apis/user";
import { useRecoilValue } from "recoil";
import { memberIdState } from "../../../../recoil/atoms/auth";
import ProfileImage from "../../../Common/Image/ProfileImage";
import Information from "./Information";
import Introduction from "./Introduction";
import Links from "./Links";
import Skills from "./Skills";
import Description from "./Description";

export default function UserDetailModal({
  isOpen,
  setIsOpen,
  selectedMemberId,
}) {
  const memberId = useRecoilValue(memberIdState);
  const {
    data: { imageUrl, detailedDescription, info, introduction, links, skills },
  } = useQuery({
    queryKey: USERS_QUERY_KEYS.userData(selectedMemberId),
    queryFn: () =>
      getUserData({ memberId: memberId ? memberId : -1, selectedMemberId }),
    enabled: isOpen,
  });

  return (
    <Dialog
      size="lg"
      open={isOpen}
      handler={setIsOpen}
      className="flex flex-col items-center p-4 bg-black border border-brand overflow-auto"
    >
      <DialogBody className="flex flex-col md:flex-row gap-6 grow p-0 w-full text-white">
        <section className="flex flex-col items-center gap-4 p-4 w-full md:w-[320px] shrink-0">
          <ProfileImage size="lg" imageUrl={imageUrl} />
          <Information info={info} />
          <Introduction introduction={introduction} />
          <Links links={links} />
        </section>
        <section className="flex flex-col items-end gap-4 p-4 h-full grow">
          <Skills skills={skills} />
          <Description content={detailedDescription} />
        </section>
      </DialogBody>
      <DialogFooter className="pb-0 md:p-4 w-full">
        <Button onClick={setIsOpen} className="outline-none">
          닫기
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
