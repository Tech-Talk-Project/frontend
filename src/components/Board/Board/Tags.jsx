import React from "react";
import { v4 as uuidv4 } from "uuid";
import Tag from "../Post/Info/Tag";

export default function Tags({ tags }) {
  return (
    <ul className="flex gap-2 flex-wrap my-1">
      {tags.map((tag) => (
        <Tag key={uuidv4()} tag={tag} color="gray" size="sm" />
      ))}
    </ul>
  );
}
