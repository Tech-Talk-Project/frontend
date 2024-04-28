import React from "react";
import { v4 as uuidv4 } from "uuid";
import TagItem from "./TagItem";

export default function TagList({ tags, setTags }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {tags.map((tag, index) => (
        <TagItem key={uuidv4()} tag={tag} index={index} setTags={setTags} />
      ))}
    </ul>
  );
}
