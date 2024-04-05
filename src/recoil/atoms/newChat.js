import { atom } from "recoil";
import { NEW_CHAT_KEYS } from "../../constants/recoilKeys";

export const createNewChatState = atom({
  key: NEW_CHAT_KEYS.createNewChat,
  default: false,
});

export const newChatMemberState = atom({
  key: NEW_CHAT_KEYS.newChatMembers,
  default: [],
});
