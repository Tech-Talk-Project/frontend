import React from "react";
import { Typography, Chip } from "@material-tailwind/react";
import { getHourAndMinutes } from "../../utils/date";

export default function ChatRoom({
  chatRoom: { title, unreadCount, lastMessages, joinedMembers },
}) {
  return (
    <div className="flex flex-col gap-2 p-4 border text-white bg-blue-gray-900 border-line rounded-lg hover:border-brand duration-150 cursor-pointer">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center mr-2">
          <Typography variant="h5" className="mr-3 truncate">
            {title}
          </Typography>
          <Typography variant="paragraph" className="font-normal text-gray-600">
            {joinedMembers.length}
          </Typography>
        </div>
        <Typography variant="small" className="font-normal">
          {getHourAndMinutes(
            new Date(lastMessages[lastMessages.length - 1].sendTime)
          )}
        </Typography>
      </div>
      <div className="flex justify-between items-center w-full">
        <Typography variant="paragraph" className="mr-2 font-normal truncate">
          {lastMessages[lastMessages.length - 1].content}
        </Typography>
        {unreadCount !== 0 && (
          <Chip size="sm" value={unreadCount} className="bg-brand" />
        )}
      </div>
    </div>
  );
}
