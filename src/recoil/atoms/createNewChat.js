import { atom } from "recoil";
import { NEW_CHAT_KEYS } from "../../constants/recoilKeys";

const createNewChatState = atom({
  key: NEW_CHAT_KEYS.createNewChat,
  default: false,
});

export default createNewChatState;
