import React, { useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { isLoggedInState, memberIdState } from "../../recoil/atoms/auth";
import { login } from "../../apis/auth";
import { setCookie } from "../../utils/cookie";
import LoginLoading from "./LoginLoading";
import { AUTH_QUERY_KEYS } from "../../constants/queryKeys";
import { jwtDecode } from "jwt-decode";
import { PATH } from "../../constants/path";

export default function LoginPageMain() {
  const navigate = useNavigate();
  const { provider } = useParams();
  const [searchParams] = useSearchParams();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setMemberId = useSetRecoilState(memberIdState);
  const { data } = useSuspenseQuery({
    queryKey: AUTH_QUERY_KEYS.login,
    queryFn: () => login({ code: searchParams.get("code"), provider }),
  });

  useEffect(() => {
    if (data) {
      const { accessToken, refreshTokenExpirationInMilliSeconds, firstLogin } =
        data;
      setIsLoggedIn(true);
      setCookie("accessToken", accessToken, {
        path: "/",
        expires: new Date(refreshTokenExpirationInMilliSeconds),
      });
      setMemberId(jwtDecode(accessToken).memberId);

      if (firstLogin) {
        navigate(PATH.profile);
      } else {
        navigate(PATH.home);
      }
    }
  }, [data, setIsLoggedIn, setMemberId, navigate]);

  return <LoginLoading />;
}
