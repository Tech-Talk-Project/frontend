import { atom } from "recoil";
import { FILTER_RECOIL_KEYS } from "../../constants/recoilKeys";

const filterState = atom({
  key: FILTER_RECOIL_KEYS.filter,
  default: "frontend",
});

export default filterState;
