import { atom } from "recoil";
import { getCookie } from "../../utils/cookie";

const isLoggedInState = atom({
  key: "isLoggedIn",
  default: Boolean(getCookie("accessToken")),
});

export default isLoggedInState;
