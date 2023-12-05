import { useQuery, useMutation } from "@tanstack/react-query";
import { PROFILE_QUERY_KEYS } from "../constants/queryKeys";
import { getProfile, setProfileInfo } from "../apis/profile";
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

  return { profileQuery, setProfileInfoMutate };
}
