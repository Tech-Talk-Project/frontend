import React from "react";
import { v4 as uuidv4 } from "uuid";
import Tag from "./Tag";
import { Typography } from "@material-tailwind/react";

export default function Tags({ tags }) {
  return (
    <article className="flex flex-col gap-2 md:my-4">
      <Typography variant="h6">태그</Typography>
      <ul className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <Tag key={uuidv4()} tag={tag} />
        ))}
      </ul>
    </article>
  );
}
