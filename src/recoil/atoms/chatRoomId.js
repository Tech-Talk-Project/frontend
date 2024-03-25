import { atom } from "recoil";
import { PREV_CHATROOMID_RECOIL_KEYS } from "../../constants/recoilKeys";

const prevChatRoomIdState = atom({
  key: PREV_CHATROOMID_RECOIL_KEYS.prevChatRoomId,
  default: null,
});

export default prevChatRoomIdState;
