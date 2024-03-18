import { atom } from "recoil";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../../utils/cookie";
import { AUTH_RECOIL_KEYS } from "../../constants/recoilKeys";

export const isLoggedInState = atom({
  key: AUTH_RECOIL_KEYS.isLoggedIn,
  default: Boolean(getCookie("accessToken")),
});

export const memberIdState = atom({
  key: AUTH_RECOIL_KEYS.memberId,
  default: getCookie("accessToken")
    ? jwtDecode(getCookie("accessToken")).memberId
    : null,
});
