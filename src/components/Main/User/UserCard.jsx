import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Typography, Checkbox } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../../Common/Image/ProfileImage";
import SkillItem from "./SkillItem";
import { useRecoilValue } from "recoil";
import { createNewChatState } from "../../../recoil/atoms/newChat";
import useNewChatMember from "../../../hooks/useNewChatMemberClick";
import newChatMemberInfoState from "../../../recoil/selectors/newChatMemberIdList";
import { memberIdState } from "../../../recoil/atoms/auth";
import { PATH } from "../../../constants/path";

export default function UserCard({
  user: { memberId: cardMemberId, name, job, imageUrl, introduction, skills },
}) {
  const navigate = useNavigate();
  const memberId = useRecoilValue(memberIdState);
  const createNewChat = useRecoilValue(createNewChatState);
  const { newChatMembersIdList } = useRecoilValue(newChatMemberInfoState);
  const handleMemberClick = useNewChatMember(cardMemberId, name, imageUrl);
  const isSelected = newChatMembersIdList.includes(cardMemberId);
  const isMyCard = memberId === cardMemberId;

  const handleClick = () => {
    if (createNewChat) {
      handleMemberClick();
      return;
    }
    navigate(isMyCard ? PATH.profile : PATH.userDetail(cardMemberId));
  };
  return (
    <li
      className={`flex flex-col gap-2 p-4 border border-blue-gray-800 rounded-lg hover:border-brand duration-150 cursor-pointer ${
        isSelected || (createNewChat && isMyCard) ? "border-brand" : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-center gap-1">
        <div className="flex flex-col gap-1">
          <div className="line-clamp-2">
            <Typography variant="h5" className="break-all">
              {name}
            </Typography>
          </div>
          <Typography variant="h6" className="break-all text-gray-500">
            {job || ""}
          </Typography>
        </div>
        <ProfileImage imageUrl={imageUrl} size="md" />
      </div>
      <div className="line-clamp-2">
        <Typography variant="paragraph" className="mt-2 font-medium">
          {introduction || ""}
        </Typography>
      </div>
      <div className="relative">
        <ul className="flex flex-wrap gap-2 max-h-[88px] overflow-hidden">
          {skills.map((skill) => (
            <SkillItem key={uuidv4()} skill={skill} />
          ))}
        </ul>
        {createNewChat && (
          <Checkbox
            checked={isSelected || isMyCard}
            ripple={false}
            readOnly
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
