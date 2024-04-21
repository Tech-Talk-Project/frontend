import { atom } from "recoil";
import { FILTER_RECOIL_KEYS } from "../../constants/recoilKeys";

// 메인 페이지 카테고리
const filterState = atom({
  key: FILTER_RECOIL_KEYS.filter,
  default: "frontend",
});

export default filterState;
