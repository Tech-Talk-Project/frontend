import React from "react";
import { v4 as uuidv4 } from "uuid";
import Tag from "./Tag";

export default function Tags({ tags }) {
  return (
    <article className="my-4">
      <ul className="flex flex-wrap justify-center gap-4">
        {tags.map((tag) => (
          <Tag key={uuidv4()} tag={tag} />
        ))}
      </ul>
    </article>
  );
}
