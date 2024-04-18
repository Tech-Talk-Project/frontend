import { atom } from "recoil";
import { NEW_CHAT_RECOIL_KEYS } from "../../constants/recoilKeys";

export const createNewChatState = atom({
  key: NEW_CHAT_RECOIL_KEYS.createNewChat,
  default: false,
});

export const newChatMemberState = atom({
  key: NEW_CHAT_RECOIL_KEYS.newChatMembers,
  default: [],
});
