import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { isLoggedInState } from "../../recoil/atoms/auth";
import { USERS_QUERY_KEYS } from "../../constants/queryKeys";
import {
  follow,
  getUserData,
  getUserDataWithLogin,
  unFollow,
} from "../../apis/user";
import Information from "./Modal/Information";
import Introduction from "./Modal/Introduction";
import Links from "./Modal/Links";
import Skills from "./Modal/Skills";
import Description from "./Modal/Description";
import ProfileImage from "../Common/Image/ProfileImage";
import Button from "../Common/Button";
import { queryClient } from "../../apis/queryClient";

export default function UserDetailPageMain() {
  const { selectedMemberId } = useParams();
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const {
    data: {
      imageUrl,
      detailedDescription,
      info,
      introduction,
      links,
      skills,
      following,
    },
  } = useQuery({
    queryKey: isLoggedIn
      ? USERS_QUERY_KEYS.userDataWithFollowData(selectedMemberId)
      : USERS_QUERY_KEYS.userData(selectedMemberId),
    queryFn: () => {
      if (isLoggedIn)
        return getUserDataWithLogin({
          selectedMemberId,
        });
      return getUserData({
        selectedMemberId,
      });
    },
  });
  const followMutate = useMutation({
    mutationFn: () => follow({ selectedMemberId }),
    onSuccess: () => {
      queryClient.invalidateQueries(
        USERS_QUERY_KEYS.userDataWithFollowData(selectedMemberId)
      );
    },
  });
  const unFollowMutate = useMutation({
    mutationFn: () => unFollow({ selectedMemberId }),
    onSuccess: () => {
      queryClient.invalidateQueries(
        USERS_QUERY_KEYS.userDataWithFollowData(selectedMemberId)
      );
    },
  });

  const handleFollowClick = () => {
    if (following) {
      unFollowMutate.mutate({ selectedMemberId });
      return;
    }
    followMutate.mutate({ selectedMemberId });
  };
  return (
    <>
      <section className="flex flex-col items-center gap-4 p-4 w-full md:w-[320px] shrink-0">
        <ProfileImage size="lg" imageUrl={imageUrl} />
        <Button
          className={`mt-4 py-2 w-full text-base border ${
            following
              ? "border-blue-gray-600"
              : "bg-brand border-brand hover:bg-black hover:border-blue-gray-600"
          } duration-150`}
          onClick={handleFollowClick}
        >
          {following ? "following" : "follow"}
        </Button>
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