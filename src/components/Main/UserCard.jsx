import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Typography, Checkbox } from "@material-tailwind/react";
import ProfileImage from "../Common/ProfileImage";
import SkillItem from "./SkillItem";
import { useRecoilValue } from "recoil";
import createNewChatState from "../../recoil/atoms/createNewChat";
import useNewChatMember from "../../hooks/useNewChatMemberClick";
import newChatMemberInfoState from "../../recoil/selectors/newChatMemberIdList";

export default function UserCard({
  user: { memberId, name, job, imageUrl, introduction, skills },
}) {
  const createNewChat = useRecoilValue(createNewChatState);
  const { newChatMembersIdList } = useRecoilValue(newChatMemberInfoState);
  const handleMemberClick = useNewChatMember(memberId, name, imageUrl);
  const isSelected = newChatMembersIdList.includes(memberId);

  return (
    <li
      className={`flex flex-col gap-2 p-4 border border-blue-gray-800 rounded-lg hover:border-brand duration-150 cursor-pointer ${
        isSelected ? "border-brand" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Typography variant="h5">{name}</Typography>
          <Typography variant="h6" className=" text-gray-500">
            {job || ""}
          </Typography>
        </div>
        <ProfileImage imageUrl={imageUrl} size="md" />
      </div>
      <Typography variant="paragraph" className="mt-2 font-medium">
        {introduction || ""}
      </Typography>
      <div className="relative h-full">
        <ul className="flex flex-wrap gap-2 mr-12 max-h-[88px] overflow-hidden">
          {skills.map((skill) => (
            <SkillItem key={uuidv4()} skill={skill} />
          ))}
        </ul>
        {createNewChat && (
          <Checkbox
            checked={isSelected}
            ripple={false}
            onChange={handleMemberClick}
            className="w-6 h-6 hover:before:opacity-0 checked:bg-brand rounded-full before:w-6 before:h-6"
            containerProps={{
              className: "absolute bottom-0 right-0 p-0",
            }}
          />
        )}
      </div>
    </li>
  );
}
