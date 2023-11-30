import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@material-tailwind/react";
import SkillImage from "../Common/SkillImage";
import { CATEGORYS_PATH } from "../../constants/category";

export default function Skills({ skills }) {
  return (
    <article className="p-4 w-full border border-line rounded-md">
      <Typography variant="h5">Skills</Typography>
      <ul className="flex gap-3 mt-4 pb-2 overflow-x-auto">
        {skills.map((skill) => (
          <li key={uuidv4()} className="shrink-0">
            {
              <SkillImage
                size="lg"
                language={skill}
                imageUrl={CATEGORYS_PATH[skill]}
              />
            }
          </li>
        ))}
      </ul>
    </article>
  );
}
