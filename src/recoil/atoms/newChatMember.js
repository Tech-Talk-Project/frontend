import { atom } from "recoil";
import { NEW_CHAT_KEYS } from "../../constants/recoilKeys";

const newChatMemberState = atom({
  key: NEW_CHAT_KEYS.newChatMembers,
  default: [],
});

export default newChatMemberState;
