import { useRecoilValue, useSetRecoilState } from "recoil";
import newChatMemberState from "../recoil/atoms/newChatMember";
import newChatMemberIdListState from "../recoil/selectors/newChatMemberIdList";

export default function useNewChatMember(memberId, name, imageUrl) {
  const setNewChatMembers = useSetRecoilState(newChatMemberState);
  const newChatMembersIdList = useRecoilValue(newChatMemberIdListState);

  const handleMemberClick = () => {
    if (newChatMembersIdList.includes(memberId)) {
      setNewChatMembers((prev) =>
        prev.filter((newChatMember) => newChatMember.memberId !== memberId)
      );
      return;
    }

    setNewChatMembers((prev) => [...prev, { memberId, name, imageUrl }]);
  };

  return handleMemberClick;
}
