import React from "react";
import useNewChatMember from "../../../hooks/useNewChatMemberClick";
import { Typography } from "@material-tailwind/react";
import ProfileImage from "../../Common/Image/ProfileImage";

export default function SideBarNewChatMember({
  member: { memberId, name, imageUrl },
}) {
  const handleMemberClick = useNewChatMember(memberId, name, imageUrl);

  return (
    <div
      className="flex justify-between items-center px-4 py-2 border border-brand hover:bg-brand rounded-lg cursor-pointer duration-150"
      onClick={handleMemberClick}
    >
      <Typography variant="h6">{name}</Typography>
      <ProfileImage imageUrl={imageUrl} size="md" />
    </div>
  );
}
