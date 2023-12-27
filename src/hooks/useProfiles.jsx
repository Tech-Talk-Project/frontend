import { useQuery, useMutation } from "@tanstack/react-query";
import { PROFILE_QUERY_KEYS } from "../constants/queryKeys";
import {
  getProfile,
  setProfileInfo,
  setProfileIntroduction,
  setProfileLinks,
  setProfileSkills,
} from "../apis/profile";
import { queryClient } from "../apis/queryClient";

export default function useProfiles() {
  const profileQuery = useQuery({
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

  return {
    profileQuery,
    setProfileInfoMutate,
    setProfileIntroductionMutate,
    setProfileLinksMutate,
    setProfileSkillsMutate,
  };
}
