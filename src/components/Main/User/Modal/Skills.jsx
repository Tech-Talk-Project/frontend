import React from "react";
import { Typography } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import { CATEGORYS_PATH } from "../../../../constants/category";
import SkillImage from "../../../Common/Image/SkillImage";

export default function Skills({ skills }) {
  return (
    <article className="flex flex-col gap-2 pb-4 w-full border-b border-blue-gray-600">
      <Typography variant="h5">SKILLS</Typography>
      <ul className="flex gap-3 flex-wrap">
        {skills.map((skill) => (
          <li key={uuidv4()}>
            <SkillImage
              size="md"
              language={skill}
              imageUrl={CATEGORYS_PATH[skill]}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}
