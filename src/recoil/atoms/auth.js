import { atom } from "recoil";
import { getCookie } from "../../utils/cookie";
import { AUTH_RECOIL_KEYS } from "../../constants/recoilKeys";

const isLoggedInState = atom({
  key: AUTH_RECOIL_KEYS.isLoggedIn,
  default: Boolean(getCookie("accessToken")),
});

export default isLoggedInState;
