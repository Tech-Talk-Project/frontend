import React from "react";
import { useRecoilValue } from "recoil";
import { memberIdState } from "../../../recoil/atoms/auth";
import { Typography } from "@material-tailwind/react";
import { getHourAndMinutes } from "../../../utils/date";
import ProfileImage from "../../Common/Image/ProfileImage";

export default function ChattingItem({
  chatListRef,
  chat: { content, senderId, sendTime },
  index,
  name,
  imageUrl,
}) {
  const memberId = useRecoilValue(memberIdState);
  const isMyChat = memberId === senderId;

  return (
    <li
      className={`flex gap-2 ${isMyChat ? "justify-end ml-8" : "mr-8"}`}
      ref={(element) => {
        chatListRef.current[index] = element;
      }}
    >
      {!isMyChat && <ProfileImage imageUrl={imageUrl} size="sm" />}
      <div>
        {!isMyChat && (
          <Typography variant="small" className=" font-normal text-gray-400">
            {name}
          </Typography>
        )}
        <div className="flex items-end gap-2">
          <Typography
            variant="paragraph"
            className={`px-3 py-[0.125rem] max-w-max bg-white font-normal text-black rounded-md break-all ${
              isMyChat
                ? "order-2 bg-yellow-400"
                : senderId === -1
                ? "bg-blue-gray-800 text-white"
                : ""
            }`}
          >
            {content}
          </Typography>
          {senderId !== -1 && (
            <Typography variant="small" className=" font-normal">
              {getHourAndMinutes(new Date(sendTime))}
            </Typography>
          )}
        </div>
      </div>
    </li>
  );
}
