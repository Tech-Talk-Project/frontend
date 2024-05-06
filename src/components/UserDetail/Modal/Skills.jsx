import React, { memo } from "react";
import { Typography } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import SkillItem from "../../Main/User/SkillItem";

const Skills = ({ skills }) => {
  return (
    <article className="flex flex-col gap-2 pb-4 w-full border-b border-blue-gray-600">
      <Typography variant="h5">SKILLS</Typography>
      <ul className="flex gap-3 flex-wrap">
        {skills.map((skill) => (
          <SkillItem key={uuidv4()} skill={skill} />
        ))}
      </ul>
    </article>
  );
};

export default memo(Skills);
