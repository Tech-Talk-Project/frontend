import { selector } from "recoil";
import newChatMemberState from "../atoms/newChatMember";

const newChatMemberIdListState = selector({
  key: "newChatMemberIdListState",
  get: ({ get }) => {
    const newChatMembers = get(newChatMemberState);
    const newChatMembersIdList = newChatMembers.map(
      (newChatMember) => newChatMember.memberId
    );

    return newChatMembersIdList;
  },
});

export default newChatMemberIdListState;
