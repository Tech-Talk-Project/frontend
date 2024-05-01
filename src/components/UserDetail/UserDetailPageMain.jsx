import React from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
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
import { toastState } from "../../recoil/atoms/toast";

export default function UserDetailPageMain() {
  const { selectedMemberId } = useParams();
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const setToast = useSetRecoilState(toastState);
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
  } = useSuspenseQuery({
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
    onError: () => {
      setToast({
        isOpen: true,
        message: "죄송합니다. 잠시 후 다시 시도해주세요.",
      });
      setTimeout(() => {
        setToast({ isOpen: false, message: "" });
      }, 3000);
    },
  });
  const unFollowMutate = useMutation({
    mutationFn: () => unFollow({ selectedMemberId }),
    onSuccess: () => {
      queryClient.invalidateQueries(
        USERS_QUERY_KEYS.userDataWithFollowData(selectedMemberId)
      );
    },
    onError: () => {
      setToast({
        isOpen: true,
        message: "죄송합니다. 잠시 후 다시 시도해주세요.",
      });
      setTimeout(() => {
        setToast({ isOpen: false, message: "" });
      }, 3000);
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
        {isLoggedIn && (
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
        )}
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
