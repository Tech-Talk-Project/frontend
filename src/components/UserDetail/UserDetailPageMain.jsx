import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { memberIdState } from "../../recoil/atoms/auth";
import { USERS_QUERY_KEYS } from "../../constants/queryKeys";
import { getUserData } from "../../apis/user";
import Information from "./Modal/Information";
import Introduction from "./Modal/Introduction";
import Links from "./Modal/Links";
import Skills from "./Modal/Skills";
import Description from "./Modal/Description";
import ProfileImage from "../Common/Image/ProfileImage";

export default function UserDetailPageMain() {
  const { selectedMemberId } = useParams();
  const memberId = useRecoilValue(memberIdState);
  const {
    data: { imageUrl, detailedDescription, info, introduction, links, skills },
  } = useQuery({
    queryKey: USERS_QUERY_KEYS.userData(selectedMemberId),
    queryFn: () =>
      getUserData({ memberId: memberId ? memberId : -1, selectedMemberId }),
  });
  return (
    <>
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
    </>
  );
}
