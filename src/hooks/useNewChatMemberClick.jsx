import { useRecoilState } from "recoil";
import newChatMemberState from "../recoil/atoms/newChatMember";

export default function useNewChatMember() {
  const [newChatMembers, setNewChatMembers] =
    useRecoilState(newChatMemberState);

  const handleMemberClick = (memberId) => {
    if (newChatMembers.includes(memberId)) {
      setNewChatMembers((prev) => prev.filter((id) => id !== memberId));
      return;
    }

    setNewChatMembers((prev) => [...prev, memberId]);
  };

  return handleMemberClick;
}
