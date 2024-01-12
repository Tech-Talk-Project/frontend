import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@material-tailwind/react";
import ProfileImage from "../Common/ProfileImage";
import SkillItem from "./SkillItem";

export default function UserCard({
  user: { name, job, imageUrl, introduction, skills },
}) {
  return (
    <li className="flex flex-col gap-2 p-4 border border-line rounded-lg hover:border-brand duration-150 cursor-pointer">
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
      <ul className="flex gap-2">
        {skills.map((skill) => (
          <SkillItem key={uuidv4()} skill={skill} />
        ))}
      </ul>
    </li>
  );
}
