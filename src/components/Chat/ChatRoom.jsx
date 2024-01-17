import React from "react";
import { Typography, Chip } from "@material-tailwind/react";

export default function ChatRoom({
  chatRoom: { title, unreadCount, lastMessages, joinedMembers },
}) {
  return (
    <div className="flex flex-col gap-2 p-4 text-white border border-line rounded-lg hover:border-brand duration-150 cursor-pointer">
      <div className="flex justify-between items-center w-full">
        <Typography variant="h6" className="mr-2 truncate">
          {title
            ? title
            : joinedMembers.map((member) => member.nickname).join(", ")}
        </Typography>
        <Typography variant="small">12:34</Typography>
      </div>
      <div className="flex justify-between items-center w-full">
        <Typography variant="paragraph" className="mr-2 font-normal truncate">
          {lastMessages[0]}
        </Typography>
        {unreadCount !== 0 && (
          <Chip size="sm" value={unreadCount} className="bg-brand" />
        )}
      </div>
    </div>
  );
}
