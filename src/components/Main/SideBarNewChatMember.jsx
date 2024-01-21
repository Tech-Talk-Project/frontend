import React from "react";
import useNewChatMember from "../../hooks/useNewChatMemberClick";

export default function SideBarNewChatMember({ memberId }) {
  const handleMemberClick = useNewChatMember();

  return (
    <div
      className="px-4 py-3 border border-brand hover:bg-brand rounded-lg cursor-pointer duration-150"
      onClick={() => handleMemberClick(memberId)}
    >
      {memberId}
    </div>
  );
}
