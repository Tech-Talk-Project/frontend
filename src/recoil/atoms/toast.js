import { atom } from "recoil";
import { TOAST_RECOIL_KEYS } from "../../constants/recoilKeys";

export const toastState = atom({
  key: TOAST_RECOIL_KEYS.toast,
  default: {
    isOpen: false,
    message: "",
  },
});
