import { atom } from "recoil";
import { TYPE_RECOIL_KEYS } from "../../constants/recoilKeys";

// 커뮤니티 페이지 타입
const typeState = atom({
  key: TYPE_RECOIL_KEYS.type,
  default: "project",
});

export default typeState;
