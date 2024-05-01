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
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { removeCookie } from "../utils/cookie";
import { isLoggedInState, memberIdState } from "../recoil/atoms/auth";
import { newChatMemberState } from "../recoil/atoms/newChat";

export default function useProfiles() {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setMemberId = useSetRecoilState(memberIdState);
  const setNewChatMembers = useSetRecoilState(newChatMemberState);

  const profileQuery = useSuspenseQuery({
    queryKey: PROFILE_QUERY_KEYS.myProfile,
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000,
  });

  const setProfileInfoMutate = useMutation({
    mutationFn: setProfileInfo,
    onSuccess: async () => {
      await queryClient.invalidateQueries(PROFILE_QUERY_KEYS.myProfile);
    },
  });

  const setProfileIntroductionMutate = useMutation({
    mutationFn: setProfileIntroduction,
    onSuccess: async () => {
      await queryClient.invalidateQueries(PROFILE_QUERY_KEYS.myProfile);
    },
  });

  const setProfileLinksMutate = useMutation({
    mutationFn: setProfileLinks,
    onSuccess: async () => {
      await queryClient.invalidateQueries(PROFILE_QUERY_KEYS.myProfile);
    },
  });

  const setProfileSkillsMutate = useMutation({
    mutationFn: setProfileSkills,
    onSuccess: async () => {
      await queryClient.invalidateQueries(PROFILE_QUERY_KEYS.myProfile);
    },
  });

  const setProfileDescriptionMutate = useMutation({
    mutationFn: setProfileDescription,
    onSuccess: async () => {
      await queryClient.invalidateQueries(PROFILE_QUERY_KEYS.myProfile);
    },
  });

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

  return {
    profileQuery,
    setProfileInfoMutate,
    setProfileIntroductionMutate,
    setProfileLinksMutate,
    setProfileSkillsMutate,
    setProfileDescriptionMutate,
    quitMutate,
  };
}
