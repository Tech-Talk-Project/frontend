import { selector } from "recoil";
import { newChatMemberState } from "../atoms/newChat";

const newChatMemberInfoState = selector({
  key: "newChatMemberIdListState",
  get: ({ get }) => {
    const newChatMembers = get(newChatMemberState);
    const newChatMembersIdList = newChatMembers.map(
      (newChatMember) => newChatMember.memberId
    );
    const newChatMembersNameList = newChatMembers.map(
      (newChatMember) => newChatMember.name
    );

    return { newChatMembersIdList, newChatMembersNameList };
  },
});

export default newChatMemberInfoState;
