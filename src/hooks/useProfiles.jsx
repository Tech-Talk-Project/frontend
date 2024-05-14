import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { PROFILE_QUERY_KEYS } from "../constants/queryKeys";
import {
  getProfile,
  setProfileDescription,
  setProfileInfo,
  setProfileIntroduction,
  setProfileLinks,
  setProfileSkills,
} from "../apis/profile";
import { queryClient } from "../apis/queryClient";
import { quit } from "../apis/user";
import { removeCookie } from "../utils/cookie";
import { isLoggedInState, memberIdState } from "../recoil/atoms/auth";
import { newChatMemberState } from "../recoil/atoms/newChat";
import { toastState } from "../recoil/atoms/toast";
import { PATH } from "../constants/path";

export default function useProfiles() {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setMemberId = useSetRecoilState(memberIdState);
  const setNewChatMembers = useSetRecoilState(newChatMemberState);
  const setToast = useSetRecoilState(toastState);

  const onSuccessFn = async () => {
    await queryClient.invalidateQueries(PROFILE_QUERY_KEYS.myProfile);
  };
  const onErrorFn = () => {
    setToast({
      isOpen: true,
      message: "죄송합니다. 잠시 후 다시 시도해주세요.",
    });
    setTimeout(() => {
      setToast({ isOpen: false, message: "" });
    }, 3000);
  };

  const profileQuery = useSuspenseQuery({
    queryKey: PROFILE_QUERY_KEYS.myProfile,
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000,
  });

  const setInfoMutate = useMutation({
    mutationFn: setProfileInfo,
    onSuccess: onSuccessFn,
    onError: onErrorFn,
  });

  const setIntroductionMutate = useMutation({
    mutationFn: setProfileIntroduction,
    onSuccess: onSuccessFn,
    onError: onErrorFn,
  });

  const setLinksMutate = useMutation({
    mutationFn: setProfileLinks,
    onSuccess: onSuccessFn,
    onError: onErrorFn,
  });

  const setSkillsMutate = useMutation({
    mutationFn: setProfileSkills,
    onSuccess: onSuccessFn,
    onError: onErrorFn,
  });

  const setDescriptionMutate = useMutation({
    mutationFn: setProfileDescription,
    onSuccess: onSuccessFn,
    onError: onErrorFn,
  });

  const quitMutate = useMutation({
    mutationFn: quit,
    onSuccess: () => {
      setIsLoggedIn(false);
      setMemberId(null);
      setNewChatMembers([]);
      removeCookie("accessToken", { path: "/" });
      navigate(PATH.home);
    },
  });

  return {
    profileQuery,
    setInfoMutate,
    setIntroductionMutate,
    setLinksMutate,
    setSkillsMutate,
    setDescriptionMutate,
    quitMutate,
  };
}
